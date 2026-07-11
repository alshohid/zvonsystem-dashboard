'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Pause, Play, Upload } from 'lucide-react';
import FormFieldInput from '@/src/components/ui/input/FormFieldInput';

// Peaks are analyzed once at a fixed high resolution, then downsampled to
// however many thin bars actually fit the container at render time — so
// bars stay thin and dense instead of stretching to fill any given width.
const WAVEFORM_ANALYSIS_RESOLUTION = 300;
const BAR_WIDTH_PX = 2;
const BAR_GAP_PX = 2;
const MIN_BAR_COUNT = 16;

// Decoding the full PCM data client-side gets slow/memory-heavy well before
// the 1GB upload cap, so waveform analysis is skipped past this size.
const MAX_DECODE_FILE_SIZE = 150 * 1024 * 1024;

function downsamplePeaks(source: number[], targetCount: number): number[] {
  if (targetCount >= source.length) return source;

  const blockSize = source.length / targetCount;
  const result: number[] = [];

  for (let i = 0; i < targetCount; i++) {
    const start = Math.floor(i * blockSize);
    const end = Math.floor((i + 1) * blockSize);
    let max = 0;
    for (let j = start; j < end; j++) {
      if (source[j] > max) max = source[j];
    }
    result.push(max);
  }

  return result;
}

async function extractWaveformPeaks(file: File, barCount: number): Promise<number[]> {
  type WindowWithWebkitAudio = typeof window & { webkitAudioContext?: typeof AudioContext };
  const AudioContextClass =
    window.AudioContext ?? (window as WindowWithWebkitAudio).webkitAudioContext;
  const audioContext = new AudioContextClass();

  try {
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const rawData = audioBuffer.getChannelData(0);
    const blockSize = Math.max(1, Math.floor(rawData.length / barCount));
    const peaks: number[] = [];

    // RMS (energy) per block, not raw max sample — loud/mastered tracks hit
    // close to full scale in almost every block, which makes a max-based
    // waveform look like a flat, uniform-height stripe instead of varying.
    for (let i = 0; i < barCount; i++) {
      const start = i * blockSize;
      let sumSquares = 0;
      for (let j = 0; j < blockSize; j++) {
        const value = rawData[start + j] ?? 0;
        sumSquares += value * value;
      }
      peaks.push(Math.sqrt(sumSquares / blockSize));
    }

    const maxPeak = Math.max(...peaks, 0.0001);
    return peaks.map(peak => {
      const normalized = peak / maxPeak;
      // Boost contrast — RMS values cluster together too, so a sqrt curve
      // spreads them back out into a visually varied waveform shape.
      return Math.max(Math.sqrt(normalized), 0.06);
    });
  } finally {
    audioContext.close();
  }
}

type TrackFileUploadFieldProps = {
  file: File | null;
  onFileChange: (file: File | null) => void;
};

export default function TrackFileUploadField({ file, onFileChange }: TrackFileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const waveformRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [peaks, setPeaks] = useState<number[] | null>(null);
  const [waveformError, setWaveformError] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const node = waveformRef.current;
    if (!node) return;

    const observer = new ResizeObserver(entries => {
      setContainerWidth(entries[0]?.contentRect.width ?? 0);
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const displayBarCount = Math.max(
    MIN_BAR_COUNT,
    Math.min(
      WAVEFORM_ANALYSIS_RESOLUTION,
      Math.floor(containerWidth / (BAR_WIDTH_PX + BAR_GAP_PX)),
    ),
  );

  const displayPeaks = useMemo(
    () => (peaks ? downsamplePeaks(peaks, displayBarCount) : null),
    [peaks, displayBarCount],
  );

  const [trackedFile, setTrackedFile] = useState(file);
  if (file !== trackedFile) {
    setTrackedFile(file);
    setIsPlaying(false);
    setProgress(0);
    setPeaks(null);
    setWaveformError(!!file && file.size > MAX_DECODE_FILE_SIZE);
  }

  const oversized = !!file && file.size > MAX_DECODE_FILE_SIZE;
  const waveformStatus: 'idle' | 'loading' | 'ready' | 'unavailable' = !file
    ? 'idle'
    : waveformError || oversized
      ? 'unavailable'
      : peaks
        ? 'ready'
        : 'loading';

  const audioUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  useEffect(() => {
    if (!file || oversized) return;

    let cancelled = false;

    extractWaveformPeaks(file, WAVEFORM_ANALYSIS_RESOLUTION)
      .then(result => {
        if (!cancelled) setPeaks(result);
      })
      .catch(() => {
        if (!cancelled) setWaveformError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [file, oversized]);

  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => undefined);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setProgress(audio.currentTime / audio.duration);
  };

  const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration || waveformStatus !== 'ready') return;

    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * audio.duration;
    setProgress(ratio);
  };

  return (
    <FormFieldInput label="Track File">
      <div>
        <input
          ref={inputRef}
          type="file"
          accept="audio/wav,audio/flac,.wav,.flac"
          className="hidden"
          onChange={e => onFileChange(e.target.files?.[0] ?? null)}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-4 py-2 text-[13px] font-medium text-[#22C55E] hover:bg-[#F0FDF4]"
        >
          <Upload size={16} strokeWidth={2.25} />
          {file ? 'Replace track' : 'Upload a track'}
        </button>
        {file ? (
          <span className="ml-2 text-[13px] text-[#667085]">{file.name}</span>
        ) : null}
      </div>

      {file && (
        <div className="flex w-full max-w-md items-center gap-3 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-3">
          <button
            type="button"
            onClick={handleTogglePlay}
            disabled={waveformStatus !== 'ready'}
            aria-label={isPlaying ? 'Pause track' : 'Play track'}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-black transition-opacity disabled:opacity-40"
          >
            {isPlaying ? (
              <Pause size={16} fill="currentColor" />
            ) : (
              <Play size={16} fill="currentColor" className="ml-0.5" />
            )}
          </button>

          <div
            ref={waveformRef}
            role="slider"
            aria-label="Seek track"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
            onClick={handleSeek}
            className="flex h-10 min-w-0 flex-1 items-center gap-[2px] overflow-hidden"
          >
            {waveformStatus === 'loading' && (
              <span className="text-xs text-[#98A2B3]">Analyzing waveform…</span>
            )}
            {waveformStatus === 'unavailable' && (
              <span className="text-xs text-[#98A2B3]">
                Waveform preview unavailable for this file
              </span>
            )}
            {waveformStatus === 'ready' &&
              displayPeaks?.map((peak, i) => {
                const played = i / displayPeaks.length < progress;

                return (
                  <span
                    key={i}
                    className={[
                      'shrink-0 rounded-full transition-colors',
                      played ? 'bg-primary' : 'bg-[#D0D5DD]',
                    ].join(' ')}
                    style={{ width: BAR_WIDTH_PX, height: `${Math.max(peak * 100, 8)}%` }}
                  />
                );
              })}
          </div>
        </div>
      )}

      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false);
            setProgress(0);
          }}
        />
      )}

      <p className="mt-1.5 text-xs text-[#98A2B3]">
        Format: .wav, .flac. Max size 1GB
      </p>
    </FormFieldInput>
  );
}

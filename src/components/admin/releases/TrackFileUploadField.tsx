'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Pause, Play, Upload } from 'lucide-react';
import FormFieldInput from '@/src/components/ui/input/FormFieldInput';

const WAVEFORM_BAR_COUNT = 64;
// Decoding the full PCM data client-side gets slow/memory-heavy well before
// the 1GB upload cap, so waveform analysis is skipped past this size.
const MAX_DECODE_FILE_SIZE = 150 * 1024 * 1024;

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

    for (let i = 0; i < barCount; i++) {
      const start = i * blockSize;
      let max = 0;
      for (let j = 0; j < blockSize; j++) {
        const value = Math.abs(rawData[start + j] ?? 0);
        if (value > max) max = value;
      }
      peaks.push(max);
    }

    const maxPeak = Math.max(...peaks, 0.0001);
    return peaks.map(peak => Math.max(peak / maxPeak, 0.06));
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

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [peaks, setPeaks] = useState<number[] | null>(null);
  const [waveformError, setWaveformError] = useState(false);


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

    extractWaveformPeaks(file, WAVEFORM_BAR_COUNT)
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
        <div className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-3">
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
              peaks?.map((peak, i) => {
                const played = i / peaks.length < progress;

                return (
                  <span
                    key={i}
                    className={[
                      'min-w-[2px] flex-1 rounded-full transition-colors',
                      played ? 'bg-primary' : 'bg-[#D0D5DD]',
                    ].join(' ')}
                    style={{ height: `${Math.max(peak * 100, 8)}%` }}
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

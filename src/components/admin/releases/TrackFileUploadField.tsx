'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Music2, Pause, Play, Upload, UploadCloud } from 'lucide-react';

const WAVEFORM_ANALYSIS_RESOLUTION = 300;
const BAR_WIDTH_PX = 2;
const BAR_GAP_PX = 2;
const BAR_WIDTH_PX_LG = 3;
const BAR_GAP_PX_LG = 3;
const MIN_BAR_COUNT = 16;

const DEFAULT_ACCEPT = 'audio/wav,audio/flac,audio/mpeg,.wav,.flac,.mp3';
const DEFAULT_ACCEPTED_EXTENSIONS = ['.wav', '.flac', '.mp3'];
const DEFAULT_MAX_SIZE_BYTES = 1024 * 1024 * 1024;
const DEFAULT_DROPZONE_HINT = 'WAV or FLAC · Min. 16-bit, 44.1 kHz · Max 1GB';

const DEFAULT_MAX_DECODE_SIZE_BYTES = 150 * 1024 * 1024;

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB'];
  let value = bytes / 1024;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unitIndex]}`;
}

export function validateAudioFile(
  file: File,
  acceptedExtensions: string[],
  maxSizeBytes: number,
): string | null {
  const matchesExtension =
    acceptedExtensions.length === 0 ||
    acceptedExtensions.some(ext => file.name.toLowerCase().endsWith(ext.toLowerCase()));

  if (!matchesExtension) {
    return `Unsupported file type. Accepted formats: ${acceptedExtensions.join(', ')}`;
  }
  if (file.size > maxSizeBytes) {
    return `File is too large. Max size is ${formatFileSize(maxSizeBytes)}.`;
  }
  return null;
}

export function downsamplePeaks(source: number[], targetCount: number): number[] {
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

export async function extractWaveformPeaks(file: File, barCount: number): Promise<number[]> {
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
      return Math.max(Math.sqrt(normalized), 0.06);
    });
  } finally {
    audioContext.close();
  }
}

export type TrackFileUploadFieldProps = {
  file: File | null;
  onFileChange: (file: File | null) => void;
  label?: string | null;
  accept?: string;
  acceptedExtensions?: string[];
  maxSizeBytes?: number;
  maxDecodeSizeBytes?: number;
  dropzoneHint?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;

  onError?: (message: string) => void;
};

export default function TrackFileUploadField({
  file,
  onFileChange,
  label = 'Track File',
  accept = DEFAULT_ACCEPT,
  acceptedExtensions = DEFAULT_ACCEPTED_EXTENSIONS,
  maxSizeBytes = DEFAULT_MAX_SIZE_BYTES,
  maxDecodeSizeBytes = DEFAULT_MAX_DECODE_SIZE_BYTES,
  dropzoneHint,
  helperText,
  error,
  required,
  disabled,
  className,
  onError,
}: TrackFileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [peaks, setPeaks] = useState<number[] | null>(null);
  const [waveformError, setWaveformError] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const [waveformNode, setWaveformNode] = useState<HTMLDivElement | null>(null);
  const waveformRef = useCallback((node: HTMLDivElement | null) => {
    setWaveformNode(node);
  }, []);

  useEffect(() => {
    if (!waveformNode) return;

    const observer = new ResizeObserver(entries => {
      setContainerWidth(entries[0]?.contentRect.width ?? 0);
    });

    observer.observe(waveformNode);
    return () => observer.disconnect();
  }, [waveformNode]);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsLargeScreen(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  const barWidth = isLargeScreen ? BAR_WIDTH_PX_LG : BAR_WIDTH_PX;
  const barGap = isLargeScreen ? BAR_GAP_PX_LG : BAR_GAP_PX;

  const displayBarCount = Math.max(
    MIN_BAR_COUNT,
    Math.min(WAVEFORM_ANALYSIS_RESOLUTION, Math.floor(containerWidth / (barWidth + barGap))),
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
    setWaveformError(!!file && file.size > maxDecodeSizeBytes);
  }

  const oversizedForDecode = !!file && file.size > maxDecodeSizeBytes;
  const waveformStatus: 'idle' | 'loading' | 'ready' | 'unavailable' = !file
    ? 'idle'
    : waveformError || oversizedForDecode
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
    if (!file || oversizedForDecode) return;

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
  }, [file, oversizedForDecode]);

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

  const handleBrowseClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const acceptFile = (candidate: File | null) => {
    if (!candidate) {
      setValidationError(null);
      onFileChange(null);
      return;
    }

    const message = validateAudioFile(candidate, acceptedExtensions, maxSizeBytes);
    if (message) {
      setValidationError(message);
      onError?.(message);
      return;
    }

    setValidationError(null);
    onFileChange(candidate);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    acceptFile(event.target.files?.[0] ?? null);
    event.target.value = '';
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    acceptFile(event.dataTransfer.files?.[0] ?? null);
  };

  const skeletonHeights = useMemo(
    () => Array.from({ length: displayBarCount }, (_, i) => 25 + Math.abs(Math.sin(i * 0.45)) * 65),
    [displayBarCount],
  );

  const resolvedDropzoneHint = dropzoneHint ?? DEFAULT_DROPZONE_HINT;

  const resolvedMessage = error ?? validationError;

  return (
    <div className={['flex w-full flex-col gap-1.5', className ?? ''].join(' ').trim()}>
      {label ? (
        <label className="text-[1rem] font-medium text-[#161721]">
          {label}
          {required ? <span className="text-red-400"> *</span> : null}
        </label>
      ) : null}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        disabled={disabled}
        className="hidden"
        onChange={handleInputChange}
      />

      {!file && (
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          onClick={handleBrowseClick}
          onKeyDown={e => {
            if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              handleBrowseClick();
            }
          }}
          onDragOver={e => {
            e.preventDefault();
            if (!disabled) setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={[
            'flex flex-col items-center gap-2 rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-colors',
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
            isDragging
              ? 'border-primary bg-[#F0FDF4]'
              : 'border-[#D0D5DD] bg-[#F9FAFB] hover:border-primary hover:bg-[#F0FDF4]',
          ].join(' ')}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#22C55E] shadow-[0_1px_2px_rgba(16,24,40,0.06)]">
            <UploadCloud size={20} strokeWidth={2} />
          </span>
          <p className="text-[13px] font-semibold text-[#101828]">
            Drag &amp; drop your track here, or{' '}
            <span className="text-[#22C55E] underline underline-offset-2">browse</span>
          </p>
          <p className="text-xs text-[#98A2B3]">{resolvedDropzoneHint}</p>
        </div>
      )}

      {file && (
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex min-w-0 max-w-full items-center gap-1.5 rounded-full bg-[#EDFFE7] px-3 py-1.5 text-[13px] font-medium text-[#22C55E]">
              <Music2 size={14} className="shrink-0" />
              <span className="truncate">{file.name}</span>
            </span>
            <button
              type="button"
              disabled={disabled}
              onClick={handleBrowseClick}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-dashed border-[#D0D5DD] px-3 py-1.5 text-[13px] font-medium text-[#667085] transition-colors hover:border-primary hover:text-[#101828] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Upload size={14} />
              Replace Track
            </button>
          </div>

          <div className="flex w-full items-center gap-3 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-3">
            <button
              type="button"
              onClick={handleTogglePlay}
              disabled={waveformStatus !== 'ready'}
              aria-label={isPlaying ? 'Pause track' : 'Play track'}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-black transition-opacity disabled:opacity-40"
            >
              {isPlaying ? (
                <Pause size={17} fill="currentColor" />
              ) : (
                <Play size={17} fill="currentColor" className="ml-0.5" />
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
              style={{ gap: barGap }}
              className={[
                'flex h-10 min-w-0 flex-1 items-center overflow-hidden',
                waveformStatus === 'ready' ? 'cursor-pointer' : '',
              ].join(' ')}
            >
              {waveformStatus === 'loading' &&
                skeletonHeights.map((height, i) => (
                  <span
                    key={i}
                    className="shrink-0 animate-pulse rounded-full bg-primary/20"
                    style={{ width: barWidth, height: `${height}%` }}
                  />
                ))}
              {waveformStatus === 'unavailable' && (
                <span className="text-xs text-[#98A2B3]">Preview unavailable for this file</span>
              )}
              {waveformStatus === 'ready' &&
                displayPeaks?.map((peak, i) => {
                  const played = i / displayPeaks.length < progress;

                  return (
                    <span
                      key={i}
                      className={[
                        'shrink-0 rounded-full transition-colors',
                        played ? 'bg-primary' : 'bg-primary/25',
                      ].join(' ')}
                      style={{ width: barWidth, height: `${Math.max(peak * 100, 8)}%` }}
                    />
                  );
                })}
            </div>

            <span className="hidden shrink-0 max-w-[35%] truncate text-[13px] text-[#667085] sm:inline">
              {file.name}
            </span>
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

      {resolvedMessage ? (
        <p className="text-xs text-[#DC2626]">{resolvedMessage}</p>
      ) : helperText ? (
        <p className="text-xs text-[#98A2B3]">{helperText}</p>
      ) : null}
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Plus, Upload } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/src/components/ui/collapsible';
import FormFieldInput from '@/src/components/ui/input/FormFieldInput';
import TextInputField from '@/src/components/ui/input/TextInputField';
import ReleaseSelectField from './ReleaseSelectField';
import { FIELD_INPUT_CLASSNAME, GreenCheckbox, GreenRadioOption } from './formControls';
import { PERSON_ROLE_OPTIONS, TRACK_VERSION_OPTIONS } from './releaseFormOptions';

type TrackPerson = { name: string; role: string };
type TrackAuthor = { musicAuthor: string; wordsAuthor: string };

type Track = {
  id: string;
  expanded: boolean;
  file: File | null;
  trackName: string;
  subtitle: string;
  isrc: string;
  persons: TrackPerson[];
  authors: TrackAuthor[];
  ownsFullRights: boolean;
  soundRecording: string;
  phonogramProducer: string;
  preListeningSeconds: string;
  trackLanguage: string;
  trackVersion: string;
};

function createTrack(expanded: boolean): Track {
  return {
    id: crypto.randomUUID(),
    expanded,
    file: null,
    trackName: '',
    subtitle: '',
    isrc: '',
    persons: [{ name: '', role: 'main-artist' }],
    authors: [{ musicAuthor: '', wordsAuthor: '' }],
    ownsFullRights: false,
    soundRecording: '',
    phonogramProducer: '',
    preListeningSeconds: '0',
    trackLanguage: '',
    trackVersion: 'Original',
  };
}

type UploadTracksStepProps = {
  onNext: () => void;
  onBack: () => void;
  onTrackCountChange?: (count: number) => void;
};

function TrackFileUploadField({
  file,
  onFileChange,
}: {
  file: File | null;
  onFileChange: (file: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

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
          Upload a track
        </button>
        {file ? (
          <span className="ml-2 text-[13px] text-[#667085]">{file.name}</span>
        ) : null}
      </div>
      <p className="mt-1.5 text-xs text-[#98A2B3]">
        Format: .wav, .flac. Max size 1GB
      </p>
    </FormFieldInput>
  );
}

export default function UploadTracksStep({
  onNext,
  onBack,
  onTrackCountChange,
}: UploadTracksStepProps) {
  const [tracks, setTracks] = useState<Track[]>([createTrack(true)]);

  useEffect(() => {
    onTrackCountChange?.(tracks.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracks.length]);

  const updateTrack = (id: string, patch: Partial<Track>) => {
    setTracks(prev => prev.map(t => (t.id === id ? { ...t, ...patch } : t)));
  };

  const addTrack = () => {
    setTracks(prev => [...prev, createTrack(true)]);
  };

  const updateTrackPerson = (
    trackId: string,
    index: number,
    patch: Partial<TrackPerson>,
  ) => {
    setTracks(prev =>
      prev.map(t =>
        t.id !== trackId
          ? t
          : {
            ...t,
            persons: t.persons.map((p, i) => (i === index ? { ...p, ...patch } : p)),
          },
      ),
    );
  };

  const toggleTrackSecondArtist = (trackId: string, checked: boolean) => {
    setTracks(prev =>
      prev.map(t =>
        t.id !== trackId
          ? t
          : {
            ...t,
            persons: checked
              ? [...t.persons, { name: '', role: '' }]
              : t.persons.slice(0, 1),
          },
      ),
    );
  };

  const updateTrackAuthor = (
    trackId: string,
    index: number,
    patch: Partial<TrackAuthor>,
  ) => {
    setTracks(prev =>
      prev.map(t =>
        t.id !== trackId
          ? t
          : {
            ...t,
            authors: t.authors.map((a, i) => (i === index ? { ...a, ...patch } : a)),
          },
      ),
    );
  };

  const toggleMoreAuthors = (trackId: string, checked: boolean) => {
    setTracks(prev =>
      prev.map(t =>
        t.id !== trackId
          ? t
          : {
            ...t,
            authors: checked
              ? [...t.authors, { musicAuthor: '', wordsAuthor: '' }]
              : t.authors.slice(0, 1),
          },
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[15px] font-semibold text-[#101828]">Upload Tracks</h2>
        <p className="mt-1 text-xs text-[#98A2B3]">
          Accepted formats: WAV, FLAC · Min. 16-bit, 44.1 kHz
        </p>
      </div>

      <div className="space-y-3">
        {tracks.map((track, index) => (
          <Collapsible
            key={track.id}
            open={track.expanded}
            onOpenChange={open => updateTrack(track.id, { expanded: open })}
            className="rounded-xl border border-[#E5E7EB]"
          >
            <CollapsibleTrigger className="flex w-full items-center gap-3 px-4 py-3 text-left">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-semibold text-white">
                {index + 1}
              </span>
              <span className="flex-1 text-[13px] font-medium text-[#101828]">
                Track {index + 1}
              </span>
              <ChevronDown
                size={16}
                className={[
                  'shrink-0 text-[#667085] transition-transform',
                  track.expanded ? 'rotate-180' : '',
                ].join(' ')}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="space-y-6 border-t border-[#E5E7EB] px-4 py-4">
              <TrackFileUploadField
                file={track.file}
                onFileChange={file => updateTrack(track.id, { file })}
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextInputField
                  label="Track Name"
                  placeholder="Track Name"
                  value={track.trackName}
                  onChange={e => updateTrack(track.id, { trackName: e.target.value })}
                  helperText="Cyrillic must NOT be transliterated for Apple Music"
                  inputClassName={FIELD_INPUT_CLASSNAME}
                />
                <TextInputField
                  label="Subtitle"
                  placeholder="Optional"
                  value={track.subtitle}
                  onChange={e => updateTrack(track.id, { subtitle: e.target.value })}
                  helperText="e.g. Remix, Acoustic, Version. Leave blank if none."
                  inputClassName={FIELD_INPUT_CLASSNAME}
                />
              </div>

              <TextInputField
                label="ISRC"
                placeholder="Optional"
                value={track.isrc}
                onChange={e => updateTrack(track.id, { isrc: e.target.value })}
                helperText="International unique code. Leave blank we will assign one for you."
                inputClassName={FIELD_INPUT_CLASSNAME}
              />

              {/* Persons & Roles */}
              <section className="space-y-4 border-t border-[#E5E7EB] pt-4">
                <div>
                  <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[#667085]">
                    Persons &amp; Roles
                  </h3>
                  <p className="mt-1 text-xs text-[#98A2B3]">
                    Specify the alias of the artist, band or project exactly as above.
                  </p>
                </div>

                {track.persons.map((person, pIndex) => (
                  <div key={pIndex} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <TextInputField
                      label="Name Of The Person"
                      placeholder="Alias"
                      value={person.name}
                      onChange={e =>
                        updateTrackPerson(track.id, pIndex, { name: e.target.value })
                      }
                      inputClassName={FIELD_INPUT_CLASSNAME}
                    />
                    <ReleaseSelectField
                      label="Person's Role"
                      value={person.role}
                      onChange={v => updateTrackPerson(track.id, pIndex, { role: v })}
                      options={PERSON_ROLE_OPTIONS}
                      placeholder="Select Role"
                    />
                  </div>
                ))}

                <GreenCheckbox
                  label="Add a second Artist"
                  checked={track.persons.length > 1}
                  onChange={checked => toggleTrackSecondArtist(track.id, checked)}
                />
              </section>

              {/* Authors of Music & Words */}
              <section className="space-y-4 border-t border-[#E5E7EB] pt-4">
                <div>
                  <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[#667085]">
                    Authors of Music &amp; Words
                  </h3>
                  <p className="mt-1 text-xs text-[#98A2B3]">
                    Provide actual names &amp; surnames- do not use aliases.
                  </p>
                </div>

                {track.authors.map((author, aIndex) => (
                  <div key={aIndex} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <TextInputField
                      label="Music Authors"
                      placeholder="Full name"
                      value={author.musicAuthor}
                      onChange={e =>
                        updateTrackAuthor(track.id, aIndex, {
                          musicAuthor: e.target.value,
                        })
                      }
                      inputClassName={FIELD_INPUT_CLASSNAME}
                    />
                    <TextInputField
                      label="Authors Of Words"
                      placeholder="Full name"
                      value={author.wordsAuthor}
                      onChange={e =>
                        updateTrackAuthor(track.id, aIndex, {
                          wordsAuthor: e.target.value,
                        })
                      }
                      inputClassName={FIELD_INPUT_CLASSNAME}
                    />
                  </div>
                ))}

                <GreenCheckbox
                  label="Add more authors"
                  checked={track.authors.length > 1}
                  onChange={checked => toggleMoreAuthors(track.id, checked)}
                />
              </section>

              {/* Copyright */}
              <section className="space-y-4 border-t border-[#E5E7EB] pt-4">
                <div>
                  <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[#667085]">
                    Copyright
                  </h3>
                  <p className="mt-1 text-xs text-[#98A2B3]">
                    The release can only be delivered if you have 100% rights.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <TextInputField
                    label="(C) - Sound Recording"
                    placeholder="© Year Label / Artist"
                    value={track.soundRecording}
                    onChange={e =>
                      updateTrack(track.id, { soundRecording: e.target.value })
                    }
                    inputClassName={FIELD_INPUT_CLASSNAME}
                  />
                  <TextInputField
                    label="(R) - Phonogram Producer"
                    placeholder="℗ Year Label / Artist"
                    value={track.phonogramProducer}
                    onChange={e =>
                      updateTrack(track.id, { phonogramProducer: e.target.value })
                    }
                    inputClassName={FIELD_INPUT_CLASSNAME}
                  />
                </div>

                <GreenCheckbox
                  label="I own 100% rights to this release"
                  checked={track.ownsFullRights}
                  onChange={checked => updateTrack(track.id, { ownsFullRights: checked })}
                />
              </section>

              {/* Additional Parameters */}
              <section className="space-y-4 border-t border-[#E5E7EB] pt-4">
                <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[#667085]">
                  Additional Parameters
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <TextInputField
                    label="Start Of Pre-Listening (Seconds)"
                    type="number"
                    min={0}
                    value={track.preListeningSeconds}
                    onChange={e =>
                      updateTrack(track.id, { preListeningSeconds: e.target.value })
                    }
                    inputClassName={FIELD_INPUT_CLASSNAME}
                  />
                  <TextInputField
                    label="Track Language"
                    placeholder='e.g. English or "Without words"'
                    value={track.trackLanguage}
                    onChange={e =>
                      updateTrack(track.id, { trackLanguage: e.target.value })
                    }
                    inputClassName={FIELD_INPUT_CLASSNAME}
                  />
                </div>

                <FormFieldInput label="Track Version">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                    {TRACK_VERSION_OPTIONS.map(option => (
                      <GreenRadioOption
                        key={option.value}
                        name={`trackVersion-${track.id}`}
                        value={option.value}
                        label={option.label}
                        checked={track.trackVersion === option.value}
                        onChange={v => updateTrack(track.id, { trackVersion: v })}
                      />
                    ))}
                  </div>
                </FormFieldInput>
              </section>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>

      <div className="flex items-center justify-center border-t border-dashed border-[#D0D5DD] pt-4">
        <button
          type="button"
          onClick={addTrack}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#22C55E] hover:underline"
        >
          <Plus size={16} /> Add track
        </button>
      </div>

      <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-5">
        <button
          type="button"
          onClick={onBack}
          className="text-[13px] font-medium text-[#344054] hover:text-[#101828]"
        >
          &lt; Back
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-6 py-2.5 text-[13px] font-semibold text-black hover:bg-[#16A34A]"
        >
          Next <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

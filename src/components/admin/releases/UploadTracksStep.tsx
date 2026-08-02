'use client';

import { AlertTriangle, ChevronDown, Music2, Plus, X } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/src/components/ui/collapsible';
import FormFieldInput from '@/src/components/ui/input/FormFieldInput';
import TextInputField from '@/src/components/ui/input/TextInputField';
import type { PersonRole, TrackVersion } from '@/src/types/releaseTypes';
import ReleaseSelectField from './ReleaseSelectField';
import StepFooter from './StepFooter';
import TrackFileUploadField from './TrackFileUploadField';
import { FIELD_INPUT_CLASSNAME, GreenCheckbox, GreenRadioOption } from './formControls';
import { PERSON_ROLE_OPTIONS, TRACK_VERSION_OPTIONS } from './releaseFormOptions';
import {
  createEmptyTrack,
  getAudioOrderError,
  type PersonForm,
  type ReleaseFormState,
  type TrackAuthorForm,
  type TrackForm,
} from './releaseFormState';

type UploadTracksStepProps = {
  form: ReleaseFormState;
  onChange: (patch: Partial<ReleaseFormState>) => void;
  onNext: () => void;
  onBack: () => void;
  onSaveDraft: () => void;
  isSaving: boolean;
};

export default function UploadTracksStep({
  form,
  onChange,
  onNext,
  onBack,
  onSaveDraft,
  isSaving,
}: UploadTracksStepProps) {
  const tracks = form.tracks;
  const audioOrderError = getAudioOrderError(tracks);

  const setTracks = (next: TrackForm[]) => onChange({ tracks: next });

  const updateTrack = (uid: string, patch: Partial<TrackForm>) => {
    setTracks(tracks.map(track => (track.uid === uid ? { ...track, ...patch } : track)));
  };

  const updateTrackPerson = (
    uid: string,
    index: number,
    patch: Partial<PersonForm>,
  ) => {
    setTracks(
      tracks.map(track =>
        track.uid !== uid
          ? track
          : {
            ...track,
            persons: track.persons.map((person, i) =>
              i === index ? { ...person, ...patch } : person,
            ),
          },
      ),
    );
  };

  const updateTrackAuthor = (
    uid: string,
    index: number,
    patch: Partial<TrackAuthorForm>,
  ) => {
    setTracks(
      tracks.map(track =>
        track.uid !== uid
          ? track
          : {
            ...track,
            authors: track.authors.map((author, i) =>
              i === index ? { ...author, ...patch } : author,
            ),
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

      {audioOrderError ? (
        <div className="flex items-start gap-2 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-4 py-3">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#D97706]" />
          <p className="text-[13px] text-[#92400E]">{audioOrderError}</p>
        </div>
      ) : null}

      <div className="space-y-3">
        {tracks.map((track, index) => (
          <Collapsible
            key={track.uid}
            open={track.expanded}
            onOpenChange={open => updateTrack(track.uid, { expanded: open })}
            className="rounded-xl border border-[#E5E7EB]"
          >
            <CollapsibleTrigger className="flex w-full items-center gap-3 px-4 py-3 text-left">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-semibold text-black">
                {index + 1}
              </span>
              <span className="flex-1 truncate text-[13px] font-medium text-[#101828]">
                {track.trackName || `Track ${index + 1}`}
              </span>
              {tracks.length > 1 && (
                <span
                  role="button"
                  tabIndex={0}
                  aria-label={`Remove track ${index + 1}`}
                  onClick={event => {
                    event.stopPropagation();
                    setTracks(tracks.filter(item => item.uid !== track.uid));
                  }}
                  onKeyDown={event => {
                    if (event.key !== 'Enter' && event.key !== ' ') return;
                    event.preventDefault();
                    event.stopPropagation();
                    setTracks(tracks.filter(item => item.uid !== track.uid));
                  }}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[#98A2B3] hover:bg-[#FEF2F2] hover:text-[#DC2626]"
                >
                  <X size={15} />
                </span>
              )}
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
                onFileChange={file => updateTrack(track.uid, { file })}
              />

              {!track.file && track.existingAudioName ? (
                <p className="-mt-4 flex items-center gap-1.5 text-xs text-[#667085]">
                  <Music2 size={14} className="text-[#22C55E]" />
                  Already uploaded: {track.existingAudioName}
                </p>
              ) : null}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextInputField
                  label="Track Name"
                  required
                  placeholder="Track Name"
                  value={track.trackName}
                  onChange={e => updateTrack(track.uid, { trackName: e.target.value })}
                  helperText="Cyrillic must NOT be transliterated for Apple Music"
                  inputClassName={FIELD_INPUT_CLASSNAME}
                />
                <TextInputField
                  label="Subtitle"
                  placeholder="Optional"
                  value={track.subtitle}
                  onChange={e => updateTrack(track.uid, { subtitle: e.target.value })}
                  helperText="e.g. Remix, Acoustic, Version. Leave blank if none."
                  inputClassName={FIELD_INPUT_CLASSNAME}
                />
              </div>

              <TextInputField
                label="ISRC"
                placeholder="Optional"
                value={track.isrc}
                onChange={e => updateTrack(track.uid, { isrc: e.target.value })}
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
                  <div key={pIndex} className="flex items-start gap-3">
                    <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
                      <TextInputField
                        label="Name Of The Person"
                        placeholder="Alias"
                        value={person.name}
                        onChange={e =>
                          updateTrackPerson(track.uid, pIndex, { name: e.target.value })
                        }
                        inputClassName={FIELD_INPUT_CLASSNAME}
                      />
                      <ReleaseSelectField
                        label="Person's Role"
                        value={person.role}
                        onChange={value =>
                          updateTrackPerson(track.uid, pIndex, {
                            role: value as PersonRole,
                          })
                        }
                        options={PERSON_ROLE_OPTIONS}
                        placeholder="Select Role"
                      />
                    </div>

                    {pIndex > 0 && (
                      <button
                        type="button"
                        onClick={() =>
                          updateTrack(track.uid, {
                            persons: track.persons.filter((_, i) => i !== pIndex),
                          })
                        }
                        aria-label="Remove artist"
                        className="mt-6 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#98A2B3] hover:bg-[#FEF2F2] hover:text-[#DC2626]"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    updateTrack(track.uid, {
                      persons: [...track.persons, { name: '', role: '' }],
                    })
                  }
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#22C55E] hover:underline"
                >
                  <Plus size={16} /> Add Artist
                </button>
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
                        updateTrackAuthor(track.uid, aIndex, {
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
                        updateTrackAuthor(track.uid, aIndex, {
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
                  onChange={checked =>
                    updateTrack(track.uid, {
                      authors: checked
                        ? [...track.authors, { musicAuthor: '', wordsAuthor: '' }]
                        : track.authors.slice(0, 1),
                    })
                  }
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
                      updateTrack(track.uid, { soundRecording: e.target.value })
                    }
                    inputClassName={FIELD_INPUT_CLASSNAME}
                  />
                  <TextInputField
                    label="(R) - Phonogram Producer"
                    placeholder="℗ Year Label / Artist"
                    value={track.phonogramProducer}
                    onChange={e =>
                      updateTrack(track.uid, { phonogramProducer: e.target.value })
                    }
                    inputClassName={FIELD_INPUT_CLASSNAME}
                  />
                </div>

                <GreenCheckbox
                  label="I own 100% rights to this release"
                  checked={track.ownsFullRights}
                  onChange={checked =>
                    updateTrack(track.uid, { ownsFullRights: checked })
                  }
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
                      updateTrack(track.uid, { preListeningSeconds: e.target.value })
                    }
                    inputClassName={FIELD_INPUT_CLASSNAME}
                  />
                  <TextInputField
                    label="Track Language"
                    placeholder='e.g. English or "Without words"'
                    value={track.trackLanguage}
                    onChange={e =>
                      updateTrack(track.uid, { trackLanguage: e.target.value })
                    }
                    inputClassName={FIELD_INPUT_CLASSNAME}
                  />
                </div>

                <FormFieldInput label="Track Version">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                    {TRACK_VERSION_OPTIONS.map(option => (
                      <GreenRadioOption
                        key={option.value}
                        name={`trackVersion-${track.uid}`}
                        value={option.value}
                        label={option.label}
                        checked={track.trackVersion === option.value}
                        onChange={value =>
                          updateTrack(track.uid, {
                            trackVersion: value as TrackVersion,
                          })
                        }
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
          onClick={() => setTracks([...tracks, createEmptyTrack(true)])}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#22C55E] hover:underline"
        >
          <Plus size={16} /> Add track
        </button>
      </div>

      <StepFooter
        onBack={onBack}
        onSaveDraft={onSaveDraft}
        onNext={onNext}
        isSaving={isSaving}
      />
    </div>
  );
}

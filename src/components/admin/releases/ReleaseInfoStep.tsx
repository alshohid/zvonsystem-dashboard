'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Plus, X } from 'lucide-react';
import FormFieldInput from '@/src/components/ui/input/FormFieldInput';
import TextInputField from '@/src/components/ui/input/TextInputField';
import ImageUploadField from './ImageUploadField';
import ReleaseSelectField from './ReleaseSelectField';
import { FIELD_INPUT_CLASSNAME, GreenCheckbox, GreenRadioOption } from './formControls';
import {
  GENRE_OPTIONS,
  PERSON_ROLE_OPTIONS,
  RELEASE_TYPE_OPTIONS,
  type ReleaseSummaryData,
} from './releaseFormOptions';

type ReleaseType = 'Single' | 'EP' | 'Album';

type Person = { name: string; role: string };

type ReleaseInfoStepProps = {
  onNext: () => void;
  onBack?: () => void;
  onSummaryChange?: (
    summary: Pick<
      ReleaseSummaryData,
      'releaseName' | 'subtitle' | 'releaseType' | 'artistName' | 'genre' | 'labelName' | 'releaseDate'
    >,
  ) => void;
};

export default function ReleaseInfoStep({ onNext, onBack, onSummaryChange }: ReleaseInfoStepProps) {
  const [releaseName, setReleaseName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [releaseType, setReleaseType] = useState<ReleaseType>('Album');
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const [persons, setPersons] = useState<Person[]>([
    { name: '', role: 'main-artist' },
  ]);
  const [genre, setGenre] = useState('');
  const [upc, setUpc] = useState('');
  const [labelName, setLabelName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [previouslyReleased, setPreviouslyReleased] = useState(false);

  useEffect(() => {
    onSummaryChange?.({
      releaseName,
      subtitle,
      releaseType,
      artistName: persons[0]?.name ?? '',
      genre: GENRE_OPTIONS.find(g => g.value === genre)?.label ?? '',
      labelName,
      releaseDate,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [releaseName, subtitle, releaseType, persons, genre, labelName, releaseDate]);

  const addPerson = () => {
    setPersons(prev => [...prev, { name: '', role: '' }]);
  };

  const removePerson = (index: number) => {
    setPersons(prev => prev.filter((_, i) => i !== index));
  };

  const updatePerson = (index: number, patch: Partial<Person>) => {
    setPersons(prev =>
      prev.map((p, i) => (i === index ? { ...p, ...patch } : p)),
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[15px] font-semibold text-[#101828]">
          Working with the release
        </h2>
      </div>

      {/* Basic Information */}
      <section className="space-y-4 border-t border-[#E5E7EB] pt-4">
        <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[#667085]">
          Basic Information
        </h3>

        <TextInputField
          label="Release Name"
          placeholder="e.g. Neon Mirage"
          value={releaseName}
          onChange={e => setReleaseName(e.target.value)}
          helperText="Names in Cyrillic languages must be transliterated if you plan to ship to Apple Music"
          inputClassName={FIELD_INPUT_CLASSNAME}
        />

        <TextInputField
          label="Subtitle"
          placeholder="e.g. Deluxe Edition"
          value={subtitle}
          onChange={e => setSubtitle(e.target.value)}
          helperText="Additional title, e.g. Deluxe Edition, Remix, Acoustic Version. Leave blank if none"
          inputClassName={FIELD_INPUT_CLASSNAME}
        />

        <FormFieldInput label="Release Type">
          <div className="flex flex-wrap items-center gap-6">
            {RELEASE_TYPE_OPTIONS.map(option => (
              <GreenRadioOption
                key={option.value}
                name="releaseType"
                value={option.value}
                label={option.label}
                checked={releaseType === option.value}
                onChange={v => setReleaseType(v as ReleaseType)}
              />
            ))}
          </div>
        </FormFieldInput>

        <FormFieldInput label="Cover Image">
          <ImageUploadField
            value={coverImage}
            onChange={setCoverImage}
            previewAlt="Cover preview"
          />
          <p className="mt-1.5 text-xs text-[#98A2B3]">
            Format: .jpg, .png. Min: 1400x1400px, Max: 6000x6000px, 72dpi+.
            Max 20MB
          </p>
        </FormFieldInput>
      </section>

      {/* Persons & Roles */}
      <section className="space-y-4 border-t border-[#E5E7EB] pt-4">
        <div>
          <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[#667085]">
            Persons &amp; Roles
          </h3>
          <p className="mt-1 text-xs text-[#98A2B3]">
            For Artists, Co-Artist (feat), and Remixers, you must specify the
            alias of the artist, band or project.
          </p>
        </div>

        {persons.map((person, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
              <TextInputField
                label="Name Of The Person"
                placeholder="Alias"
                value={person.name}
                onChange={e => updatePerson(index, { name: e.target.value })}
                inputClassName={FIELD_INPUT_CLASSNAME}
              />
              <ReleaseSelectField
                label="Person's Role"
                value={person.role}
                onChange={v => updatePerson(index, { role: v })}
                options={PERSON_ROLE_OPTIONS}
                placeholder="Select Role"
              />
            </div>

            {index > 0 && (
              <button
                type="button"
                onClick={() => removePerson(index)}
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
          onClick={addPerson}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#22C55E] hover:underline"
        >
          <Plus size={16} /> Add Artist
        </button>
      </section>

      {/* Genre */}
      <section className="space-y-4 border-t border-[#E5E7EB] pt-4">
        <div>
          <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[#667085]">
            Genre
          </h3>
          <p className="mt-1 text-xs text-[#98A2B3]">
            Specify the main genre for the release.
          </p>
        </div>

        <ReleaseSelectField
          label="Genre"
          value={genre}
          onChange={setGenre}
          options={GENRE_OPTIONS}
          placeholder="Select Genre"
          helperText="Select the genre that best fits your release (e.g. Main Artist genre)."
        />
      </section>

      {/* Identification */}
      <section className="space-y-4 border-t border-[#E5E7EB] pt-4">
        <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[#667085]">
          Identification
        </h3>

        <TextInputField
          label="Upc"
          placeholder="Optional"
          value={upc}
          onChange={e => setUpc(e.target.value)}
          helperText="Universal product code. Leave blank and we will assign one for you."
          inputClassName={FIELD_INPUT_CLASSNAME}
        />

        <TextInputField
          label="Label Name"
          placeholder="Label or Artist Name"
          value={labelName}
          onChange={e => setLabelName(e.target.value)}
          inputClassName={FIELD_INPUT_CLASSNAME}
        />
      </section>

      {/* Dates */}
      <section className="space-y-4 border-t border-[#E5E7EB] pt-4">
        <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[#667085]">
          Dates
        </h3>

        <TextInputField
          label="Dates"
          type="date"
          value={releaseDate}
          onChange={e => setReleaseDate(e.target.value)}
          helperText="The selected date must match the selected release type."
          inputClassName={FIELD_INPUT_CLASSNAME}
        />

        <GreenCheckbox
          label="My release was previously released"
          checked={previouslyReleased}
          onChange={setPreviouslyReleased}
        />
      </section>

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

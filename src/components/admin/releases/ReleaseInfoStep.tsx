'use client';

import { useRef, useState } from 'react';
import { ArrowRight, Upload } from 'lucide-react';
import FormFieldInput from '@/src/components/ui/input/FormFieldInput';
import TextInputField from '@/src/components/ui/input/TextInputField';
import ReleaseSelectField from './ReleaseSelectField';
import {
  GENRE_OPTIONS,
  LABEL_NAME_OPTIONS,
  PERSON_ROLE_OPTIONS,
  RELEASE_TYPE_OPTIONS,
} from './releaseFormOptions';

type ReleaseType = 'Single' | 'EP' | 'Album';

type Person = { name: string; role: string };

type ReleaseInfoStepProps = {
  onNext: () => void;
  onBack?: () => void;
};


const FIELD_INPUT_CLASSNAME =
  'h-auto w-full rounded-lg border-[#E9E9EA] bg-[#F5F7FB] px-4 py-3';

function GreenCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-[4px] border border-[#D0D5DD] bg-white checked:border-[#22C55E] checked:bg-[#22C55E]"
        style={{
          backgroundImage: checked
            ? 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 16 16%22 fill=%22white%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 1 1-1.06-1.06L12.72 4.22a.75.75 0 0 1 1.06 0Z%22/%3E%3Cpath d=%22M2.22 9.28a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06L3.28 9.28a.75.75 0 0 0-1.06 0Z%22/%3E%3C/svg%3E")'
            : 'none',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <span className="text-[13px] text-[#344054]">{label}</span>
    </label>
  );
}

export default function ReleaseInfoStep({ onNext, onBack }: ReleaseInfoStepProps) {
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

  const coverInputRef = useRef<HTMLInputElement | null>(null);

  const hasSecondArtist = persons.length > 1;
  const toggleSecondArtist = (checked: boolean) => {
    setPersons(prev =>
      checked
        ? [...prev, { name: '', role: '' }]
        : prev.slice(0, 1),
    );
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
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-2 text-[13px] text-[#344054]"
              >
                <input
                  type="radio"
                  name="releaseType"
                  value={option.value}
                  checked={releaseType === option.value}
                  onChange={() => setReleaseType(option.value as ReleaseType)}
                  className="sr-only"
                />
                <span
                  className={[
                    'flex h-4 w-4 items-center justify-center rounded-full border',
                    releaseType === option.value
                      ? 'border-[#22C55E] bg-[#22C55E]'
                      : 'border-[#D0D5DD] bg-white',
                  ].join(' ')}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                {option.label}
              </label>
            ))}
          </div>
        </FormFieldInput>

        <FormFieldInput label="Cover Image">
          <div>
            <input
              ref={coverInputRef}
              type="file"
              accept="image/jpeg,image/png"
              className="hidden"
              onChange={e => setCoverImage(e.target.files?.[0] ?? null)}
            />
            <button
              type="button"
              onClick={() => coverInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-4 py-2 text-[13px] font-medium text-[#22C55E] hover:bg-[#F0FDF4]"
            >
              <Upload size={16} strokeWidth={2.25} />
              Upload a file
            </button>
            {coverImage ? (
              <span className="ml-2 text-[13px] text-[#667085]">
                {coverImage.name}
              </span>
            ) : null}
          </div>
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
          <div key={index} className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
        ))}

        <GreenCheckbox
          label="Add a second Artist"
          checked={hasSecondArtist}
          onChange={toggleSecondArtist}
        />
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
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-6 py-2.5 text-[13px] font-semibold text-white hover:bg-[#16A34A]"
        >
          Next <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

'use client';

import { Plus, X } from 'lucide-react';
import FormFieldInput from '@/src/components/ui/input/FormFieldInput';
import TextInputField from '@/src/components/ui/input/TextInputField';
import type {
  PersonRole,
  ReleaseGenre,
  ReleaseType,
} from '@/src/types/releaseTypes';
import ImageUploadField from './ImageUploadField';
import ReleaseSelectField from './ReleaseSelectField';
import StepFooter from './StepFooter';
import { FIELD_INPUT_CLASSNAME, GreenCheckbox, GreenRadioOption } from './formControls';
import {
  GENRE_OPTIONS,
  getMinReleaseDate,
  getTodayDate,
  PERSON_ROLE_OPTIONS,
  RELEASE_TYPE_OPTIONS,
} from './releaseFormOptions';
import type { PersonForm, ReleaseFormState } from './releaseFormState';

type ReleaseInfoStepProps = {
  form: ReleaseFormState;
  onChange: (patch: Partial<ReleaseFormState>) => void;
  onNext: () => void;
  onBack: () => void;
  onSaveDraft: () => void;
  isSaving: boolean;
};

export default function ReleaseInfoStep({
  form,
  onChange,
  onNext,
  onBack,
  onSaveDraft,
  isSaving,
}: ReleaseInfoStepProps) {
  const minReleaseDate = getMinReleaseDate();
  const todayDate = getTodayDate();

  const updatePerson = (index: number, patch: Partial<PersonForm>) => {
    onChange({
      persons: form.persons.map((person, i) =>
        i === index ? { ...person, ...patch } : person,
      ),
    });
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
          required
          placeholder="e.g. Neon Mirage"
          value={form.releaseName}
          onChange={e => onChange({ releaseName: e.target.value })}
          helperText="Names in Cyrillic languages must be transliterated if you plan to ship to Apple Music"
          inputClassName={FIELD_INPUT_CLASSNAME}
        />

        <TextInputField
          label="Subtitle"
          placeholder="e.g. Deluxe Edition"
          value={form.subtitle}
          onChange={e => onChange({ subtitle: e.target.value })}
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
                checked={form.releaseType === option.value}
                onChange={value =>
                  onChange({ releaseType: value as ReleaseType })
                }
              />
            ))}
          </div>
        </FormFieldInput>

        <FormFieldInput label="Cover Image">
          <ImageUploadField
            value={form.coverFile}
            onChange={file => onChange({ coverFile: file })}
            previewAlt="Cover preview"
            existingFileName={form.existingCoverName}
            existingFilePath={form.existingCoverPath}
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

        {form.persons.map((person, index) => (
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
                onChange={value =>
                  updatePerson(index, { role: value as PersonRole })
                }
                options={PERSON_ROLE_OPTIONS}
                placeholder="Select Role"
              />
            </div>

            {index > 0 && (
              <button
                type="button"
                onClick={() =>
                  onChange({
                    persons: form.persons.filter((_, i) => i !== index),
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
            onChange({ persons: [...form.persons, { name: '', role: '' }] })
          }
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
          required
          value={form.genre}
          onChange={value => onChange({ genre: value as ReleaseGenre })}
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
          value={form.upc}
          onChange={e => onChange({ upc: e.target.value })}
          helperText="Universal product code. Leave blank and we will assign one for you."
          inputClassName={FIELD_INPUT_CLASSNAME}
        />

        <TextInputField
          label="Label Name"
          placeholder="Label or Artist Name"
          value={form.labelName}
          onChange={e => onChange({ labelName: e.target.value })}
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
          value={form.releaseDate}
          min={minReleaseDate}
          onChange={e => {
            const nextDate = e.target.value;
            if (nextDate && nextDate < minReleaseDate) return;
            onChange({ releaseDate: nextDate });
          }}
          helperText={`The selected date must match the selected release type. Earliest available date: ${minReleaseDate} (at least 2 weeks from today).`}
          inputClassName={FIELD_INPUT_CLASSNAME}
        />

        <GreenCheckbox
          label="My release was previously released"
          checked={form.previouslyReleased}
          onChange={checked =>
            onChange({
              previouslyReleased: checked,
              previousReleaseDate: checked ? form.previousReleaseDate : '',
            })
          }
        />

        {form.previouslyReleased && (
          <TextInputField
            label="Original Release Date"
            type="date"
            value={form.previousReleaseDate}
            max={todayDate}
            onChange={e => {
              const nextDate = e.target.value;
              if (nextDate && nextDate > todayDate) return;
              onChange({ previousReleaseDate: nextDate });
            }}
            helperText="When was this release originally made available?"
            inputClassName={FIELD_INPUT_CLASSNAME}
          />
        )}
      </section>

      <StepFooter
        onBack={onBack}
        onSaveDraft={onSaveDraft}
        onNext={onNext}
        isSaving={isSaving}
      />
    </div>
  );
}

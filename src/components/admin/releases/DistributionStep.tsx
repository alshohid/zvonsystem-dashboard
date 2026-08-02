'use client';

import { useState } from 'react';
import { ChevronDown, Plus, X } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/src/components/ui/collapsible';
import TextInputField from '@/src/components/ui/input/TextInputField';
import type { TerritoryScope } from '@/src/types/releaseTypes';
import StepFooter from './StepFooter';
import { FIELD_INPUT_CLASSNAME, GreenCheckbox, GreenRadioOption } from './formControls';
import {
  AD_PLATFORM_SCOPE_OPTIONS,
  PLATFORM_OPTIONS,
  TERRITORY_REGIONS,
  TERRITORY_SCOPE_OPTIONS,
} from './releaseFormOptions';
import type { ArtistProfilesForm, ReleaseFormState } from './releaseFormState';

type DistributionStepProps = {
  form: ReleaseFormState;
  onChange: (patch: Partial<ReleaseFormState>) => void;
  onNext: () => void;
  onBack: () => void;
  onSaveDraft: () => void;
  isSaving: boolean;
};

export default function DistributionStep({
  form,
  onChange,
  onNext,
  onBack,
  onSaveDraft,
  isSaving,
}: DistributionStepProps) {
  const [expandedRegions, setExpandedRegions] = useState<string[]>(['cis']);

  const togglePlatform = (platform: string) => {
    onChange({
      selectedPlatforms: form.selectedPlatforms.includes(platform)
        ? form.selectedPlatforms.filter(item => item !== platform)
        : [...form.selectedPlatforms, platform],
    });
  };

  const toggleCountry = (code: string) => {
    onChange({
      selectedCountries: form.selectedCountries.includes(code)
        ? form.selectedCountries.filter(item => item !== code)
        : [...form.selectedCountries, code],
    });
  };

  const updateArtistProfile = (key: keyof ArtistProfilesForm, value: string) => {
    onChange({ artistProfiles: { ...form.artistProfiles, [key]: value } });
  };

  const updateSoundCloudLink = (index: number, value: string) => {
    onChange({
      soundCloudLinks: form.soundCloudLinks.map((link, i) =>
        i === index ? value : link,
      ),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[15px] font-semibold text-[#101828]">
          Platforms &amp; Territories
        </h2>
        <p className="mt-1 text-xs text-[#98A2B3]">
          Specify the exact distribution platforms and territories for this release.
        </p>
      </div>

      <section className="space-y-4 border-t border-[#E5E7EB] pt-4">
        <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[#667085]">
          Ad Platforms
        </h3>

        <div className="flex flex-wrap items-center gap-6">
          {AD_PLATFORM_SCOPE_OPTIONS.map(option => (
            <GreenRadioOption
              key={option.value}
              name="adPlatformScope"
              value={option.value}
              label={option.label}
              checked={form.allAdPlatforms === (option.value === 'all')}
              onChange={value => onChange({ allAdPlatforms: value === 'all' })}
            />
          ))}
        </div>
      </section>

      {/* Platforms */}
      {!form.allAdPlatforms ? (
        <section className="space-y-4 border-t border-[#E5E7EB] pt-4">
          <div>
            <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[#667085]">
              Platforms
            </h3>
            <p className="mt-1 text-xs text-[#98A2B3]">
              Select the platforms where you want to distribute your release
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PLATFORM_OPTIONS.map(platform => (
              <GreenCheckbox
                key={platform}
                label={platform}
                checked={form.selectedPlatforms.includes(platform)}
                onChange={() => togglePlatform(platform)}
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* Territories */}
      <section className="space-y-4 border-t border-[#E5E7EB] pt-4">
        <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[#667085]">
          Territories
        </h3>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          {TERRITORY_SCOPE_OPTIONS.map(option => (
            <GreenRadioOption
              key={option.value}
              name="territoryScope"
              value={option.value}
              label={option.label}
              checked={form.territoryScope === option.value}
              onChange={value =>
                onChange({ territoryScope: value as TerritoryScope })
              }
            />
          ))}
        </div>

        {form.territoryScope === 'CERTAIN' ? (
          <div className="space-y-3">
            <p className="text-[13px] font-medium text-[#344054]">
              Select specific countries:
            </p>

            {TERRITORY_REGIONS.map(region => {
              const isOpen = expandedRegions.includes(region.id);
              const selectedInRegion = region.countries.filter(item =>
                form.selectedCountries.includes(item.code),
              ).length;

              return (
                <Collapsible
                  key={region.id}
                  open={isOpen}
                  onOpenChange={open =>
                    setExpandedRegions(prev =>
                      open
                        ? [...prev, region.id]
                        : prev.filter(item => item !== region.id),
                    )
                  }
                  className="rounded-xl border border-[#E5E7EB]"
                >
                  <CollapsibleTrigger className="flex w-full items-center justify-between gap-3 bg-[#F9FAFB] px-4 py-3 text-left">
                    <span className="text-[13px] font-medium text-[#101828]">
                      {region.label}
                      {selectedInRegion > 0 ? (
                        <span className="ml-2 text-xs font-normal text-[#22C55E]">
                          {selectedInRegion} selected
                        </span>
                      ) : null}
                    </span>
                    <ChevronDown
                      size={16}
                      className={[
                        'shrink-0 text-[#667085] transition-transform',
                        isOpen ? 'rotate-180' : '',
                      ].join(' ')}
                    />
                  </CollapsibleTrigger>

                  <CollapsibleContent className="border-t border-[#E5E7EB] px-4 py-4">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {region.countries.map(item => (
                        <GreenCheckbox
                          key={item.code}
                          label={item.label}
                          checked={form.selectedCountries.includes(item.code)}
                          onChange={() => toggleCountry(item.code)}
                        />
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>
        ) : null}
      </section>

      {/* Artist's Profiles */}
      <section className="space-y-4 border-t border-[#E5E7EB] pt-4">
        <div>
          <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[#667085]">
            Artist&apos;s Profiles
          </h3>
          <p className="mt-1 text-xs text-[#98A2B3]">
            Previous links to artist profiles on ad platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextInputField
            label="Yandex Music"
            placeholder="https://music.yandex.ru/artist/..."
            value={form.artistProfiles.yandexMusic}
            onChange={e => updateArtistProfile('yandexMusic', e.target.value)}
            disabled={form.noArtistProfilesYet}
            inputClassName={FIELD_INPUT_CLASSNAME}
          />
          <TextInputField
            label="VK Music"
            placeholder="https://vk.com/music/..."
            value={form.artistProfiles.vkMusic}
            onChange={e => updateArtistProfile('vkMusic', e.target.value)}
            disabled={form.noArtistProfilesYet}
            inputClassName={FIELD_INPUT_CLASSNAME}
          />
          <TextInputField
            label="Spotify"
            placeholder="https://open.spotify.com/artist/..."
            value={form.artistProfiles.spotify}
            onChange={e => updateArtistProfile('spotify', e.target.value)}
            disabled={form.noArtistProfilesYet}
            inputClassName={FIELD_INPUT_CLASSNAME}
          />
          <TextInputField
            label="Apple Music"
            placeholder="https://music.apple.com/artist/..."
            value={form.artistProfiles.appleMusic}
            onChange={e => updateArtistProfile('appleMusic', e.target.value)}
            disabled={form.noArtistProfilesYet}
            inputClassName={FIELD_INPUT_CLASSNAME}
          />
        </div>

        <div className="space-y-3">
          {form.soundCloudLinks.map((link, index) => (
            <div key={index} className="flex items-start gap-3">
              <TextInputField
                label={index === 0 ? 'SoundCloud' : undefined}
                placeholder="https://soundcloud.com/..."
                value={link}
                onChange={e => updateSoundCloudLink(index, e.target.value)}
                disabled={form.noArtistProfilesYet}
                inputClassName={FIELD_INPUT_CLASSNAME}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      soundCloudLinks: form.soundCloudLinks.filter(
                        (_, i) => i !== index,
                      ),
                    })
                  }
                  aria-label="Remove SoundCloud link"
                  className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#98A2B3] hover:bg-[#FEF2F2] hover:text-[#DC2626]"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            disabled={form.noArtistProfilesYet}
            onClick={() =>
              onChange({ soundCloudLinks: [...form.soundCloudLinks, ''] })
            }
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#22C55E] hover:underline disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={16} /> Add SoundCloud link
          </button>
        </div>

        <GreenCheckbox
          label="This is my first release, I don't have any artist pages on the platforms yet."
          checked={form.noArtistProfilesYet}
          onChange={checked => onChange({ noArtistProfilesYet: checked })}
        />
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

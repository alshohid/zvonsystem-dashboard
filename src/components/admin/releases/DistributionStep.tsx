'use client';

import { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/src/components/ui/collapsible';
import TextInputField from '@/src/components/ui/input/TextInputField';
import { FIELD_INPUT_CLASSNAME, GreenCheckbox, GreenRadioOption } from './formControls';
import {
  AD_PLATFORM_SCOPE_OPTIONS,
  PLATFORM_OPTIONS,
  TERRITORY_REGIONS,
  TERRITORY_SCOPE_OPTIONS,
} from './releaseFormOptions';

type AdPlatformScope = 'all' | 'some';
type TerritoryScope = 'all' | 'certain' | 'cis';

type ArtistProfiles = {
  yandexMusic: string;
  vkMusic: string;
  spotify: string;
  appleMusic: string;
};

type DistributionStepProps = {
  onNext: () => void;
  onBack: () => void;
};

export default function DistributionStep({ onNext, onBack }: DistributionStepProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [adPlatformScope, setAdPlatformScope] = useState<AdPlatformScope>('all');
  const [territoryScope, setTerritoryScope] = useState<TerritoryScope>('certain');
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [expandedRegions, setExpandedRegions] = useState<string[]>(['cis']);
  const [artistProfiles, setArtistProfiles] = useState<ArtistProfiles>({
    yandexMusic: '',
    vkMusic: '',
    spotify: '',
    appleMusic: '',
  });
  const [noArtistProfilesYet, setNoArtistProfilesYet] = useState(false);

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform],
    );
  };

  const toggleCountry = (country: string) => {
    setSelectedCountries(prev =>
      prev.includes(country)
        ? prev.filter(c => c !== country)
        : [...prev, country],
    );
  };

  const toggleRegionExpanded = (regionId: string, open: boolean) => {
    setExpandedRegions(prev =>
      open ? [...prev, regionId] : prev.filter(r => r !== regionId),
    );
  };

  const updateArtistProfile = (key: keyof ArtistProfiles, value: string) => {
    setArtistProfiles(prev => ({ ...prev, [key]: value }));
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

      {/* Platforms */}
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
              checked={selectedPlatforms.includes(platform)}
              onChange={() => togglePlatform(platform)}
            />
          ))}
        </div>
      </section>

      {/* Ad Platforms */}
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
              checked={adPlatformScope === option.value}
              onChange={v => setAdPlatformScope(v as AdPlatformScope)}
            />
          ))}
        </div>
      </section>

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
              checked={territoryScope === option.value}
              onChange={v => setTerritoryScope(v as TerritoryScope)}
            />
          ))}
        </div>

        {territoryScope === 'certain' ? (
          <div className="space-y-3">
            <p className="text-[13px] font-medium text-[#344054]">
              Select specific countries:
            </p>

            {TERRITORY_REGIONS.map(region => {
              const isOpen = expandedRegions.includes(region.id);
              const selectedInRegion = region.countries.filter(c =>
                selectedCountries.includes(c),
              ).length;

              return (
                <Collapsible
                  key={region.id}
                  open={isOpen}
                  onOpenChange={open => toggleRegionExpanded(region.id, open)}
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
                      {region.countries.map(country => (
                        <GreenCheckbox
                          key={country}
                          label={country}
                          checked={selectedCountries.includes(country)}
                          onChange={() => toggleCountry(country)}
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
            value={artistProfiles.yandexMusic}
            onChange={e => updateArtistProfile('yandexMusic', e.target.value)}
            disabled={noArtistProfilesYet}
            inputClassName={FIELD_INPUT_CLASSNAME}
          />
          <TextInputField
            label="VK Music"
            placeholder="https://vk.com/music/..."
            value={artistProfiles.vkMusic}
            onChange={e => updateArtistProfile('vkMusic', e.target.value)}
            disabled={noArtistProfilesYet}
            inputClassName={FIELD_INPUT_CLASSNAME}
          />
          <TextInputField
            label="Spotify"
            placeholder="https://open.spotify.com/artist/..."
            value={artistProfiles.spotify}
            onChange={e => updateArtistProfile('spotify', e.target.value)}
            disabled={noArtistProfilesYet}
            inputClassName={FIELD_INPUT_CLASSNAME}
          />
          <TextInputField
            label="Apple Music"
            placeholder="https://music.apple.com/artist/..."
            value={artistProfiles.appleMusic}
            onChange={e => updateArtistProfile('appleMusic', e.target.value)}
            disabled={noArtistProfilesYet}
            inputClassName={FIELD_INPUT_CLASSNAME}
          />
        </div>

        <GreenCheckbox
          label="This is my first release, I don't have any artist pages on the platforms yet."
          checked={noArtistProfilesYet}
          onChange={setNoArtistProfilesYet}
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

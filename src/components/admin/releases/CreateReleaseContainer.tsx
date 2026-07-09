'use client';

import { useRouter } from 'next/navigation';
import TopTabs, { TabItem } from '@/src/components/common/TopTabs';
import { useTabsQueryState } from '@/src/lib/helper/useTabsQueryState';
import ReleaseInfoStep from './ReleaseInfoStep';
import ReleaseStepPlaceholder from './ReleaseStepPlaceholder';

type ReleaseStepKey =
  | 'release-info'
  | 'upload-tracks'
  | 'distribution'
  | 'schedule-submit';

const RELEASE_STEPS: TabItem<ReleaseStepKey>[] = [
  { key: 'release-info', label: 'Release Info' },
  { key: 'upload-tracks', label: 'Upload Tracks' },
  { key: 'distribution', label: 'Distribution' },
  { key: 'schedule-submit', label: 'Schedule & Submit' },
];

type CreateReleaseContainerProps = {
  releasesListPath?: string;
};

export default function CreateReleaseContainer({
  releasesListPath = '/admin/dashboard/releases',
}: CreateReleaseContainerProps) {
  const router = useRouter();
  const [step, setStep] = useTabsQueryState<ReleaseStepKey>(
    'step',
    'release-info',
  );

  const stepIndex = RELEASE_STEPS.findIndex(s => s.key === step);
  const goToStep = (index: number) => {
    const target = RELEASE_STEPS[index];
    if (target) setStep(target.key);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#98A2B3]">
          Releases
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-[#101828]">
          Create New Release
        </h1>
      </div>

      <TopTabs
        variant="stepper"
        tabs={RELEASE_STEPS}
        activeKey={step}
        onChange={setStep}
      />

      <div className="rounded-2xl border border-[#E9EDF5] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] md:p-6">
        {step === 'release-info' && (
          <ReleaseInfoStep
            onNext={() => goToStep(stepIndex + 1)}
            onBack={() => router.push(releasesListPath)}
          />
        )}

        {step === 'upload-tracks' && (
          <ReleaseStepPlaceholder
            title="Upload Tracks"
            onBack={() => goToStep(stepIndex - 1)}
            onNext={() => goToStep(stepIndex + 1)}
          />
        )}

        {step === 'distribution' && (
          <ReleaseStepPlaceholder
            title="Distribution"
            onBack={() => goToStep(stepIndex - 1)}
            onNext={() => goToStep(stepIndex + 1)}
          />
        )}

        {step === 'schedule-submit' && (
          <ReleaseStepPlaceholder
            title="Schedule & Submit"
            nextLabel="Submit"
            onBack={() => goToStep(stepIndex - 1)}
            onNext={() => router.push(releasesListPath)}
          />
        )}
      </div>
    </div>
  );
}

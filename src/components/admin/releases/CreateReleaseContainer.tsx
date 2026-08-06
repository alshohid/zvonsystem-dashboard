'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import TopTabs, { TabItem } from '@/src/components/common/TopTabs';
import { getErrorMessage } from '@/src/lib/getErrorMessage';
import { useTabsQueryState } from '@/src/lib/helper/useTabsQueryState';
import {
  useCreateReleaseMutation,
  useGetReleaseByIdQuery,
  useUpdateReleaseMutation,
} from '@/src/redux/features/releases/releasesApi';
import type { ReleaseStatus } from '@/src/types/releaseTypes';
import DistributionStep from './DistributionStep';
import ReleaseInfoStep from './ReleaseInfoStep';
import ScheduleSubmitStep from './ScheduleSubmitStep';
import UploadTracksStep from './UploadTracksStep';
import {
  buildReleaseFormData,
  clearFormSession,
  createEmptyForm,
  getAudioOrderError,
  getStepValidationError,
  hydrateFormFromRelease,
  readFormFromSession,
  RELEASE_STEP_KEYS,
  saveFormToSession,
  stepKeyToNumber,
  stepNumberToKey,
  type ReleaseFormState,
  type ReleaseStepKey,
} from './releaseFormState';

const RELEASE_STEPS: TabItem<ReleaseStepKey>[] = [
  { key: 'release-info', label: 'Release Info' },
  { key: 'upload-tracks', label: 'Upload Tracks' },
  { key: 'distribution', label: 'Distribution' },
  { key: 'schedule-submit', label: 'Schedule & Submit' },
];

type CreateReleaseContainerProps = {
  releasesListPath?: string;
  moderationPath?: string;
};

export default function CreateReleaseContainer({
  releasesListPath = '/admin/dashboard/releases',
  moderationPath = '/admin/dashboard/releases/moderation',
}: CreateReleaseContainerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestedReleaseId = searchParams.get('id');

  const [step, setStep] = useTabsQueryState<ReleaseStepKey>(
    'step',
    'release-info',
  );
  const [form, setForm] = useState<ReleaseFormState>(createEmptyForm);
  const hydratedIdRef = useRef<string | null>(null);

  const { data, isFetching, isError, error } = useGetReleaseByIdQuery(
    requestedReleaseId ?? '',
    { skip: !requestedReleaseId },
  );

  const [createRelease, { isLoading: isCreating }] = useCreateReleaseMutation();
  const [updateRelease, { isLoading: isUpdating }] = useUpdateReleaseMutation();
  const isSaving = isCreating || isUpdating;

  // A fresh visit restores whatever the previous step left in the session.
  useEffect(() => {
    if (requestedReleaseId) return;

    const restored = readFormFromSession();
    if (restored) setForm(restored);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const release = data?.data;
    if (!release || hydratedIdRef.current === release.id) return;

    hydratedIdRef.current = release.id;
    setForm(hydrateFormFromRelease(release));
    setStep(stepNumberToKey(release.current_step));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    saveFormToSession(form);
  }, [form]);

  const patchForm = useCallback((patch: Partial<ReleaseFormState>) => {
    setForm(prev => ({ ...prev, ...patch }));
  }, []);

  const stepIndex = RELEASE_STEPS.findIndex(s => s.key === step);

  const persist = async (status: ReleaseStatus, stepNumber: number) => {
    const body = buildReleaseFormData(form, { status, currentStep: stepNumber });

    const saved = form.releaseId
      ? (
          await updateRelease({
            id: form.releaseId,
            body,
          }).unwrap()
        ).data
      : (await createRelease(body).unwrap()).data;

    // After upload the local File is gone; switch the preview to cover_url.full_url.
    hydratedIdRef.current = saved.id;
    setForm(prev => ({
      ...prev,
      releaseId: saved.id,
      coverFile: null,
      existingCoverName: saved.cover_url?.name ?? prev.existingCoverName,
      existingCoverPath: saved.cover_url?.path ?? prev.existingCoverPath,
      existingCoverUrl: saved.cover_url?.full_url ?? prev.existingCoverUrl,
      tracks: prev.tracks.map((track, index) => {
        const savedTrack = saved.tracks?.[index];
        if (!savedTrack?.audioUrl) return track;
        return {
          ...track,
          file: null,
          existingAudioName: savedTrack.audioUrl.name ?? track.existingAudioName,
        };
      }),
    }));

    if (!form.releaseId) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('id', saved.id);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return saved;
  };

  const handleSaveDraft = async () => {
    const audioError = getAudioOrderError(form.tracks);
    if (audioError) {
      toast.error(audioError);
      return;
    }

    try {
      await persist('DRAFT', stepKeyToNumber(step));
      toast.success('Draft saved.');
    } catch (saveError) {
      toast.error(getErrorMessage(saveError, 'Could not save the draft.'));
    }
  };

  const handleNext = () => {
    const validationError = getStepValidationError(form, step);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    const target = RELEASE_STEPS[stepIndex + 1];
    if (target) setStep(target.key);
  };

  const handleBack = () => {
    const target = RELEASE_STEPS[stepIndex - 1];
    if (target) setStep(target.key);
    else router.push(releasesListPath);
  };

  const handleSubmit = async () => {
    for (const key of RELEASE_STEP_KEYS) {
      const validationError = getStepValidationError(form, key);
      if (validationError) {
        toast.error(validationError);
        setStep(key);
        return false;
      }
    }

    try {
      await persist('IN_MODERATION', RELEASE_STEP_KEYS.length);
      clearFormSession();
      return true;
    } catch (submitError) {
      toast.error(
        getErrorMessage(submitError, 'Could not submit the release.'),
      );
      return false;
    }
  };

  const isLoadingDraft = Boolean(requestedReleaseId) && isFetching && !data;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#98A2B3]">
          Releases
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-[#101828]">
          {form.releaseId ? 'Continue Release' : 'Create New Release'}
        </h1>
      </div>

      <TopTabs
        variant="stepper"
        tabs={RELEASE_STEPS}
        activeKey={step}
        onChange={setStep}
      />

      <div className="rounded-2xl border border-[#E9EDF5] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] md:p-6">
        {isLoadingDraft ? (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-[#667085]">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading your draft…
          </div>
        ) : isError ? (
          <div className="space-y-3 py-16 text-center">
            <p className="text-sm font-medium text-[#B42318]">
              {getErrorMessage(error, 'This release could not be loaded.')}
            </p>
            <button
              type="button"
              onClick={() => router.push(releasesListPath)}
              className="text-[13px] font-semibold text-[#22C55E] hover:underline"
            >
              Back to releases
            </button>
          </div>
        ) : (
          <>
            {step === 'release-info' && (
              <ReleaseInfoStep
                form={form}
                onChange={patchForm}
                onNext={handleNext}
                onBack={handleBack}
                onSaveDraft={handleSaveDraft}
                isSaving={isSaving}
              />
            )}

            {step === 'upload-tracks' && (
              <UploadTracksStep
                form={form}
                onChange={patchForm}
                onNext={handleNext}
                onBack={handleBack}
                onSaveDraft={handleSaveDraft}
                isSaving={isSaving}
              />
            )}

            {step === 'distribution' && (
              <DistributionStep
                form={form}
                onChange={patchForm}
                onNext={handleNext}
                onBack={handleBack}
                onSaveDraft={handleSaveDraft}
                isSaving={isSaving}
              />
            )}

            {step === 'schedule-submit' && (
              <ScheduleSubmitStep
                form={form}
                onChange={patchForm}
                onBack={handleBack}
                onSaveDraft={handleSaveDraft}
                onSubmit={handleSubmit}
                onDone={() => router.push(moderationPath)}
                isSaving={isSaving}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

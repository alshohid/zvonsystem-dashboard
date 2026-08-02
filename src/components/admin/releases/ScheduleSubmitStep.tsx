'use client';

import { useState } from 'react';
import { ArrowRight, Check, Loader2, Save } from 'lucide-react';
import { Modal } from '@/src/components/ui/modal';
import { GreenCheckbox } from './formControls';
import { getGenreLabel, getReleaseTypeLabel } from './releaseFormOptions';
import type { ReleaseFormState } from './releaseFormState';

type ScheduleSubmitStepProps = {
  form: ReleaseFormState;
  onChange: (patch: Partial<ReleaseFormState>) => void;
  onBack: () => void;
  onSaveDraft: () => void;
  onSubmit: () => Promise<boolean>;
  onDone: () => void;
  isSaving: boolean;
};

export default function ScheduleSubmitStep({
  form,
  onChange,
  onBack,
  onSaveDraft,
  onSubmit,
  onDone,
  isSaving,
}: ScheduleSubmitStepProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const releaseTitle = form.releaseName || 'this release';

  const handleConfirm = async () => {
    const succeeded = await onSubmit();
    if (!succeeded) return;

    setConfirmOpen(false);
    setSubmitted(true);
    setTimeout(onDone, 1800);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#22C55E]">
          <Check size={28} strokeWidth={3} className="text-white" />
        </span>
        <h2 className="text-[17px] font-semibold text-[#101828]">
          Submitted Successfully!
        </h2>
        <p className="max-w-md text-[13px] leading-5 text-[#667085]">
          You&apos;ve submitted &quot;{releaseTitle}&quot; for moderation review. You
          won&apos;t be able to edit it until the review is complete.
        </p>
        <p className="text-xs text-[#98A2B3]">Redirecting to Moderation Page...</p>
      </div>
    );
  }

  const mainArtist =
    form.persons.find(person => person.role === 'MAIN_ARTIST')?.name ||
    form.persons[0]?.name ||
    '';

  const summaryRows: { label: string; value: string }[] = [
    { label: 'Title', value: form.releaseName || '—' },
    { label: 'Subtitle', value: form.subtitle || '—' },
    { label: 'Type', value: getReleaseTypeLabel(form.releaseType) || '—' },
    { label: 'Artist', value: mainArtist || '—' },
    { label: 'Genre', value: getGenreLabel(form.genre) || '—' },
    { label: 'Label', value: form.labelName || '—' },
    { label: 'Release Date', value: form.releaseDate || '—' },
    { label: 'Tracks', value: `${form.tracks.length} track(s)` },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[15px] font-semibold text-[#101828]">Schedule &amp; Submit</h2>
        <p className="mt-1 text-xs text-[#98A2B3]">
          Specify the main distribution platforms and territories for the release
        </p>
      </div>

      <div className="rounded-2xl border border-[#22C55E] bg-[#F6FFF9] p-5">
        <h3 className="text-[13px] font-semibold text-[#101828]">Release Summary</h3>

        <dl className="mt-3 divide-y divide-[#DCFCE7]">
          {summaryRows.map(row => (
            <div
              key={row.label}
              className="flex items-center justify-between py-2.5 text-[13px]"
            >
              <dt className="text-[#667085]">{row.label}</dt>
              <dd className="font-medium text-[#101828]">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-1 flex items-center justify-between border-t border-[#DCFCE7] pt-3 text-[13px]">
          <span className="text-[#667085]">Status after submit</span>
          <span className="font-semibold text-[#22C55E]">In Moderation</span>
        </div>
      </div>

      <section className="space-y-3 border-t border-[#E5E7EB] pt-4">
        <div>
          <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[#667085]">
            Message For The Moderator
          </h3>
          <p className="mt-1 text-xs text-[#98A2B3]">
            Provide information that will help moderators verify the release - links,
            title spelling, shipping details, etc.
          </p>
        </div>

        <textarea
          value={form.moderatorMessage}
          onChange={e => onChange({ moderatorMessage: e.target.value })}
          placeholder="Write what you want to send to the moderator"
          rows={4}
          className="w-full resize-none rounded-lg border border-[#E9E9EA] bg-[#F5F7FB] px-4 py-3 text-[13px] text-[#161721] outline-none placeholder:text-[#A1A1AA] focus:border-[#8FA17E] focus:ring-2 focus:ring-[#8FA17E]/15"
        />

        <GreenCheckbox
          label="All information is filled correctly. I agree with everything"
          checked={form.agreed}
          onChange={checked => onChange({ agreed: checked })}
        />
      </section>

      <div className="flex flex-col gap-3 border-t border-[#E5E7EB] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-left text-[13px] font-medium text-[#344054] hover:text-[#101828]"
        >
          &lt; Back
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onSaveDraft}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#D0D5DD] px-5 py-2.5 text-[13px] font-semibold text-[#344054] transition-colors hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            Save Draft
          </button>

          <button
            type="button"
            disabled={!form.agreed || isSaving}
            onClick={() => setConfirmOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-6 py-2.5 text-[13px] font-semibold text-black hover:bg-[#16A34A] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit For Review <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <Modal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        className="max-w-[420px] p-0"
        contentBgClassName="bg-white"
        textClassName="text-[#111827]"
        showCloseButton={false}
      >
        <div className="rounded-2xl p-6">
          <h3 className="text-[16px] font-semibold text-[#101828]">
            Submit for Review?
          </h3>

          <p className="mt-3 text-[13px] leading-5 text-[#475467]">
            You&apos;re about to submit &quot;{releaseTitle}&quot; for moderation
            review. Once submitted, you won&apos;t be able to edit it until the
            review is complete.
          </p>
          <p className="mt-3 text-[13px] leading-5 text-[#475467]">
            The moderation team will review your release and either approve it or
            request changes.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setConfirmOpen(false)}
              disabled={isSaving}
              className="flex-1 rounded-xl bg-[#F2F4F7] px-4 py-2.5 text-[13px] font-semibold text-[#344054] hover:bg-[#E4E7EC] disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isSaving}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-[13px] font-semibold text-black hover:bg-[#16A34A] disabled:opacity-60"
            >
              {isSaving ? <Loader2 size={16} className="animate-spin" /> : null}
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

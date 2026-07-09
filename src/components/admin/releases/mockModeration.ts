export type ModerationReleaseType = 'Single' | 'EP' | 'Album';
export type ModerationPriority = 'High' | 'Medium' | 'Low';

export type ModerationSubmission = {
  id: string;
  releaseTitle: string;
  artistName: string;
  type: ModerationReleaseType;
  submittedLabel: string;
  priority: ModerationPriority;
};

export const MOCK_MODERATION_SUBMISSIONS: ModerationSubmission[] = [
  {
    id: 'carlos-demo',
    releaseTitle: 'Carlos Demo',
    artistName: 'Carlos Demo',
    type: 'Album',
    submittedLabel: 'Dec 10, 2024',
    priority: 'High',
  },
  {
    id: 'mark-johnson',
    releaseTitle: 'Mark Johnson',
    artistName: 'Mark Johnson',
    type: 'Album',
    submittedLabel: 'Dec 10, 2024',
    priority: 'High',
  },
  {
    id: 'poolside-llc',
    releaseTitle: 'Poolside LLC',
    artistName: 'Poolside LLC',
    type: 'Album',
    submittedLabel: 'Dec 10, 2024',
    priority: 'High',
  },
];

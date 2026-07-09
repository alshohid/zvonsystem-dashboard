export type ChangeSeverity = 'error' | 'warning';

export type ChangeIssue = {
  id: string;
  severity: ChangeSeverity;
  releaseTitle: string;
  description: string;
  dateLabel: string;
};

export const MOCK_CHANGE_ISSUES: ChangeIssue[] = [
  {
    id: 'broken-signal-acoustic',
    severity: 'error',
    releaseTitle: 'Broken Signal (Acoustic)',
    description: 'Cover art resolution below 3000×3000px',
    dateLabel: 'Dec 5, 2024',
  },
  {
    id: 'echo-chamber-radio-edit',
    severity: 'error',
    releaseTitle: 'Echo Chamber (Radio Edit)',
    description: 'ISRC code already registered to another release',
    dateLabel: 'Dec 3, 2024',
  },
  {
    id: 'lost-frequencies-ep',
    severity: 'warning',
    releaseTitle: 'Lost Frequencies EP',
    description: 'Track title contains special characters not supported by certain platforms',
    dateLabel: 'Nov 28, 2024',
  },
];

export const RELEASE_STATUSES = [
  "DRAFT",
  "IN_MODERATION",
  "APPROVED",
  "LIVE",
  "SCHEDULED",
  "REJECTED",
] as const;

export type ReleaseStatus = (typeof RELEASE_STATUSES)[number];

export const RELEASE_TYPES = ["SINGLE", "EP", "ALBUM"] as const;

export type ReleaseType = (typeof RELEASE_TYPES)[number];

export const PERSON_ROLES = [
  "MAIN_ARTIST",
  "FEAT",
  "REMIXER",
  "PRODUCER",
] as const;

export type PersonRole = (typeof PERSON_ROLES)[number];

export const TRACK_VERSIONS = [
  "ORIGINAL",
  "EXPLICIT_CONTENT",
  "LIVE",
  "COVER",
  "REMIX",
  "INSTRUMENTAL",
] as const;

export type TrackVersion = (typeof TRACK_VERSIONS)[number];

export const RELEASE_GENRES = [
  "AMBIENT",
  "ANIME",
  "BASS",
  "BREAKBEAT",
  "CLASSICAL",
  "COUNTRY",
  "DANCE",
  "DISCO",
  "DOWNTEMPO",
  "DUBSTEP",
  "EDM",
  "ELECTRONIC",
  "ELECTRONICA",
  "FOLK",
  "FUNK",
  "GARAGE",
  "HARDCORE",
  "HIP_HOP_RAP",
  "HOUSE",
  "IDM_EXPERIMENTAL",
  "INDIE_POP",
  "INDUSTRIAL",
  "INSTRUMENTAL",
  "JUNGLE_DRUM_N_BASS",
  "LATIN",
  "LOUNGE",
  "NEW_AGE",
  "NEW_WAVE",
  "PHONK_FUNK",
  "PIANO",
  "POP",
  "PUNK",
  "RNB_SOUL",
  "REGGAE",
  "ROCK",
  "RUSSIAN",
  "SOUL",
  "TECH_HOUSE",
  "TECHNO",
  "TRANCE",
] as const;

export type ReleaseGenre = (typeof RELEASE_GENRES)[number];

export const TERRITORY_SCOPES = ["ALL", "CERTAIN", "CIS"] as const;

export type TerritoryScope = (typeof TERRITORY_SCOPES)[number];

export type ApiFileRef = {
  id: string;
  name: string | null;
  type: string | null;
  path: string | null;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  request_id?: string | null;
};

export type ApiPerson = {
  id: string;
  name: string | null;
  role: PersonRole | null;
  track_id: string | null;
  release_id: string | null;
};

export type ApiMusicAuthor = {
  id: string;
  track_id: string | null;
  music_author_name: string | null;
  author_words: string | null;
};

/** Track payloads are written in snake_case but read back in camelCase. */
export type ApiTrack = {
  id: string;
  release_id: string;
  trackNo: number;
  name: string | null;
  subtitle: string | null;
  isrc: string | null;
  audio_url_id: string | null;
  cSoundRecording: string | null;
  pPhonogramProducer: string | null;
  isOwn100PercentRights: boolean;
  startPreListeningSec: number;
  language: string | null;
  version: TrackVersion | null;
  createdAt: string;
  updatedAt: string;
  audioUrl?: ApiFileRef | null;
  persons?: ApiPerson[];
  music_authors?: ApiMusicAuthor[];
};

export type ApiRelease = {
  id: string;
  userId: string;
  name: string | null;
  subtitle: string | null;
  type: ReleaseType | null;
  cover_url_id: string | null;
  cover_url?: ApiFileRef | null;
  genre: ReleaseGenre | null;
  upc: string | null;
  label_name: string | null;
  release_date: string | null;
  is_previously_released: boolean;
  original_release_date: string | null;
  all_ad_platforms: boolean;
  selected_platforms: string[];
  territory_scope: string | null;
  selected_countries: string[];
  sound_cloud: string[];
  cis_countries: string[];
  europe: string[];
  americas: string[];
  africa: string[];
  oceania: string[];
  yandex_music: string | null;
  vk_music: string | null;
  spotify: string | null;
  apple_music: string | null;
  my_first_release: boolean;
  status: ReleaseStatus;
  moderator_message: string | null;
  is_terms_agreed: boolean;
  completion_percentage: number;
  current_step: number;
  created_at: string;
  updated_at: string;
  persons?: ApiPerson[];
  tracks?: ApiTrack[];
};

export type ApiListMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

/** The API is inconsistent: creation answers with `status`, everything else with `success`. */
export type ApiEnvelope<TData> = {
  success?: boolean;
  status?: boolean;
  message: string;
  data: TData;
};

export type ReleaseListResponse = ApiEnvelope<ApiRelease[]> & {
  meta: ApiListMeta;
};

export type ReleaseResponse = ApiEnvelope<ApiRelease>;

export type MyReleasesQuery = {
  status?: ReleaseStatus;
  search?: string;
  page?: number;
  limit?: number;
};

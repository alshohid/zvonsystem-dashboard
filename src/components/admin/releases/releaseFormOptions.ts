import {
  PERSON_ROLES,
  RELEASE_GENRES,
  RELEASE_TYPES,
  TRACK_VERSIONS,
  type PersonRole,
  type ReleaseGenre,
  type ReleaseType,
  type TrackVersion,
} from "@/src/types/releaseTypes";

export type SelectOption<TValue extends string = string> = {
  value: TValue;
  label: string;
};

const MIN_RELEASE_LEAD_DAYS = 14;

const toDateInputValue = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;

export const getMinReleaseDate = (from: Date = new Date()) => {
  const date = new Date(from);
  date.setDate(date.getDate() + MIN_RELEASE_LEAD_DAYS);
  return toDateInputValue(date);
};

// A previously-released date can be any day up to and including today.
export const getTodayDate = () => toDateInputValue(new Date());

const PERSON_ROLE_LABELS: Record<PersonRole, string> = {
  MAIN_ARTIST: "Main Artist",
  FEAT: "feat.",
  REMIXER: "Remixer",
  PRODUCER: "Producer",
};

export const PERSON_ROLE_OPTIONS: SelectOption<PersonRole>[] = PERSON_ROLES.map(
  (value) => ({ value, label: PERSON_ROLE_LABELS[value] }),
);

export const getPersonRoleLabel = (role: PersonRole | "" | null) =>
  role ? PERSON_ROLE_LABELS[role] : "";

const GENRE_LABELS: Record<ReleaseGenre, string> = {
  AMBIENT: "Ambient",
  ANIME: "Anime",
  BASS: "Bass",
  BREAKBEAT: "Breakbeat",
  CLASSICAL: "Classical",
  COUNTRY: "Country",
  DANCE: "Dance",
  DISCO: "Disco",
  DOWNTEMPO: "Downtempo",
  DUBSTEP: "Dubstep",
  EDM: "EDM",
  ELECTRONIC: "Electronic",
  ELECTRONICA: "Electronica",
  FOLK: "Folk",
  FUNK: "Funk",
  GARAGE: "Garage",
  HARDCORE: "Hardcore",
  HIP_HOP_RAP: "Hip-Hop / Rap",
  HOUSE: "House",
  IDM_EXPERIMENTAL: "IDM / Experimental",
  INDIE_POP: "Indie Pop",
  INDUSTRIAL: "Industrial",
  INSTRUMENTAL: "Instrumental",
  JUNGLE_DRUM_N_BASS: "Jungle / Drum & Bass",
  LATIN: "Latin",
  LOUNGE: "Lounge",
  NEW_AGE: "New Age",
  NEW_WAVE: "New Wave",
  PHONK_FUNK: "Phonk / Funk",
  PIANO: "Piano",
  POP: "Pop",
  PUNK: "Punk",
  RNB_SOUL: "R&B / Soul",
  REGGAE: "Reggae",
  ROCK: "Rock",
  RUSSIAN: "Russian",
  SOUL: "Soul",
  TECH_HOUSE: "Tech House",
  TECHNO: "Techno",
  TRANCE: "Trance",
};

export const GENRE_OPTIONS: SelectOption<ReleaseGenre>[] = RELEASE_GENRES.map(
  (value) => ({ value, label: GENRE_LABELS[value] }),
);

export const getGenreLabel = (genre: ReleaseGenre | "" | null) =>
  genre ? GENRE_LABELS[genre] : "";

const RELEASE_TYPE_LABELS: Record<ReleaseType, string> = {
  SINGLE: "Single",
  EP: "EP",
  ALBUM: "Album",
};

export const RELEASE_TYPE_OPTIONS: SelectOption<ReleaseType>[] =
  RELEASE_TYPES.map((value) => ({ value, label: RELEASE_TYPE_LABELS[value] }));

export const getReleaseTypeLabel = (type: ReleaseType | "" | null) =>
  type ? RELEASE_TYPE_LABELS[type] : "";

const TRACK_VERSION_LABELS: Record<TrackVersion, string> = {
  ORIGINAL: "Original",
  EXPLICIT_CONTENT: "Explicit Content",
  LIVE: "Live",
  COVER: "Cover",
  REMIX: "Remix",
  INSTRUMENTAL: "Instrumental",
};

export const TRACK_VERSION_OPTIONS: SelectOption<TrackVersion>[] =
  TRACK_VERSIONS.map((value) => ({
    value,
    label: TRACK_VERSION_LABELS[value],
  }));

export const getTrackVersionLabel = (version: TrackVersion | "" | null) =>
  version ? TRACK_VERSION_LABELS[version] : "";

export const LABEL_NAME_OPTIONS: SelectOption[] = [
  { value: "independent", label: "Independent / Self-Released" },
];

export const PLATFORM_OPTIONS: string[] = [
  "Spotify",
  "Apple Music",
  "YouTube Music",
  "Amazon Music",
  "Deezer",
  "Tidal",
  "SoundCloud",
  "TikTok",
  "Instagram/Facebook",
  "Pandora",
  "iHeartRadio",
  "Anghami",
  "Boomplay",
  "Yandex Music",
  "VK Music",
  "NetEase Cloud Music",
  "JioSaavn",
  "Napster",
  "Beatport",
  "Traxsource",
  "Line Music",
  "KKBox",
  "Joox",
  "Resso",
  "Shazam",
  "Snapchat",
  "Triller",
  "Audiomack",
  "Bandcamp",
  "Peloton",
];

export type TerritoryCountry = { code: string; label: string };

/**
 * `apiField` is the per-region array the backend expects; countries travel as
 * ISO 3166-1 alpha-2 codes and are also mirrored into `selected_countries`.
 */
export type TerritoryRegion = {
  id: string;
  label: string;
  apiField: "cis_countries" | "europe" | "americas" | "africa" | "oceania";
  countries: TerritoryCountry[];
};

const country = (code: string, label: string): TerritoryCountry => ({
  code,
  label,
});

export const TERRITORY_REGIONS: TerritoryRegion[] = [
  {
    id: "cis",
    label: "CIS (Commonwealth of Independent States)",
    apiField: "cis_countries",
    countries: [
      country("AM", "Armenia"),
      country("AZ", "Azerbaijan"),
      country("BY", "Belarus"),
      country("GE", "Georgia"),
      country("KZ", "Kazakhstan"),
      country("KG", "Kyrgyzstan"),
      country("MD", "Moldova"),
      country("RU", "Russia"),
      country("TJ", "Tajikistan"),
      country("TM", "Turkmenistan"),
      country("UA", "Ukraine"),
      country("UZ", "Uzbekistan"),
    ],
  },
  {
    id: "europe",
    label: "Europe",
    apiField: "europe",
    countries: [
      country("AL", "Albania"),
      country("AT", "Austria"),
      country("BE", "Belgium"),
      country("BA", "Bosnia & Herzegovina"),
      country("BG", "Bulgaria"),
      country("HR", "Croatia"),
      country("CZ", "Czech Republic"),
      country("DK", "Denmark"),
      country("EE", "Estonia"),
      country("FI", "Finland"),
      country("FR", "France"),
      country("DE", "Germany"),
      country("GR", "Greece"),
      country("HU", "Hungary"),
      country("IS", "Iceland"),
      country("IE", "Ireland"),
      country("IT", "Italy"),
      country("LV", "Latvia"),
      country("LT", "Lithuania"),
      country("LU", "Luxembourg"),
      country("ME", "Montenegro"),
      country("NL", "Netherlands"),
      country("MK", "North Macedonia"),
      country("NO", "Norway"),
      country("PL", "Poland"),
      country("PT", "Portugal"),
      country("RO", "Romania"),
      country("RS", "Serbia"),
      country("SK", "Slovakia"),
      country("SI", "Slovenia"),
      country("ES", "Spain"),
      country("SE", "Sweden"),
      country("CH", "Switzerland"),
      country("GB", "United Kingdom"),
    ],
  },
  {
    id: "americas",
    label: "Americas",
    apiField: "americas",
    countries: [
      country("AR", "Argentina"),
      country("BO", "Bolivia"),
      country("BR", "Brazil"),
      country("CA", "Canada"),
      country("CL", "Chile"),
      country("CO", "Colombia"),
      country("CR", "Costa Rica"),
      country("CU", "Cuba"),
      country("DO", "Dominican Republic"),
      country("EC", "Ecuador"),
      country("SV", "El Salvador"),
      country("GT", "Guatemala"),
      country("HN", "Honduras"),
      country("JM", "Jamaica"),
      country("MX", "Mexico"),
      country("NI", "Nicaragua"),
      country("PA", "Panama"),
      country("PY", "Paraguay"),
      country("PE", "Peru"),
      country("TT", "Trinidad & Tobago"),
      country("US", "United States"),
      country("UY", "Uruguay"),
    ],
  },
  {
    id: "africa-middle-east",
    label: "Africa & Middle East",
    apiField: "africa",
    countries: [
      country("DZ", "Algeria"),
      country("BH", "Bahrain"),
      country("EG", "Egypt"),
      country("ET", "Ethiopia"),
      country("GH", "Ghana"),
      country("IL", "Israel"),
      country("JO", "Jordan"),
      country("KE", "Kenya"),
      country("KW", "Kuwait"),
      country("LB", "Lebanon"),
      country("NG", "Nigeria"),
      country("OM", "Oman"),
      country("SA", "Saudi Arabia"),
      country("ZA", "South Africa"),
      country("TZ", "Tanzania"),
      country("TN", "Tunisia"),
      country("TR", "Turkey"),
      country("AE", "United Arab Emirates"),
    ],
  },
  {
    id: "oceania-other",
    label: "Oceania & Other",
    apiField: "oceania",
    countries: [
      country("AU", "Australia"),
      country("BD", "Bangladesh"),
      country("CN", "China"),
      country("IN", "India"),
      country("ID", "Indonesia"),
      country("JP", "Japan"),
      country("MY", "Malaysia"),
      country("NZ", "New Zealand"),
      country("PK", "Pakistan"),
      country("PH", "Philippines"),
      country("QA", "Qatar"),
      country("SG", "Singapore"),
      country("KR", "South Korea"),
      country("LK", "Sri Lanka"),
      country("TH", "Thailand"),
      country("VN", "Vietnam"),
    ],
  },
];

const COUNTRY_LABELS_BY_CODE: Record<string, string> = Object.fromEntries(
  TERRITORY_REGIONS.flatMap((region) =>
    region.countries.map(({ code, label }) => [code, label]),
  ),
);

export const getCountryLabel = (code: string) =>
  COUNTRY_LABELS_BY_CODE[code] ?? code;

export const AD_PLATFORM_SCOPE_OPTIONS: SelectOption[] = [
  { value: "all", label: "On all ad platforms" },
  { value: "some", label: "Only on some ad platforms" },
];

export const TERRITORY_SCOPE_OPTIONS: SelectOption[] = [
  { value: "ALL", label: "In all countries" },
  { value: "CERTAIN", label: "Only in certain countries" },
  { value: "CIS", label: "In the CIS" },
];

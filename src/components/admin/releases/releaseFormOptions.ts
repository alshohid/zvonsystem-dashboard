export type SelectOption = { value: string; label: string };

export type ReleaseSummaryData = {
  releaseName: string;
  subtitle: string;
  releaseType: string;
  artistName: string;
  genre: string;
  labelName: string;
  releaseDate: string;
  trackCount: number;
};

export const PERSON_ROLE_OPTIONS: SelectOption[] = [
  { value: "main-artist", label: "Main Artist" },
  { value: "feat", label: "feat." },
  { value: "remixer", label: "Remixer" },
];

export const GENRE_OPTIONS: SelectOption[] = [
  "Ambient",
  "Avant-Garde",
  "Bass",
  "Breakbeat",
  "Classical",
  "Country",
  "Dance",
  "Downtempo",
  "Dubstep",
  "EDM",
  "Electronic",
  "Electronica",
  "Folk",
  "Funk",
  "Garage",
  "Hardcore",
  "Hip-Hop/Rap",
  "House",
  "IDM/Experimental",
  "Indie Pop",
  "Industrial",
  "Instrumental",
  "Jungle/Drum & Bass",
  "Latin",
  "Lounge",
  "New Age",
  "New Wave",
  "Piano",
  "Pop",
  "Post-Rock",
  "Punk",
  "R&B/Soul",
  "Reggae",
  "Rock",
  "Rockabilly",
  "Soul",
  "Tech House",
  "Techno",
  "Trance",
].map((label) => ({ value: label.toLowerCase(), label }));

export const LABEL_NAME_OPTIONS: SelectOption[] = [
  { value: "independent", label: "Independent / Self-Released" },
];

export const RELEASE_TYPE_OPTIONS: SelectOption[] = [
  { value: "Single", label: "Single" },
  { value: "EP", label: "EP" },
  { value: "Album", label: "Album" },
];

export const TRACK_VERSION_OPTIONS: SelectOption[] = [
  { value: "Original", label: "Original" },
  { value: "Explicit Content", label: "Explicit Content" },
  { value: "Live", label: "Live" },
  { value: "Cover", label: "Cover" },
  { value: "Remix", label: "Remix" },
  { value: "Instrumental", label: "Instrumental" },
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

export type TerritoryRegion = {
  id: string;
  label: string;
  countries: string[];
};

export const TERRITORY_REGIONS: TerritoryRegion[] = [
  {
    id: "cis",
    label: "CIS (Commonwealth of Independent States)",
    countries: [
      "Armenia",
      "Azerbaijan",
      "Belarus",
      "Georgia",
      "Kazakhstan",
      "Kyrgyzstan",
      "Moldova",
      "Russia",
      "Tajikistan",
      "Turkmenistan",
      "Ukraine",
      "Uzbekistan",
    ],
  },
  {
    id: "europe",
    label: "Europe",
    countries: [
      "Albania",
      "Austria",
      "Belgium",
      "Bosnia",
      "Bulgaria",
      "Croatia",
      "Czech Republic",
      "Denmark",
      "Estonia",
      "Finland",
      "France",
      "Germany",
      "Greece",
      "Hungary",
      "Iceland",
      "Ireland",
      "Italy",
      "Latvia",
      "Lithuania",
      "Luxembourg",
      "Montenegro",
      "Netherlands",
      "North Macedonia",
      "Norway",
      "Poland",
      "Portugal",
      "Romania",
      "Serbia",
      "Slovakia",
      "Slovenia",
      "Spain",
      "Sweden",
      "Switzerland",
      "United Kingdom",
    ],
  },
  {
    id: "americas",
    label: "Americas",
    countries: [
      "Argentina",
      "Bolivia",
      "Brazil",
      "Canada",
      "Chile",
      "Colombia",
      "Costa Rica",
      "Cuba",
      "Dominican Republic",
      "Ecuador",
      "El Salvador",
      "Guatemala",
      "Honduras",
      "Jamaica",
      "Mexico",
      "Nicaragua",
      "Panama",
      "Paraguay",
      "Peru",
      "Trinidad & Tobago",
      "United States",
      "Uruguay",
    ],
  },
  {
    id: "africa-middle-east",
    label: "Africa & Middle East",
    countries: [
      "Algeria",
      "Bahrain",
      "Egypt",
      "Ethiopia",
      "Ghana",
      "Israel",
      "Jordan",
      "Kenya",
      "Kuwait",
      "Lebanon",
      "Nigeria",
      "Oman",
      "Saudi Arabia",
      "South Africa",
      "Tanzania",
      "Tunisia",
      "Turkey",
      "UAE",
    ],
  },
  {
    id: "oceania-other",
    label: "Oceania & Other",
    countries: [
      "Australia",
      "Bangladesh",
      "China",
      "India",
      "Indonesia",
      "Japan",
      "Malaysia",
      "New Zealand",
      "Pakistan",
      "Philippines",
      "Qatar",
      "Singapore",
      "South Korea",
      "Sri Lanka",
      "Thailand",
      "Vietnam",
    ],
  },
];

export const AD_PLATFORM_SCOPE_OPTIONS: SelectOption[] = [
  { value: "all", label: "On all ad platforms" },
  { value: "some", label: "Only on some ad platforms" },
];

export const TERRITORY_SCOPE_OPTIONS: SelectOption[] = [
  { value: "all", label: "In all countries" },
  { value: "certain", label: "Only in certain countries" },
  { value: "cis", label: "In the CIS" },
];

export type SelectOption = { value: string; label: string };

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

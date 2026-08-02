import type {
  ApiRelease,
  PersonRole,
  ReleaseGenre,
  ReleaseStatus,
  ReleaseType,
  TerritoryScope,
  TrackVersion,
} from "@/src/types/releaseTypes";
import { TERRITORY_REGIONS } from "./releaseFormOptions";

export type PersonForm = {
  name: string;
  role: PersonRole | "";
};

export type TrackAuthorForm = {
  musicAuthor: string;
  wordsAuthor: string;
};

export type TrackForm = {
  uid: string;
  expanded: boolean;
  /** A newly picked file. `null` means "keep whatever the server already has". */
  file: File | null;
  existingAudioName: string | null;
  trackName: string;
  subtitle: string;
  isrc: string;
  persons: PersonForm[];
  authors: TrackAuthorForm[];
  ownsFullRights: boolean;
  soundRecording: string;
  phonogramProducer: string;
  preListeningSeconds: string;
  trackLanguage: string;
  trackVersion: TrackVersion;
};

export type ArtistProfilesForm = {
  yandexMusic: string;
  vkMusic: string;
  spotify: string;
  appleMusic: string;
};

export type ReleaseFormState = {
  releaseId: string | null;
  releaseName: string;
  subtitle: string;
  releaseType: ReleaseType;
  coverFile: File | null;
  existingCoverName: string | null;
  existingCoverPath: string | null;
  persons: PersonForm[];
  genre: ReleaseGenre | "";
  upc: string;
  labelName: string;
  releaseDate: string;
  previouslyReleased: boolean;
  previousReleaseDate: string;
  tracks: TrackForm[];
  allAdPlatforms: boolean;
  selectedPlatforms: string[];
  territoryScope: TerritoryScope;
  selectedCountries: string[];
  soundCloudLinks: string[];
  artistProfiles: ArtistProfilesForm;
  noArtistProfilesYet: boolean;
  moderatorMessage: string;
  agreed: boolean;
};

export const RELEASE_STEP_KEYS = [
  "release-info",
  "upload-tracks",
  "distribution",
  "schedule-submit",
] as const;

export type ReleaseStepKey = (typeof RELEASE_STEP_KEYS)[number];

export const stepKeyToNumber = (step: ReleaseStepKey) =>
  RELEASE_STEP_KEYS.indexOf(step) + 1;

export const stepNumberToKey = (step: number): ReleaseStepKey =>
  RELEASE_STEP_KEYS[Math.min(Math.max(step, 1), RELEASE_STEP_KEYS.length) - 1];

const createUid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `track-${Math.random().toString(36).slice(2)}`;

export function createEmptyTrack(expanded = true): TrackForm {
  return {
    uid: createUid(),
    expanded,
    file: null,
    existingAudioName: null,
    trackName: "",
    subtitle: "",
    isrc: "",
    persons: [{ name: "", role: "MAIN_ARTIST" }],
    authors: [{ musicAuthor: "", wordsAuthor: "" }],
    ownsFullRights: false,
    soundRecording: "",
    phonogramProducer: "",
    preListeningSeconds: "0",
    trackLanguage: "",
    trackVersion: "ORIGINAL",
  };
}

export function createEmptyForm(): ReleaseFormState {
  return {
    releaseId: null,
    releaseName: "",
    subtitle: "",
    releaseType: "ALBUM",
    coverFile: null,
    existingCoverName: null,
    existingCoverPath: null,
    persons: [{ name: "", role: "MAIN_ARTIST" }],
    genre: "",
    upc: "",
    labelName: "",
    releaseDate: "",
    previouslyReleased: false,
    previousReleaseDate: "",
    tracks: [createEmptyTrack(true)],
    allAdPlatforms: false,
    selectedPlatforms: [],
    territoryScope: "CERTAIN",
    selectedCountries: [],
    soundCloudLinks: [""],
    artistProfiles: {
      yandexMusic: "",
      vkMusic: "",
      spotify: "",
      appleMusic: "",
    },
    noArtistProfilesYet: false,
    moderatorMessage: "",
    agreed: false,
  };
}

const toDateInput = (value: string | null | undefined) =>
  value ? value.slice(0, 10) : "";

const toApiDate = (value: string) =>
  value ? new Date(`${value}T00:00:00.000Z`).toISOString() : "";

export function hydrateFormFromRelease(
  release: ApiRelease,
): ReleaseFormState {
  const base = createEmptyForm();

  const regionCountries = TERRITORY_REGIONS.flatMap(
    (region) => release[region.apiField] ?? [],
  );

  const tracks = [...(release.tracks ?? [])]
    .sort((a, b) => a.trackNo - b.trackNo)
    .map<TrackForm>((track, index) => ({
      uid: track.id || createUid(),
      expanded: index === 0,
      file: null,
      existingAudioName: track.audioUrl?.name ?? null,
      trackName: track.name ?? "",
      subtitle: track.subtitle ?? "",
      isrc: track.isrc ?? "",
      persons:
        track.persons && track.persons.length > 0
          ? track.persons.map((person) => ({
              name: person.name ?? "",
              role: person.role ?? "",
            }))
          : [{ name: "", role: "MAIN_ARTIST" }],
      authors:
        track.music_authors && track.music_authors.length > 0
          ? track.music_authors.map((author) => ({
              musicAuthor: author.music_author_name ?? "",
              wordsAuthor: author.author_words ?? "",
            }))
          : [{ musicAuthor: "", wordsAuthor: "" }],
      ownsFullRights: Boolean(track.isOwn100PercentRights),
      soundRecording: track.cSoundRecording ?? "",
      phonogramProducer: track.pPhonogramProducer ?? "",
      preListeningSeconds: String(track.startPreListeningSec ?? 0),
      trackLanguage: track.language ?? "",
      trackVersion: track.version ?? "ORIGINAL",
    }));

  return {
    ...base,
    releaseId: release.id,
    releaseName: release.name ?? "",
    subtitle: release.subtitle ?? "",
    releaseType: release.type ?? "ALBUM",
    existingCoverName: release.cover_url?.name ?? null,
    existingCoverPath: release.cover_url?.path ?? null,
    persons:
      release.persons && release.persons.length > 0
        ? release.persons.map((person) => ({
            name: person.name ?? "",
            role: person.role ?? "",
          }))
        : base.persons,
    genre: release.genre ?? "",
    upc: release.upc ?? "",
    labelName: release.label_name ?? "",
    releaseDate: toDateInput(release.release_date),
    previouslyReleased: Boolean(release.is_previously_released),
    previousReleaseDate: toDateInput(release.original_release_date),
    tracks: tracks.length > 0 ? tracks : base.tracks,
    allAdPlatforms: Boolean(release.all_ad_platforms),
    selectedPlatforms: release.selected_platforms ?? [],
    territoryScope:
      (release.territory_scope as TerritoryScope | null) ?? "CERTAIN",
    selectedCountries: [
      ...new Set([...(release.selected_countries ?? []), ...regionCountries]),
    ],
    soundCloudLinks:
      release.sound_cloud && release.sound_cloud.length > 0
        ? release.sound_cloud
        : [""],
    artistProfiles: {
      yandexMusic: release.yandex_music ?? "",
      vkMusic: release.vk_music ?? "",
      spotify: release.spotify ?? "",
      appleMusic: release.apple_music ?? "",
    },
    noArtistProfilesYet: Boolean(release.my_first_release),
    moderatorMessage: release.moderator_message ?? "",
    agreed: Boolean(release.is_terms_agreed),
  };
}

/**
 * The API coerces any non-empty multipart value to `true`, so a boolean false
 * has to be sent as an empty string.
 */
const appendBoolean = (form: FormData, key: string, value: boolean) => {
  form.append(key, value ? "true" : "");
};

const appendText = (form: FormData, key: string, value: string | undefined) => {
  const trimmed = value?.trim();
  if (trimmed) form.append(key, trimmed);
};

const appendList = (form: FormData, key: string, values: string[]) => {
  values.filter(Boolean).forEach((value) => form.append(key, value));
};

/**
 * Uploaded audio is matched to tracks strictly by array position, and tracks
 * without an upload keep the file stored at the same position. A new file at
 * index N therefore requires uploads for every index before it, otherwise the
 * files land on the wrong tracks.
 */
export function buildAudioUploadPlan(tracks: TrackForm[]) {
  let lastNewFileIndex = -1;
  tracks.forEach((track, index) => {
    if (track.file) lastNewFileIndex = index;
  });

  if (lastNewFileIndex < 0) {
    return { files: [] as File[], missingTrackNumbers: [] as number[] };
  }

  const files: File[] = [];
  const missingTrackNumbers: number[] = [];

  for (let index = 0; index <= lastNewFileIndex; index += 1) {
    const file = tracks[index]?.file;
    if (file) {
      files.push(file);
    } else {
      missingTrackNumbers.push(index + 1);
    }
  }

  return { files, missingTrackNumbers };
}

export function getAudioOrderError(tracks: TrackForm[]): string | null {
  const { missingTrackNumbers } = buildAudioUploadPlan(tracks);
  if (missingTrackNumbers.length === 0) return null;

  const label = missingTrackNumbers.length === 1 ? "Track" : "Tracks";
  return `${label} ${missingTrackNumbers.join(", ")} also need a fresh audio file — the API matches uploads to tracks by position.`;
}

export type BuildFormDataOptions = {
  status: ReleaseStatus;
  currentStep: number;
};

export function buildReleaseFormData(
  state: ReleaseFormState,
  { status, currentStep }: BuildFormDataOptions,
): FormData {
  const form = new FormData();

  appendText(form, "name", state.releaseName);
  appendText(form, "subtitle", state.subtitle);
  form.append("type", state.releaseType);
  appendText(form, "genre", state.genre);
  appendText(form, "upc", state.upc);
  appendText(form, "label_name", state.labelName);
  appendText(form, "release_date", toApiDate(state.releaseDate));

  appendBoolean(form, "is_previously_released", state.previouslyReleased);
  if (state.previouslyReleased) {
    appendText(
      form,
      "original_release_date",
      toApiDate(state.previousReleaseDate),
    );
  }

  form.append("current_step", String(currentStep));
  form.append("status", status);

  if (state.coverFile) {
    form.append("cover_file", state.coverFile);
  }

  const { files: audioFiles } = buildAudioUploadPlan(state.tracks);
  audioFiles.forEach((file) => form.append("audio_files", file));

  appendBoolean(form, "all_ad_platforms", state.allAdPlatforms);
  if (!state.allAdPlatforms) {
    appendList(form, "selected_platforms", state.selectedPlatforms);
  }

  form.append("territory_scope", state.territoryScope);

  const selectedCountries =
    state.territoryScope === "CERTAIN" ? state.selectedCountries : [];
  appendList(form, "selected_countries", selectedCountries);

  TERRITORY_REGIONS.forEach((region) => {
    const codes = region.countries
      .map((item) => item.code)
      .filter((code) => selectedCountries.includes(code));
    appendList(form, region.apiField, codes);
  });

  appendList(form, "sound_cloud", state.soundCloudLinks);

  if (!state.noArtistProfilesYet) {
    appendText(form, "yandex_music", state.artistProfiles.yandexMusic);
    appendText(form, "vk_music", state.artistProfiles.vkMusic);
    appendText(form, "spotify", state.artistProfiles.spotify);
    appendText(form, "apple_music", state.artistProfiles.appleMusic);
  }

  appendBoolean(form, "my_first_release", state.noArtistProfilesYet);
  appendBoolean(form, "is_terms_agreed", state.agreed);

  state.persons
    .filter((person) => person.name.trim() && person.role)
    .forEach((person, index) => {
      form.append(`persons[${index}][name]`, person.name.trim());
      form.append(`persons[${index}][role]`, person.role);
    });

  state.tracks.forEach((track, index) => {
    const prefix = `tracks[${index}]`;
    form.append(`${prefix}[track_no]`, String(index + 1));
    appendText(form, `${prefix}[name]`, track.trackName);
    appendText(form, `${prefix}[subtitle]`, track.subtitle);
    appendText(form, `${prefix}[isrc]`, track.isrc);
    appendText(form, `${prefix}[c_sound_recording]`, track.soundRecording);
    appendText(
      form,
      `${prefix}[p_phonogram_producer]`,
      track.phonogramProducer,
    );
    appendBoolean(
      form,
      `${prefix}[is_own_100_percent_rights]`,
      track.ownsFullRights,
    );
    form.append(
      `${prefix}[start_pre_listening_sec]`,
      String(Number(track.preListeningSeconds) || 0),
    );
    appendText(form, `${prefix}[language]`, track.trackLanguage);
    form.append(`${prefix}[version]`, track.trackVersion);

    track.persons
      .filter((person) => person.name.trim() && person.role)
      .forEach((person, personIndex) => {
        form.append(
          `${prefix}[persons][${personIndex}][name]`,
          person.name.trim(),
        );
        form.append(`${prefix}[persons][${personIndex}][role]`, person.role);
      });

    track.authors
      .filter((author) => author.musicAuthor.trim() || author.wordsAuthor.trim())
      .forEach((author, authorIndex) => {
        const authorPrefix = `${prefix}[music_authors][${authorIndex}]`;
        appendText(
          form,
          `${authorPrefix}[music_author_name]`,
          author.musicAuthor,
        );
        appendText(form, `${authorPrefix}[author_words]`, author.wordsAuthor);
      });
  });

  return form;
}

export function getStepValidationError(
  state: ReleaseFormState,
  step: ReleaseStepKey,
): string | null {
  if (step === "release-info") {
    if (!state.releaseName.trim()) return "Add a release name to continue.";
    if (!state.genre) return "Select a genre to continue.";
    if (!state.persons.some((person) => person.name.trim() && person.role)) {
      return "Add at least one person with a role.";
    }
    return null;
  }

  if (step === "upload-tracks") {
    if (state.tracks.length === 0) return "Add at least one track.";
    if (state.tracks.some((track) => !track.trackName.trim())) {
      return "Every track needs a name.";
    }
    if (
      state.tracks.some((track) => !track.file && !track.existingAudioName)
    ) {
      return "Every track needs an audio file.";
    }
    return getAudioOrderError(state.tracks);
  }

  if (step === "distribution") {
    if (!state.allAdPlatforms && state.selectedPlatforms.length === 0) {
      return "Select at least one platform.";
    }
    if (
      state.territoryScope === "CERTAIN" &&
      state.selectedCountries.length === 0
    ) {
      return "Select at least one country.";
    }
    return null;
  }

  if (!state.agreed) return "Confirm the information is correct to submit.";
  return null;
}

export function getMissingFields(release: ApiRelease): string[] {
  const missing: string[] = [];

  if (!release.name) missing.push("Release name");
  if (!release.cover_url) missing.push("Cover art");
  if (!release.genre) missing.push("Genre");
  if (!release.release_date) missing.push("Release date");
  if (!release.label_name) missing.push("Label name");
  if (!release.persons?.length) missing.push("Artist credits");

  const tracks = release.tracks ?? [];
  if (tracks.length === 0) {
    missing.push("Track listing");
  } else {
    if (tracks.some((track) => !track.audioUrl)) missing.push("Track audio");
    if (tracks.some((track) => !track.isrc)) missing.push("ISRC codes");
  }

  if (!release.selected_platforms?.length && !release.all_ad_platforms) {
    missing.push("Platforms");
  }

  return missing;
}

const SESSION_KEY = "zvonsystem:release-draft";

type PersistedTrack = Omit<TrackForm, "file">;
type PersistedForm = Omit<ReleaseFormState, "coverFile" | "tracks"> & {
  tracks: PersistedTrack[];
};

export function saveFormToSession(state: ReleaseFormState) {
  if (typeof window === "undefined") return;

  const { coverFile, tracks, ...rest } = state;
  void coverFile;

  const persisted: PersistedForm = {
    ...rest,
    tracks: tracks.map(({ file, ...track }) => {
      void file;
      return track;
    }),
  };

  try {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(persisted));
  } catch {
    // Storage can be full or blocked; the in-memory state still works.
  }
}

export function readFormFromSession(): ReleaseFormState | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as PersistedForm;

    return {
      ...createEmptyForm(),
      ...parsed,
      coverFile: null,
      tracks: parsed.tracks?.map((track) => ({ ...track, file: null })) ?? [
        createEmptyTrack(true),
      ],
    };
  } catch {
    return null;
  }
}

export function clearFormSession() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(SESSION_KEY);
}

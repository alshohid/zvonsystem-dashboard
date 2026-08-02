const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const defaultApiBaseUrl = "http://192.168.7.42:4010/api";

const toBoolean = (value: string | undefined, fallback: boolean) => {
  if (value == null) {
    return fallback;
  }

  return !["0", "false", "no", "off"].includes(value.toLowerCase());
};

export const env = {
  apiBaseUrl: trimTrailingSlash(
    process.env.NEXT_PUBLIC_API_BASE_URL ?? defaultApiBaseUrl,
  ),
  // Uploads come back as storage paths, so a public base is needed to show them.
  mediaBaseUrl: trimTrailingSlash(process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? ""),
  designMode: toBoolean(process.env.NEXT_PUBLIC_DESIGN_MODE, false),
};

export const resolveMediaUrl = (path?: string | null) => {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  if (!env.mediaBaseUrl) return null;

  return `${env.mediaBaseUrl}/${path.replace(/^\/+/, "")}`;
};

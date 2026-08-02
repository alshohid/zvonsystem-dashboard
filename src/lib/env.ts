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


/** Keeps only the path part of a value, so `http://host:5050/a/b` becomes `/a/b`. */
const toPathname = (value: string) => {
  const match = /^[a-z][a-z\d+.-]*:\/\/[^/]*(\/.*)?$/i.exec(value);
  return match ? (match[1] ?? "/") : value;
};

const trimSlashes = (value: string) => value.replace(/^\/+|\/+$/g, "");
export const resolveMediaUrl = (path?: string | null) => {
  const raw = path?.trim();
  if (!raw || !env.mediaBaseUrl) return null;

  const basePath = trimSlashes(toPathname(env.mediaBaseUrl));
  let storagePath = trimSlashes(toPathname(raw));

  // Tolerate a base that already carries the storage prefix the path repeats.
  if (
    basePath &&
    (storagePath === basePath || storagePath.startsWith(`${basePath}/`))
  ) {
    storagePath = trimSlashes(storagePath.slice(basePath.length));
  }

  if (!storagePath) return null;

  return `/api/media?path=${encodeURIComponent(storagePath)}`;
};

import type { NextRequest } from "next/server";
import { env } from "@/src/lib/env";

const FORWARDED_HEADERS = [
  "content-type",
  "content-length",
  "content-range",
  "accept-ranges",
  "etag",
  "last-modified",
];


export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");

  if (!env.mediaBaseUrl) {
    return new Response("Media base URL is not configured", { status: 501 });
  }

  if (!path || path.includes("..") || /^[a-z][a-z\d+.-]*:/i.test(path)) {
    return new Response("Invalid media path", { status: 400 });
  }

  const range = request.headers.get("range");

  const upstream = await fetch(
    `${env.mediaBaseUrl}/${path.replace(/^\/+/, "")}`,
    {
      headers: {
        "ngrok-skip-browser-warning": "1",
        ...(range ? { range } : {}),
      },
      cache: "no-store",
    },
  );

  if (!upstream.ok && upstream.status !== 206) {
    return new Response("Media not found", { status: upstream.status });
  }

  const headers = new Headers();
  FORWARDED_HEADERS.forEach((header) => {
    const value = upstream.headers.get(header);
    if (value) headers.set(header, value);
  });
  headers.set("cache-control", "public, max-age=3600");

  return new Response(upstream.body, { status: upstream.status, headers });
}

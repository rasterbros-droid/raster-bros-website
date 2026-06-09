/** Normalize any YouTube input (ID, URL, or iframe HTML) into an embed URL. */
export function resolveYoutubeEmbedUrl(
  input: string | null | undefined,
): string | null {
  if (!input?.trim()) return null;

  const value = input.trim();

  if (value.toLowerCase().startsWith("<iframe")) {
    const match = value.match(/src=["']([^"']+)["']/i);
    return match?.[1] ? normalizeYoutubeUrl(match[1]) : null;
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return normalizeYoutubeUrl(value);
  }

  // Plain video ID, optionally with ?si=… query params
  return `https://www.youtube.com/embed/${value}`;
}

function normalizeYoutubeUrl(url: string): string | null {
  if (url.includes("youtube.com/embed/")) return url;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace("www.", "");

    if (host === "youtu.be") {
      const videoId = parsed.pathname.replace("/", "");
      return videoId
        ? `https://www.youtube.com/embed/${videoId}${parsed.search}`
        : null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname === "/watch") {
        const videoId = parsed.searchParams.get("v");
        return videoId
          ? `https://www.youtube.com/embed/${videoId}${parsed.search}`
          : null;
      }

      if (parsed.pathname.startsWith("/shorts/")) {
        const videoId = parsed.pathname.split("/")[2];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }
    }
  } catch {
    return null;
  }

  return null;
}

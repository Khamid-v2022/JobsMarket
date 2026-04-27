const DEFAULT_BACKEND_URL = "http://localhost:8000";

function normalizeBaseUrl(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function getBackendBaseUrl(): string {
  return normalizeBaseUrl(
    process.env.API_BASE_URL ?? process.env.BACKEND_URL ?? DEFAULT_BACKEND_URL,
  );
}

export function buildBackendUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${getBackendBaseUrl()}${normalizedPath}`;
}
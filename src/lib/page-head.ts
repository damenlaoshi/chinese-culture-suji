export const APP_NAME = "中国文化速记";

export function pageHead(title?: string) {
  const full = title && title !== APP_NAME ? `${title} · ${APP_NAME}` : APP_NAME;
  return { meta: [{ title: full }] };
}

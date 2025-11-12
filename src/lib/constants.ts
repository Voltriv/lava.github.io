export const SITE_HOSTNAME = 'https://lava.github.io';
export const MEDIA_BASE_PATH = `${SITE_HOSTNAME}/pics%20and%20vid`;
export const HERO_BACKGROUND = `${SITE_HOSTNAME}/sample.jpg`;
export const BIRTHDAY_DATE = new Date('November 30, 2025 00:00:00');

export function mediaAsset(path: string) {
  return `${MEDIA_BASE_PATH}/${path}`;
}

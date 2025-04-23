export function normalizeSlug({
  slug,
}: {
  slug: string;
}) {
  return slug.split(`?`)[0].split(`#`)[0];
}
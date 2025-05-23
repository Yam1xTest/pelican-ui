import { createHash } from "crypto";

export function getHash({
  content,
}: {
  content: string;
}) {
  const hash = createHash(`sha256`)
    .update(content)
    .digest(`base64`);

  return `sha256-${hash}`;
}

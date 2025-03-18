import Link from "next/link";

export function ExitPreviewLink() {
  return (
    <Link
      className="button button--secondary exit-preview-link"
      href="/api/exit-preview"
    >
      Выйти из режима черновика
    </Link>
  );
}

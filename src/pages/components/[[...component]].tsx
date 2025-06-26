import Link from "next/link";
import { useRouter } from "next/router";

export default function ComponentsPage() {
  const {
    query,
  } = useRouter();

  return (
    <div className="container components-page">
      <ul className="components-page__list">
        <li className="components-page__item">
          <Link href="hero">Hero</Link>
        </li>

        <li className="components-page__item">
          <Link href="hero">Hero</Link>
        </li>

        <li className="components-page__item">
          <Link href="hero">Hero</Link>
        </li>
      </ul>
    </div>

  );
}

ComponentsPage.getLayout = (page: React.ReactNode) => page;

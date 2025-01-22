import { GlobalComponentProps } from "@/src/common/types";
import Link from "next/link";
import { useRouter } from "next/router";

export function HeaderNavigation({
  className,
  navigationLinks,
}: {
  className?: string
  navigationLinks: GlobalComponentProps['navigationLinks'],
}) {
  const router = useRouter();

  return (
    <nav className={`${className} header-navigation`}>
      <ul className="header-navigation__list">
        {navigationLinks.map(({
          id,
          name,
          link,
        }) => (
          <li
            key={id}
            className="header-navigation__item"
          >
            <Link
              href={link}
              className="header-navigation__link"
              onClick={(e) => {
                e.preventDefault();
                if (router.pathname !== link) {
                  router.push(link);
                }
              }}
              aria-label={`Перейти на страницу ${name}`}
              data-testid="header-navigation-link"
            >
              {name}
            </Link>
          </li>
        ))}
        {/* TODO: Remove when the page appears */}
        <li
          key="2"
          className="header-navigation__item"
        >
          <Link
            href="/documents/Visiting-rules.pdf"
            className="header-navigation__link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Перейти на страницу Правила посещения"
            data-testid="header-navigation-link"
          >
            Правила посещения
          </Link>
        </li>
      </ul>
    </nav>
  );
}

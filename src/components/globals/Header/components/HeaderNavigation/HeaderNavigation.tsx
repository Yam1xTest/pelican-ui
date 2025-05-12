import { GlobalComponentProps } from "@/src/common/types";
import Link from "next/link";
import { useRouter } from "next/router";

export function HeaderNavigation({
  className,
  navigationLinks,
  handleMobileMenuToggle,
}: {
  className?: string;
  navigationLinks: GlobalComponentProps['navigationLinks'];
  handleMobileMenuToggle?: () => void;
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
                if (router.pathname === link) {
                  e.preventDefault();
                }

                handleMobileMenuToggle?.();
              }}
              aria-label={`Перейти на страницу ${name}`}
              data-testid="header-navigation-link"
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

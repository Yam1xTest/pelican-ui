import { useWindowWidth } from "@/src/common/hooks/useWindowSize";
import Image from "next/image";
import Link from "next/link";
import { AppRoute } from "@/src/common/enum";
import Logo from '../../../../../../public/images/header/logo.svg';
import LogoDesktop from '../../../../../../public/images/header/logo-desktop.svg';

export function HeaderLogo({
  className,
  isMobileMenuOpen,
  handleMobileMenuToggle,
}: {
  className: string;
  isMobileMenuOpen: boolean;
  handleMobileMenuToggle: () => void;
}) {
  const {
    isDesktop,
  } = useWindowWidth();

  return (
    <Link
      className={`${className} header-logo`}
      href={AppRoute.HOME}
      aria-label="Ссылка на главную страницу"
      data-testid="header-logo"
      onClick={() => {
        if (isMobileMenuOpen) {
          handleMobileMenuToggle();
        }
      }}
    >
      <Image
        src={getLogo({
          isDesktopSize: isDesktop,
        })}
        priority
        unoptimized
        alt="Логотип челябинского зоопарка"
        aria-hidden="true"
      />
    </Link>
  );

  function getLogo({
    isDesktopSize,
  }: {
    isDesktopSize: boolean;
  }) {
    if (isDesktopSize) {
      return LogoDesktop;
    }

    return Logo;
  }
}

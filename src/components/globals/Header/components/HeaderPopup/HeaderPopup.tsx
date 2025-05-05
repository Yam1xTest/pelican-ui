import { GlobalComponentProps } from "@/src/common/types";
import { useTicketPopup } from "@/src/common/hooks/useTicketPopup";
import { useEffect, useRef } from "react";
import clsx from "clsx";
import { SocialMedia } from "../../../SocialNetwork/SocialMedia";
import { HeaderNavigation } from "../HeaderNavigation/HeaderNavigation";

export function HeaderPopup({
  className,
  isActive,
  navigationLinks,
  email,
  phone,
  popupTicketBuyText,
  handleMobileMenuToggle,
}: Pick <GlobalComponentProps, "navigationLinks" | "email" | "phone" | "popupTicketBuyText"> & {
  isActive: boolean;
  className: string;
  handleMobileMenuToggle: () => void;
}) {
  const {
    handleTicketPopupToggle,
  } = useTicketPopup();

  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (popupRef.current) {
      popupRef.current.style.maxHeight = isActive
        ? `${popupRef.current.scrollHeight}px`
        : `0`;
    }
  }, [isActive]);

  return (
    <div
      className={clsx(`${className} container header-popup`, {
        'header-popup--visible': isActive,
      })}
      data-testid="header-popup"
      ref={popupRef}
    >
      <button
        type="button"
        className="header-popup__ticket-button"
        onClick={() => {
          handleMobileMenuToggle();
          handleTicketPopupToggle();
        }}
        aria-label="Открыть модальное окно с билетами"
        data-testid="header-popup-ticket-button"
      >
        {popupTicketBuyText}
      </button>

      <HeaderNavigation
        className="header-popup__nav"
        navigationLinks={navigationLinks}
        handleMobileMenuToggle={handleMobileMenuToggle}
      />

      <div className="header-popup__footer">
        <div className="header-popup__contact">
          <a
            href={`tel:${phone}`}
            className="header-popup__phone"
            aria-label={`Связаться с нами по телефону ${phone}`}
            data-testid="header-popup-phone"
          >
            {phone}
          </a>
          <a
            href={`mailto:${email}`}
            className="header-popup__email"
            aria-label={`Связаться с нами по почте ${email}`}
            data-testid="header-popup-email"
          >
            {email}
          </a>
        </div>

        <div className="header-popup__social-media">
          <SocialMedia
            className="header-popup__social-icon"
          />
        </div>
      </div>
    </div>
  );
}

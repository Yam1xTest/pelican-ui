import { useTicketPopup } from "@/src/common/hooks/useTicketPopup";
import { useWindowWidth } from "@/src/common/hooks/useWindowSize";
import { TicketsComponentProps } from "@/src/common/types";
import Link from "next/link";
import { Button } from "../../globals/Button/Button";
import { TicketCard } from "../../globals/TicketCard/TicketCard";

export function HomepageTickets({
  generalTicketsTitle,
  generalTicketsLink,
  subsidizedTicketsTitle,
  generalTickets,
  subsidizedTickets,
  subsidizedTicketsSubtitle,
}: Omit<TicketsComponentProps, 'id' | '__component'>) {
  const {
    isTablet,
    isMobile,
    isTabletXl,
  } = useWindowWidth();

  const {
    handleTicketPopupToggle,
  } = useTicketPopup();

  return (
    <div
      className="tickets"
      data-testid="tickets"
    >
      <div className="tickets__inner container">
        <div className="tickets__group">
          <div className="tickets__head">
            <h2 className="tickets__title">{generalTicketsTitle}</h2>
          </div>
          <ul className="tickets__list">
            {generalTickets.map((el) => (
              <TicketCard
                className="tickets__item"
                key={el.id}
                ticket={el}
                isGeneral
                link={generalTicketsLink}
              />
            ))}
            {isTablet && !isTabletXl && (
              <li className="tickets__item tickets__item--button">
                <Button
                  className="tickets__ticket-button"
                  theme="primary"
                  onClick={handleTicketPopupToggle}
                >
                  Купить билет
                </Button>
              </li>
            )}
          </ul>
          {isMobile && (
            <Button
              className="tickets__ticket-button"
              theme="primary"
              onClick={handleTicketPopupToggle}
              data-testid="tickets-buy-button"
            >
              Купить билет
            </Button>
          )}
        </div>
        <div className="tickets__group">
          <div className="tickets__head">
            <h2 className="tickets__title">{subsidizedTicketsTitle}</h2>
            <p className="tickets__subtitle">{subsidizedTicketsSubtitle}</p>
          </div>
          <ul className="tickets__list">
            {subsidizedTickets?.map((el) => (
              <TicketCard
                className="tickets__item"
                key={el.id}
                ticket={el}
                isSubsidized
              />
            ))}
            {
              isTablet && (
                <li className="tickets__item tickets__item--link">
                  <p>
                    С остальными льготными категориями вы можете ознакомиться
                    <Link
                      className="tickets__link text-link"
                      // TODO: Remove when the page appears
                      href="https://vk.com/topic-71671982_48253263"
                      aria-label="Перейти на страницу со списком льгот"
                      data-testid="tickets-discounts-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      по ссылке.
                    </Link>
                  </p>
                </li>
              )
            }
          </ul>
          {
            isMobile
             && (
               <Link
                 // TODO: Remove when the page appears
                 href="https://vk.com/topic-71671982_48253263"
                 className="tickets__ticket-button button button--primary"
                 data-testid="tickets-all-discounts"
               >
                 Другие льготы
               </Link>
             )
          }
        </div>
      </div>
    </div>
  );
}

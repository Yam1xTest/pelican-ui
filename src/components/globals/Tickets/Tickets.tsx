import { TicketsComponentProps } from "@/src/common/types";
import { Button } from "@/src/components/globals/Button/Button";
import Link from "next/link";
import { useWindowWidth } from "@/src/common/hooks/useWindowSize";
import { useTicketPopup } from "@/src/common/hooks/useTicketPopup";
import clsx from "clsx";
import { TicketCard } from "../TicketCard/TicketCard";

export function Tickets({
  generalTicketsTitle,
  generalTicketsSubtitle,
  generalTicketsLink,
  subsidizedTicketsTitle,
  generalTickets,
  subsidizedTickets,
  subsidizedTicketsSubtitle,
  isContactZoo,
  contactZooNote,
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
      className={clsx(
        `tickets`,
        {
          'tickets--contact-zoo': isContactZoo,
        },
      )}
      data-testid="tickets"
    >
      <div className="tickets__inner container">
        <div className="tickets__group">
          <div className="tickets__head">
            <h2 className="tickets__title">{generalTicketsTitle}</h2>
            {isContactZoo
          && <p className="tickets__subtitle">{generalTicketsSubtitle}</p>}
          </div>
          <ul className="tickets__list">
            {generalTickets.map((el) => (
              <TicketCard
                className="tickets__item"
                key={el.id}
                ticket={el}
                isGeneral
                link={generalTicketsLink}
                isContactZoo={isContactZoo}
              />
            ))}
            {!isContactZoo && isTablet && !isTabletXl && (
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

            {isContactZoo && (
              <li className="tickets__item tickets__item--info">
                {contactZooNote}
              </li>
            )}
          </ul>
          {(isMobile && !isContactZoo) && (
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
        {
          !isContactZoo
          && (
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
                    link=""
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
                 href="#"
                 className="tickets__ticket-button button button--primary"
                 data-testid="tickets-all-discounts"
               >
                 Другие льготы
               </Link>
             )
              }
            </div>
          )
        }
      </div>
    </div>
  );
}

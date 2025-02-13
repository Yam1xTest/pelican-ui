import { ServicesComponentProps } from "@/src/common/types";
import { Cards } from "../../globals/Cards/Cards";

export function Services({
  title,
  cards,
  phone,
  email,
}: Omit<ServicesComponentProps, 'id' | '__component'> & {
}) {
  return (
    <Cards
      className="services"
      dataTestId="services"
      title={title}
      cards={cards}
      listChildren={(
        <>
          <li>
            <a
              href={`tel:${phone}`}
              data-testid="services-phone-link"
            >
              <span
                className="services__button button button--secondary"
              >
                {`Уточнить вопросы можно\nпо телефону: ${phone}`}
              </span>
            </a>
          </li>
          <li>
            <a
              href={`mailto:${email}`}
              data-testid="services-email-link"
            >
              <span
                className="services__button button button--primary"
              >
                {`Запись осуществляется\nпо почте: ${email}`}
              </span>
            </a>
          </li>
        </>
      )}
    />
  );
}

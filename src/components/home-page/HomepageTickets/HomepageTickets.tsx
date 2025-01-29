import { TicketsComponentProps } from "@/src/common/types";
import { Tickets } from "../../globals/Tickets/Tickets";

export function HomepageTickets({
  generalTicketsTitle,
  generalTicketsLink,
  subsidizedTicketsTitle,
  generalTickets,
  subsidizedTickets,
  subsidizedTicketsSubtitle,
}: Omit<TicketsComponentProps, 'id' | '__component'>) {
  return (
    <Tickets
      generalTicketsTitle={generalTicketsTitle}
      generalTicketsLink={generalTicketsLink}
      subsidizedTicketsTitle={subsidizedTicketsTitle}
      generalTickets={generalTickets}
      subsidizedTickets={subsidizedTickets}
      subsidizedTicketsSubtitle={subsidizedTicketsSubtitle}
    />
  );
}

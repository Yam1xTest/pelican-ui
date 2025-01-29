import { TicketsComponentProps } from "@/src/common/types";
import { Tickets } from "../../globals/Tickets/Tickets";

export function ContactZooTickets({
  generalTicketsTitle,
  generalTicketsLink,
  generalTickets,
}: Omit<TicketsComponentProps, 'id' | '__component'>) {
  return (
    <Tickets
      generalTicketsTitle={generalTicketsTitle}
      generalTicketsLink={generalTicketsLink}
      generalTickets={generalTickets}
    />
  );
}

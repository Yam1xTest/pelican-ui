import { TicketsComponentProps } from "@/src/common/types";
import { Tickets } from "../../globals/Tickets/Tickets";

export function ContactZooTickets({
  generalTicketsTitle,
  generalTicketsSubtitle,
  generalTicketsLink,
  generalTickets,
  contactZooNote,
}: Omit<TicketsComponentProps, 'id' | '__component'>) {
  return (
    <Tickets
      generalTicketsTitle={generalTicketsTitle}
      generalTicketsSubtitle={generalTicketsSubtitle}
      generalTicketsLink={generalTicketsLink}
      generalTickets={generalTickets}
      isContactZoo
      contactZooNote={contactZooNote}
    />
  );
}

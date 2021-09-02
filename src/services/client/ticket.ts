import Ticket from "@/entities/Ticket";

export async function getTickets() {
  const tickets = await Ticket.find({
    relations: ["type"],
  });

  const result = tickets.map((item) => ({
    id: item.id,
    price: item.type.price,
    name: item.type.name,
  }));

  return result;
}

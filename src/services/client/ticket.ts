import Ticket from "@/entities/Ticket";

export async function getTickets() {
  const tickets = await Ticket.find({
    relations: ["type"],
  });

  const result = tickets.map((item) => ({
    price: item.price,
    name: item.type.name,
  }));

  return result;
}

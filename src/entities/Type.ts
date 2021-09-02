import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
} from "typeorm";
import Ticket from "./Ticket";

@Entity("types")
export default class Type extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Ticket, (ticket: Ticket) => ticket.type, { eager: true })
  ticket: Ticket;
}

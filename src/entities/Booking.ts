import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
} from "typeorm";
import User from "./User";
import Modality from "./Modality";
import Lodge from "./Lodge";
import BookingData from "@/interfaces/booking";

@Entity("bookings")
export default class Booking extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  value: number;

  @Column()
  modalityId: number;

  @Column({ nullable: true })
  lodgeId: number;

  @OneToOne(() => User, (user: User) => user.booking)
  user: User;

  @ManyToOne(() => Modality, (modality: Modality) => modality.booking)
  modality: Modality;

  @ManyToOne(() => Lodge, (lodge: Lodge) => lodge.booking)
  lodge: Lodge;

  static async createBooking(data: BookingData) {
    // validar se nao eh duplicado
    const newBooking = this.create(data);
    await newBooking.save();

    return newBooking;
  }
}

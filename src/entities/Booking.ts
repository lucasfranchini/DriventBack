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
import ConflictError from "@/errors/ConflictError";
import UnprocessableEntity from "@/errors/UnprocessableEntity";
import Unauthorized from "@/errors/Unauthorized";

@Entity("bookings")
export default class Booking extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userId: number;

  @Column()
  value: number;

  @Column()
  modalityId: number;

  @Column({ nullable: true })
  lodgeId: number;

  @OneToOne(() => User, (user: User) => user.booking)
  user: User;

  @ManyToOne(() => Modality, (modality: Modality) => modality.booking, {
    eager: true,
  })
  modality: Modality;

  @ManyToOne(() => Lodge, (lodge: Lodge) => lodge.booking, { eager: true })
  lodge: Lodge;

  static async createBooking(data: BookingData) {
    const bookedUser = await this.findOne({ where: { userId: data.userId } });
    if (bookedUser) throw new ConflictError("O usuário já tem uma reserva");
    if (data.lodgeId) {
      const existingLodge = await Lodge.findOne({
        where: { id: data.lodgeId },
      });
      if (!existingLodge) {
        throw new UnprocessableEntity("Tipo de acomodação não existente");
      }
    }
    const existingModality = await Modality.findOne({
      where: { id: data.modalityId },
    });
    if (!existingModality) {
      throw new UnprocessableEntity("Tipo de modalidade não existente");
    }
    const newBooking = this.create(data);
    await newBooking.save();
    return newBooking;
  }

  static async getBooking(userId: number) {
    const booking = await this.findOne({ where: { userId } });
    if (!booking) throw new Unauthorized();
    return booking;
  }
}

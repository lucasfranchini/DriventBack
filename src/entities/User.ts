import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from "typeorm";
import bcrypt from "bcrypt";
import EmailNotAvailableError from "@/errors/EmailNotAvailable";
import HotelReservation from "@/entities/HotelReservation";
import Booking from "./Booking";
import Activity_User from "./Activity_User";
import InvalidEmailError from "@/errors/InvalidEmail";

@Entity("users")
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @OneToOne(() => HotelReservation, (hotelReservation) => hotelReservation.user)
  hotelReservation: HotelReservation;

  @OneToOne(() => Booking, (booking: Booking) => booking.user)
  booking: Booking;

  @OneToMany(() => Activity_User, (activity: Activity_User) => activity.user, {
    eager: true,
  })
  activity: Activity_User;

  static async createNew(email: string, password: string) {
    await this.validateDuplicateEmail(email);
    const hashedPassword = this.hashPassword(password);

    const newUser = this.create({ email, password: hashedPassword });
    await newUser.save();

    return newUser;
  }

  static hashPassword(password: string) {
    return bcrypt.hashSync(password, 12);
  }

  static async validateDuplicateEmail(email: string) {
    const user = await this.findOne({ email });

    if (user) {
      throw new EmailNotAvailableError(email);
    }
  }

  static async findByEmailAndPassword(email: string, password: string) {
    const user = await this.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }

    return null;
  }

  static async verifyEmail(email: string) {
    const user = await this.findOne({ email });
    if(!user) throw new InvalidEmailError(email);
  }
}

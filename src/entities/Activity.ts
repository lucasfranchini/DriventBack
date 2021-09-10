import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import Location from "./Location";
import Activity_User from "./Activity_User";

@Entity("activities")
export default class Activity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  title: string;

  @Column()
  start_hour: string;

  @Column()
  end_hour: string;

  @Column()
  remaining_seats: number;

  @ManyToOne(() => Location, {
    eager: true,
  })
  location: Location;

  @OneToMany(
    () => Activity_User,
    (activity_user: Activity_User) => activity_user.activities
  )
  activities: Activity_User;

  static async getDates() {
    const activitiesDates = await this.createQueryBuilder("activities")
      .select("date")
      .distinct(true)
      .orderBy("date", "ASC")
      .getRawMany();
    return activitiesDates;
  }

  static async getActivityByDate(date: Date) {
    const activities = await this.find({
      where: { date },
    });
    return activities;
  }
}

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
import UnprocessableEntity from "@/errors/UnprocessableEntity";

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
    const activities = await this.find({ where: { date } });
    activities.sort((a, b) => (Number(a.start_hour.replace(":", "")) > Number(b.start_hour.replace(":", "")) ? 1 : -1));

    return activities;
  }

  static async subscribe(userId: number, activityId: number) {
    const activity = await this.findOne({
      where: { id: activityId },
    });
    const userInstance = await Activity_User.findOne({ where: { userId, activitiesId: activityId } } );
    if (!activity) throw new UnprocessableEntity("Atividade não existente.");
    if (activity.remaining_seats === 0 ) throw new UnprocessableEntity("A atividade já está cheia.");
    if (userInstance) throw new UnprocessableEntity("O usuário já está cadastrado nessa atividade");
    activity.remaining_seats -= 1;
    await activity.save();
    await Activity_User.insert({ userId, activitiesId: activityId } );
  }
}

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
import ConflictError from "@/errors/ConflictError";

@Entity("activities")
export default class Activity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  title: string;

  @Column({ type: "time" })
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
    const activities = await this.createQueryBuilder("activities")
      .leftJoinAndSelect("activities.location", "location")
      .where("activities.date = :date", { date })
      .orderBy("start_hour", "ASC")
      .getMany();

    return activities;
  }

  static checkConflict(activitiesArr: Activity_User[], activity: Activity) {
    for (let i = 0; i < activitiesArr.length; i++) {
      const current = activitiesArr[i];
      if (String(current.activities.date) === String(activity.date)) {
        if (
          (current.activities.start_hour >= activity.start_hour && current.activities.start_hour < activity.end_hour) ||
          (current.activities.end_hour >= activity.start_hour && current.activities.end_hour <= activity.end_hour) ||
          (current.activities.start_hour <= activity.start_hour && current.activities.end_hour >= activity.end_hour)||
          (current.activities.start_hour >= activity.start_hour && current.activities.end_hour <= activity.end_hour)
        ) {
          throw new ConflictError("O usuário já está inscrito em uma atividade nesse horário");
        } 
      } 
    }
  }

  static async subscribe(userId: number, activityId: number) {
    const activity = await this.findOne({
      where: { id: activityId },
    });
    const userInstance = await Activity_User.findOne({ where: { userId, activitiesId: activityId } } );
    if (!activity) throw new UnprocessableEntity("Atividade não existente.");
    if (activity.remaining_seats === 0 ) throw new UnprocessableEntity("A atividade já está cheia.");
    if (userInstance) throw new UnprocessableEntity("O usuário já está cadastrado nessa atividade");
    const allUserActivities = await Activity_User.find({ where: { userId }, relations: ["activities"] });
    this.checkConflict(allUserActivities, activity);
    activity.remaining_seats -= 1;
    await activity.save();
    await Activity_User.insert({ userId, activitiesId: activityId } );
  }
}

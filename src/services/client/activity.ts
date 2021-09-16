import Activity from "@/entities/Activity";
import Activity_User from "@/entities/Activity_User";

export async function getAllDates() {
  const result = await Activity.getDates();
  return result;
}

export async function getActivitiesByDate(date: Date, userId: number) {
  const allActivities = await Activity.getActivityByDate(date);
  const userActivities = await Activity_User.getUsersActivities(userId);
  const result = { activities: allActivities, userActivities };
  return result;
}

export async function subscribe(userId: number, activityId: number) {
  const result = await Activity.subscribe(userId, activityId);
  return result;
}

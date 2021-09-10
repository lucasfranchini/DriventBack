import Activity from "@/entities/Activity";

export async function getAllDates() {
  const result = await Activity.getDates();
  return result;
}

export async function getActivitiesByDate(date: Date) {
  const result = await Activity.getActivityByDate(date);
  return result;
}

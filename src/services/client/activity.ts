import Activity from "@/entities/Activity";

export async function getAllDates() {
  const result = await Activity.getDates();
  return result;
}

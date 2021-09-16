import Activity from "../../src/entities/Activity";
import Activity_User from "../../src/entities/Activity_User";
import { createLocation } from "./loationFactory";

export async function createActivity() {
  const locations = await createLocation(3);

  const activities = [
    { 
      date: "2021-09-28 00:00:00",
      title: "Bootbar",
      start_hour: "9:00",
      end_hour: "12:00",
      remaining_seats: 15,
      locationId: locations[0].id,
    },
    {
      date: "2021-09-27 00:00:00",
      title: "Bootbar",
      start_hour: "9:00",
      end_hour: "12:00",
      remaining_seats: 15,
      locationId: locations[1].id,
    },
    {
      date: "2021-09-27 00:00:00",
      title: "Bootbar",
      start_hour: "9:00",
      end_hour: "12:00",
      remaining_seats: 15,
      locationId: locations[0].id,
    },
    {
      date: "2021-09-26 00:00:00",
      title: "Bootbar",
      start_hour: "9:00",
      end_hour: "12:00",
      remaining_seats: 15,
      locationId: locations[2].id,
    },
    {
      date: "2021-09-28 00:00:00",
      title: "Bootbar",
      start_hour: "9:00",
      end_hour: "12:00",
      remaining_seats: 15,
      locationId: locations[1].id,
    },
  ];

  for (let i = 0; i < activities.length; i++) {
    await Activity.insert(activities[i]);
  }

  return activities;
}


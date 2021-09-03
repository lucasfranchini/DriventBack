import Lodge from "@/entities/Lodge";

export async function getLodgeOptions() {
  const lodges = await Lodge.find();
  return lodges;
}

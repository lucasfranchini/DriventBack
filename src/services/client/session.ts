import { promisify } from "util";
import  client  from "@/redis";

export async function findUserSessionByToken(token: string) {
  const getAsync = promisify(client.get).bind(client);
  const userSession = await getAsync(token);

  return userSession;
}

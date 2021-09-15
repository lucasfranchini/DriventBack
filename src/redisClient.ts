import redis from "redis";
import errorHandlingMiddleware from "@/middlewares/errorHandlingMiddleware";

const client = redis.createClient({ url: process.env.REDIS_URL });

client.on("error", errorHandlingMiddleware);

export default client;

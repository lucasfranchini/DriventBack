import "@/setup";

import express from "express";
import "express-async-errors";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "@/database";
import errorHandlingMiddleware from "@/middlewares/errorHandlingMiddleware";
import router from "@/routers";
import redis from "redis";

const app = express();
app.use(cors());
app.use(express.json());

const client = redis.createClient();

app.get("/health", (_req, res) => {
  res.send("OK!");
});

app.use(router);
app.use(errorHandlingMiddleware);

client.on("error", errorHandlingMiddleware);

export async function init() {
  await connectDatabase();
}

export { client };
export default app;

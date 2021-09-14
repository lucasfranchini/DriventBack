import faker from "faker";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import { client } from "../../src/app";
import User from "../../src/entities/User";

export async function createUser() {
  const user = User.create({
    email: faker.internet.email(),
    password: "123456"
  });

  await user.save();
  
  return user;
}

export async function CreateSession() {
  const user = await createUser();
  const token = jwt.sign({
    userId: user.id
  }, process.env.JWT_SECRET);
  const setAsync = promisify(client.set).bind(client);
  await setAsync(token, `${user.id}`);
  return { token, user };
} 

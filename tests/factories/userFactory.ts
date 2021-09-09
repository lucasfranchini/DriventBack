import faker from "faker";
import jwt from "jsonwebtoken";
import User from "../../src/entities/User";
import Session from "../../src/entities/Session";

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
  const session =  await Session.createNew(user.id, token);
  return { session, user };
} 

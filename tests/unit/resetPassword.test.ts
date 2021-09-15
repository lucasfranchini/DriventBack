import "@/setup";
import { promisify } from "util";
import  client  from "../../src/redisClient";
import jwt from "jsonwebtoken";
import User from "../../src/entities/User";
import sgMail from "@sendgrid/mail";
import * as resetPassword from "../../src/services/client/resetPassword";

afterAll(async () => {
  const quitAsync = promisify(client.quit).bind(client);
  await quitAsync();
});

describe("verifyTokenValidation", () => {
  it("throws an error for expired token", async () => {
    const token = jwt.sign({ email: "a" }, process.env.JWT_SECRET, { expiresIn: 1 });
    setTimeout(async () => {
      const result = () => resetPassword.verifyTokenValidation(token);
      await expect(result).rejects.toThrow(Error);
    }, 1001);
  });
  it("throws an error for invalid token", async () => {
    const token = "a";
    const result = () => resetPassword.verifyTokenValidation(token);
    await expect(result).rejects.toThrow(Error);
  });
  it("returns an object with email for valid token", async () => {
    const token = jwt.sign({ email: "teste" }, process.env.JWT_SECRET, { expiresIn: 10 });
    const result = await resetPassword.verifyTokenValidation(token);
    expect(result).toBe("teste");
  });
});

describe("sendToken", () => {
  it("should resolves", async () => {
    jest.spyOn(User, "verifyEmail").mockImplementationOnce(async () => {return null;});
    jest.spyOn(sgMail, "send").mockImplementationOnce( async () => {return null;});
    const result = async () => await resetPassword.sendToken("");
    expect(result).resolves;
  });
});

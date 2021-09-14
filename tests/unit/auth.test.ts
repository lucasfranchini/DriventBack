import { signIn } from "../../src/services/client/auth";
import User from "../../src/entities/User";
import { client } from "../../src/app";
import { promisify } from "util";
import jwt from "jsonwebtoken";

afterAll(async () => {
  const quitAsync = promisify(client.quit).bind(client);
  await quitAsync();
});

describe("signIn", () => {
  it("thorws an error for unauthorized user", async () => {
    jest.spyOn(User, "findByEmailAndPassword").mockImplementationOnce(async () => null);
    const result = async () => await signIn("", "");
    await expect(result).rejects.toThrow(Error);
  });
  it("returns an object for correct path", async () => {
    jest.spyOn(User, "findByEmailAndPassword").mockImplementationOnce(async () => {return { email: "test", id: 1 }  as User;});
    jest.spyOn(jwt, "sign").mockImplementationOnce(() => "funcionou");
    jest.spyOn(client, "set").mockImplementationOnce(() => {return true;} );
    const result = await signIn("", "");
    
    expect(result).toMatchObject({
      user: {
        email: "test",
        id: 1
      },
      token: "funcionou"
    });
  });
});

afterAll(async () => {
  const quitAsync = promisify(client.quit).bind(client);
  await quitAsync();
});
describe("sendToken", () => {
  it()
});
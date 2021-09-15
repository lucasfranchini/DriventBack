export default class InvalidTokenError extends Error {
  constructor() {
    super("Yor Token is Invalid");

    this.name = "InvalidTokenError";
  }
}

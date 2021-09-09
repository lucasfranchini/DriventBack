export default class InvalidBookingError extends Error {
  constructor() {
    super("You must have a booking with Hotel lodge");

    this.name = "InvalidBookError";
  }
}

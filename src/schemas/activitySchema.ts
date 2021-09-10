import joi from "joi";

export default joi.object({
  date: joi.string().required(),
});

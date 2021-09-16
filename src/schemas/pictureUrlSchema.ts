import joi from "joi";

export default joi.object({
  url: joi.string().required(),
  userId: joi.number().required()
});

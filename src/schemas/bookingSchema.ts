import joi from "joi";

export default joi.object({
  modalityId: joi.number().min(1).required(),
  lodgeId: joi.number().min(1),
  value: joi.number().required(),
});


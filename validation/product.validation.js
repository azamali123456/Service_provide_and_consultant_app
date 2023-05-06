import Joi from "joi";

//Channal Validation are Here
const product = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    discription: Joi.string().required(),
    type: Joi.string().required(),
    createdBy: Joi.string().required(),
  }),
};
const id = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export default {
  product,
  id,
};

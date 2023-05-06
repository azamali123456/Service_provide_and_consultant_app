import Joi from 'joi';

//Channal Validation are Here
const job = {
  body: Joi.object().keys({
    userName: Joi.string().required(),
    email: Joi.string().required(),
    jobType: Joi.string().required(),
    description: Joi.string().required(),
    problemStatement: Joi.string().required(),
    invitationKey: Joi.string(),
    problemImages: Joi.string().required(),
    phone: Joi.string().required(),
    user_id: Joi.string().required(),
  }),
};

const id = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export default {
  job,
  id,
};

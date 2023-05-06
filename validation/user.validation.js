import Joi from "joi";
//All Validation are Here
const register = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    userType: Joi.string().required(),
    password: Joi.string().required(),
    profession: Joi.string(),
    experience: Joi.string(),
  }),
};

const id = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const email = {
  params: Joi.object().keys({
    id: Joi.string().email().required(),
  }),
};

const update = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
    age: Joi.string(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const forgetPassword = {
  body: Joi.object().keys({
    email: Joi.string().required(),
  }),
};
const otp = {
  body: Joi.object().keys({
    otp: Joi.string().required(),
  }),
};
const newPassword = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
export default {
  register,
  login,
  id,
  update,
  email,
  forgetPassword,
  otp,
  newPassword,
};

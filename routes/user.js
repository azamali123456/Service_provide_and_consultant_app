import express from "express";
const router = express.Router();
import userModel from "../model/user.js";
import authenticate from "../middelware/auth.js";
import jwt from "jsonwebtoken";
import validate from "../middelware/validate.js";
import schema from "../validation/user.validation.js";
import sgMail from "@sendgrid/mail";
import store from "store";
// Get All
router.get("/", authenticate, async (req, res) => {
  try {
    const users = await userModel.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Get by Id
router.get("/:id", authenticate, validate(schema.params), async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Sign Up
router.post("/register", validate(schema.register), async (req, res) => {
  try {
    const user = await userModel.create(req.body);
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});
// login
router.post("/login", validate(schema.login), async (req, res) => {
  try {
    const user = await userModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!user) return res.status(401).send("Invalid email or password.");
    const token = jwt.sign({ id: user._id }, "my_temporary_secret", {
      expiresIn: "1h",
    });
    res.send({ token, user });
  } catch (error) {
    res.status(500).send(error);
  }
});
//Update User
router.patch(
  "/:id",
  authenticate,
  validate(schema.update),
  async (req, res) => {
    try {
      const user = await userModel.findByIdAndUpdate(req.params.id, req.body);
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);
//Delete Sign Up data -- OR -- Delete Account
router.delete(
  "/:id",
  authenticate,
  validate(schema.params),
  async (req, res) => {
    try {
      const user = await userModel.findByIdAndDelete(req.params.id);
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);
//Reset Password
router.post(
  "/forgetPassword",
  validate(schema.forgetPassword),
  async (req, res) => {
    try {
      const user = await userModel.findOne({
        email: req.body.email,
      });

      if (!user) return res.status(401).send("Email does not Exist");
      else {
        const ApiKey =
          "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";
        sgMail.setApiKey(ApiKey);
        let otp = Math.floor(Math.random() * 10000 + 1);
        store.set("otp", `${otp}`);
        const msg = {
          to: req.body.email,
          from: "aazam7246@gmail.com", // Use the email address or domain you verified above
          subject: "Sending with Twilio SendGrid is Fun",
          text: `Here is your OTP : ${otp}`,
          html: `<strong>Here is your OTP : ${otp}</strong>`,
        };
        //ES6
        sgMail.send(msg).then(
          () => {},
          (error) => {
            console.error(error);
            if (error.response) {
              console.error(error.response.body);
            }
          }
        );
        return res.send("OTP has been send to your email");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
);
// OTP vrification
router.post("/otpVerify", validate(schema.otp), async (req, res) => {
  try {
    const preOtp = store.get("otp");
    if (preOtp === req.body.otp) {
      store.remove("otp");
      return res.send("Now you can changed your password ");
    } else {
      return res.send("Invalid OTP");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/passwordReset", validate(schema.newPassword), async (req, res) => {
  try {
    const preOtp = store.get("otp");
    if (!preOtp) {
      const userObj = await userModel.findOne({
        email: req.body.email,
      });
      userObj.password = req.body.password;
      const user = await userModel.findByIdAndUpdate(userObj.id, userObj);
      return res.send(user);
    } else {
      return res.send("Please verfy your OTP");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
export default router;

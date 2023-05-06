import express from "express";
const router = express.Router();
import servicesModel from "../model/services.js";
import authenticate from "../middelware/auth.js";
import validate from "../middelware/validate.js";
import schema from "../validation/services.validation.js";

// Get Services
router.get("/", authenticate, async (req, res) => {
  try {
    const services = await servicesModel.find();
    res.send(services);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Create Services
router.post("/", authenticate, validate(schema.create), async (req, res) => {
  try {
    const services = await servicesModel.create(req.body);
    res.send(services);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Update Services
router.patch(
  "/:id",
  authenticate,
  validate(schema.update),
  async (req, res) => {
    try {
      const services = await servicesModel.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      res.send(services);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);
//Delete Services
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const services = await servicesModel.findByIdAndDelete(req.params.id);
    res.send(services);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;

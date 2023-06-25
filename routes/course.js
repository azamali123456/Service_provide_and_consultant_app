import express from "express";
const router = express.Router();
import courseModel from "../model/course.js";
import authenticate from "../middelware/auth.js";
import validate from "../middelware/validate.js";
import schema from "../validation/course.validation.js";

//Create product
router.post("/", authenticate, validate(schema.course), async (req, res) => {
  try {
    req.body.user_id = req.user.id;
    const product = await courseModel.create(req.body);
    res.send({ status: "Success", staCode: 200, data: product });
  } catch (error) {
    res.status(500).send(error);
  }
});
// Get All product
router.get("/", authenticate, async (req, res) => {
  try {
    const product = await courseModel.find();
    res.send({ status: "Success", staCode: 200, data: product });
  } catch (error) {
    res.status(500).send(error);
  }
});
//Get Specific admin product by ID
router.get("/:id", authenticate, validate(schema.params), async (req, res) => {
  try {
    const product = await courseModel.find({ createdBy: req.params.id });
    res.send({ status: "Success", staCode: 200, data: product });
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get Specific admin product by Department
router.get("/department/:name", authenticate, async (req, res) => {
  try {
    console.log(req.params.name);
    const product = await courseModel.find({ department: req.params.name });

    res.send({ status: "Success", staCode: 200, data: product });
  } catch (error) {
    res.status(500).send(error);
  }
});
//Update product
router.patch("/:id", authenticate, async (req, res) => {
  try {
    const product = await courseModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send({ status: "Success", staCode: 200, data: product });
  } catch (error) {
    res.status(500).send(error);
  }
});
//Delete product
router.delete(
  "/:id",
  authenticate,
  validate(schema.params),
  async (req, res) => {
    try {
      const product = await courseModel.findByIdAndDelete(req.params.id);
      res.send({ status: "Success", staCode: 200, data: product });
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

export default router;

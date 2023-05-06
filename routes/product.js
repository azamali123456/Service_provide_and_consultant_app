import express from "express";
const router = express.Router();
import productModel from "../model/product.js";
import authenticate from "../middelware/auth.js";
import validate from "../middelware/validate.js";
import schema from "../validation/product.validation.js";
import upload from "./upload.js";
//Create course
router.post(
  "/",
  upload.fields([
    {
      name: "imgArray",
      maxCount: 100,
    },
  ]),
  authenticate,

  async (req, res) => {
    try {
      console.log(req.files.imgArray, "body");
      req.body.imageArray = [];
      req.body.logoImage = "";

      for (let x = 0; x < req.files.imgArray.length; x++) {
        req.body.imageArray.push(
          `${req.protocol}://${req.get("host")}/${req.files.imgArray[
            x
          ].path.replace("\\", "/")}`
        );
      }

      console.log(req.body.imageArray);
      req.body.image = req.body.imageArray[0];
      req.body.user_id = req.user.id;
      delete req.body.logoImage;
      delete req.body.imageArray;
      console.log(req.body);
      const product = await productModel.create(req.body);
      res.send(product);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);
// Get All course
router.get("/", authenticate, async (req, res) => {
  try {
    const course = await productModel.find();
    res.send(course);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Get Specific admin course by ID
router.get("/:id", authenticate, validate(schema.params), async (req, res) => {
  try {
    const course = await productModel.find({ createdBy: req.params.id });
    res.send({ status: "Success", staCode: 200, data: course });
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get Specific admin course by Department
router.get("/department/:name", authenticate, async (req, res) => {
  try {
    console.log(req.params.name);
    const course = await productModel.find({ department: req.params.name });

    res.send({ status: "Success", staCode: 200, data: course });
  } catch (error) {
    res.status(500).send(error);
  }
});

//Update course
router.patch("/:id", authenticate, async (req, res) => {
  try {
    const course = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send({ status: "Success", staCode: 200, data: course });
  } catch (error) {
    res.status(500).send(error);
  }
});
//Delete course
router.delete(
  "/:id",
  authenticate,
  validate(schema.params),
  async (req, res) => {
    try {
      const course = await productModel.findByIdAndDelete(req.params.id);
      res.send({ status: "Success", staCode: 200, data: course });
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

export default router;

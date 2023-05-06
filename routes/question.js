import express from "express";
const router = express.Router();
import questionModel from "../model/question.js";
import answerModel from "../model/answer.js";
import authenticate from "../middelware/auth.js";
import validate from "../middelware/validate.js";
import schema from "../validation/question.validation.js";

//Create Question
router.post(
  "/:id",
  authenticate,
  validate(schema.question),
  async (req, res) => {
    try {
      req.body.user_id = req.user.id;
      req.body.qusTo_id = req.params.id;
      const question = await questionModel.create(req.body);
      res.send(question);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);
// Get All
router.get("/", authenticate, async (req, res) => {
  try {
    const users = await questionModel.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Get Specific user Questions
router.get("/:id", authenticate, validate(schema.params), async (req, res) => {
  try {
    const data = await questionModel.find({ user_id: req.params.id });
    const resp = data.map(({ statement, tags }) => ({
      statement,
      tags,
    }));
    res.send({ status: "Success", staCode: 200, data: resp });
  } catch (error) {
    res.status(500).send(error);
  }
});
//Get user Questions to specific admin
router.get("/to/expert", authenticate, async (req, res) => {
  try {
    console.log(req.user.id);
    const data = await questionModel.find({ qusTo_id: req.user.id });

    res.send({ status: "Success", staCode: 200, data: data });
  } catch (error) {
    res.status(500).send(error);
  }
});
//Get my questions
router.get(
  "/my/questions",
  authenticate,
  validate(schema.params),
  async (req, res) => {
    try {
      req.body.user_id = req.user.id;
      const data = await questionModel.find({ user_id: req.user.id });
      const resp = data.map(({ statement, tags }) => ({
        statement,
        tags,
      }));
      res.send({ status: "Success", staCode: 200, data: resp });
    } catch (error) {
      res.status(500).send(error);
    }
  }
);
//Get my questions and its answer
router.get("/myquestions/answer", authenticate, async (req, res) => {
  try {
    console.log(req.body.id, req.user.id, "req.params.id");
    const data = await questionModel.aggregate([
      {
        $lookup: {
          from: "answers",
          localField: "_id",
          foreignField: "questionId",
          as: "answer",
        },
      },
    ]);
    const newArray = [];
    data.map((obj) => {
      if (obj.user_id === req.user.id) {
        return newArray.push(obj);
      } else {
      }
    });

    res.send({ status: "Success", staCode: 200, data: newArray });
  } catch (error) {
    res.status(500).send(error);
  }
});
//Update question
router.patch("/:id", authenticate, async (req, res) => {
  try {
    const user = await questionModel.findByIdAndUpdate(req.params.id, req.body);
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Delete question
router.delete(
  "/:id",
  authenticate,
  validate(schema.params),
  async (req, res) => {
    try {
      const user = await questionModel.findByIdAndDelete(req.params.id);
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

export default router;

import express, { application } from 'express';
const router = express.Router();
import jobModel from '../model/job.js';
import authenticate from '../middelware/auth.js';
import validate from '../middelware/validate.js';
import schema from '../validation/job.validation.js';
//Register job
router.post('/', authenticate, validate(schema.job), async (req, res) => {
  try {
    const job = await jobModel.create(req.body);
    res.send(job);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Get All jobs For User
router.get('/id/:id', authenticate, validate(schema.id), async (req, res) => {
  try {
    const job = await jobModel.find({ user_id: req.params.id });
    res.send(job);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get job for Specific Id
router.get('/:id', authenticate, validate(schema.job), async (req, res) => {
  try {
    const jobs = await jobModel.findById(req.params.id);
    res.send(jobs);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;

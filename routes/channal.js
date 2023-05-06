import express, { application } from 'express';
const router = express.Router();
import channalModel from '../model/channal.js';
import authenticate from '../middelware/auth.js';
import validate from '../middelware/validate.js';
import schema from '../validation/user.validation.js';
//Register Channal
router.post('/', authenticate, async (req, res) => {
  try {
    const channal = await channalModel.create(req.body);
    res.send(channal);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Get Channal by Id
router.get('/:id', authenticate, validate(schema.params), async (req, res) => {
  try {
    const channal = await jobModel.findById(req.params.id);
    res.send(channal);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/id/:id', authenticate, validate(schema.id), async (req, res) => {
  try {
    const channal = await channalModel.find({ user_id: req.params.id });
    res.send(channal);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;

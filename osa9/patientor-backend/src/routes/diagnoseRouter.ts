import express from 'express';
import diagnoseService from '../services/diagnoseService';

const diagnoseRouter = express.Router();

diagnoseRouter.get('/', (_req, res) => {
  return res.json(diagnoseService.getDiagnoses());
});

export default diagnoseRouter;

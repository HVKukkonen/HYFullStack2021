import express from "express";
import patientService from "../services/patientService";
import { toNewPatient } from "../utils";

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  return res.json(patientService.getPatients());
});

patientRouter.get('/:id', (req, res) => {
  return res.json(patientService.getFullPatient(req.params.id));
});

patientRouter.post('/', (req, res) => {
  try {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newPatient = toNewPatient(req.body);

  res.json(patientService.addPatient(newPatient));

  } catch (e) {
    const message = (e as Error).message;
    res.status(400).send({ error: message });
  }
});

export default patientRouter;

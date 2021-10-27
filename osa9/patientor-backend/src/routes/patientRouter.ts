import express from "express";
import patientService from "../services/patientService";
import { EntryType, NewEntry } from "../types";
import { toNewPatient, validForHealthCheckEntry, validForHospitalEntry, validForOccupationalEntry } from "../utils";

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

patientRouter.post('/:id/entries', (req: { [anyKey: string]: any, body: NewEntry }, res) => {
  try {
    switch (req.body.type) {
      case EntryType.Hospital:
        if (validForHospitalEntry(req.body)) {
          return res.json(patientService.addEntry(req.params.id, req.body));
        } else {
          throw new Error('Hospital entry is non-valid, e.g., fields missing!');
        }
      case EntryType.HealthCheck:
        if (validForHealthCheckEntry(req.body)) {
          return res.json(patientService.addEntry(req.params.id, req.body));
        } else {
          throw new Error('HealthCheck entry is non-valid, e.g., fields missing!');
        }
      case EntryType.OccupationalHealthcare:
        if (validForOccupationalEntry(req.body)) {
          return res.json(patientService.addEntry(req.params.id, req.body));
        } else {
          throw new Error('OccupationalHealthcare entry is non-valid, e.g., fields missing!');
        }
      case undefined:
        throw new Error('Request has no entry type!');
      default:
        throw new Error('Entry type not correct!');
    }
  } catch (e) {
    const msg = (e as Error).message;
    return res.status(400).send({ error: msg });
  }
});

export default patientRouter;

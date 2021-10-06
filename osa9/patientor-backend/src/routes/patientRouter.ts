import express from "express";
import patientService from "../services/patientService";

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  return res.json(patientService.getPatients());
});

patientRouter.post('/', (req, res) => {
  return res.json(patientService.addPatient(req.body));
});

export default patientRouter;

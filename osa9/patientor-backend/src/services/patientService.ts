import { SanitizedPatient, NewPatient, Patient } from "../types";
import patientsData from "../../data/patients";
import { v4 as uuid } from 'uuid';

// run-time store of patients
let patients: Patient[] = patientsData;

const sanitize = (patient: Patient): SanitizedPatient => ({
  id: patient.id,
  name: patient.name,
  dateOfBirth: patient.dateOfBirth,
  gender: patient.gender,
  occupation: patient.occupation
});

const getPatients = (): SanitizedPatient[] => patients.map(
  (patient) => sanitize(patient)
);

  const addPatient = (newPatient: NewPatient): SanitizedPatient => {
    const patient = {
      ...newPatient,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      id: uuid(),
    };

    patients = patients.concat(patient);

    return sanitize(patient);
  };

  export default { getPatients, addPatient };
  
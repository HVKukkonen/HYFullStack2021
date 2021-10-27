import { SanitizedPatient, NewPatient, Patient, NewEntry } from "../types";
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

const getFullPatient = (id: string): Patient | undefined => patients.find((patient) => patient.id === id);

const addPatient = (newPatient: NewPatient): SanitizedPatient => {
  const patient = {
    ...newPatient,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
  };

  patients = patients.concat(patient);

  return sanitize(patient);
};

const addEntry = (id: Patient['id'], entry: NewEntry): Patient => {
  const patientIndex = patients.findIndex((patient) => patient.id === id);
  // back-end
  patients[patientIndex].entries = patients[patientIndex].entries.concat({ ...entry, id: uuid() });
  // pass updated object to frontend
  return patients[patientIndex];
};

export default { getPatients, addPatient, getFullPatient, addEntry };
  
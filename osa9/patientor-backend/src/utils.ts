import { NewPatient, Gender, PatientFields, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry } from './types';

const isString = (str: unknown): str is string => (
  typeof str === 'string' || str instanceof String
);

const parseString = (str: unknown): string => {
  if (!str || !isString(str)) {
    throw new Error('Incorrect or missing input:' + str);
  }

  return str;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseGender = (gender: any): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender:' + gender);
  }

  return gender;
};

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation } : PatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(name),
    dateOfBirth: parseString(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: []
  };

  return newPatient;
};

interface Indexable {
  [key: string]: any;
}

// validate that object has the property of specified type
const validateProp = (obj: Indexable, prop: string, type: string) => (
  typeof obj[prop] === type
);

const validForBaseEntry = (input: Indexable): boolean => (
  validateProp(input, 'description', 'string') &&
  validateProp(input, 'date', 'string') &&
  validateProp(input, 'specialist', 'string')
);

export const validForHospitalEntry = (input: Indexable): input is HospitalEntry => (
  validForBaseEntry(input) &&
  // discharge is object
  validateProp(input.discharge, 'date', 'string') &&
  validateProp(input.discharge, 'criteria', 'string')
);

export const validForHealthCheckEntry = (input: Indexable): input is HealthCheckEntry => (
  validForBaseEntry(input) &&
  validateProp(input, 'healthCheckRating', 'number')
);

export const validForOccupationalEntry = (input: Indexable): input is OccupationalHealthcareEntry => (
  validForBaseEntry(input) &&
  validateProp(input, 'employerName', 'string')
); 

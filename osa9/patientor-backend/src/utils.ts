import { NewPatient, Gender, PatientFields } from './types';

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
    occupation: parseString(occupation)
  };

  return newPatient;
};

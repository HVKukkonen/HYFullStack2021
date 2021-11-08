import { State } from "./state";
import { Diagnose, Patient } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "UPDATE_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSE_LIST";
    payload: Diagnose[];
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...state.patients[action.payload.id],
            ...action.payload,
          },
        },
      };
    case "SET_DIAGNOSE_LIST":
      return {
        ...state,
        diagnoses: action.payload
      }
    default:
      return state;
  }
};

// action creators
export const addPatient = (patient: Patient): Action => {
  return { type: "ADD_PATIENT", payload: patient };
}

export const updatePatient = (patient: Patient): Action => {
  return { type: "UPDATE_PATIENT", payload: patient };
};

export const setPatients = (patients: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload: patients }
}

export const setDiagnoses = (diagnoses: Diagnose[]): Action => {
  return { type: "SET_DIAGNOSE_LIST", payload: diagnoses }
}

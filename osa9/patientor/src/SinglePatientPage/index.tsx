import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state/state';
import { Patient } from '../types';
import { Container, Icon, Card, Button } from "semantic-ui-react";

const patient = {
  "id": "d2773822-f723-11e9-8f0b-362b9e155667",
  "name": "Dana Scully",
  "dateOfBirth": "1974-01-05",
  "ssn": "050174-432N",
  "gender": "Female",
  "occupation": "Forensic Pathologist",
  "entries": ["hard patient", "lot of tough luck"]
};

const SinglePatient = (props: {patient: Patient}) => <Container>
  <h2>{props.patient.name}</h2>
  {props.patient.gender}
  <br/>
  ssn: {props.patient.ssn}
  <br/>
  occupation: {props.patient.occupation}
  <br/>
  birth: {props.patient.dateOfBirth}
  <br/>
  entries: {props.patient.entries.map((entry: string, index: number) => index ? ', ' + entry : entry )}
</Container>;

const SinglePatientPage: React.FC = async () => {
  const [{ patients }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    // prep async function
    const fetchAndUpdateSingle = async () => {
      // query from backend
      const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      // save to front-end state
      dispatch({type: 'ADD_PATIENT', payload: patient});
    }

    // execute fetchAndUpdateSingle
    fetchAndUpdateSingle()
  }, [id, dispatch]);

  console.log('patts', patients)
  const patient = patients[id];
  console.log('pat', patient);
  if (!patient) { return null; }
  return <SinglePatient patient={patient} />;
};

export default SinglePatientPage;

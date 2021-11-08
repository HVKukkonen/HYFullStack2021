import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Icon, Button } from 'semantic-ui-react';
import { NewEntry, Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, updatePatient, addPatient } from '../state';
import { toPatient } from '../utils';
import { InvalidPatientError } from '../helpers/errorHelper';
import Entries from './Entries';
import AddEntryModal from './AddEntryModal';

const genderIcons = {
  male: { name: 'mars' as 'mars', color: 'blue' as 'blue' },
  female: { name: 'venus' as 'venus', color: 'red' as 'red' },
  other: { name: 'genderless' as 'genderless', color: 'grey' as 'grey' },
};

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const fetchStatus = useRef({ shouldFetch: false, hasFetched: false });

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const openModal = (): void => setModalOpen(true);

  let patient = patients[id];

  try {
    patient = toPatient({ ...patient });
  } catch (e) {
    if (e instanceof InvalidPatientError && !fetchStatus.current.hasFetched) {
      fetchStatus.current = { ...fetchStatus.current, shouldFetch: true };
    } else {
      console.error(e);
    }
  }

  useEffect(() => {
    const fetchPatient = async () => {
      fetchStatus.current = { ...fetchStatus.current, shouldFetch: false };
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patientFromApi));
        fetchStatus.current = { ...fetchStatus.current, hasFetched: true };
      } catch (e) {
        console.error(e);
      }
    };

    if (fetchStatus.current.shouldFetch) {
      fetchPatient();
    }
  }, [id, dispatch]);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  if (!patient) return null;

  const submitEntry = async (values: NewEntry) => {
    console.log('submit called')
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );
      dispatch(updatePatient(updatedPatient));
      closeModal();
    } catch (e: unknown) {
      console.error(e);

      let errorMessage = 'There was an error';

      if (axios.isAxiosError(e) && e.response) {
        console.error(e.response.data)
        errorMessage = e.response.data.error;
      }

      setError(errorMessage);
    }
  };

  return (
    <Container>
      <h1>
        {patient.name} <Icon {...genderIcons[patient.gender]} />
      </h1>
      <p>
        <strong>SSN:</strong> {patient.ssn}
      </p>
      <p>
        <strong>Date of Birth:</strong> {patient.dateOfBirth}
      </p>
      <p>
        <strong>Occupation:</strong> {patient.occupation}
      </p>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={openModal}>Add New Entry</Button>
      {patient.entries ? <Entries patient={patient} diagnoses={diagnoses} /> : null}
    </Container>
  );
};

export default PatientPage;
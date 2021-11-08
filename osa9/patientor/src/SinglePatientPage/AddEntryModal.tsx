import { Modal, Segment } from "semantic-ui-react";
import { EntryType, NewEntry } from "../types";
import AddEntryForm from "./AddEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  error?: string;
}

const HCInit: NewEntry = {
  description: "",
  date: "",
  specialist: "",
  type: EntryType.HealthCheck,
  healthCheckRating: 0
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new patient</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} initialValues={HCInit} />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;

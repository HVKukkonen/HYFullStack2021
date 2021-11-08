import React from "react";
import { Grid, Button, Form as SemanticForm } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";
import { EntryFormProps, EntryType, EntryTypeFieldProps, EntryTypeOption, NewEntry } from "../types";
import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import validator from "./validator";
import TypeDependentFields from "./TypeDependentFields";

const entryTypeOptions: Array<EntryTypeOption> = [
  { value: EntryType.HealthCheck, label: 'HealthCheck'},
  { value: EntryType.OccupationalHealthCare, label: 'OccupationalHealthCare'},
  { value: EntryType.Hospital, label: 'Hospital'}
];

const SelectField = ({
  name,
  label,
  options
}: EntryTypeFieldProps) => (
  <SemanticForm.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </SemanticForm.Field>
);

const AddEntryForm = ({ onSubmit, onCancel, initialValues }: EntryFormProps) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validator}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Entry type"
              name="type"
              options={entryTypeOptions}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <TypeDependentFields values={values} />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;

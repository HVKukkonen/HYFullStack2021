import { Field } from "formik";
import { NumberField, TextField } from "../AddPatientModal/FormField";
import { EntryType, NewEntry } from "../types";

const TypeDependentFields = (props: { values: NewEntry }) => {
  switch (props.values.type) {
    case EntryType.HealthCheck:
      return <Field
        label="Health check rating"
        placeholder={0}
        name="healthCheckRating"
        component={NumberField}
      />
    case EntryType.OccupationalHealthCare:
      return <>
        <Field
          label="Employer name"
          name="employerName"
          component={TextField}
        />
        <Field
          label="Sick leave start date"
          placeholder="YYYY-MM-DD"
          name="startDate"
          component={TextField}
        />
        <Field
          label="Sick leave end date"
          placeholder="YYYY-MM-DD"
          name="endDate"
          component={TextField}
        />
      </>
    case EntryType.Hospital:
      return <>
        <Field
          label="Discharge date"
          placeholder="YYYY-MM-DD"
          name="dischargeDate"
          component={TextField}
        />
        <Field
          label="Discharge criteria"
          name="criteria"
          component={TextField}
        />
      </>
    default:
      return null
  }
};

export default TypeDependentFields;

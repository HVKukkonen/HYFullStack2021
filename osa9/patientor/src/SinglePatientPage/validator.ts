import { EntryType } from "../types";

const validator = (values: { [anyKey: string]: any }) => {
  const errors: any = {};

  const dateRe = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

  // base entry -----------------------------------------------------------
  if (!values.description) {
    errors.description = 'Input required';
  }

  if (!dateRe.test(values.date)) {
    errors.date = 'Invalid date';
  }

  if (!values.specialist) {
    errors.specialist = 'Input required';
  }

  // health check ---------------------------------------------------------
  if (values.type === EntryType.HealthCheck && (values.healthCheckRating > 3 || values.healthCheckRating < 0) ) {
    errors.healthCheckRating = 'Invalid health check rating';
  }

  // occupational hc ------------------------------------------------------
  if (values.type === EntryType.OccupationalHealthCare) {
    if (!dateRe.test(values.startDate)) {
      errors.startDate = 'Invalid date';
    }

    if (!dateRe.test(values.endDate)) {
      errors.endDate = 'Invalid date';
    }

    if (!values.employerName) {
      errors.employerName = 'Input required';
    }
  }

  // hospital -------------------------------------------------------------
  if (values.type === EntryType.Hospital) {
    if (!dateRe.test(values.dischargeDate)) {
      errors.dischargeDate = 'Invalid date';
    }

    if (!values.criteria) {
      errors.criteria = 'Input required';
    }
  }

  return Object.keys(errors) ? errors : undefined;
};

export default validator;
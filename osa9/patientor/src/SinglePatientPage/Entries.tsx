import { Table, Icon } from "semantic-ui-react";
import { Diagnose, Entry, Patient, EntryType } from "../types";
import { assertNever } from "../utils";

const entryTypeIcons = {
  healthCheck: { name: 'user md' as 'user md' },
  occupational: { name: 'stethoscope' as 'stethoscope' },
  hospital: { name: 'hospital' as 'hospital' }
};

const DisplayEntryIcon = (props: { entry: Entry }) => {
  switch (props.entry.type) {
    case EntryType.HealthCheck:
      return <Icon {...entryTypeIcons.healthCheck} />
    case EntryType.OccupationalHealthCare:
      return <Icon {...entryTypeIcons.occupational} />
    case EntryType.Hospital:
      return <Icon {...entryTypeIcons.hospital} />
    default:
      assertNever(props.entry)
      return null;
  }
};

const ratingIcons = {
  0: { name: 'heart' as 'heart', color: 'olive' as 'olive'},
  1: { name: 'heart' as 'heart', color: 'yellow' as 'yellow'},
  2: { name: 'heart' as 'heart', color: 'orange' as 'orange'},
  3: { name: 'heart' as 'heart', color: 'red' as 'red'},
}

const DisplayRatingIcon = (props: { entry: Entry }) => {
  if (props.entry.type !== EntryType.HealthCheck) { return null; }
  
  return <Icon {...ratingIcons[props.entry.healthCheckRating]} />
};

const CodeList = (props: { codes: NonNullable<Entry['diagnosisCodes']>, diagnoses: Diagnose[] }) => <Table>
  <Table.Body>
    {props.codes.map((code) => <Table.Row key={code}>
      <Table.Cell>{code}</Table.Cell>
      <Table.Cell>{props.diagnoses.find((diagnose) => diagnose.code === code)?.name}</Table.Cell>
    </Table.Row>)}
  </Table.Body>
</Table>;

const TypeDependentDetails = (props: { entry: Entry }) => {
  switch (props.entry.type) {
    case EntryType.HealthCheck:
      return <DisplayRatingIcon entry={props.entry} />
    case EntryType.OccupationalHealthCare:
      return <>
        Employer: {props.entry.employerName}
        <br/>
        Sick leave: {`${props.entry.sickLeave?.startDate} - ${props.entry.sickLeave?.endDate}`}
      </>
    case EntryType.Hospital:
      return <>
      Discharge date: {props.entry.discharge.date}
      <br/>
      Discharge criteria: {props.entry.discharge.criteria}
      </>
    default: return null;
  }
}

const DisplayEntry = (props: { entry: Entry, diagnoses: Diagnose[] }) => <div>
  <b>{`${props.entry.date} `} <DisplayEntryIcon entry={props.entry} /></b>
  {props.entry.description}
  <br/>
  { props.entry.diagnosisCodes ? <CodeList codes={props.entry.diagnosisCodes} diagnoses={props.diagnoses} /> : null}
  <TypeDependentDetails entry={props.entry} />
</div>;

const Entries = (props: { patient: Patient, diagnoses: Diagnose[] }) => <div>
  <h2>Entries</h2>
      {props.patient.entries.map((entry) => (
        <DisplayEntry key={entry.id} entry={entry} diagnoses={props.diagnoses} />
      ))}
</div>;

export default Entries;

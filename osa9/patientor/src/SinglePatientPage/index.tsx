import React from 'react';
import { Icon } from 'semantic-ui-react';

const testPatient = {
  "id": "d2773822-f723-11e9-8f0b-362b9e155667",
  "name": "Dana Scully",
  "dateOfBirth": "1974-01-05",
  "ssn": "050174-432N",
  "gender": "Female",
  "occupation": "Forensic Pathologist",
  "entries": ["hard patient", "lot of tough luck"]
};

const genderIcon = {
  male: { name: "mars" as "mars" },
  female: { name: "venus" as "venus" },
  other: { name: "genderless" as "genderless" },
};

const SinglePatient = (_props: any) => <div>
  <h2>{testPatient.name}</h2>
  {testPatient.gender}
  <br/>
  ssn: {testPatient.ssn}
  <br/>
  occupation: {testPatient.occupation}
  <br/>
  birth: {testPatient.dateOfBirth}
  <br/>
  entries: {testPatient.entries.map((entry, index) => index ? ', ' + entry : entry )}
</div>;

export default SinglePatient;

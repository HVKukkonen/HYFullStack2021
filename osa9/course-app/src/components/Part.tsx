import React from 'react';
import { CoursePart } from '../types';

// const Part = ({courseParts}: {courseParts: CoursePart[]}): React.FC<{ courseParts: CoursePart }> => <div>
//   {courseParts.forEach((part) => {
//     switch (part.type) {
//       case 'groupProject':
//         return <b>{part.name part.exerciseCount}</b>
//       default:
//         return null;
//     }
//   })}
// </div>;

// Helper function for exhaustive type checking
 const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.type) {
    case 'groupProject':
      return <div>
        <b>{coursePart.name} {coursePart.exerciseCount}</b>
        <br />
        Project exercises {coursePart.groupProjectCount}
      </div>
    case 'normal':
      return <div>
        <b>{coursePart.name} {coursePart.exerciseCount}</b>
        <br />
        <i>{coursePart.description}</i>
      </div>
    case 'submission':
      return <div>
        <b>{coursePart.name} {coursePart.exerciseCount}</b>
        <br />
        <i>{coursePart.description}</i>
        <br />
        Submit to: {coursePart.exerciseSubmissionLink}
      </div>
    case 'special':
      return <div>
        <b>{coursePart.name} {coursePart.exerciseCount}</b>
        <br />
        <i>{coursePart.description}</i>
        <br />
        Required skills: {coursePart.requirements.map((elem, index) => ( (index ? ', ' : '') + elem ))}
      </div>
    default:
      return assertNever(coursePart);
  }
};

export default Part;

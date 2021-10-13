import React from 'react';
import { CoursePart, CourseTuple } from '../types';
import Part from './Part';


const ContentRow = ({name, exerciseCount}: CourseTuple) => <p>
{name} {exerciseCount}
</p>;

const Content = ({courseParts}: {courseParts: CoursePart[]}) => <div>
{courseParts.map(
  (coursePart) => <Part key={coursePart.name} coursePart={coursePart}/>
)}
</div>;

export default Content;

import React from 'react';
import { CourseTuple } from '../types';

const Total = ({courseParts}: {courseParts: CourseTuple[]}) => <p>
Number of exercises{" "}
{courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
</p>

export default Total;

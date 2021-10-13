export interface CourseTuple {
  name: string,
  exerciseCount: number
}

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CoursePartBaseDescription extends CoursePartBase {
  description: string;
}
interface CourseNormalPart extends CoursePartBaseDescription {
  type: "normal";
}

interface CourseSubmissionPart extends CoursePartBaseDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBaseDescription {
  type: "special";
  requirements: string[];
}


export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

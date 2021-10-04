interface ExerciseSummary {
  periodLength: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const ratingBounds = [0.8, 1.2]
const ratingDescs = [
  'Get a hold of yourself',
  'Good job',
  'Workings of a higher being'
]

const exerciseSummary = (trainArr: number[], dayTarget: number): ExerciseSummary => {
  const avg = trainArr.reduce((a, b) => (a + b), 0) / trainArr.length;
  let rating
  if (avg / dayTarget < ratingBounds[0]){
    rating = 1
  } else if (avg / dayTarget < ratingBounds[1]) {
    rating = 2
  } else {
    rating = 3
  }

  return {
    periodLength: trainArr.length,
    success: avg > dayTarget,
    rating,
    ratingDescription: ratingDescs[rating-1],
    target: dayTarget,
    average: avg
  }
}

interface ExcerciseInput {
  exs: Array<number>,
  target: number
}

interface ExcerciseQuery {
  exs: Array<number>,
  target: number
}

// first user-defined arg is the target, the rest are daily hours
const parseExes = (query: ExcerciseQuery): ExcerciseInput => {

  if (!query.target || !query.exs) { throw new Error('missing parameters'); }

  if (!Array.isArray(query.exs)) { throw new Error('malformatted params'); }

  const target = Number(query.target);
  const exs = query.exs.map(Number);
  console.log(`${exs} is array: ${Array.isArray(exs)}`)

  // TODO test: no arr imput?
  if (!exs.includes(NaN) && !isNaN(target)) {
    return {
      exs,
      target
    }
  } else {
    throw new Error('malformatted params');
  }
}

const execEndpointCalc = (query: ExcerciseQuery): ExerciseSummary => {
  const input = parseExes(query);

  return exerciseSummary(input.exs, input.target);
};

export default execEndpointCalc;

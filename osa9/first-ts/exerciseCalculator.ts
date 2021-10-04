interface ExerciseSummary {
  periodLength: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const ratingLimits = [0.8, 1.2]
const ratingDescList = [
  'Get a hold of yourself',
  'Good job',
  'Workings of a higher being'
]

const exerciseCalculator = (trainArr: number[], dayTarget: number): ExerciseSummary => {
  const avg = trainArr.reduce((a, b) => (a + b), 0) / trainArr.length;
  let rating
  if (avg / dayTarget < ratingLimits[0]){
    rating = 1
  } else if (avg / dayTarget < ratingLimits[1]) {
    rating = 2
  } else {
    rating = 3
  }

  return {
    periodLength: trainArr.length,
    success: avg > dayTarget,
    rating,
    ratingDescription: ratingDescList[rating-1],
    target: dayTarget,
    average: avg
  }
}

interface ExcerciseInput {
  exs: Array<number>,
  target: number
}

// first user-defined arg is the target, the rest are daily hours
const parseExercises = (args: Array<string>): ExcerciseInput => {
  if (args.length < 4) throw new Error('Not enough arguments');

  // catch user-defined arguments
  let [targetStr, ...exsStr] = args.slice(2)
  const target = Number(targetStr)
  const exs = exsStr.map(Number)

  if (!exs.includes(NaN) && !isNaN(target)) {
    return {
      exs,
      target
    }
  } else {
    throw new Error('Provided values were not an array of numbers and a number!');
  }
}

try {
  const { exs, target } = parseExercises(process.argv);
  console.log(exerciseCalculator(exs, target))
} catch (e) {
  console.log('Error: ', e.message);
}

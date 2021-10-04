type Diagnose = [number, string]
const diagnoseList : [Diagnose, Diagnose, Diagnose, Diagnose, Diagnose, Diagnose, Diagnose] = [
  [16, 'Underweight (Severe thinness)'],
  [17, 'Underweight (Moderate thinness)'],
  [18.5, 'Underweight (Mild thinness)'],
  [25, 'Normal range'],
  [30, 'Overweight (Pre-obese)'],
  [35, 'Obese (Class I)'],
  [40, 'Obese (Class II)']
]

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2

  for (const diagnose of diagnoseList) {
    if (bmi < diagnose[0]) {
      return diagnose[1]
    }
  }
  // else
  return 'Obese (Class III)'
}

interface HeightWeight {
  height: number,
  weight: number
}

const parseArguments = (args: Array<string>): HeightWeight => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log('Error: ', e.message);
}

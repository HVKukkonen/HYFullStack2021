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

const calculate = (height: number, weight: number): object => {
  const bmi = weight / (height / 100) ** 2

  for (const diagnose of diagnoseList) {
    if (bmi < diagnose[0]) {
      return {
        weight,
        height,
        bmi: diagnose[1]
      }
    }
  }
  // else
  return {
    weight,
    height,
    bmi: 'Obese (Class III)'
  }
}

interface HeightWeight {
  height: number,
  weight: number
}

// interface Query extends HeightWeight {}
interface Query {
  height?: number,
  weight?: number
}

const isValid = (input: any) => (
  !isNaN(input)
);

const parseQuery= (query: Query): HeightWeight => {

  const weight = Number(query.weight)
  const height = Number(query.height)

  if (isValid(weight) && isValid(height)) {
    return {
      height,
      weight
    }
  } else {
    throw new Error('malformatted parameters');
  }
}

const bmiCalculator = (query: Query) : object => {
  const input = parseQuery(query)
  return calculate(input.height, input.weight)
}

export default bmiCalculator

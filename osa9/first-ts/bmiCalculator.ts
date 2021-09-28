type Diagnose = [number, string]
const diagnoseList : [Diagnose, Diagnose, Diagnose] = [
  [16, 'Underweight (Severe thinness)'],
  [17, 'Underweight (Moderate thinness)'],
  [18.5, 'Underweight (Mild thinness)']
]
// const diagnose(bmi: number) : string => {
//   if (bmi < 16) {return 'Underweight (Severe thinness)'}
//   else if (bmi < )

// }

const calculateBmi = (height: number, weight: number) : any => {
  const bmi = weight / height**2

  for (const diagnose in diagnoseList) {
    console.log('diagnose', diagnose)
    // if (bmi < diagnose[0]) { return diagnose[2]}
  }
}

calculateBmi(184, 78)
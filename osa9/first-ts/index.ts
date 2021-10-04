import express from 'express';
// own modules
import bmiCalculator from './bmiEndpointCalc';
import execEndpointCalc from './exerciseEndpointCalc';

const app = express();
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Susu!');
});

app.get('/bmi', (req, res) => {
  return res.json(bmiCalculator(req.query))
});

app.post('/exercises', (req, res) => {
  return res.json(execEndpointCalc(req.body))
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
# BMI & Calorie Calculator

This is a BMI and Calorie calculator template

**IMPORTANT:** These calculations are made for informational purposes and cannot be considered as a medical advice.
Consulting with a doctor is recommended, if you need more accurate numbers.

 ## How to use

- You can switch between calculators by clicking on the BMI or Calorie button
- Select your measurement units with Standard and Metric switcher (e.g.: pounds - kg)
- Type in your measurements, then click on Calculate button to see your results

## Calculation formulas

### BMI

[Body Mass Index](https://en.wikipedia.org/wiki/Body_mass_index) is used to calculate your obesity level.

BMI has 4 levels:
- underweight (under 18.5 kg/m2), 
- normal weight (18.5 to 24.9), 
- overweight (25 to 29.9), and 
- obese (30 or more)

_STANDARD UNITS_

<code>Weight in lbs / (Height in inch)<sup>2</sup> * 703</code>

_METRIC UNITS_

<code>Weight in kg / (Height in m)<sup>2</sup></code>

### Calories

To calculate your calorie requirements, you need two formulas.

First, you have to calculate your BMR ([Basal Metabolic Rate](https://en.wikipedia.org/wiki/Basal_metabolic_rate)).
BMR shows your daily energy needs at rest.

Then, choose your PAL (physical activity level). This has 5 levels.

After all, multiply your BMR with your PAL value and you'll get your TDEE (Total Daily Energy Expenditure), which is your daily calorie needs based on your activity level.

#### BMR (Mifflin-St Jeor equation)

_STANDARD UNITS_

<code>**For Men:** 4.536 * (weight in lbs) + 15.88 * (height in inches) - 5 * (age in years) + 5</code>

<code>**For Women:** 4.536 * (weight in lbs) + 15.88 * (height in inches) - 5 * (age in years) - 161</code>


_METRIC UNITS_

<code>**For Men:** 10 * (weight in kg) + 6.25 * (height in cm) - 5 * (age in years) + 5</code>

<code>**For Women:** 10 * (weight in kg) + 6.25 * (height in cm) - 5 * (age in years) - 161</code>

#### TDEE

- Sedentary (Little/ no exercise) `BMR * 1.2`
- Light (exercise 1-3 times  a week) `BMR * 1.375`
- Moderate (exercise 4-5 times a week) `BMR * 1.55`
- Very active (hard exercise a week) `BMR * 1.725`
- Extremely active (Professional athlete) `BMR * 1.9`

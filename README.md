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

#### BMR

_STANDARD UNITS_

<code>**For Men:** 66.47 + (6.24 * weight in lbs) + (12.7 * height in inches) - (6.75 * age in years)</code>

<code>**For Women:** 65.51 + (4.35 * weight in lbs) + (4.7 * height in inches) - (4.7 * age in years)</code>


_METRIC UNITS_

<code>**For Men:** 66.5 + (13.75 * weight in kg) + (5.003 * height in cm) - (6.75 * age in years)</code>

<code>**For Women:** 655.1 + (9.563 * weight in kg) + (1.850 * height in cm) - (4.676 * age in years)</code>

#### TDEE

- Sedentary (Little/ no exercise) `BMR * 1.2`
- Light (exercise 1-3 times  a week) `BMR * 1.375`
- Moderate (exercise 4-5 times a week) `BMR * 1.55`
- Very active (hard exercise a week) `BMR * 1.725`
- Extremely active (Professional athlete) `BMR * 1.9`

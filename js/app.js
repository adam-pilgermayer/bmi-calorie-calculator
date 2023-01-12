const $title = document.querySelector(".js-calc-title");

//BMI constants
const $bmiForm = document.querySelector(".js-calc-bmi__form");
const $bmiButton = document.querySelector(".js-calc-btn__bmi");
const $bmiUnit = document.querySelector(".js-unit-switcher-inp__bmi");
const $bmiStandardInputs = [
	...document.querySelectorAll(".js-standard-input__bmi"),
];
const $bmiMetricInputs = [
	...document.querySelectorAll(".js-metric-input__bmi"),
];
const $bmiWeightKg = document.querySelector(".js-kg-inp__bmi");
const $bmiWeightPounds = document.querySelector(".js-pounds-inp__bmi");
const $bmiHeightCm = document.querySelector(".js-cm-inp__bmi");
const $bmiHeightFeet = document.querySelector(".js-feet-inp__bmi");
const $bmiHeightInches = document.querySelector(".js-inch-inp__bmi");
const $bmiResultTextField = document.querySelector(".js-result__bmi");

//Calories constants
const $calButton = document.querySelector(".js-calc-btn__calories");
const $calForm = document.querySelector(".js-calc-calories__form");
const $calUnit = document.querySelector(".js-unit-switcher-inp__calories");
const $calStandardInputs = [
	...document.querySelectorAll(".js-standard-input__calories"),
];
const $calMetricInputs = [
	...document.querySelectorAll(".js-metric-input__calories"),
];
const $calGenderMale = document.querySelector(".js-gender-male");
const $calAge = document.querySelector(".js-age-inp__calories");
const $calWeightKg = document.querySelector(".js-kg-inp__calories");
const $calWeightPounds = document.querySelector(".js-pounds-inp__calories");
const $calHeightCm = document.querySelector(".js-cm-inp__calories");
const $calHeightFeet = document.querySelector(".js-feet-inp__calories");
const $calHeightInches = document.querySelector(".js-inch-inp__calories");
const $calActivity = document.querySelector(".js-pal-selector");
const $calResultTextField = document.querySelector(".js-result__calories");

let activeCalculator = null; // 0 = bmi, 1 = calories, null = default

//calculation helper functions

const getStatus = (input) => input.checked;
const feetToInches = (feet, inches) => feet * 12 + inches;
const getNumberValue = (elem) => Number(elem.value);
const printResult = (elem, text) => (elem.innerText = text);

//Navigation, Measurement change functions

function setTitle(calculatorState) {
	return {
		null: "Cannot Load title",
		0: "BMI Calculator",
		1: "Calorie Calculator",
	}[calculatorState];
}

function swapElemStyle(elem1, elem2, style) {
	elem1.classList.add(style);
	elem2.classList.remove(style);
}

function setInputsActive(inputFields) {
	inputFields.forEach((elem) => {
		elem.classList.remove("hidden");
		elem.firstElementChild.removeAttribute("disabled", "");
	});
}

function setInputsInactive(inputFields) {
	inputFields.forEach((elem) => {
		elem.classList.add("hidden");
		elem.firstElementChild.setAttribute("disabled", "");
	});
}

function changeActiveInputs(unitInput, standard, metric) {
	let isMetric = getStatus(unitInput);

	if (isMetric) {
		setInputsActive(metric);
		setInputsInactive(standard);
	} else {
		setInputsActive(standard);
		setInputsInactive(metric);
	}
}

//BMI calculator functions

function bmiCategory(value) {
	if (!value) return;

	if (value < 18.5) {
		return "Underweight";
	} else if (value >= 18.5 && value < 25) {
		return "Normal";
	} else if (value >= 25 && value < 40) {
		return "Overweight";
	} else if (value >= 40) {
		return "Obese";
	} else {
		return "Invalid value";
	}
}

function bmi(isMetric, weight, height) {
	if (isMetric) {
		let heightInMeters = height / 100;
		return (weight / heightInMeters ** 2).toFixed(1);
	}

	return ((weight / height ** 2) * 703).toFixed(1);
}

function evaluateBMI(isMetric) {
	let bmiVal;
	let bmiCat;

	if (!isMetric) {
		let bmiWeightPoundsVal = getNumberValue($bmiWeightPounds);
		let bmiHeightFeetVal = getNumberValue($bmiHeightFeet);
		let bmiHeightInchesVal = getNumberValue($bmiHeightInches);
		let totalInches = feetToInches(bmiHeightFeetVal, bmiHeightInchesVal);

		bmiVal = bmi(isMetric, bmiWeightPoundsVal, totalInches);
		bmiCat = bmiCategory(bmiVal);
	} else if (isMetric) {
		let bmiWeightKgVal = getNumberValue($bmiWeightKg);
		let bmiHeightCmVal = getNumberValue($bmiHeightCm);

		bmiVal = bmi(isMetric, bmiWeightKgVal, bmiHeightCmVal);
		bmiCat = bmiCategory(bmiVal);
	}

	return [bmiVal, bmiCat];
}

const handleBMIForm = (e) => {
	e.preventDefault();

	let bmiIsMetric = getStatus($bmiUnit);
	let [bmiValue, bmiCategory] = evaluateBMI(bmiIsMetric);

	printResult($bmiResultTextField, `Your BMI is ${bmiValue} (${bmiCategory})`);
};

//Calories calculator functions

//TDEE is Total Daily Energy Expenditure
const getTDEE = (multiplier) => (bmrValue) => Math.round(bmrValue * multiplier);
function evaluateTotalCalorieNeeds(bmrValue, palValue) {
	let tdee = getTDEE(bmrValue);

	let multipliers = {
		0: tdee(1.2),
		1: tdee(1.375),
		2: tdee(1.55),
		3: tdee(1.725),
		4: tdee(1.9),
	};

	return multipliers[palValue];
}

function evaluateBMR(isMetric, isMale) {
	const CalorieDifferenceMale = 5;
	const CalorieDifferenceFemale = -161;
	let calAgeVal = getNumberValue($calAge);
	let bmrValue;

	if (isMetric) {
		let calWeightKgVal = getNumberValue($calWeightKg);
		let calHeightCmVal = getNumberValue($calHeightCm);
		bmrValue = 10 * calWeightKgVal + 6.25 * calHeightCmVal - 5 * calAgeVal;
	} else if (!isMetric) {
		let calWeightPoundsVal = getNumberValue($calWeightPounds);
		let calHeightFeetVal = getNumberValue($calHeightFeet);
		let calHeightInchesVal = getNumberValue($calHeightInches);
		let calTotalFeetVal = feetToInches(calHeightFeetVal, calHeightInchesVal);
		bmrValue =
			4.536 * calWeightPoundsVal + 15.88 * calTotalFeetVal - 5 * calAgeVal;
	}

	if (isMale) {
		return Math.round(bmrValue + CalorieDifferenceMale);
	}
	return Math.round(bmrValue + CalorieDifferenceFemale);
}

const handleCalorieForm = (e) => {
	e.preventDefault();

	let calIsMetric = getStatus($calUnit);
	let calIsMale = getStatus($calGenderMale);
	let calActivityValue = getNumberValue($calActivity);

	let bmrValue = evaluateBMR(calIsMetric, calIsMale);
	let totalCalorieNeeds = evaluateTotalCalorieNeeds(bmrValue, calActivityValue);
	printResult(
		$calResultTextField,
		`You need ${totalCalorieNeeds} calories a day`
	);
};

//***************
// EventListeners
//***************

//After page loaded
window.addEventListener("load", () => {
	activeCalculator = 0;
});

//Calculator selection

$bmiButton.addEventListener("click", () => {
	activeCalculator = 0;
	printResult($bmiResultTextField, "");
	printResult($title, setTitle(activeCalculator));
	swapElemStyle($bmiButton, $calButton, "current-btn");
	swapElemStyle($calForm, $bmiForm, "hidden");
});

$calButton.addEventListener("click", () => {
	activeCalculator = 1;
	printResult($calResultTextField, "");
	printResult($title, setTitle(activeCalculator));
	swapElemStyle($calButton, $bmiButton, "current-btn");
	swapElemStyle($bmiForm, $calForm, "hidden");
});

//Measurement unit switcher

$bmiUnit.addEventListener("click", () => {
	printResult($bmiResultTextField, "");
	changeActiveInputs($bmiUnit, $bmiStandardInputs, $bmiMetricInputs);
});

$calUnit.addEventListener("click", () => {
	printResult($calResultTextField, "");
	changeActiveInputs($calUnit, $calStandardInputs, $calMetricInputs);
});

//Form submit

$bmiForm.addEventListener("submit", handleBMIForm);

$calForm.addEventListener("submit", handleCalorieForm);

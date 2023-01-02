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
const $calGenderFemale = document.querySelector(".js-gender-female");
const $calAge = document.querySelector(".js-age-inp__calories");
const $calWeightKg = document.querySelector(".js-kg-inp__calories");
const $calWeightPounds = document.querySelector(".js-pounds-inp__calories");
const $calHeightCm = document.querySelector(".js-cm-inp__calories");
const $calHeightFeet = document.querySelector(".js-feet-inp__calories");
const $calHeightInches = document.querySelector(".js-inch-inp__calories");
const $calActivity = document.querySelector(".js-pal-selector");
const $calResultTextField = document.querySelector(".js-result__calories");

let activeCalculator = null; // 0 = bmi, 1 = calories, null = default

//Navigation, Measurement change functions

function setTitle(calculatorState) {
	switch (calculatorState) {
		case null:
			console.error("Cannot load title.");
			break;
		case 0:
			return "BMI Calculator";
		case 1:
			return "Calorie Calculator";
		default:
			console.error(calculatorState + " is not a valid state.");
	}
}

function swapElemStyle(elem1, elem2, style) {
	elem1.classList.add(style);
	elem2.classList.remove(style);
}

function isMetric(unitState) {
	return unitState.checked;
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

function changeActiveInputs(unitState, standard, metric) {
	if (!isMetric(unitState)) {
		setInputsActive(standard);
		setInputsInactive(metric);
	} else {
		setInputsActive(metric);
		setInputsInactive(standard);
	}
}

//calculation helper functions

const feetToInches = (feet, inches) => feet * 12 + inches;
const getNumberValue = (elem) => Number(elem.value);
const printResult = (elem, text) => (elem.innerText = text);

//BMI calculator functions

function bmi(isUnitMetric, weight, height) {
	if (isUnitMetric) {
		let heightInMeters = height / 100;
		return (weight / heightInMeters ** 2).toFixed(1);
	}

	return ((weight / height ** 2) * 703).toFixed(1);
}

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

function bmiEvaluation(unitState) {
	let bmiVal;
	let bmiCat;

	if (!unitState) {
		let bmiWeightPoundsVal = getNumberValue($bmiWeightPounds);
		let bmiHeightFeetVal = getNumberValue($bmiHeightFeet);
		let bmiHeightInchesVal = getNumberValue($bmiHeightInches);
		let totalInches = feetToInches(bmiHeightFeetVal, bmiHeightInchesVal);

		bmiVal = bmi(unitState, bmiWeightPoundsVal, totalInches);
		bmiCat = bmiCategory(bmiVal);
	} else if (unitState) {
		let bmiWeightKgVal = getNumberValue($bmiWeightKg);
		let bmiHeightCmVal = getNumberValue($bmiHeightCm);

		bmiVal = bmi(unitState, bmiWeightKgVal, bmiHeightCmVal);
		bmiCat = bmiCategory(bmiVal);
	}

	return [bmiVal, bmiCat];
}

//Calories calculator functions

//***************
// EventListeners
//***************

//After page loaded

window.addEventListener("load", () => {
	activeCalculator = 0;
	printResult($title, setTitle(activeCalculator));
});

//Calculator selection

$bmiButton.addEventListener("click", () => {
	activeCalculator = 0;
	printResult($title, setTitle(activeCalculator));
	swapElemStyle($bmiButton, $calButton, "current-btn");
	swapElemStyle($calForm, $bmiForm, "hidden");
});

$calButton.addEventListener("click", () => {
	activeCalculator = 1;
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
	changeActiveInputs($calUnit, $calStandardInputs, $calMetricInputs);
});

//Form submit

$bmiForm.addEventListener("submit", (event) => {
	event.preventDefault();

	let unitState = isMetric($bmiUnit);
	let [bmiValue, bmiCategory] = bmiEvaluation(unitState);

	printResult($bmiResultTextField, `Your BMI is ${bmiValue} (${bmiCategory})`);
});

$calForm.addEventListener("submit", (event) => {
	event.preventDefault();
	alert("submitted calories");
});

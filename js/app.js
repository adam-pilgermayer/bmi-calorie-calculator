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
const $caloriesButton = document.querySelector(".js-calc-btn__calories");
const $caloriesForm = document.querySelector(".js-calc-calories__form");
const $caloriesUnit = document.querySelector(".js-unit-switcher-inp__calories");
const $caloriesStandardInputs = [
	...document.querySelectorAll(".js-standard-input__calories"),
];
const $caloriesMetricInputs = [
	...document.querySelectorAll(".js-metric-input__calories"),
];

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

function changeActiveBtnStyle(onBtn, offBtn) {
	onBtn.classList.add("current-btn");
	offBtn.classList.remove("current-btn");
}

function changeActiveForm(onForm, offForm) {
	onForm.classList.remove("hidden");
	offForm.classList.add("hidden");
}

function isMetric() {
	if (activeCalculator === 0) {
		return $bmiUnit.checked;
	}
	return $caloriesUnit.checked;
}

function changeActiveUnits(standard, metric) {
	if (!isMetric()) {
		standard.forEach((elem) => {
			elem.classList.remove("hidden");
			elem.firstElementChild.removeAttribute("disabled", "");
		});
		metric.forEach((elem) => {
			elem.classList.add("hidden");
			elem.firstElementChild.setAttribute("disabled", "");
		});
	} else {
		standard.forEach((elem) => {
			elem.classList.add("hidden");
			elem.firstElementChild.setAttribute("disabled", "");
		});
		metric.forEach((elem) => {
			elem.classList.remove("hidden");
			elem.firstElementChild.removeAttribute("disabled", "");
		});
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

//***************
// EventListeners
//***************

//after page loaded

window.addEventListener("load", () => {
	activeCalculator = 0;
	$title.innerText = setTitle(activeCalculator);
});

//calculator selection

$bmiButton.addEventListener("click", () => {
	activeCalculator = 0;
	$title.innerText = setTitle(activeCalculator);
	changeActiveBtnStyle($bmiButton, $caloriesButton);
	changeActiveForm($bmiForm, $caloriesForm);
});

$caloriesButton.addEventListener("click", () => {
	activeCalculator = 1;
	$title.innerText = setTitle(activeCalculator);
	changeActiveBtnStyle($caloriesButton, $bmiButton);
	changeActiveForm($caloriesForm, $bmiForm);
});

//Measurement unit switcher

$bmiUnit.addEventListener("click", () => {
	$bmiResultTextField.innerText = "";
	changeActiveUnits($bmiStandardInputs, $bmiMetricInputs);
});

$caloriesUnit.addEventListener("click", () => {
	changeActiveUnits($caloriesStandardInputs, $caloriesMetricInputs);
});

//Form submit

$bmiForm.addEventListener("submit", (event) => {
	event.preventDefault();

	let unitState = isMetric();
	let [bmiValue, bmiCategory] = bmiEvaluation(unitState);

	printResult($bmiResultTextField, `Your BMI is ${bmiValue} (${bmiCategory})`);
});

$caloriesForm.addEventListener("submit", (event) => {
	event.preventDefault();
	alert("submitted calories");
});

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

//Calculator constants

const feetToInches = (feet, inches) => feet * 12 + inches;

//Navigation, Measurement change functions

function setTitle(state) {
	switch (state) {
		case null:
			console.error("Cannot load title.");
			break;
		case 0:
			return "BMI Calculator";
		case 1:
			return "Calorie Calculator";
		default:
			console.error(state + " is not a valid state.");
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
		});
		metric.forEach((elem) => {
			elem.classList.add("hidden");
		});
	} else {
		standard.forEach((elem) => {
			elem.classList.add("hidden");
		});
		metric.forEach((elem) => {
			elem.classList.remove("hidden");
		});
	}
}

//BMI calculation

function bmiResult(value) {
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

function bmi(measurementState, weight, height) {
	if (measurementState === 0) {
		let heightInMeters = height / 100;
		return (weight / heightInMeters ** 2).toFixed(1);
	}

	return ((weight / height ** 2) * 703).toFixed(1);
}

//***************
// EventListeners
//***************

window.addEventListener("load", () => {
	activeCalculator = 0;
	$title.textContent = setTitle(activeCalculator);
});

$bmiButton.addEventListener("click", () => {
	activeCalculator = 0;
	$title.textContent = setTitle(activeCalculator);
	changeActiveBtnStyle($bmiButton, $caloriesButton);
	changeActiveForm($bmiForm, $caloriesForm);
});

$caloriesButton.addEventListener("click", () => {
	activeCalculator = 1;
	$title.textContent = setTitle(activeCalculator);
	changeActiveBtnStyle($caloriesButton, $bmiButton);
	changeActiveForm($caloriesForm, $bmiForm);
});

$bmiUnit.addEventListener("click", () => {
	changeActiveUnits($bmiStandardInputs, $bmiMetricInputs);
});

$caloriesUnit.addEventListener("click", () => {
	changeActiveUnits($caloriesStandardInputs, $caloriesMetricInputs);
});

const $title = document.querySelector(".js-calc-title");
const $formContainer = document.querySelector(".js-form-container");

//BMI constants
const $bmiForm = document.querySelector(".js-calc-bmi__form");
const $bmiButton = document.querySelector(".js-calc-btn__bmi");

//Calories constants
const $caloriesForm = document.querySelector(".js-calc-calories__form");
const $caloriesButton = document.querySelector(".js-calc-btn__calories");

let ACTIVE_CALCULATOR = null; // 0 = bmi, 1 = calories

function renderBmiForm() {
	return `<form action="#" method="GET" class="calc-bmi__form js-calc-bmi__form">
  <div class="calc-form-container__bmi">
    <div class="calc-form-box">
      <div class="measurement-switcher-container">
        <span>STANDARD</span>
        <label for="toggle-this" class="measurement-switcher">
          <input
            class="measurement-switcher__inp js-measurement-switcher__inp"
            type="checkbox"
            id="toggle-this"
          />
          <div class="measurement-switcher__shape"></div>
        </label>
        <span>METRIC</span>
      </div>
    </div>
    <div class="calc-form-box">
      <label class="input-title" for="bmi-calc__weight">Weight: </label>
      <div class="input-container">
        <input
          class="js-weight-inp__bmi textbox"
          id="bmi-calc__weight"
          type="text"
          inputmode="numeric"
          name="pounds"
          maxlength="15"
          max="1000"
          autocomplete="off"
          pattern="[0-9]+[.]{0,1}[0-9]+"
          required
        />
        <label
          class="input-label js-label-of-main-weight__bmi"
          for="bmi-calc__weight"
          >(Pounds)</label
        >
      </div>
    </div>
    <div class="calc-form-box">
      <label class="input-title" for="bmi-calc__height">Height: </label>
      <div class="input-container">
        <input
          class="js-height-inp__bmi textbox"
          id="bmi-calc__height"
          type="text"
          inputmode="numeric"
          name="feet"
          maxlength="2"
          autocomplete="off"
          pattern="[0-9]{,2}"
          required
        />
        <label
          class="input-label js-label-of-main-height__bmi"
          for="bmi-calc__height"
          >(Feet)</label
        >
      </div>
      <div class="input-container js-extra-height-container">
        <input
          class="js-inch-inp__bmi textbox"
          id="bmi-calc__inch"
          type="text"
          inputmode="numeric"
          name="inches"
          maxlength="2"
          autocomplete="off"
          pattern="[0-9]{,2}"
          required
        />
        <label
          class="input-label js-label-of-inches__bmi"
          for="bmi-calc__inch"
          >(Inches)</label
        >
      </div>
    </div>
    <div class="calc-form-box">
      <div class="form-buttons">
        <button class="reset-btn" type="reset">Reset</button>
        <button class="calculate-btn" type="submit">Calculate</button>
      </div>
    </div>
    <div class="calc-form-box">
      <div class="js-result result">21.53</div>
    </div>
  </div>
</form>`;
}

function renderCaloriesForm() {
	return `<form
  action="#"
  method="GET"
  class="calc-calories__form js-calc-calories__form"
>
  HELLO
</form>`;
}

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

window.addEventListener("load", () => {
	ACTIVE_CALCULATOR = 0;
	$title.textContent = setTitle(ACTIVE_CALCULATOR);
	changeActiveBtnStyle($bmiButton, $caloriesButton);
	$formContainer.innerHTML = renderBmiForm();
});

$bmiButton.addEventListener("click", () => {
	ACTIVE_CALCULATOR = 0;
	$title.textContent = setTitle(ACTIVE_CALCULATOR);
	changeActiveBtnStyle($bmiButton, $caloriesButton);
	$formContainer.innerHTML = renderBmiForm();
});

$caloriesButton.addEventListener("click", () => {
	ACTIVE_CALCULATOR = 1;
	$title.textContent = setTitle(ACTIVE_CALCULATOR);
	changeActiveBtnStyle($caloriesButton, $bmiButton);
	$formContainer.innerHTML = renderCaloriesForm();
});

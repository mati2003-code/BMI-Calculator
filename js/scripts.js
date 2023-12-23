'use strict';

const inputWeight = document.querySelector('.container__input--weight');
const inputHeight = document.querySelector('.container__input--height');
const form = document.querySelector('.form');
const submitButton = document.querySelector('.form__button');
const bmiMessage = document.querySelector('.form__info');
const weightStatus = document.querySelector('.form__user-message');

const clearFields = () => {
  inputHeight.value = '';
  inputWeight.value = '';
}

const countBmi = () => {
  const weightValue = parseFloat(inputWeight.value);
  const metresToCm = 100;
  const heightValue = parseFloat(inputHeight.value) / metresToCm;

  // Checking if the fields have a correct value
  if( isNaN(heightValue) 
   || isNaN(weightValue)
   || heightValue === 0 
   || weightValue === 0) {
    clearFields();
    bmiMessage.innerText = 'Wprowadź prawidłowe dane (liczby)';
    weightStatus.innerText = '';
    return;
  }

  let bmiValue = weightValue / Math.pow(heightValue, 2);
  let result = bmiValue.toFixed(2);
  let userMessage;

// Weight status
  if (result < 16) {
    userMessage = 'Wygłodzenie';
  } else if (result <= 16.99) {
    userMessage = 'Wychudzenie';
  } else if (result <= 18.49) {
    userMessage = 'Niedowaga';
  } else if (result <= 24.99) {
    userMessage = `Waga prawidłowa`;
  } else if (result <= 29.99) {
    userMessage = 'Nadwaga';
  }  else if (result <= 34.99) {
    userMessage = '1 stopień otyłości';  
  } else if (result <= 39.99) {
    userMessage = '2 stopień otyłości';  
  } else {
    userMessage = '3 stopień otyłości';  
  }

// Removing colors of message every single time user checks
  weightStatus.classList.remove('text-color-red', 'text-color-orange', 'text-color-green');

  const yourBmi = `Twoje BMI wskazuje na: ${userMessage}`;

  // Thumbs icons
  const thumbUp = '<i class="fa-solid fa-thumbs-up"></i>';
  const thumbDown = '<i class="fa-solid fa-thumbs-down"></i>';
  const animationAppear = 'animation-appear';

  const changeTextColor = (color) => {
    weightStatus.classList.add(`text-color-${color}`);
  }

  switch (userMessage) {
    case 'Wygłodzenie':
    case 'Wychudzenie':
    case '1 stopień otyłości':
    case '2 stopień otyłości':
    case '3 stopień otyłości':
      changeTextColor('red');
      weightStatus.innerHTML = `${yourBmi} ${thumbDown}`;
      break;
    case 'Niedowaga':
    case 'Nadwaga':
      changeTextColor('orange');
      weightStatus.innerHTML = `${yourBmi} ${thumbDown}`;
      break;
    case 'Waga prawidłowa':
      changeTextColor('green');
      weightStatus.innerHTML = `${yourBmi} ${thumbUp}`;
      break;
  default: 
  }
  bmiMessage.classList.add(`${animationAppear}`);
  weightStatus.classList.add(`${animationAppear}`);
  bmiMessage.innerText = `Twój wskaźnik masy ciała wynosi: ${result}`;

   clearFields();
   document.body.style.zoom = '100%';
}

const enterPressed = (input) => {
  input.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
      countBmi();
    }
  });
}


// Events
submitButton.addEventListener('click', countBmi);
enterPressed(inputHeight);
enterPressed(inputWeight);






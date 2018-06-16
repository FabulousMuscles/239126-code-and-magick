'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var shuffleArray = function (array) {
  var j;
  var temp;
  for (var i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
};

var shuffledNames = shuffleArray(WIZARD_NAMES);
var shuffledSurnames = shuffleArray(WIZARD_SURNAMES);
var shuffledCoats = shuffleArray(WIZARD_COATS);
var shuffledWizardEyes = shuffleArray(WIZARD_EYES);

var userDialog = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');

var userNameInput = userDialog.querySelector('.setup-user-name');

var setupPlayer = userDialog.querySelector('.setup-player');
var wizardCoatColor = setupPlayer.querySelector('.wizard-coat');
var wizardEyeColor = setupPlayer.querySelector('.wizard-eyes');
var playerFeaturesInputData = setupPlayer.querySelectorAll('input');
var fireball = userDialog.querySelector('.setup-fireball');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
.content
.querySelector('.setup-similar-item');

var fragment = document.createDocumentFragment();

var wizards = [];

var renderArrayObject = function (arrayObjects, quantity) {
  for (var i = 0; i < quantity; i++) {
    arrayObjects[i] = {
      name: shuffledNames[i] + ' ' + shuffledSurnames[i],
      coatColor: shuffledCoats[i],
      eyesColor: shuffledWizardEyes[i]
    };
  }
  return arrayObjects;
};


var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};


var createWizardBlock = function (documentFragment, arrayObjects) {
  for (var i = 0; i < arrayObjects.length; i++) {
    documentFragment.appendChild(renderWizard(arrayObjects[i]));
  }
  return similarListElement.appendChild(documentFragment);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};


var checkInputHandler = function (evt) {
  var target = evt.target;

  if (target.validity.valueMissing) {
    target.setCustomValidity('Обязательное поле');
  } else if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (target.value.length > 25) {
    target.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else {
    target.setCustomValidity('');
  }
  return target;
};


var renderCoatColor = function () {
  var renderedCoatColor = WIZARD_COATS[Math.floor(Math.random() * WIZARD_COATS.length)];

  return renderedCoatColor;
};

var renderEyeColor = function () {
  var renderedEyeColor = WIZARD_EYES[Math.floor(Math.random() * WIZARD_EYES.length)];

  return renderedEyeColor;
};

var renderFireballColor = function () {
  var renderedFireballColor = FIREBALL_COLORS[Math.floor(Math.random() * FIREBALL_COLORS.length)];

  return renderedFireballColor;
};

var inputFocusHandler = function () {
  document.removeEventListener('keydown', onPopupEscPress);
};

var inputBlurHandler = function () {
  document.addEventListener('keydown', onPopupEscPress);
};

var wizardAndFireballColorClickHandler = function (evt) {
  var targetElement = evt.target;

  if (targetElement === wizardCoatColor) {
    playerFeaturesInputData[0].value = renderCoatColor();
    wizardCoatColor.style.fill = playerFeaturesInputData[0].value;
  } else if (targetElement === wizardEyeColor) {
    playerFeaturesInputData[1].value = renderEyeColor();
    wizardEyeColor.style.fill = playerFeaturesInputData[1].value;
  } else if (targetElement === fireball) {
    playerFeaturesInputData[2].value = renderFireballColor();
    fireball.style = 'background-color:' + playerFeaturesInputData[2].value;
  }

  return targetElement;
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

userNameInput.addEventListener('focus', inputFocusHandler);

userNameInput.addEventListener('blur', inputBlurHandler);

userNameInput.addEventListener('input', checkInputHandler);

setupPlayer.addEventListener('click', wizardAndFireballColorClickHandler);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

renderArrayObject(wizards, 4);

createWizardBlock(fragment, wizards);

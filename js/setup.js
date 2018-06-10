'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия','Люпита','Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];

var shuffleArray = function (array) {
    var j;
    var temp;
    for (var i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random()*(i + 1));
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
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');


var wizards = [
  {
    name: shuffledNames[0] + ' ' + shuffledSurnames[0],
    coatColor: shuffledCoats[0],
    eyesColor: shuffledWizardEyes[0]
  },
  {
    name: shuffledNames[1] + ' ' + shuffledSurnames[1],
    coatColor: shuffledCoats[1],
    eyesColor: shuffledWizardEyes[1]
  },
  {
    name: shuffledNames[2] + ' ' + shuffledSurnames[2],
    coatColor: shuffledCoats[2],
    eyesColor: shuffledWizardEyes[2]
  },
  {
    name: shuffledNames[3] + ' ' + shuffledSurnames[3],
    coatColor: shuffledCoats[3],
    eyesColor: shuffledWizardEyes[3]
  }
];


var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
console.log(fragment);
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');



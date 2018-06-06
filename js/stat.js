'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var BASIC_X = 100;
var BASIC_Y = 10;
var BAR_WIDTH = 40;
var BAR_HEIGHT = -150;
var BAR_Y_POSITION = CLOUD_HEIGHT - (BASIC_Y * 3);
var basicMargin = BASIC_X + 40;
var columnMargin = BAR_WIDTH + 50;
var colorRed = 'rgba(255, 0, 0, 1)';
var randomBlue = 'rgba(30, 30, 255,' + Math.random() + ')';
var fontData = '16px PT Mono';
var textData = ['Ура вы победили', 'Список результатов:'];
var colorBlack = '#000';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getText = function (ctx, color, font, text, x, y) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.fillText(text, x, y);
  ctx.fillText(text, x, y);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, BASIC_X + 10, BASIC_Y + 10, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, BASIC_X, BASIC_Y, '#fff');


  getText(ctx, colorBlack, fontData, textData[0], basicMargin - 20, BASIC_Y * 4);
  getText(ctx, colorBlack, fontData, textData[1], basicMargin - 20, BASIC_Y * 6);

  var getColor = function (color) {
    for (var i = 0; i < players.length; i++) {
      color = 'rgba(0, 0, 255,' + (Math.random() + 0.10) + ')';
    }
    return color;
  };

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = colorBlack;
    ctx.fillText(players[i], basicMargin + (columnMargin * i), CLOUD_HEIGHT - BASIC_Y);
    ctx.fillText(Math.round(times[i]), basicMargin + (columnMargin * i), BAR_Y_POSITION + (BAR_HEIGHT * times[i] / maxTime) - BASIC_Y);
    if (players[i].length === 2) {
      ctx.fillStyle = colorRed;
    } else {
      ctx.fillStyle = getColor(randomBlue);
    }
    ctx.fillRect(basicMargin + (columnMargin * i), BAR_Y_POSITION, BAR_WIDTH, (BAR_HEIGHT * times[i] / maxTime));
  }
};


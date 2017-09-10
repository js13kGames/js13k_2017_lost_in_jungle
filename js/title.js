/**
 * Lost In Jungle for js13k 2017
 * @id title.js
 *     title / menu screen
 * @author Zendrael
 * @date 13/08/2017
 */

/**
 * Title class
 *
 * @class title
 * @constructor
 */
title = {
  init: function() {
    //logo
    $.text(16, $.centerY - 64, 'Lost', 3, '#603e63');
    $.text(16 * 5, $.centerY - 64, 'in', 3, '#6a816d');
    $.text(16 * 4, $.centerY - 48, 'Jungle', 3, '#e2d4a3');

    //game theme
    $.text(32, $.centerY - 8, 'lost in a misty jungle', 1, '#603e63');
    $.sprite(32, $.centerY, 'p', 16, 16);
    $.text(72, $.centerY, 'how many days', 1, '#603e63');
    $.text(48, $.centerY + 8, 'can you survive?', 1, '#603e63');

    //button Play
    var btnP = $.button($.centerX, $.centerY + 32, 'b');
    btnP.anchor.x = $.anchor.CENTER;
    btnP.anchor.y = $.anchor.TOP;
    btnP.on('click', this.btnPclk, this);
    //button text
    $.text(btnP.x - 11, btnP.y + 12, 'try', 2, '#e2d4a3');

    //copyright
    $.text(8, $.canvas.height - 8, 'by zendrael to js13k 2017', 1, '#e2d4a3');

    //check if it is in portrait
    if (window.innerWidth > window.innerHeight) {
      $.text(8, 8, 'Reload the game in portrait mode', 1, '#e2d4a3');
    }
  },

  update: function() {},

  btnPclk: function() {
    $.goTo(play, {});
  }
};
//eof

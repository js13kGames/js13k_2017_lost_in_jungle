/**
 * Lost In Jungle for js13k 2017
 * @id over.js
 *     game over screen
 * @author Zendrael
 * @date 13/08/2017
 */

/**
 * Over class
 *
 * @class over
 * @constructor
 */
over = {
  init: function(args) {
    $.text(40, $.centerY - 64, 'game', 3, '#6a816d');
    $.text(72, $.centerY - 48, 'over', 3, '#e2d4a3');

    $.text(32, $.centerY - 8, 'you lasted only', 1, '#603e63');
    $.text(88, $.centerY, args.days + ' days', 1, '#603e63');

    //button Play
    var btnR = $.button($.centerX, $.centerY + 32, 'b');
    btnR.anchor.x = $.anchor.CENTER;
    btnR.anchor.y = $.anchor.TOP;
    btnR.on('click', this.btnRclk, this);

    $.text(btnR.x - 7, btnR.y + 12, 'ok', 2, '#e2d4a3');
  },

  update: function() {},

  btnRclk: function() {
    $.goTo(title, {});
  }
};
//eof

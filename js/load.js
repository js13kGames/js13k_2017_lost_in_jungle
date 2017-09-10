/**
 * Lost In Jungle for js13k 2017
 * @id load.js
 *     load screen
 * @author Zendrael
 * @date 13/08/2017
 */

/**
 * Load class
 *
 * @class load
 * @constructor
 */
load = {
  init: function() {
    //copyright
    $.text(8, $.canvas.height - 8, 'Loading...', 1, '#e2d4a3');
  },

  update: function() {
    if ($.loadComplete) $.goTo(title);
  }
};
//eof

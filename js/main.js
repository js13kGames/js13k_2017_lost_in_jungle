/**
 * Lost In Jungle for js13k 2017
 * @id main.js
 *     main file which start the game with confs
 * @author Zendrael
 * @date 13/08/2017
 */

//Main
$.onReady(function() {
  //configure environment
  $.setup({
    title: "Lost in Jungle",
    author: "Zendrael",
    description: "Lost in Jungle game by Zendrael for js13k 2017",
    //icons : [], //TO-DO
    width: 160, //1280,
    height: 240, //720,
    orientation: 'portrait',
    fps: 60,
    pixelart: true, //default false
    bgColor: '#000000', //default transparent
    assets: {
      sounds: ['snd/kill', 'snd/hit', 'snd/room'], //sounds without extension
      images: ['img/b.png', 'img/e.png', 'img/p.png', 'img/t.png']
    }
  });

  //first scene to go
  $.goTo(load);
});
//eof

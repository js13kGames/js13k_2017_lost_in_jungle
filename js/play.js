/**
 * Lost In Jungle for js13k 2017
 * @id play.js
 *     game play screen
 * @author Zendrael
 * @date 13/08/2017
 */

/**
 * Play class
 *
 * @class play
 * @constructor
 */
play = {
  /**
   * setup the scene
   *
   * @method init
   * @return {null}
   */
  init: function(args) {
    //game turns -> 0 player, 1 enemies
    this.trn = 0; //$.rand(0, 1);
    this.tilesize = 16;
    this.kills = 0;
    this.days = args.days || 0;
    this.board = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ];

    this.mkStage();
    this.mkPlayer();
    this.mkEnemies();
    this.mkUI();

    /*
    if (this.trn == 1) {
      this.txtWho.text = 'monsters';
      this.mvEnemies();
    } else {
      this.txtWho.text = 'your';
    }
    */

    $.soundAssets['room'].play();
  },

  update: function() {},

  /*
  printBoard: function() {
    console.log('-------------------------');
    var line = '';
    for (y = 0; y < 8; y++) {
      for (x = 0; x < 8; x++) {
        line += this.board[x][y] + ' ';
      }
      console.log(line); // += '\n';
      line = '';
    }
    //console.log(line);
  },
  */

  mkStage: function() {
    //this.bg = $.image(this.tilesize, Math.ceil( (($.canvas.height - 80) / 2) - 64), 'bg');
    this.bg = {
      x: this.tilesize,
      y: Math.ceil((($.canvas.height - 80) / 2) - 64),
      width: this.tilesize * 8,
      height: this.tilesize * 8
    };

    //assure that it will not be outside the screen
    this.bg.y = (this.bg.y < this.tilesize) ? this.tilesize : this.bg.y;

    //random board appearance
    for (var x = 0; x < 8; x++) {
      for (var y = 0; y < 8; y++) {
        var t = $.sprite(this.bg.x + (x * this.tilesize), this.bg.y + (y * this.tilesize), 't', this.tilesize, this.tilesize);
        //t.frame = $.rand(9,12);
        t.frame = ((x + y) % 2 == 0) ? 9 : $.rand(10, 12);
      }
    }

    //corners
    var tl = $.sprite(0, this.bg.y - this.tilesize, 't', this.tilesize, this.tilesize);
    tl.frame = 0;

    var tr = $.sprite(this.tilesize * 9, this.bg.y - this.tilesize, 't', this.tilesize, this.tilesize);
    tr.frame = 2;

    var bl = $.sprite(0, this.bg.y + this.bg.height, 't', this.tilesize, this.tilesize);
    bl.frame = 6;

    var br = $.sprite(this.tilesize * 9, this.bg.y + this.bg.height, 't', this.tilesize, this.tilesize);
    br.frame = 8;

    //create UP
    for (var x = this.tilesize; x <= (this.tilesize * 8); x += this.tilesize) {
      var t = $.sprite(x, this.bg.y - this.tilesize, 't', this.tilesize, this.tilesize);
      t.frame = 7;
    }

    //create DOWN
    for (var x = this.tilesize; x <= (this.tilesize * 8); x += this.tilesize) {
      var t = $.sprite(x, this.bg.y + this.bg.height, 't', this.tilesize, this.tilesize);
      t.frame = 1;
    }

    //create LEFT
    for (var y = this.bg.y; y <= this.bg.y + (this.tilesize * 7); y += this.tilesize) {
      var t = $.sprite(0, y, 't', this.tilesize, this.tilesize);
      t.frame = 3;
    }

    //create RIGHT
    for (var y = this.bg.y; y <= this.bg.y + (this.tilesize * 7); y += this.tilesize) {
      var t = $.sprite(this.bg.width + this.tilesize, y, 't', this.tilesize, this.tilesize);
      t.frame = 5;
    }

    //obstacles
    for (var i = 0; i < $.rand(4, 6); i++) {
      var x = $.rand(0, 7);
      var y = $.rand(0, 7);
      var obstcl = $.sprite(this.bg.x + (x * this.tilesize), this.bg.y + (y * this.tilesize), 't', this.tilesize, this.tilesize);
      obstcl.frame = $.rand(13, 14);
      this.board[x][y] = 'x';
    }
  },

  mkPlayer: function() {
    var x = $.rand(0, 7);
    var y = $.rand(0, 7);
    //find empty spot
    while (this.board[x][y] != 0) {
      x = $.rand(0, 7);
      y = $.rand(0, 7);
    }

    this.p = $.sprite(this.bg.x + (x * this.tilesize), this.bg.y + (y * this.tilesize), 'p', this.tilesize, this.tilesize);
    this.p.moving = 0;
    this.p.bx = x;
    this.p.by = y;
    //check on the board/board
    this.board[x][y] = 'p';
  },

  mvPlayer: function(btn) {
    if (this.trn == 1 || this.p.moving == 1) return;
    var moved = false;

    switch (btn.dir) {
      case 'u':
        if (this.p.by - 1 >= 0 && this.board[this.p.bx][this.p.by - 1] != 'x') {
          var twn = $.tween(this.p, {
            y: this.p.y - this.tilesize
          });
          moved = true;
          this.board[this.p.bx][this.p.by] = 0;
          this.p.by -= 1;
        }
        break;

      case 'r':
        if (this.p.bx + 1 <= 7 && this.board[this.p.bx + 1][this.p.by] != 'x') {
          var twn = $.tween(this.p, {
            x: this.p.x + this.tilesize
          });
          moved = true;
          this.board[this.p.bx][this.p.by] = 0;
          this.p.bx += 1;
        }
        break;

      case 'd':
        if (this.p.by + 1 <= 7 && this.board[this.p.bx][this.p.by + 1] != 'x') {
          var twn = $.tween(this.p, {
            y: this.p.y + this.tilesize
          });
          moved = true;
          this.board[this.p.bx][this.p.by] = 0;
          this.p.by += 1;
        }
        break;

      case 'l':
        if (this.p.bx - 1 >= 0 && this.board[this.p.bx - 1][this.p.by] != 'x') {
          var twn = $.tween(this.p, {
            x: this.p.x - this.tilesize
          });
          moved = true;
          this.board[this.p.bx][this.p.by] = 0;
          this.p.bx -= 1;
        }
        break;
    }

    if (moved) {
      this.p.moving = 1;
      //end turn
      twn.onDone = function() {
        //killed and enemy?
        if (this.board[this.p.bx][this.p.by] == 'e') {
          this.kills++;
          //remove enemy
          $.soundAssets['kill'].play();
          for (i = 0; i < this.eArr.length; i++) {
            if ((this.eArr[i].bx == this.p.bx) && (this.eArr[i].by == this.p.by)) {
              this.eArr[i].kill();
              this.eArr.splice(i, 1);
            }
          }

          //now move
          this.board[this.p.bx][this.p.by] = 'p';
          this.trn = 1;
          this.incTurns();
          this.txtWho.text = 'monsters';
          this.p.moving = 0;
          this.mvEnemies();

          //check if day is complete
          if (this.kills == this.qtdEnemies) {
            this.win();
          }
        } else {
          //write on board
          this.board[this.p.bx][this.p.by] = 'p';
          this.trn = 1;
          this.incTurns();
          this.txtWho.text = 'monsters';
          this.p.moving = 0;
          this.mvEnemies();
        }
      };
    }
  },

  mkEnemies: function() {
    this.eArr = [];
    this.qtdEnemies = $.rand(3, 5);

    for (var i = 0; i < this.qtdEnemies; i++) {
      var x = $.rand(0, 7);
      var y = $.rand(0, 7);

      //look for an empty spot
      while (this.board[x][y] != 0) {
        x = $.rand(0, 7);
        y = $.rand(0, 7);
      }

      var e = $.sprite(this.bg.x + (x * this.tilesize), this.bg.y + (y * this.tilesize), 'e', this.tilesize, this.tilesize);
      e.frame = $.rand(0, 9);
      e.bx = x;
      e.by = y;

      this.eArr.push(e);

      //put it on the board/board
      this.board[x][y] = 'e';
    }

  },

  mvEnemies: function() {
    if (this.trn == 0 || this.p.moving == 1) return;

    if (!this.enemiesMoved) {
      this.enemiesMoved = 0;
    }

    if (this.enemiesMoved == this.eArr.length) {
      this.txtWho.text = 'your';
      this.trn = 0;
      this.incTurns();
      this.enemiesMoved = 0;
    } else {
      this.mvEnemy(this.enemiesMoved);
    }
  },

  mvEnemy: function(i) {
    var enemy = this.eArr[i];
    //distance between enemy and player
    var dX = Math.abs(enemy.bx - this.p.bx);
    var dY = Math.abs(enemy.by - this.p.by);
    var moved = false;
    //clear position
    this.board[enemy.bx][enemy.by] = 0;

    //attack player if side by side
    if (enemy.bx + 1 <= 7 && this.board[enemy.bx + 1][enemy.by] == 'p') {
      //attack right
      enemy.bx += 1;
      moved = true;
      var twn = $.tween(enemy, {
        x: enemy.x + this.tilesize
      });
    } else if (enemy.bx - 1 >= 0 && this.board[enemy.bx - 1][enemy.by] == 'p') {
      //attack left
      enemy.bx -= 1;
      moved = true;
      var twn = $.tween(enemy, {
        x: enemy.x - this.tilesize
      });
    } else if (enemy.by - 1 >= 0 && this.board[enemy.bx][enemy.by - 1] == 'p') {
      //attack up
      enemy.by -= 1;
      moved = true;
      var twn = $.tween(enemy, {
        y: enemy.y - this.tilesize
      });
    } else if (enemy.by + 1 <= 7 && this.board[enemy.bx][enemy.by + 1] == 'p') {
      //attack down
      enemy.by += 1;
      moved = true;
      var twn = $.tween(enemy, {
        y: enemy.y + this.tilesize
      });
    } else
      //hunt mode, maybe?
      if ($.rand(0, 100) > 50) { //dX <= dY){
        //if(enemy.by-1 >= 0 && this.board[this.p.bx][this.p.by-1] != 'x')
        if (enemy.bx + 1 <= 7 &&
          (this.p.bx >= enemy.bx && this.board[enemy.bx + 1][enemy.by] != 'x' && this.board[enemy.bx + 1][enemy.by] != 'e')
        ) {
          enemy.bx += 1;
          moved = true;
          var twn = $.tween(enemy, {
            x: enemy.x + this.tilesize
          });
        } else if (enemy.bx - 1 >= 0 &&
          (this.p.bx <= enemy.bx && this.board[enemy.bx - 1][enemy.by] != 'x' && this.board[enemy.bx - 1][enemy.by] != 'e')
        ) {
          enemy.bx -= 1;
          moved = true;
          var twn = $.tween(enemy, {
            x: enemy.x - this.tilesize
          });
        }
      } else { // if( dX > dY){
        if (enemy.by + 1 <= 7 &&
          (this.p.by >= enemy.by && this.board[enemy.bx][enemy.by + 1] != 'x' && this.board[enemy.bx][enemy.by + 1] != 'e')
        ) {
          enemy.by += 1;
          moved = true;
          var twn = $.tween(enemy, {
            y: enemy.y + this.tilesize
          });
        } else if (enemy.by - 1 >= 0 &&
          (this.p.by <= enemy.by && this.board[enemy.bx][enemy.by - 1] != 'x' && this.board[enemy.bx][enemy.by - 1] != 'e')
        ) {
          enemy.by -= 1;
          moved = true;
          var twn = $.tween(enemy, {
            y: enemy.y - this.tilesize
          });
        }
      }

    //could not move, so just wait for the next turn
    if (!moved) {
      //stay there
      this.board[enemy.bx][enemy.by] = 'e';
      this.enemiesMoved++;
      this.mvEnemies();
    } else {
      /*var twn = $.tween(enemy, {
          x : (enemy.bx * this.tilesize)+this.tilesize,
          y : (enemy.by * this.tilesize)+Math.ceil(this.bg.y/this.tilesize)
        });
       */

      //end turn on the last one movement
      twn.onDone = function() {
        //if player is there, kill him!
        if (this.board[this.eArr[this.enemiesMoved].bx][this.eArr[this.enemiesMoved].by] == 'p') {
          this.over();
        } else {
          this.board[this.eArr[this.enemiesMoved].bx][this.eArr[this.enemiesMoved].by] = 'e';
          this.enemiesMoved++;
          this.mvEnemies();
        }
      };
    }

    /*
    if(!moved){
      //random movement
      if($.rand(0, 100)>50){
        //avoid limits
        //if(enemy.by-1 >= 0 && this.board[this.p.bx][this.p.by-1] != 'x'){

        var posX = (this.tilesize * ($.rand(0, 100)>50 ? -1 : 1));
        posX = (enemy.x+posX > this.bg.x+this.bg.width) ? -posX : posX;
        posX = (enemy.x+posX < this.bg.x) ? -posX : posX;

        var twn = $.tween(enemy, {
          x : enemy.x + posX
        });
      }else{
        var posY = (this.tilesize * ($.rand(0, 100)>50 ? -1 : 1));
        posY = (enemy.y+posY > this.bg.y+this.bg.height) ? -posY : posY;
        posY = (enemy.y+posY < this.bg.y) ? -posY : posY;

        var twn = $.tween(enemy, {
          y : enemy.y + posY
        });
      }
    }*/
  },

  incTurns: function() {
    this.txtQtd.text = (parseInt(this.txtQtd.text) + 1).toString();
  },

  //----------------------------------------------------------------------------
  //default
  //----------------------------------------------------------------------------
  mkUI: function() {
    this.bU = $.button($.centerX, $.canvas.height - 76, 'b');
    this.bU.anchor.x = $.anchor.CENTER;
    this.bU.dir = 'u';
    this.bU.on('click', this.mvPlayer, this);

    $.text(this.bU.x - 4, this.bU.y + 12, 'N', 2, '#e2d4a3');

    this.bR = $.button($.centerX + 17, $.canvas.height - 58, 'b');
    this.bR.dir = 'r';
    this.bR.on('click', this.mvPlayer, this);

    $.text(this.bR.x + 14, this.bR.y + 12, 'E', 2, '#e2d4a3');

    this.bD = $.button($.centerX, $.canvas.height - 4, 'b');
    this.bD.anchor.x = $.anchor.CENTER;
    this.bD.anchor.y = $.anchor.BOTTOM;
    this.bD.dir = 'd';
    this.bD.on('click', this.mvPlayer, this);

    $.text(this.bD.x - 3, this.bD.y - 20, 'S', 2, '#e2d4a3');

    this.bL = $.button($.centerX - 17, $.canvas.height - 58, 'b');
    this.bL.anchor.x = $.anchor.RIGHT;
    this.bL.dir = 'l';
    this.bL.on('click', this.mvPlayer, this);

    $.text(this.bL.x - 21, this.bL.y + 12, 'W', 2, '#e2d4a3');

    this.txtWho = $.text(this.tilesize / 2, (this.bg.y + (9 * this.tilesize)), 'who', 1, '#603e63');
    $.text(this.tilesize / 2, this.txtWho.y + this.tilesize / 2, 'turn', 1, '#603e63');

    $.text($.canvas.width - 24, (this.bg.y + (9 * this.tilesize)), 'turns', 1, '#603e63');
    this.txtQtd = $.text($.canvas.width - this.tilesize, this.txtWho.y + this.tilesize / 2, '00', 1, '#603e63');
  },

  win: function() {
    //increase days alive
    this.days++;
    //reload scene
    var msg = $.text(16, (this.bg.y + (5 * this.tilesize)), 'A new day begins', 2, '#603e63');
    var twn = $.tween(msg, {
      y: this.tilesize
    });
    twn.onDone = function() {
      $.goTo(play, {
        days: this.days
      });
    };

  },

  over: function() {
    $.soundAssets['hit'].play();
    this.p.kill();
    //go to gameOver screen
    $.goTo(over, {
      days: this.days
    });
  }
};
//eof

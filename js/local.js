var Local = function () {
  // 游戏对象
  var game;
  // 时间间隔
  var INTERVAL = 200;
  // 定时器
  var timer = null;
  // 绑定键盘事件
  var bindKeyEvent = function () {
    document.onkeydown = function (e) {
      if (e.keyCode == 38) { // up
        game.rotate();
      } else if (e.keyCode == 39) { // right
        game.right();
      } else if (e.keyCode == 40) { // down
        game.down();
      } else if (e.keyCode == 37) { // left
        game.left();
      } else if (e.keyCode == 32) { // space
        game.fall();
      }
    }
  }
  // 移动move
  var move = function () {
    if (!game.down()) {
      game.fixed();
      game.checkClear();
      var gameOver = game.checkGameOver();
      if (gameOver) {
        stop();
      } else {
        game.performNext(generateType(), generateDir())
      }
    }
  }

  // 随机生成一个方块种类
  var generateType = function () {
    // return Math.ceil(Math.random() * 7) - 1;  //  原教程是这样写的，但是这样有时候会报错，估计是取不到某一个值
    return Math.ceil(Math.random() * 7);
  }

  // 随机生成一个方块种类
  var generateDir = function () {
    // return Math.ceil(Math.random() * 4) - 1;  //  原教程是这样写的，但是这样有时候会报错，估计是取不到某一个值
    return Math.ceil(Math.random() * 4);
  }

  // start
  var start = function () {
    var doms = {
      gameDiv: document.getElementById('game'),
      nextDiv: document.getElementById('next')
    }
    game = new Game();
    game.init(doms);
    bindKeyEvent();
    timer = setInterval(move, INTERVAL);
  }

  // stop
  var stop = function () {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    document.onkeydown = null;
  }

  // 导出API
  this.start = start;
}
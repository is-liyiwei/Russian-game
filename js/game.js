var Game = function () {
  // dom元素
	var gameDiv;
  var gnextDiv;
  // 游戏矩阵
  var nextData = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];

  var gameData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  // 当前方块
  var cur;

  // 下一方块
  var next;

  // divs
  var nextDivs = [];
  var gameDivs = [];

  var initDiv = function (container, data, divs) {
    for (var i = 0; i < data.length; i++) {
      var div = [];
      for (var j = 0; j < data[0].length; j++) {
        var newNode = document.createElement('div');
        newNode.className = 'none';
        newNode.style.top = (i * 20) + 'px';
        newNode.style.left = (j * 20) + 'px';
        container.appendChild(newNode);
        div.push(newNode);
      }
      divs.push(div);
    }
  }

  // 刷新div
  var refreshDiv = function (data, divs) {
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[0].length; j++) {
        if (data[i][j] == 0) {
          divs[i][j].className = 'none';
        } else if (data[i][j] == 1) {
          divs[i][j].className = 'done';
        } else if (data[i][j] == 2) {
          divs[i][j].className = 'current';
        }
      }
    }
  }

  // 检测点是否合法
  var check = function (pos, x, y) {
    if (pos.x + x < 0) {
      return false
    } else if (pos.x + x >= gameData.length) {
      return false
    } else if (pos.y + y >= gameData.length) {
      return false
    } else if (pos.y + y >= gameData[0].length) {
      return false
    } else if (gameData[pos.x + x][pos.y + y] == 1) {
      return false
    } else {
      return true
    }
  }

  // 检测数据是否合法
  var isValid = function (pos, data) {
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[0].length; j++) {
        if (data[i][j] != 0) {
          if (!check(pos, i, j)) {
            return false
          }
        }
      }
    }
    return true
  }

  // 清除数据
  var clearData = function () {
    for (var i = 0; i < cur.data.length; i++) {
      for (var j = 0; j < cur.data[0].length; j++) {
        if (check(cur.origin, i, j)) {
          gameData[cur.origin.x + i][cur.origin.y + j] = 0;
        }
      }
    }
  }

  // 设置数据
  var setData = function () {
    for (var i = 0; i < cur.data.length; i++) {
      for (var j = 0; j < cur.data[0].length; j++) {
        if (check(cur.origin, i, j)) {
          gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j];
        }
      }
    }
  }

  // 下移
  var down = function () {
    if (cur.canDown(isValid)) {
      clearData();
      cur.down();
      setData();
      refreshDiv(gameData, gameDivs);
      return true // 这个主要配合下面的fall方法
    } else {
      return false // 这个主要配合下面的fall方法
    }
  }

  // 左移
  var left = function () {
    if (cur.canDown(isValid)) {
      clearData();
      cur.left();
      setData();
      refreshDiv(gameData, gameDivs);
    }
  }

  // 右移
  var right = function () {
    if (cur.canDown(isValid)) {
      clearData();
      cur.right();
      setData();
      refreshDiv(gameData, gameDivs);
    }
  }

  // 旋转
  var rotate = function () {
    if (cur.canDown(isValid)) {
      clearData();
      cur.rotate();
      setData();
      refreshDiv(gameData, gameDivs);
    }
  }

  // 方块移动到底部，给它固定
  var fixed = function () {
    for (var i = 0; i < cur.data.length; i++) {
      for (var j = 0; j < cur.data[0].length; j++) {
        if (check(cur.origin, i, j)) {
          if (gameData[cur.origin.x + i][cur.origin.y + j] == 2) {
            gameData[cur.origin.x + i][cur.origin.y + j] = 1;
          }
        }
      }
    }
    refreshDiv(gameData, gameDivs);
  }

  // 消行
  var checkClear = function (type, dir) {
    for (let i = gameData.length - 1; i >= 0; i--) {
      let clear = true;
      for (let j = 0; j < gameData[0].length; j++) {
        if (gameData[i][j] != 1) {
          clear = false;
          break;
        }
      }
      if (clear) {
        for (let m = i; m > 0; m--) {
          for (let n = 0; n < gameData[0].length; n++) {
            gameData[m][n] = gameData[m-1][n];
          }
        }
        for (let n = 0; n < gameData[0].length; n++) {
          gameData[0][n] = 0;
        }
        i++;
      }
    }
  }

  // 使用下一个方块
  var checkGameOver = function () {
    var gameOver = false;
    for (var i = 0; i < gameData[0].length; i++) {
      if (gameData[1][i] == 1) {
        gameOver = true;
      }
    }
    return gameOver
  }

  // 使用下一个方块
  var performNext = function (type, dir) {
    cur = next;
    setData();
    next = SquareFactory.prototype.make(type, dir);
    refreshDiv(gameData, gameDivs);
    refreshDiv(next.data, nextDivs);
  }

  // 初始化
  var init = function (doms) {
    gameDiv = doms.gameDiv;
    nextDiv = doms.nextDiv;
    cur = SquareFactory.prototype.make(2, 2);
    next = SquareFactory.prototype.make(3, 3);
    initDiv(gameDiv, gameData, gameDivs);
    initDiv(nextDiv, next.data, nextDivs);
    setData();
    refreshDiv(gameData, gameDivs);
    refreshDiv(next.data, nextDivs);
  }

  // 到处API
  this.init = init;
  this.down = down;
  this.left = left;
  this.right = right;
  this.rotate = rotate;
  this.fixed = fixed;
  this.performNext = performNext;
  this.checkClear = checkClear;
  this.checkGameOver = checkGameOver;
  this.fall = function () {
    while(down());
  }





}





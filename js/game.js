import view, { drawBlock, showStat, showDummy } from './view';
import bricksfield from './bricksfield';

let speedReduce = 0;
let lastLevel = bricksfield.level;

bricksfield.init();
view.drawGameField();
drawBlock(bricksfield.nextBlock);
drawBlock(bricksfield.nextBlock);
showStat(bricksfield.score, bricksfield.lines, bricksfield.level);

function endGame() {
  document.removeEventListener('keydown', keyPress);
  clearInterval(intervalID);
  showDummy('game over');
}

const intervalAction = function() {
  if (bricksfield.gameOver) {
    endGame();
    return;
  }
  
  if (bricksfield.level > lastLevel) { 
    clearInterval(intervalID);
    lastLevel = bricksfield.level;
    intervalID = setInterval(intervalAction, 1000-speedReduce);
    speedReduce += 100;
  }

  drawBlock(bricksfield.nextBlock);
  showStat(bricksfield.score, bricksfield.lines, bricksfield.level);
  bricksfield.moveDown();
  view.drawGameField();
}


let intervalID = setInterval(intervalAction, 1000);

function getPause() {
  let isPauseOn = false;
  let pauseEvent = (event) => {
    if (event.keyCode === 32) {
      pause();
    }
  };
  return() => {
    if (!isPauseOn) {
      isPauseOn = true;
      clearInterval(intervalID);
      document.removeEventListener('keydown', keyPress);
      document.addEventListener('keydown', pauseEvent);  
      showDummy('pause');
    } else {
      isPauseOn = false;
      document.removeEventListener('keydown', pauseEvent);
      document.addEventListener('keydown', keyPress);
      intervalID = setInterval(intervalAction, 1000-speedReduce);
      showDummy('');
    }
  }
}

const pause = getPause();


const keyPress = function(event) {
  if (bricksfield.gameOver) {
    endGame();
    return;
  }

  const code = event.keyCode;
  
  switch(code) {
    case(37): {
      bricksfield.moveLeft();
      view.drawGameField();
    }; break;
    case(38): {
      bricksfield.rotate();
      view.drawGameField();
    }; break;
    case(39): {
      bricksfield.moveRight();
      view.drawGameField();
    }; break;
    case(40): {
      if (bricksfield.gameOver) {
        endGame();
        return;
      }
      bricksfield.moveDown();
      view.drawGameField();
      drawBlock(bricksfield.nextBlock);
      showStat(bricksfield.score, bricksfield.lines, bricksfield.level);;
    }; break;
    case(32): pause();
    break;
  };
};

document.addEventListener('keydown', keyPress);
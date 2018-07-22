import view, { drawBlock } from './view';
import bricksfield from './bricksfield';

bricksfield.init();
view.drawGameField();
drawBlock(bricksfield.nextBlock);

function endGame() {
  document.removeEventListener('keydown', keyPress);
  clearInterval(intervalID);
}

const intervalAction = function() {
  if (bricksfield.gameOver) {
    endGame();
    return;
  }
  drawBlock(bricksfield.nextBlock);
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
    } else {
      isPauseOn = false;
      document.removeEventListener('keydown', pauseEvent);
      document.addEventListener('keydown', keyPress);
      intervalID = setInterval(intervalAction, 1000);
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
    }; break;
    case(32): pause();
    break;
  };
};

document.addEventListener('keydown', keyPress);
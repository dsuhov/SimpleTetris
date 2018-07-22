import field, { BRICK_SIZE } from './field';

const INFO_BRICK_SIZE = BRICK_SIZE-10;

const canvas = document.getElementById('tetrisField');
const ctx = canvas.getContext('2d');
const info_ctx = document.getElementById('nextBlock').getContext('2d');
const score = document.querySelector('.score-text');
const lines = document.querySelector('.lines-text');
const level = document.querySelector('.level-text');
const dummy = document.querySelector('.dummy');

export default {
  drawGameField() {
    field.draw(ctx);
  }
}

export function showDummy(text) {
  if (dummy.classList.contains('hidden')) {
    dummy.classList.remove('hidden');
    dummy.innerHTML = text;
  } else {
    dummy.innerHTML = text;
    dummy.classList.add('hidden');
  }
}

export function showStat(score_data, lines_data, level_text) {
  score.innerHTML = score_data;
  lines.innerHTML = lines_data;
  level.innerHTML = level_text;
}

export function drawBlock(block) {
  
  info_ctx.fillStyle = '#fff';
  info_ctx.fillRect(0, 0, info_ctx.canvas.width, info_ctx.canvas.height);

  block.position.forEach(element => {
    let [x, y] = element.getBrickPosition();
    info_ctx.fillStyle = block.color;
    info_ctx.fillRect((x-3)*INFO_BRICK_SIZE, y*INFO_BRICK_SIZE, INFO_BRICK_SIZE, INFO_BRICK_SIZE);
  })
}
import field, { BRICK_SIZE } from './field';

const canvas = document.getElementById('tetrisField');
const ctx = canvas.getContext('2d');
const info_ctx = document.getElementById('nextBlock').getContext('2d');

export default {
  drawGameField() {
    field.draw(ctx);
  }
}

export function drawBlock(block) {
  
  info_ctx.fillStyle = '#fff';
  info_ctx.fillRect(0, 0, info_ctx.canvas.width, info_ctx.canvas.height);

  block.position.forEach(element => {
    let [x, y] = element.getBrickPosition();
    info_ctx.fillStyle = block.color;
    info_ctx.fillRect((x-3)*BRICK_SIZE, y*BRICK_SIZE, BRICK_SIZE, BRICK_SIZE);
  })
}
import bricksfield from './bricksfield';

const BRICK_SIZE = 30;
const V_SIZE = 20;
const H_SIZE = 10;
const LINE_DASH = [3, 1];
const LINES_STYLE = 'rgba(175, 175, 175, .5)';
const SHIFT = 0.5;

class Field {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  };
  
  draw(ctx) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    function drawGrid() {
      const drawLine = (step, orientation) => {
        
        ctx.strokeStyle = LINES_STYLE;
        ctx.beginPath();
        ctx.setLineDash(LINE_DASH);

        if (orientation === 'ver') {
          ctx.moveTo(SHIFT + (BRICK_SIZE * (step + 1)), 0);
          ctx.lineTo(SHIFT + (BRICK_SIZE * (step + 1)), ctx.canvas.height);
          ctx.stroke();
        } else if (orientation === 'hor') {
          ctx.moveTo(0, SHIFT + (BRICK_SIZE * (step + 1)));
          ctx.lineTo(ctx.canvas.width, SHIFT + (BRICK_SIZE * (step + 1)));
          ctx.stroke();
        } else {
          throw new Error('Something wrong with orientation');
        } 
      };
      
      for (let i = 0; i < (V_SIZE) - 1; i++) {
        drawLine(i, 'hor');
      };
      for (let i = 0; i < (H_SIZE) - 1; i++) {
        drawLine(i, 'ver');
      };
    };

    drawGrid();

    function drawBricksfield(x, y, brick) {
      brick.draw(ctx, [1 + x*BRICK_SIZE, 1 + y*BRICK_SIZE]);
    };

    bricksfield.everyBrick(drawBricksfield);

  };
};

export { BRICK_SIZE };
export default new Field(H_SIZE, V_SIZE);
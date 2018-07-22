import { getBlock } from './blocks';

const BRICK_SIZE = 30;

export default class Block {
  constructor() {
    [this.color, this.position, this.rotation, this.id] = getBlock();
  }
  
  getBrick() {
    return {
      color: this.color,
      id: this.id,
      draw: function(ctx, coordinates) { 
        ctx.fillStyle = this.color;
        ctx.fillRect(...coordinates, BRICK_SIZE-1, BRICK_SIZE-1);
      }
    }
  }
};


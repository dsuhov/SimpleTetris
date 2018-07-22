import Block from './block';
import { BrickPosition } from './blocks';

export default new class Bricksfield {
  constructor() {
    this.grid = new Array(10);
    
    for (let i = 0; i < this.grid.length; i++) {
      let newY = new Array(20)
      newY.fill(undefined);
      this.grid[i] = newY;
    }

    this.nextBlock = null;
    this.currentBlock = null;
    this.rotation = null;
    this.gameOver = false;
  }
  
  getCurrBlockPos() {
    return this.currentBlock.position;
  }
  
  plaseIsHold(position) {
    return position.every(el => {
      let [x, y] = el.getBrickPosition();
      if (this.grid[x][y] !== undefined) {
        return false; 
      }
      return true;
    })
  }
  
  insertBlock() { 
    
    if (!this.plaseIsHold(this.nextBlock.position)) {
      this.gameOver = true;
      return;
    }
    
    this.currentBlock = this.nextBlock;
    
    this.rotation = new Rotate(this.currentBlock.rotation);
    this.addBricks(this.currentBlock.position, this.currentBlock.getBrick());
    
    this.nextBlock = new Block();
  }
  
  addBricks(positions, brick) {
    positions.forEach(el => {
      let [x, y] = el.getBrickPosition();
      this.grid[x][y] = brick;
    });
  }
  
  renewBricks(oldPosition, newPosition, brick) {
    
    for (let i in oldPosition) {
      let [x, y] = oldPosition[i].getBrickPosition();
      this.grid[x][y] = undefined;
    }
    this.addBricks(newPosition, brick);
  }
  
  isFit(position) {
    return position.every(el => {
      let [x, y] = el.getBrickPosition();
      return ((x < this.grid.length && x >= 0) &&
      (y < this.grid[0].length && y >= 0));
    })
  }
  
  isCollision(position) {
    return position.every(el => {
      let [x, y] = el.getBrickPosition();
      if (this.grid[x][y] !== undefined) {
        if (this.grid[x][y].id === this.currentBlock.id) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    })
  }
  
  everyBrick(callback) {
    this.grid.forEach((x, i) => {
      x.forEach((y, j) => {
        if (y) {
          callback(i, j, y);
        }
      })
    })
  }
  
  moveLeft() {
    let newPosition = [];
    for (let i = 0; i < this.currentBlock.position.length; i++) {
      let [x, y] = this.currentBlock.position[i].getBrickPosition();
      newPosition.push(new BrickPosition([x-1, y]));
    }
    
    if (this.isFit(newPosition) && this.isCollision(newPosition)) {
      this.renewBricks(this.getCurrBlockPos(), newPosition, this.currentBlock.getBrick());
      this.currentBlock.position = newPosition;
    }
  }
  
  moveRight() {
    let newPosition = this.getCurrBlockPos().map(el => {
      let [x, y] = el.getBrickPosition();
      return new BrickPosition([x+1, y]);
    })
    
    if (this.isFit(newPosition) && this.isCollision(newPosition)) {
      this.renewBricks(this.getCurrBlockPos(), newPosition, this.currentBlock.getBrick());
      this.currentBlock.position = newPosition;
    }
  }
  
  moveDown() {
    if (this.gameOver) return;
    
    let newPosition = this.getCurrBlockPos().map(el => {
      let [x, y] = el.getBrickPosition();
      return new BrickPosition([x, y+1]);
    })
    
    if (this.isFit(newPosition) && this.isCollision(newPosition)) {
      this.renewBricks(this.getCurrBlockPos(), newPosition, this.currentBlock.getBrick());
      this.currentBlock.position = newPosition;
    } else {
      this.sliceHeap(...this.checkHeap());
      this.insertBlock();
    }
    
  }
  
  rotate() {
    let newPosition = this.rotation.getNewOrientation(this.currentBlock.position, this);
    this.renewBricks(this.getCurrBlockPos(), newPosition, this.currentBlock.getBrick())
    this.currentBlock.position = newPosition;
  }
  
  checkHeap() {
    let toShiftY = [];
    let toDeleteY = [];
    
    for (let y = this.grid[0].length-1; y >= 0; y--) {
      let line = [];
      for (let x = 0; x < this.grid.length; x++) {
        if (this.grid[x][y] !== undefined) line.push(new BrickPosition([x, y]));
      }
      
      if (line.length === 0) {
        return [toShiftY, toDeleteY];
      } else if (line.length > 0 && line.length < 10 && toDeleteY.length > 0) {
        toShiftY.push(line);
      } else if (line.length === 10) {
        toDeleteY.push(line);
      } 
    } 
    return [toShiftY, toDeleteY];
  }
  
  sliceHeap(toShiftY, toDeleteY) {
    
    if (toDeleteY.length !== 0) {
      toDeleteY.forEach((el) => {
        el.forEach((el) => {
          let [x, y] = el.getBrickPosition();
          this.grid[x][y] = undefined;
        });
      });
      toShiftY.forEach((el) => {
        el.forEach((el) => {
          let [x, y] = el.getBrickPosition();
          this.grid[x][y+toDeleteY.length] = this.grid[x][y];
          this.grid[x][y] = undefined;
        });
      });
    }   
  }
  
  init() {
    this.nextBlock = new Block();
    this.insertBlock();
  }
}

class Rotate {
  constructor(rotateFunctions) {
    this.nextState = 0;
    this.rotateFunctions = rotateFunctions;
  }
  
  _updateNextState() {
    if(this.nextState < this.rotateFunctions.length-1) {
      this.nextState++;
    } else {
      this.nextState = 0;
    }
  }
  
  /* given Array.BrickPosition
  return  newOrientation if fits
  reutrn old position if cannot rotate */
  getNewOrientation(position, bricksfield) {
    let newOrientation = this.rotateFunctions[this.nextState](position);
    if (bricksfield.isFit(newOrientation) && bricksfield.isCollision(newOrientation)) {
      this._updateNextState(); /*проверь если убрать this */
      return newOrientation;
    }
    return position;
  }
  
  getNextState() {
    return this.nextState;
  }
}
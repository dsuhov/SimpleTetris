let id = 0;

const random = (max) => {
  return Math.floor(Math.random() * max);
}

const colors = [
  '#5aa0ce',
  '#38c650',
  '#73b8d6',
  '#e3eb48',
  '#9a49eb',
  '#b2eb49',
  '#f5b934',
  '#e066a8'
];

export class BrickPosition {
  constructor([x, y]) {
    this.x = x;
    this.y = y;
  }
  
  getBrickPosition() {
    return [this.x, this.y];
  }

  setBrickPosition([x, y]) {
    this.x = x;
    this.y = y;
  }

  isEqual(obj) { 
    return this.getBrickPosition().every((el, i) => {
      return el === obj.getBrickPosition()[i];
    })
  }
}


const blocks = [
  { // ####
    color: () => colors[random(colors.length)],
    position: [
      new BrickPosition([3, 0]),
      new BrickPosition([4, 0]),
      new BrickPosition([5, 0]),
      new BrickPosition([6, 0])
    ],
    trasformations: [
      //rotate function start
      (position) => {
        return position.map((el, i) => {
          switch(i) {
            case 0: {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x+1, y-1]);
            };
            case(1): return el;
            case(2): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x-1, y+1]);
            }
            case(3): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x-2, y+2]);
            }
          }
        });
      },
      //rotate function end
      //rotate function start
      (position) => {
        return position.map((el, i) => {
          switch(i) {
            case 0: {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x-1, y+1]);
            };
            case(1): return el;
            case(2): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x+1, y-1]);
            }
            case(3): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x+2, y-2]);
            }
          }
        });
      }
      //rotate function end
    ]
  },
  {
    // ##
    // ##
    color: () => colors[random(colors.length)],
    position: [
      new BrickPosition([3, 0]),
      new BrickPosition([4, 0]),
      new BrickPosition([3, 1]),
      new BrickPosition([4, 1])
    ],
    trasformations: [
      (position) => {
        return position;
      }
    ]
  },
  { //  ##
    // ##
    color:  () => colors[random(colors.length)],
    position: [
      new BrickPosition([3, 1]),
      new BrickPosition([4, 0]),
      new BrickPosition([4, 1]),
      new BrickPosition([5, 0])
    ],
    trasformations: [
      (position) => {
        return position.map((el, i) => {
          switch(i) {
            case 0: {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x, y-1]);
            };
            case(1): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x, y+1]);
            };
            case(2): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x-1, y]);
            };
            case(3): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x-1, y+2]);
            };
          }
        });
      },
      (position) => {
        return position.map((el, i) => {
          switch(i) {
            case 0: {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x, y+1]);
            };
            case(1): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x, y-1]);
            }
            case(2): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x+1, y]);
            }
            case(3): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x+1, y-2]);
            }
          }
        });
      }
    ]
  },
  { // ##
    //  ##
    color:  () => colors[random(colors.length)],
    position: [
      new BrickPosition([3, 0]),
      new BrickPosition([4, 0]),
      new BrickPosition([4, 1]),
      new BrickPosition([5, 1])
    ],
    trasformations: [
      (position) => {
        return position.map((el, i) => {
          switch(i) {
            case 0: {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x+1, y]);
            };
            case(1): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x, y+1]);
            };
            case(2): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x-1, y]);
            };
            case(3): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x-2, y+1]);
            };
          }
        });
      },
      //rotate function start
      (position) => {
        return position.map((el, i) => {
          switch(i) {
            case 0: {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x-1, y]);
            };
            case(1): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x, y-1]);
            }
            case(2): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x+1, y]);
            }
            case(3): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x+2, y-1]);
            }
          }
        });
      }
      //rotate function end
    ]
  },

  {
    // ####
    //    #
    color:  () => colors[random(colors.length)],
    position: [
      new BrickPosition([3, 0]),
      new BrickPosition([4, 0]),
      new BrickPosition([5, 0]),
      new BrickPosition([5, 1])
    ],
    trasformations: [
      //rotate function start
      (position) => { // => [5,0], [5, 1], [5, 2], [4, 2]
        return position.map((el, i) => {
          switch(i) {
            case 0: {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x+2, y]);
            };
            case(1): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x+1, y+1]);
            }
            case(2): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x, y+2]);
            }
            case(3): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x-1, y+1]);
            }
          }
        });
      },
      //rotate function end
      //rotate function start
      (position) => { // => [5, 1], [4, 1], [3, 1], [3, 0]
        return position.map((el, i) => {
          switch(i) {
            case 0: {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x, y+1]);
            };
            case(1): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x-1, y]);
            }
            case(2): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x-2, y-1]);
            }
            case(3): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x-1, y-2]);
            }
          }
        });
      },
      //rotate function end
      //rotate function start
      (position) => { 
        return position.map((el, i) => {
          switch(i) {
            case 0: {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x-1, y+1]);
            };
            case(1): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x, y]);
            }
            case(2): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x+1, y-1]);
            }
            case(3): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x+2, y]);
            }
          }
        });
      },

      (position) => { 
        return position.map((el, i) => {
          switch(i) {
            case 0: {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x-1, y-2]);
            };
            case(1): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x, y-1]);
            }
            case(2): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x+1, y]);
            }
            case(3): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x, y+1]);
            }
          }
        });
      }
    ],
  },
  
  { // ####
    // #
    color:  () => colors[random(colors.length)],
    position: [
      new BrickPosition([3, 1]),
      new BrickPosition([4, 1]),
      new BrickPosition([5, 1]),
      new BrickPosition([5, 0])
    ],
    trasformations: [
      (position) => { 
        return position.map((el, i) => {
          switch(i) {
            case 0: {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x+1, y-1]);
            };
            case(1): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x, y]);
            }
            case(2): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x-1, y+1]);
            }
            case(3): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x, y+2]);
            }
          }
        });
      },

      (position) => { 
        return position.map((el, i) => {
          switch(i) {
            case 0: {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x+1, y]);
            };
            case(1): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x, y-1]);
            }
            case(2): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x-1, y-2]);
            }
            case(3): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x-2, y-1]);
            }
          }
        });
      },

      (position) => { 
        return position.map((el, i) => {
          switch(i) {
            case 0: {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x-1, y+2]);
            };
            case(1): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x, y+1]);
            }
            case(2): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x+1, y]);
            }
            case(3): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x, y-1]);
            }
          }
        });
      },

      (position) => { 
        return position.map((el, i) => {
          switch(i) {
            case 0: {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x-1, y-1]);
            };
            case(1): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x, y]);
            }
            case(2): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x+1, y+1]);
            }
            case(3): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x+2, y]);
            }
          }
        });
      },
    ]
  },

  {
    //  #
    // ###
    color:  () => colors[random(colors.length)],
    position: [
      new BrickPosition([3, 1]),
      new BrickPosition([4, 1]),
      new BrickPosition([5, 1]),
      new BrickPosition([4, 0])
    ],
    trasformations: [
      (position) => { 
        return position.map((el, i) => {
          switch(i) {
            case 0: {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x+1, y-1]);
            };
            case(1): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x, y]);
            }
            case(2): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x-1, y+1]);
            }
            case(3): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x+1, y+1]);
            }
          }
        });
      },

      (position) => { 
        return position.map((el, i) => {
          switch(i) {
            case 0: {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x+1, y]);
            };
            case(1): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x, y-1]);
            }
            case(2): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x-1, y-2]);
            }
            case(3): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x-1, y]);
            }
          }
        });
      },

      (position) => { 
        return position.map((el, i) => {
          switch(i) {
            case 0: {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x-1, y+2]);
            };
            case(1): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x, y+1]);
            }
            case(2): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x+1, y]);
            }
            case(3): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x-1, y]);
            }
          }
        });
      },

      (position) => { 
        return position.map((el, i) => {
          switch(i) {
            case 0: {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x-1, y-1]);
            };
            case(1): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x, y]);
            }
            case(2): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x+1, y+1]);
            }
            case(3): {
              let [x, y] = el.getBrickPosition();
              return new BrickPosition([x+1, y-1]);
            }
          }
        });
      },
    ]
  }
];


export function getBlock() {
  let blockState = blocks[random(blocks.length)];
  return [blockState.color(), blockState.position, blockState.trasformations, id++];
}
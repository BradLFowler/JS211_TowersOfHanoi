'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};


const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}


const movePiece = (startStack, endStack) => {
// Moves selected piece to selected slot
  stacks[endStack].push(stacks[startStack].pop());
 
}


const isLegal = (firstMove, secondMove) => {
// Trims and lowercases
  firstMove = firstMove.toLowerCase().trim();

  secondMove = secondMove.toLowerCase().trim();

// Checks to see if move is legal
  if (!(stacks[secondMove].length) || (stacks[secondMove][stacks[secondMove].length -1] > stacks[firstMove][stacks[firstMove].length -1])) {
    return true
  } else {
    return false
  }

}

const checkForWin = () => {
  // Checks to see if c = [4, 3, 2, 1]
  if ((stacks['a'].length == 0) && (stacks['b'].length == 0) && (stacks['c'].length == 4)) {
    console.log("You Win!");
    return "You Win!"
  } else {
    return false
  }
}


const towersOfHanoi = (startStack, endStack) => {
// Checks to see if move is legal and if so move piece
  if (isLegal(startStack, endStack)) {
    movePiece(startStack, endStack)
  } else {
    console.log("Invalid Move");
  }

// Don't forget to check for win
  checkForWin();
  
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [], c: [4, 3, 2, 1] };
      assert.equal(checkForWin(), "You Win!");
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}

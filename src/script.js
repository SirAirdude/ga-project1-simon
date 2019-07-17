/**
 *  - create an array to store the sequence
 *  - push a new random number to the array
 *  - check that the user gets the sequence correct
 *  - construct a gameboard class
 */
const colorList = ['red', 'green', 'blue', 'yellow'];
const newGame = document.querySelector('#start');
const reset = document.querySelector('#reset');

 class GameBoard {
     constructor () {
        this.clearBoard();
     }
     firstThree () {
        if (this.sequence.length === 0) {
            for (let i = 0; i < 3; i++)
            {
                this.addRandom();
            }
        }
        // console.log(this);
     }
     addRandom () {
         this.sequence.push(Math.floor(Math.random()*4))
        //  console.log(this);
     }
     clearBoard () {
         this.sequence = [];
         this.score = 0;
        //  console.log(this);
     }
     flashColor(index) {
        let color = colorList[this.sequence[index]];
        let button = document.querySelector(`#${color}`);
        button.style.backgroundColor = color;
        console.log(button.style.backgroundColor);
        setTimeout(function() {
            this.resetColor(index)
        }.bind(this),500);
     }
     resetColor(index) {
        let color = colorList[this.sequence[index]];
        let button = document.querySelector(`#${color}`);
        button.style.backgroundColor = "black";
        // console.log('reset');
     }
     flashSequence() {
         let index = 0;
        setInterval(function() {
            if (index < this.sequence.length) {
                this.flashColor(index);
                index++;
            }
        }.bind(this), 550);
     }
 }

 game = new GameBoard();

 newGame.addEventListener('click', function() {
     game.firstThree();
     game.flashSequence();
    });
 reset.addEventListener('click', function(){game.clearBoard()});

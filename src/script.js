const colorList = ['red', 'green', 'blue', 'yellow'];

const body = document.querySelector('body');
const buttons = document.querySelectorAll('button');
const header = document.querySelector('header');

const tab = document.querySelector('.tab');
const tabcontent = document.querySelectorAll('.tabcontent');

const apply = document.querySelector('#apply');
const board = document.querySelector('#board');
const newGame = document.querySelector('#start');
const reset = document.querySelector('#reset');
const score = document.querySelector('#score');

document.querySelector('#game').click();

 class GameBoard {
     constructor () {
        this.clearBoard();
        this.score = 0;
     }

     addRandom () {
         this.sequence.push(Math.floor(Math.random()*4))
     }

     check(target) {
         let color = target.id;
         let button = colorList.indexOf(color);
        this.flashColor(button);
         if (this.correct && this.guessIndex < this.sequence.length) {
             if (button !== this.sequence[this.guessIndex]) {
                this.correct = false;
                score.innerText = `Game Over. \nYour final score is ${this.score}`
                this.clearBoard();
             }
             else {
                 this.guessIndex++;
             }
         }
         if (this.sequence.length > 0 && this.sequence.length === this.guessIndex && this.correct){
             this.score = this.sequence.length;
             this.addRandom();
             this.flashSequence();
             this.guessIndex = 0;
         }
    }

     clearBoard () {
         this.sequence = [];
         this.correct = true;
         this.guessIndex = 0;
         this.inGame = false;
     }

     firstThree () {
        if (this.sequence.length === 0) {
            for (let i = 0; i < 3; i++)
            {
                this.addRandom();
            }
        }
     }

     flashColor(colorIndex) {
        let color = colorList[colorIndex];
        let button = document.querySelector(`#${color}`);
        button.style.backgroundColor = color;
        setTimeout(function() {
            this.resetColor(colorIndex)
        }.bind(this),500);
     }

     flashSequence() {
        let index = 0;
       let seq = setInterval(function() {
           if (index < this.sequence.length) {
                this.flashColor(this.sequence[index]);
                index++;
           }
           else {
               clearInterval(seq);
           }
       }.bind(this), 600);
    }

     resetColor(colorIndex) {
        let color = colorList[colorIndex];
        let button = document.querySelector(`#${color}`);
        button.style.backgroundColor = "black";
     }

     start() {
        newGame.addEventListener('click', function() {
            game.firstThree();
                if (this.inGame === false) {
                    game.flashSequence();
                    this.inGame = true;
                }
           }.bind(this));
        reset.addEventListener('click', function(){game.clearBoard()});
       
        board.addEventListener('click', function(evt) {
           if (evt.target.tagName === 'A') {
               evt.preventDefault();
               game.check(evt.target);
           }
        })
     }
 }

function openTab(event, tabName) {
    const tabLinks = document.querySelectorAll('tabLinks');
    const selectTab = document.querySelector(`#${tabName}`)

    for (let i = 0; i< tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks.className.replace(" active", "");
    }

    selectTab.style.display = 'flex';
    event.target.className =+ ' active';
}

const game = new GameBoard();
game.start();

class Theme {
    constructor(font, backgroundColor, fontColor, boardBackground, buttonColor, headerColor) {
       this.font = font;
       this.backgroundColor = backgroundColor;
       this.fontColor = fontColor;
       this.boardBackground = boardBackground;
       this.buttonColor = buttonColor;
       this.headerColor = headerColor;
    }
    apply () {
        body.style.fontFamily = this.font;
        body.style.color = this.fontColor;
        for (let i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.fontFamily = this.font;
            tabcontent[i].style.color = this.fontColor;
        }
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.fontFamily = this.font;
            buttons[i].style.color = this.fontColor;
            buttons[i].style.backgroundColor = this.buttonColor;
        }
        body.style.backgroundColor = this.backgroundColor;
        tabcontent[0].style.backgroundColor = this.boardBackground;
        tabcontent[1].style.backgroundColor = this.buttonColor;
        tabcontent[2].style.backgroundColor = this.buttonColor;
        tab.style.backgroundColor = this.buttonColor;
        header.style.backgroundColor = this.headerColor;
    }
}

starWars = new Theme ('star_jediregular','#021D28','#F0D83A','#1F4183', 'red', '#000000');
standard = new Theme ('Courgette','brown', '#000000', 'magenta', '#F1E8B8', 'honeydew');

apply.addEventListener('click', function() {
    if (document.querySelector('#standardRadio').checked === true) {
        standard.apply();
    }
    if (document.querySelector('#starWarsRadio').checked) {
        starWars.apply();
    }
})
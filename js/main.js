const thoughts = [
    "The best thoughts come when you try to excape from them",
    "One of the costs of forgetting is that you don't remember what you lost",
    "A pathological liar is unable to admit to his problem, because that would render him a truth-teller",
    "There are some things that cannot be done by oneself, like sacrifice or love.<br/>That is why we need each other",
    "How much time do you invest to be in peace?<br/>But isn't it what you really whant?"
];

let index = Math.floor(Math.random() * thoughts.length);
let lastIndex = index;
$thought = $("#thought");
$body = $('body');

$(document).on('click', () => {
    while(index == lastIndex){
        index = Math.floor(Math.random() * thoughts.length);
    }
    lastIndex = index;
    $thought.html(thoughts[index]);
    setTop();
    setColors();
});

function setColors(){
    HSLcolorFactory.createRandomColor();
    $('#themeColor').attr('content', HSLcolorFactory.getHSLString());

    let main = document.getElementsByTagName('main')[0];

    let top = bottom = HSLcolorFactory.getHSLString();
    let middle = HSLcolorFactory.getDarkerHSLString();
    main.style.backgroundImage = `linear-gradient(${top} 0%, ${middle} 50%, ${bottom} 100%)`;
    
    $thought.css('backgroundColor', HSLcolorFactory.getAntiColorAsHSLString());
}

const HSLcolorFactory = {
    hueMin: 0,
    hueMax: 348,
    hue: 0,
    antihue: 0,
    saturation: 100,
    luminocity: 65,

    createRandomColor(){
        this.hue = this.antihue = this.getRandomNumber();
        this.antihue += 120;
        this.antihue = this.antihue > this.hueMax ? this.antihue % this.hueMax : this.antihue;
    },

    getHSLString(){
        return `hsl(${this.hue}, ${this.saturation}%, ${this.luminocity}%)`;
    },

    getDarkerHSLString(){
        const darkerLuminocity = this.luminocity - 45;
        return `hsl(${this.hue}, ${this.saturation}%, ${darkerLuminocity < 0 ? 0 : darkerLuminocity}%)`;
    },

    getAntiColorAsHSLString(){
        return `hsl(${this.antihue}, ${this.saturation}%, ${this.luminocity}%)`;
    },

    getRandomNumber(min = this.hueMin, max = this.hueMax) {
        const n = Math.floor(Math.random() * (max - min) ) + min;
        return n;
    }
}

function setTop(){
    let windowHeight  = window.innerHeight;
    let thoughtHeight = $thought.height();
    let thoughtTop = (windowHeight / 2) - (thoughtHeight / 2);
    $thought.css('top', thoughtTop + 'px');
}

$(window).on('resize', setTop);
$(window).on('load', () => {
    $thought.html(thoughts[index]);
    setTop();
    setColors();
});
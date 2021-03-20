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
    $('#themeColor').attr('content', HSLcolorFactory.getHSL());

    let main = document.getElementsByTagName('main')[0];

    let top = bottom = HSLcolorFactory.getHSL();
    let middle = HSLcolorFactory.getDarkerHSL();
    main.style.backgroundImage = `linear-gradient(${top} 0%, ${middle} 50%, ${bottom} 100%)`;
    
    $thought.css('backgroundColor', HSLcolorFactory.getAntiHSL());
}

const HSLcolorFactory = {
    hueMin: 0,
    hueMax: 359,
    offset: 30,
    saturation: 100,
    luminocity: 65,
    hue: this.getRandomNumber(this.hueMin, this.hueMax),
    antihue: (this.hue + 180) % this.hueMax,

    createRandomColor(){
        const min = this.hue + this.offset;
        const max = min + this.hueMax - (2 * this.offset);
        this.hue = this.getRandomNumber(min, max) % this.hueMax;
        this.antihue = (newHue + 180) % this.hueMax;
    },

    getHSL(){
        return `hsl(${this.hue}, ${this.saturation}%, ${this.luminocity}%)`;
    },

    getDarkerHSL(){
        const darkerLuminocity = this.luminocity - 45;
        return `hsl(${this.hue}, ${this.saturation}%, ${darkerLuminocity < 0 ? 0 : darkerLuminocity}%)`;
    },

    getAntiHSL(){
        return `hsl(${this.antihue}, ${this.saturation}%, ${this.luminocity}%)`;
    },

    getRandomNumber(min, max) {
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
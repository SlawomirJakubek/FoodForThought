const thoughts = {
    data: [
    {
        author: "Slawomir Jakubek",
        sign: "S.J.",
        link: "https://jakubek.co.uk",
        content: "The best thoughts come when you try to excape from them"
    },
    {
        author: "Slawomir Jakubek",
        sign: "S.J.",
        link: "https://jakubek.co.uk",
        content: "One of the costs of forgetting is that you don't remember what you lost"
    },
    {
        author: "Slawomir Jakubek",
        sign: "S.J.",
        link: "https://jakubek.co.uk",
        content: "A pathological liar is unable to admit to his problem, because that would render him a truth-teller"
    },
    {
        author: "Slawomir Jakubek",
        sign: "S.J.",
        link: "https://jakubek.co.uk",
        content: "There are some things that cannot be done by oneself, like sacrifice or love.<br/>That is why we need each other"
    },
    {
        author: "Slawomir Jakubek",
        sign: "S.J.",
        link: "https://jakubek.co.uk",
        content: "How much time do you invest to be in peace?<br/>But isn't it what you really whant?"
    },
    {
        author: "Slawomir Jakubek",
        sign: "S.J.",
        link: "https://jakubek.co.uk",
        content: "It is extremely dangerous that humanity's growth in power outdistanced its growth in compassion"
    },
    {
        author: "Slawomir Jakubek",
        sign: "S.J.",
        link: "https://jakubek.co.uk",
        content: "Sacrifice or self-worship. That is really the only choice we face in life"
    },
    {
        author: "Slawomir Jakubek",
        sign: "S.J.",
        link: "https://jakubek.co.uk",
        content: "You will never win with ego in argument, because thinking is its domain. It wants you to believe in what it says, so it starts with complimenting you and telling you the truth. When you believe its compliments you give it your faith. Later it uses that faith against you by making you believe its lies"
    },
    {
        author: "Slawomir Jakubek",
        sign: "S.J.",
        link: "https://jakubek.co.uk",
        content: "Just look how we control natural intelligence. Do you really think we can handle artificial one?"
    },
    {
        author: "Slawomir Jakubek",
        sign: "Old Dying King",
        link: "https://jakubek.co.uk",
        content: "You receive faith according to your sacrifice"
    },
    {
        author: "unknown",
        sign: "Rango",
        link: "https://en.wikipedia.org/wiki/Rango_(2011_film)",
        content: "Don't you see? It's not about you. It's about them"
    },
    {
        author: "Eckhart Tolle",
        sign: "Eckhart Tolle",
        link: "https://eckharttolle.com/",
        content: "Are you so busy getting to the future that the present is reduced to a means of getting there?"
    },
    {
        author: "Eckhart Tolle",
        sign: "Eckhart Tolle",
        link: "https://eckharttolle.com/",
        content: "Stress is caused by being 'here' but wanting to be 'there'. It's a split that tears you apart inside"
    },
    {
        author: "Eckhart Tolle",
        sign: "Eckhart Tolle",
        link: "https://eckharttolle.com/",
        content: "Enlightenment is a state of wholeness, of being 'at one', in the present and therefore at peace"
    },
    {
        author: "Eckhart Tolle",
        sign: "Eckhart Tolle",
        link: "https://eckharttolle.com/",
        content: "You are not your mind"
    },
    {
        author: "Jesus",
        sign: "Matthew 10:38",
        get link(){ return encodeURI("https://www.google.com/search?q=" + this.sign)},
        content: "He who doesn't accept his suffering is not worthy of Life"
    },
    {
        author: "Jesus",
        sign: "John 15:5",
        get link(){ return encodeURI("https://www.google.com/search?q=" + this.sign)},
        content: "Apart from me you can do nothing"
    }
    /*
    {
        author: "",
        sign: "",
        content: ""
    },
    */
    ],
    usedIndices: [],
    get index(){

        if(this.usedIndices.length == this.data.length){
            this.usedIndices = [];
        }

        let newIndex;
        do{
            newIndex = Math.floor(Math.random() * this.data.length);
        }while(this.usedIndices.includes(newIndex))

        this.usedIndices.push(newIndex);

        return newIndex;
    },
    get thought(){
        return this.data[this.index];
    }
};

$body = $('body');
$thoughtContainer = $(".thoughtContainer");
$thought = $("#thought");
$author = $("#author");
$sign = $("#sign");


$(document).on('click keyup', () => {
    updateThought();
    setColors();
});

$sign.on('click', e => {
    e.stopPropagation();
});

function updateThought(){
    //retrieve new content
    let thought = thoughts.thought;
    
    //update content
    $thought.html(thought.content);
    $sign.html(thought.sign);
    $sign.attr('title', thought.author);
    $sign.attr('href', thought.link);

    adjustFontSize();
}

function adjustFontSize(){
   $thoughtContainer.removeClass('customFontSize');

    //reduce font size if content overflows screen
    while($thoughtContainer.outerHeight() > $body.outerHeight()){

        let fontSize = parseInt($thoughtContainer.css('font-size').replace('px', ''));
        fontSize -= 2;
        $(':root').css("--customFontSize", fontSize + 'px');
        $thoughtContainer.addClass('customFontSize');
    } 
    console.log($thoughtContainer.css('height'));
}

function setColors(){
    HSLcolorFactory.createRandomColor();
    
    //set theme-color bar on mobile
    $('#themeColor').attr('content', HSLcolorFactory.getHSL());

    //set background color
    let background = document.getElementsByTagName('body')[0];
    let top = bottom = HSLcolorFactory.getHSL();
    let middle = HSLcolorFactory.getDarkerHSL();
    background.style.backgroundImage = `linear-gradient(${top} 0%, ${middle} 50%, ${bottom} 100%)`;
    
    //set main content background color
    $thought.css('backgroundColor', HSLcolorFactory.getAntiHSL());
    $author.css('backgroundColor', HSLcolorFactory.getDarkerAntiHSL());
}

const HSLcolorFactory = {
    hueMin: 0,
    hueMax: 359,
    offset: 30,
    saturation: 100,
    luminocity: 65,
    hue: undefined,
    antihue: undefined,

    createRandomColor(){
        this.hue = typeof this.hue == "undefined" ? this.getRandomNumber(this.hueMin, this.hueMax) : this.hue;
        const min = this.hue + this.offset;
        const max = min + this.hueMax - (2 * this.offset);
        this.hue = this.getRandomNumber(min, max) % this.hueMax;
        this.antihue = (this.hue + 180) % this.hueMax;
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

    getDarkerAntiHSL(){
        const darkerLuminocity = this.luminocity - 10;
        return `hsl(${this.antihue}, ${this.saturation}%, ${darkerLuminocity < 0 ? 0 : darkerLuminocity}%)`;
    },

    getRandomNumber(min, max) {
        const n = Math.floor(Math.random() * (max - min) ) + min;
        return n;
    }
}

$(window).on('load', () => {
    updateThought();
    setColors();
    $thoughtContainer.css('display', "block");
});

$(window).on('resize', () => {
    $thoughtContainer.removeClass('customFontSize');
    adjustFontSize();
});
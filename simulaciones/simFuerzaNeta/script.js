var CARD_WIDTH = 130;
var CARD_HEIGHT = 200;

let  strengthA = 0;
let  strengthB = 0;
let net_strength = 0;

let gesture = ["./assets/gesture/gesto_sadness.svg",
            "./assets/gesture/gesto_fuerza.svg",
            "./assets/gesture/gesto_zz.svg"];

function byId(id) {
    return document.getElementById(id);
}

var canvases = {
    spaces: byId('spaces'),
    drag: byId('drag'),
    cards: byId('cards'),
    background: byId('background')
};

var context = {
    spaces: canvases.spaces.getContext('2d'),
    drag: canvases.drag.getContext('2d'),
    cards: canvases.cards.getContext('2d'),
    background: canvases.background.getContext('2d')
};

var state = {
    spaces: [
    {x: 100, y: 400, id: 0,type: "A"},
    {x: 230, y: 400, id: 1, type: "A"},
    {x: 360, y: 400, id: 2, type: "A"},  
    {x: 900, y: 400, id: 3, type: "B"},
    {x: 1020, y: 400, id: 4, type: "B"},
    {x: 1150, y: 400, id: 5, type: "B"},
    
    {x: 200, y: 160, type: "A", card: null},
    {x: 340, y: 160, type: "A", card: null},
    {x: 480, y: 160, type: "A", card: null},
    {x: 800, y: 160, type: "B", card: null},
    {x: 940, y: 160, type: "B", card: null},
    {x: 1080, y: 160, type: "B", card: null},
    
    ],
    cards: [],
    holdingCard: null,
    isMouseDown: false,
    cursorOffset: null
};

let initialState = state;

function drawGesture(card){
    context.drag.clearRect(
        0, 0,
        canvases.cards.width,
        canvases.cards.height
        );
    var ctx = context.drag;
    let gest = new Image();
    gest.src=card.gesture;
    //ctx.beginPath(); 
    gest.onload=function() {
        ctx.drawImage(gest,card.x + 30, card.y - 60, 50,50); 
    }
}

function applyGesture(a,b,c){
    for(let index = 6; index < state.spaces.length; index++){
        let s = state.spaces[index];
        if(hasCard(s)){
            if(a < b){
                if(s.card.type == "A"){
                    state.cards[s.card.id].gesture = gesture[0];
                    drawGesture(state.cards[s.card.id]);
                }else{
                    state.cards[s.card.id].gesture = gesture[2];
                    drawGesture(state.cards[s.card.id]);
                }
            }

            if(b < a){
                if(s.card.type == "A"){
                    state.cards[s.card.id].gesture = gesture[2];
                    drawGesture(state.cards[s.card.id]);
                }else{
                    state.cards[s.card.id].gesture = gesture[0];
                    drawGesture(state.cards[s.card.id]);
                }
            }

            if(a == b){
                state.cards[s.card.id].gesture = gesture[1];
                drawGesture(state.cards[s.card.id]);
            }
        }
    }
}

function canMove(s){

    let move = true;
    if(s.x == 1200){
        if(s.card != null){
            move = false;
        }
    }else if(s.x == 50){
        if(s.card != null){
            move = false;
        }
    }

    return move;
}

function savePosCard(){
    state = initialState;
    for(let i = 0; i < state.spaces.length; i++){
        let s = state.spaces[i];
        for(let f = 0; f < state.cards.length; f++){
            let c = state.cards[f];
            if(c.x == s.x && c.y == s.y){
                state.spaces[i].card = c;
            }
        }
    }
}

async function movePlayers(a,b,c){    
    

    let time = 0;

    if(c == 50){
        time = 500;
    }else{
        time = 1000;
    }

    if(a < b){
        console.log("Mover a la derecha");
        let index = 6;
        while(1){
            if(index == 12){
                index = 6;
                //console.log('start timer: ' + time);
                await new Promise(resolve => setTimeout(resolve, time));
                //console.log('after 1 second');
            }
            if(canMove(state.spaces[index]) && a > 0){
                state.spaces[index].x += 10;

                if(state.spaces[index].card != null){
                    state.cards[state.spaces[index].card.id].x += 10;
                    drawGesture(state.spaces[index].card);
                }
                drawSpaces();
                drawCards();
            }else{
                if(a > 0){
                    state.spaces[index].x += 10;
                    if(state.spaces[index].card != null){
                        state.cards[state.spaces[index].card.id].x += 10;
                        drawGesture(state.spaces[index].card);
                    }
                    drawSpaces();
                    drawCards();
                }
                break;
            }
            index++;
        }
    }else if(b < a){
        console.log("Mover a la izquierda");
        let index = 6;
        while(1){
            if(index == 12){
                index = 6;
                //console.log('start timer: ' + time);
                await new Promise(resolve => setTimeout(resolve, 1000));
                //console.log('after 1 second');
            }
            if(canMove(state.spaces[index]) && a > 0){
                state.spaces[index].x -= 10;

                if(state.spaces[index].card != null){
                    state.cards[state.spaces[index].card.id].x -= 10;
                    drawGesture(state.spaces[index].card);
                }
                drawSpaces();
                drawCards();
            }else{
                if(a > 0){
                    //state.spaces[index].x -= 10;
                    if(state.spaces[index].card != null){
                       // state.cards[state.spaces[index].card.id].x -= 10;
                    }
                    drawSpaces();
                    drawCards();
                }
                break;
            }
            index++;
        }

    }
}
function startSimulation(){
    savePosCard();
    for(let index = 6; index < state.spaces.length; index++){
        let s = state.spaces[index];
        if(hasCard(s)){
            if((s.type == "A") && (s.card != null)){ 
                strengthA += s.card.strength;                     
            }else if((s.type == "B") && (s.card != null)){
                strengthB += s.card.strength;  
            }
            
        }
    }
    net_strength = Math.abs(strengthA - strengthB);
    applyGesture(strengthA, strengthB,net_strength);
    if(net_strength > 0 && strengthA > 0 && strengthB > 0 ){
        movePlayers(strengthA, strengthB,net_strength,net_strength);
    }
}

function drawSpace(space) {
    var ctx = context.spaces;

    ctx.fillStyle = '#555555';
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#999999';
    ctx.fillRect(space.x, space.y, CARD_WIDTH, CARD_HEIGHT);
    ctx.strokeRect(space.x, space.y, CARD_WIDTH, CARD_HEIGHT);
}

function drawFloor(){
    var ctx = context.background;
    //var ctext = context.drag;
    floor =new Image();
    floor.src="./assets/other/terreno.png";
    ctx.beginPath(); 
    floor.onload=function() {
        ctx.drawImage(floor,0,(canvases.cards.height / 2) + 40, 1500,800); 
    }
}

function drawSpaces() {
    context.spaces.clearRect(
        0, 0,
        canvases.cards.width,
        canvases.cards.height
        );
    state.spaces.forEach(function(space) {
        drawSpace(space);
    });
}

function drawCard(card, ctx) {
    /*let img = new Image();
    img.src = "./assets/characters/zombie_character.svg";

    img.onload = function(){
        let text = ctx.createPattern(img, 'repeat');
        
    }*/
    ctx.fillStyle = 'white';
    ctx.strokeStyle = '#999999';
    ctx.fillRect(card.x, card.y, CARD_WIDTH, CARD_HEIGHT);
}

function drawCards() {
    context.cards.clearRect(
    0, 0,
    canvases.cards.width,
    canvases.cards.height
    );

    state.cards.forEach(function(card) {
    if (card !== state.holdingCard) {
        drawCard(card, context.cards);
    }
    });
}


window.onresize = function() {
    var w = window.innerWidth;
    var h = window.innerHeight;

    for (var key in canvases) {
    canvases[key].width = w;
    canvases[key].height = h;
    }

    drawSpaces();
    drawCards();
    drawFloor();
}

canvases.drag.onmousedown = function(e) {
    var card;
    state.isMouseDown = true;
    
    for (var index = 0; index < state.cards.length; index++) {
    card = state.cards[index];

    if (e.clientX >= card.x && e.clientX < CARD_WIDTH + card.x
        && e.clientY >= card.y && e.clientY < CARD_HEIGHT + card.y)
    {
        state.holdingCard = card;
        state.cursorOffset = {
        x: e.clientX - card.x,
        y: e.clientY - card.y
        };
        drawCards();
        context.drag.clearRect(0, 0,
        canvases.drag.width,
        canvases.drag.height,
        );
        drawCard(state.holdingCard, context.drag);
        break;
        }
    }
};

function hasCard(s){
    let iscard =  false;
    for(let index = 0; index < state.cards.length; index++){
        if(s.x == state.cards[index].x && s.y == state.cards[index].y){
            iscard = true;
        }
    }
    return iscard;
}

canvases.drag.onmouseup = function() {
    state.isMouseDown = false;
    let card;
    var didMatch = false;
    
    if (state.cursorOffset != null) {
    card = state.holdingCard;
    state.cursorOffset = null;

        for (var index = 0; index < state.spaces.length; index++) {
            var s = state.spaces[index];

            if (Math.abs(card.x - s.x) < (CARD_WIDTH / 1.5)
            && Math.abs(card.y - s.y) < (CARD_HEIGHT / 1.5)) {

            if(index < 6){
                card.x =  state.spaces[card.id].x;
                card.y = state.spaces[card.id].y;
                
                didMatch = true;
                state.holdingCard = null;
                break;
            }

            if((s.type == card.type) && (index > 5) && (!hasCard(s))){
                card.x = s.x;
                card.y = s.y;
                //state.spaces[index].card = card;
                didMatch = true;
                state.holdingCard = null;
                break;
            }

            }
        }
    }

    if (didMatch) {
    context.cards.clearRect(0, 0,
        canvases.cards.width,
        canvases.cards.height
    );
    context.drag.clearRect(0, 0,
        canvases.cards.width,
        canvases.cards.height
    );
    drawCards();
    }

    if(!didMatch && state.holdingCard != null){
        let stre = state.holdingCard.strength;
        let type = state.holdingCard.type;
        
        state.cards.splice(state.holdingCard.id,1);
        let c = {x: state.spaces[state.holdingCard.id].x, y: state.spaces[state.holdingCard.id].y,id: state.holdingCard.id, strength: stre, type:type};
        state.cards.splice(state.holdingCard.id,0,c);

        context.cards.clearRect(0, 0,
            canvases.cards.width,
            canvases.cards.height
        );
        context.drag.clearRect(0, 0,
            canvases.cards.width,
            canvases.cards.height
        );
        drawCards();  
    }
};

canvases.drag.onmousemove = function(e) {
    if (state.cursorOffset && state.holdingCard != null) {
    var card = state.holdingCard;

    card.x = e.clientX - state.cursorOffset.x;
    card.y = e.clientY - state.cursorOffset.y;

    context.drag.clearRect(0, 0,
        canvases.drag.width,
        canvases.drag.height,
    );
    
    drawCard(card, context.drag);
    }
};

window.onload = function() {
    var cards = [];
    let type = "A";
    let strength = 0;
    for (var index = 0; index < 6; index++) {
    strength += 50;
    cards.push({
        x: state.spaces[index].x,
        y: state.spaces[index].y,
        id: state.spaces[index].id,
        strength: strength,
        type: type,
        gesture: null,
    });

        if(index == 2){
            strength = 0;
            type = "B";
        }
    }

    state.cards = cards;

    window.onresize();

    drawSpaces();
    drawCards();
    drawFloor();
}
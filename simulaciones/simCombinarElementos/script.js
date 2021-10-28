let CARD_WIDTH = 70;
let CARD_HEIGHT = 70;
let DIAGONAL_CARD = 0;

let SPACE_WIDTH = 250;
let SPACE_HEIGHT = 60;
let idCard = 0;
let ELEMENTS_NUMBER = 15;

let combination_number = 0;
let canvas_size = 530;

let canvases = {
    spaces: document.getElementById('spaces'),
    drag: document.getElementById('drag'),
    container: document.getElementById('container')
};

let context = {
    spaces: canvases.spaces.getContext('2d'),
    drag: canvases.drag.getContext('2d')
};

let state = {
    spaces: [
        {x:0, y:0, card:null, label:'Agua', color:'#1360a8'},
        {x:0, y:SPACE_HEIGHT, card:null, label:'Aire', color:'#89bef0' },
        {x:0, y:SPACE_HEIGHT * 2, card:null, label:'Fuego',color:'#d11313'},
        {x:0, y:SPACE_HEIGHT * 3, card:null, label:'Tierra', color:'#382207'}
        ],
    draw_elements: [],
    holdingCard: null,
    isMouseDown: false,
    cursorOffset: null
};

let bclose = document.querySelectorAll(".close")[0];
let modal = document.querySelectorAll(".modal")[0];
let modalc = document.querySelectorAll(".modal-container")[0];

function drawSpace(space){
    let ctx = context.spaces;
    ctx.fillStyle = 'rgb(240, 240, 240)';
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(220, 220, 220)';
    ctx.fillRect(space.x, space.y, SPACE_WIDTH, SPACE_HEIGHT);
    ctx.strokeRect(space.x, space.y, SPACE_WIDTH, SPACE_HEIGHT);
    ctx.fillStyle = 'black';
    ctx.font = "15px Arial";
    ctx.fillText(space.label, (SPACE_WIDTH / 2) - 10 ,space.y + 35);
}

function drawSpaces() {
    context.spaces.clearRect(
        0, 0,
        canvases.spaces.width,
        canvases.spaces.height
    );

    state.spaces.forEach(function(space) {
        drawSpace(space);
    });
}

function drawCard(card, ctx){
    ctx.fillStyle = card.color;
    ctx.strokeStyle = '#999999';
    ctx.fillRect(card.x, card.y, CARD_WIDTH, CARD_HEIGHT);
    ctx.fillStyle = 'black';
    ctx.font = "11px Arial";
    ctx.fillText(card.label,card.x + 20,card.y + 80 );
}

function drawCards() {
    context.drag.clearRect(
        0, 0,
        canvases.spaces.width,
        canvases.spaces.height
    );
    state.draw_elements.forEach(function(card) {
        drawCard(card, context.drag);
    });
}

function clearDisplay(){
    console.log("borrando");
    state.draw_elements = [];

    context.drag.clearRect(
        0, 0,
        canvases.drag.width,
        canvases.drag.height
    );
    drawText();
}

function showMenu(){
    console.log("menu");
    modalc.style.opacity = "1";
    modalc.style.visibility = "visible";
    modal.classList.toggle("modal-close");
}

bclose.addEventListener("click", function(){
    modal.classList.toggle("modal-close");
    setTimeout(function(){
        modalc.style.opacity = "0";
        modalc.style.visibility = "hidden";
    },600);
});

window.addEventListener("click",function(e){
    if(e.target == modalc){
        modal.classList.toggle("modal-close");
        setTimeout(function(){
            modalc.style.opacity = "0";
            modalc.style.visibility = "hidden";
        },900);
    }
});

window.onresize = function(){
    let w = window.innerWidth;
    let h = window.innerHeight;

    canvases.drag.width = w;
    canvases.drag.height = h;

    drawSpaces();
    drawCards();
    drawText();
}

canvases.drag.onmousedown = function(e){
    isMouseDown = true;
    
    let space;
    let card;
    let spacex = 1031;
    let spacey = 0;

    if(e.clientX >= 1050){
        for(let index = 0; index < state.spaces.length; index++){
            space = state.spaces[index];
            spacey = space.y + 40;
    
            if(e.clientX >= spacex && e.clientX < SPACE_WIDTH + spacex &&
                e.clientY >= spacey  && e.clientY < SPACE_HEIGHT + spacey)
            {
                card = {x:e.clientX, y: e.clientY, label: space.label, id:idCard, color:space.color};
                idCard++;
                state.draw_elements.push(card);
                state.holdingCard = card;  
                state.cursorOffset = {
                    x: e.clientX - card.x,
                    y: e.clientY - card.y,
                    label: card.label
                };
                drawCard(card, context.drag);
                break;     
            }
        }
    }else{
        for(let index = 0; index < state.draw_elements.length; index++){
            card = state.draw_elements[index];         
            if(e.clientX >= card.x && e.clientX < CARD_WIDTH + card.x &&
                e.clientY >= card.y  && e.clientY < CARD_HEIGHT + card.y)
            {          
                state.holdingCard = card;  
                state.cursorOffset = {
                    x: e.clientX - card.x,
                    y: e.clientY - card.y,
                    label: card.label
                };
                break;     
            }
        }
    }
    
    //drawCards();  
};

function drawText(){
    combination_number = state.spaces.length;
    let ctx = context.drag;
    ctx.fillStyle = 'black';
    ctx.font = "20px Arial";
    ctx.textAlign = "start";
    ctx.fillText(combination_number + " / " + ELEMENTS_NUMBER, drag.width / 2,70);
}

function deleteCard(){
    let card;
    for(let index = 0; index < state.draw_elements.length; index++){
        card = state.draw_elements[index];

        if(card.id == state.holdingCard.id){
            state.draw_elements.splice(index,1); 
            break;
        }
    }
}

let existCombination = function(label){
    let space;
    let exist = false;
    for(let index = 0; index < state.spaces.length; index++){
        space = state.spaces[index];
        if(label == space.label){
            exist = true;
            break;
        }
    }
    return exist;
}


function elementCombination(card1, card2, index){
    
    let element = {x:0, y:0, label: null, id:null, color:''};
    let ypos;
    let sheight = "";
    /*if((card1.label == 'Agua' && card2.label == 'Tierra') || card1.label == 'Tierra' && card2.label == 'Agua'){
        
        element = {x:card1.x, y:card1.y, label: 'Barro', id:idCard, color:'#613806'};
        state.draw_elements.push(element);  
        idCard++; 
        state.draw_elements.splice(index,1);   
        deleteCard();            
    }*/

    if(card1.label == 'Agua' || card2.label == 'Agua'){
        if(card2.label == 'Tierra' || card1.label == 'Tierra'){
            element = {x:card1.x, y:card1.y, label: 'Barro', id:idCard, color:'#613806'};
            state.draw_elements.push(element);  
            /*idCard++; 
            state.draw_elements.splice(index,1);   
            deleteCard();*/
        }else if(card2.label == 'Fuego' || card1.label == 'Fuego'){
            element = {x:card1.x, y:card1.y, label: 'Vapor', id:idCard, color:'#667380'};
            state.draw_elements.push(element);  
        }else if(card2.label == 'Aire' || card1.label == 'Aire'){
            element = {x:card1.x, y:card1.y, label:'Lluvia', id:idCard, color:'#28315c'};
            state.draw_elements.push(element);  
        }else  if(card1.label == 'Lava' || card2.label == 'Lava'){
            element = {x:card1.x, y:card1.y, label:'Obsidiana', id:idCard, color:'#7b00ff'};
            state.draw_elements.push(element); 
        }else if(card1.label == 'Energía' || card2.label == 'Energía'){
            element = {x:card1.x, y:card1.y, label:'Vapor', id:idCard, color:'#667380'};
            state.draw_elements.push(element); 
        }
    }else if(card1.label == 'Aire' || card2.label == 'Aire'){
        if(card1.label == 'Fuego' || card2.label == 'Fuego'){
            element = {x:card1.x, y:card1.y, label:'Energía', id:idCard, color:'#4a4610'};
            state.draw_elements.push(element); 
        }else if(card1.label == 'Tierra' || card2.label == 'Tierra'){
            element = {x:card1.x, y:card1.y, label:'Polvo', id:idCard, color:'#915f3d'};
            state.draw_elements.push(element); 
        }else if(card1.label == 'Lava' || card2.label == 'Lava'){
            element = {x:card1.x, y:card1.y, label:'Piedra', id:idCard, color:'#626163'};
            state.draw_elements.push(element); 
        }else if(card1.label == 'Energía' || card2.label == 'Energía'){
            element = {x:card1.x, y:card1.y, label:'Viento', id:idCard, color:'#5f656b'};
            state.draw_elements.push(element); 
        }
    }else if(card1.label == 'Fuego' || card2.label == 'Fuego'){
        if(card1.label == 'Tierra' || card2.label == 'Tierra'){
            element = {x:card1.x, y:card1.y, label:'Lava', id:idCard, color:'#ff6600'};
            state.draw_elements.push(element); 
        }else if(card1.label == 'Piedra' || card2.label == 'Piedra'){
            element = {x:card1.x, y:card1.y, label:'Metal', id:idCard, color:'#272b36'};
            state.draw_elements.push(element); 
        }else if(card1.label == 'Barro' || card2.label == 'Barro'){
            element = {x:card1.x, y:card1.y, label:'Ladrillo', id:idCard, color:'#591a01'};
            state.draw_elements.push(element); 
        }
    }else if(card1.label == 'Energía' || card2.label == 'Energía'){
        if(card1.label == 'Nube' || card2.label == 'Nube'){
            element = {x:card1.x, y:card1.y, label:'Tormenta', id:idCard, color:'#262833'};
            state.draw_elements.push(element); 
        }else if(card1.label == 'Metal' || card2.label == 'Metal'){
            element = {x:card1.x, y:card1.y, label:'Electricidad', id:idCard, color:'#d4c824'};
            state.draw_elements.push(element); 
        }
    }else if(card1.label == 'Vapor' || card2.label == 'Vapor'){
        if(card1.label == 'Viento' || card2.label == 'Viento'){
            element = {x:card1.x, y:card1.y, label:'Nube', id:idCard, color:'#70baff'};
            state.draw_elements.push(element); 
        }
    }

    if(element.label != null){
        idCard++; 
        state.draw_elements.splice(index,1);   
        deleteCard();
        if(!existCombination(element.label)){
            combination_number++;
            ypos = state.spaces[state.spaces.length - 1].y;
            //console.log("y: " + ypos);
            if(ypos + SPACE_HEIGHT > canvas_size - SPACE_HEIGHT){
                //console.log("ingreso");
                canvas_size = ypos + SPACE_HEIGHT + 60;
                sheight = String.valueOf(canvas_size);
                canvases.container.style.height = canvas_size + "px";
                canvases.spaces.setAttribute('height', canvas_size);
            }
            state.spaces.push({x:0, y:ypos + SPACE_HEIGHT, card:null, label:element.label,color:element.color});
        }
    }
    
    context.drag.clearRect(0,0,
        canvases.drag.width,canvases.drag.height);
    
    drawCards();
    drawSpaces();
    drawText();  
}

function getDistance(){
    let card;
    let distance;
    DIAGONAL_CARD = Math.sqrt(Math.pow(CARD_WIDTH,2) + Math.pow(CARD_HEIGHT,2))
    //console.log("diagonal " + DIAGONAL_CARD);
    for(let index = 0; index < state.draw_elements.length; index++){
        card = state.draw_elements[index];
        distance = Math.sqrt(Math.pow(card.x - state.holdingCard.x,2) + Math.pow(card.y - state.holdingCard.y,2));
        //console.log("distance " + distance);
        if(distance <= DIAGONAL_CARD - 30 && distance != 0){
            //console.log("cerca");
            elementCombination(card,state.holdingCard,index);         
            break;
        }
    }
}

canvases.drag.onmouseup = function(){
    isMouseDown = false;
    let didMatch = false;

    if(state.cursorOffset != null){
        let card = state.holdingCard;
        getDistance();
        state.cursorOffset = null;
        
        for(let index = 0; index < state.draw_elements.length; index++){
            let s = state.draw_elements[index];
            
            if(s.x >= 970){
                state.draw_elements.splice(index,1); 
                didMatch = true;
                state.holdingCard = null;
                break;
            }
        }
    }
    
    if(didMatch){
        context.spaces.clearRect(0,0,
            canvases.spaces.width,canvases.spaces.height);
        
        context.drag.clearRect(0,0,
            canvases.drag.width,canvases.drag.height);
        
        drawCards();
        drawSpaces();
        drawText();
    }
};

canvases.drag.onmousemove = function (e){ 
    if(state.cursorOffset && state.holdingCard != null){
        let card = state.holdingCard;
        
        card.x = e.clientX - state.cursorOffset.x;
        card.y = e.clientY - state.cursorOffset.y;

        context.drag.clearRect(0,0,
            canvases.drag.width,canvases.drag.height);
        
        drawCard(card,context.drag);
        drawCards();
        drawText();
    } 
};

window.onload = function(){
    window.onresize();
    /*let ctx = context.drag;
    ctx.fillStyle = 'rgb(240, 240, 240)';
    ctx.strokeStyle = '#999999';
    ctx.fillRect(20,25, 130,70);*/
    canvases.spaces.setAttribute('height', canvas_size);
    drawSpaces();   
    drawText();  
}
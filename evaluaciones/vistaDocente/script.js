const targets = document.querySelectorAll('[data-target]');
const content = document.querySelectorAll('[data-content]');

const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");

const optionsList = document.querySelectorAll(".option");

const inputs = document.querySelectorAll(".input");

targets.forEach(target => {
	target.addEventListener('click', () => {
		content.forEach(c => {
			c.classList.remove('active');
		})
		const t = document.querySelector(target.dataset.target);
		t.classList.add('active');
	})
});

function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}

inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

selected.addEventListener("click", () => {
	optionsContainer.classList.toggle("active");
});

optionsList.forEach(o => {
		o.addEventListener("click", () => {
		selected.innerHTML = o.querySelector("label").innerHTML;
		optionsContainer.classList.remove("active");
	});
});

const $form = document.getElementById("form");

const $add_img_question = document.getElementById("add-img-question");

const selected_crear = document.querySelector(".selected-crear");
const optionsContainer_crear = document.querySelector(".options-container-crear");
const container_select_crear = document.querySelector(".container-select");

const optionsListCrear = document.querySelectorAll(".option-crear");

let id_img = "";
let id_number = 0;

const template_element = data => {
    return (`
    <div class="question-area">
        <textarea placeholder="Pregunta" required></textarea>
        <div class="add-img">
            <input type="file" name="file" id="file" accept="image/*">
            <label id="btn-img" for="file">
            <img src="./assets/photo_black_24dp.svg" onclick="add_img(event)">
            </label>
        </div>  
    </div>
        <div id="question-img-area-${id_number}" class="div-img">
    </div> 
    <div id="answer-container-${id_number}">
        <div id="answer-${id_number}-A" class="answer-container"style="display: flex;">
            <img src="./assets/radio_button_unchecked_black_24dp.svg" style ="margin-top: 20px; margin-right: 15px;" alt=""/>
            <textarea placeholder="Option 1" style="width: 75%;height: 10px; background-color: white; position: relative; margin-top: 20px;" required></textarea> 
            <button class="btn-opc" style="margin-left: 600px; margin-top: 10px;" type="submit" onclick="add_correct_answer(event)"><img src="./assets/check_circle_black_24dp.svg" alt=""/></button>
    </div>

    <div id="answer-${id_number}-B" class="answer-container"style="display: flex;">
        <img src="./assets/radio_button_unchecked_black_24dp.svg" style ="margin-top: 20px; margin-right: 15px;" alt=""/>
        <textarea placeholder="Option 2" style="width: 75%;height: 10px; background-color: white; position: relative; margin-top: 20px;" required></textarea> 
        <button class="btn-opc" style="margin-left: 600px; margin-top: 10px;" type="submit" onclick="add_correct_answer(event)"><img src="./assets/check_circle_black_24dp.svg" alt=""/></button>
    </div>

    <div id="answer-${id_number}-C" class="answer-container"style="display: flex;">
        <img src="./assets/radio_button_unchecked_black_24dp.svg" style ="margin-top: 20px; margin-right: 15px;" alt=""/>
        <textarea placeholder="Option 3" style="width: 75%;height: 10px; background-color: white; position: relative;  margin-top: 20px;" required></textarea> 
        <button class="btn-opc" style="margin-left: 600px;margin-top: 10px;" type="submit" onclick="add_correct_answer(event)"><img src="./assets/check_circle_black_24dp.svg" alt=""/></button>
    </div>

    <div id="answer-${id_number}-D" class="answer-container"style="display: flex;">
        <img src="./assets/radio_button_unchecked_black_24dp.svg" style ="margin-top: 20px; margin-right: 15px;" alt=""/>
        <textarea placeholder="Option 4" style="width: 75%;height: 10px; background-color: white; position: relative;  margin-top: 20px;" required></textarea> 
        <button class="btn-opc" style="margin-left: 600px;margin-top: 10px;" type="submit" onclick="add_correct_answer(event)"><img src="./assets/check_circle_black_24dp.svg" alt=""/></button>
    </div>
    
    </div>
    <div id="question-opc" style="border-width: 1px; border-top: 2px solid #cfcece; margin-top: 50px;">
        <button class="btn-opc" type="submit" style="position:relative;" onclick="delete_question_container(event)"><img src="./assets/delete_black_24dp.svg" alt=""/></button>
    </div> 
    `)
}


const template_element_upload_file = data => {
    return (`
    <div class="question-area">
        <textarea placeholder="Pregunta" required></textarea>
        <div class="add-img">
            <input type="file" name="file" id="file" accept="image/*">
            <label id="btn-img" for="file">
                <img src="./assets/photo_black_24dp.svg" onclick="add_img(event)">
            </label>
        </div>  
    </div>
    <div id="question-img-area-${id_number}" class="div-img"></div> 
        <div id="answer-container-${id_number}" style="margin-top: 30px; margin-bottom: 30px;">
            <input type="file" id="real-file-${id_number}" hidden="hidden" onclick="add_file(event)"accept=".doc,.docx,.pdf,.xlsx,.jpg,.png"/>
            <button type="button" class="custom-button" id="custom-button" onclick="add_archive(event)">Selecciona un archivo</button>
            <span id="custom-text-${id_number}" class="custom-text">No se ha cargado archivo</span>
        </div>
    <div id="question-opc" style="border-width: 1px; border-top: 2px solid #cfcece; margin-top: 10px;">
        <button class="btn-opc" type="submit" style="position:relative;" onclick="delete_question_container(event)"><img src="./assets/delete_black_24dp.svg" alt=""/></button>
    </div>  
    `)
}

document.getElementById('file').onchange=function(e){
    let reader=new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=function(){
        let preview=document.getElementById(get_div_img());
            image=document.createElement('img');
            image.src=reader.result;
            image.style.width="100%";
            preview.innerHTML=`
            <div>
                <input class="btn-opc" type="button" value="x" onclick="removeImg(event)">
            </div>`;
            preview.append(image);
    }
    let div = document.getElementById(get_div_img());
    div.style.display = '';
}

function add_img(event){
    id_div = event.target.parentElement.parentElement.parentElement.parentElement.childNodes[3].id;
}

function get_div_img(){
    return id_div;
}

function removeImg(event){
    event.target.parentElement.parentElement.style.display = 'none';
}

function delete_question_container(event){
    id_number -= 1;
    event.target.parentElement.parentElement.parentElement.remove();
}

let realFileBtn = null;
let customTxt;

function add_file(event){
    if (realFileBtn.value) {
        customTxt.innerHTML = realFileBtn.value;
    } else {
    customTxt.innerHTML = "No se ha cargado archivo";
    }
}

function add_archive(event){
    console.log(event.target.parentElement.childNodes[1]);
    console.log(event.target.parentElement.childNodes[5]);

    realFileBtn = document.getElementById(event.target.parentElement.childNodes[1].id);
    customTxt = document.getElementById(event.target.parentElement.childNodes[5].id);

    realFileBtn.click();
}

function add_correct_answer(event){
    event.target.parentElement.parentElement.parentElement.childNodes[1].setAttribute("name", "answer");
    event.target.parentElement.parentElement.parentElement.childNodes[3].setAttribute("name", "answer");
    event.target.parentElement.parentElement.parentElement.childNodes[5].setAttribute("name", "answer");
    event.target.parentElement.parentElement.parentElement.childNodes[7].setAttribute("name", "answer");

    event.target.parentElement.parentElement.setAttribute("name", "correct-answer");
}

function add_question_container(question){
    console.log(question);
    id_number += 1;

    const $div = document.createElement("div");
    $div.id = "question-container-" + id_number.toString();
    $div.classList.add("question-container");
    if(question == "Varias opciones"){
        $div.innerHTML = template_element(``);
    }else if(question == "Subir archivo"){
        $div.innerHTML =  template_element_upload_file(``);
    }

    $form.insertBefore($div,$form.lastChild);
    $form.insertBefore(container_select_crear,$form.lastChild);

}
selected_crear.addEventListener("click", () => {
    optionsContainer_crear.classList.toggle("active");
});

optionsListCrear.forEach(o => {
    o.addEventListener("mouseup", () => {
        //selected.innerHTML = o.querySelector("label").innerHTML;
        optionsContainer_crear.classList.remove("active");
        add_question_container(o.querySelector("label").innerHTML);
    });
});

function get_correct_answer(question_1, question_2, question_3,question_4){

    console.log(question_1.id);
    return true;
}
function get_question_opc(container){
    //console.log(container.childNodes);
    let pregunta = container.childNodes[1].childNodes[1].value;

    let url_img;

    try {
        url_img = container.childNodes[3].childNodes[2].src;
        
    } catch (err) {
        
    }   

    let question_1 = container.childNodes[5].childNodes[1].childNodes[3].value;
    let question_2 = container.childNodes[5].childNodes[3].childNodes[3].value;
    let question_3 = container.childNodes[5].childNodes[5].childNodes[3].value;
    let question_4 = container.childNodes[5].childNodes[7].childNodes[3].value;

    let correct_answer = get_correct_answer(container.childNodes[5].childNodes[1],
                                            container.childNodes[5].childNodes[3],
                                            container.childNodes[5].childNodes[5],
                                            container.childNodes[5].childNodes[7]);
    //console.log(container.childNodes[5].childNodes);

}

function get_data_evaluation(){
    let tittle = inputs[0].value;
    let desc = inputs[1].value;
    let group = selected.innerHTML;
    let fech_initi = inputs[2].value;
    let fech_end = inputs[3].value;
    let time_initi = inputs[4].value;
    let time_end = inputs[5].value;

    for(let i = 0; i <= id_number; i++){
        let container = document.querySelectorAll(".question-container");

        let type_question = container[i].attributes.name.nodeValue;

        console.log(container[i].attributes.name.nodeValue);
        if(type_question == "varias-opciones"){
            get_question_opc(container[i]);
        }
        
    }
}

function send_eva(){
    get_data_evaluation();
}
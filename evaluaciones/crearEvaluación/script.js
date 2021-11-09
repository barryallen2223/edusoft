let id_question = 0;
const textarea = document.querySelector("textarea");

const $btn_delete_img = null;

function removeElement(event){
    let div = document.getElementById("question-" + (id_question.toString()));
    div.parentNode.removeChild(div);
}

function removeImg(event){
    console.log(event.path);
    event.path[2].style.display = 'none';
    //event.target.parentElement.parentElement.style.visibility = 'hidden';
    /*document.getElementById('preview').style.display = "none";
    document.getElementById('btn-delete-img').style.display = "none";*/

}
//This function is automactic
(function load(){
    //Capture button that it will add new div to do new question
    const $btn_add = document.getElementById("btn_add");
    const $form = document.getElementById("form");
    const $btn_img = document.getElementById("btn-img");

    const template_element = data => {
        return (`
                <div>
                    <textarea placeholder="Pregunta" required></textarea>
                </div>
        `)
    }

    //Capture event of button
    $btn_add.addEventListener("click", (event) => {
        id_question += 1;
        const $div = document.createElement("div");
        $div.classList.add("question-div");
        $div.innerHTML = template_element(``);
        $div.setAttribute('id', "question-" + (id_question.toString()));
        $form.insertBefore($div,$form.lastChild);
        $form.insertBefore($btn_add,$form.lastChild);
        $btn_delete_img = document.getElementById("btn-delete-img");
    })
})()

textarea.addEventListener("keyup", e => {
    textarea.style.height = "20px";
    let scHeight = e.target.scrollHeight;
    textarea.style.height = `${scHeight}px`;
});

document.getElementById('file').onchange=function(e){
    let reader=new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=function(){
        let preview=document.getElementById('preview');
            image=document.createElement('img');
            image.src=reader.result;
            image.style.width="100%";
            preview.innerHTML='';
            preview.append(image);
    }

    //console.log(e.target.parentNode.childNodes[9].style);
    //e.target.parentNode.childNodes[9].style.visibility = 'visible';
    e.target.parentNode.childNodes[11].style.display = '';
    /*preview.insertAdjacentHTML("beforebegin",`<div>
    <input id="btn-delete-img" class="btn-opc" type="button" value="x" onclick="removeImg(event)">
    </div>`);*/
}

const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");

const optionsList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
});

optionsList.forEach(o => {
        o.addEventListener("click", () => {
        selected.innerHTML = o.querySelector("label").innerHTML;
        optionsContainer.classList.remove("active");
    });
});
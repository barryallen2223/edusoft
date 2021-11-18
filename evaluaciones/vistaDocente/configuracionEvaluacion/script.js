const inputs = document.querySelectorAll(".input");

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

function create_JSON(id,titulo,desc,grupo,fecha,hora){
	var info_question = {
		"id" : id,
    	"titulo" : titulo,
    	"descripcion" : desc,
		"grupo": grupo,
		"fecha": fecha,
		"hora": hora
	};

	return info_question

}

function call_createEva(){
	let id = uuid.v4();
	let titulo = inputs[0].value;
	let desc = inputs[1].value;
	let grupo = selected.innerHTML;

	let fecha = {
		"inicio": inputs[2].value,
		"final": inputs[3].value,
	}

	let hora = {
		"inicio": inputs[4].value,
		"final": inputs[5].value,
	}

	JSON_question = JSON.stringify(create_JSON(id,titulo,desc,grupo,fecha,hora));

	location.href = "./creacionEvalacion/index.html";

}

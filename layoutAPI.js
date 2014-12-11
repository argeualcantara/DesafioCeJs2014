window.onload = function(){
	var formulario = document.createElement('form');
	for(var i = 0, size = tela.sections.length; i < size; i++){
		var form = tela.sections[i];
		var section = document.createElement('section');
		if(form['description'].length > 0){
			var header = document.createElement('header');
			var title = document.createTextNode(form['description']);
			header.appendChild(title);
			section.appendChild(header);
		}
		var fields = form['fields'];
		for(var j = 0, sizej = fields.length; j < sizej; j++){
			var article	= document.createElement('article');
			var field = fields[j];
				var label = document.createElement('label');
				var name = document.createTextNode(field.name+': ');
				label.appendChild(name);
					var input = document.createElement('input');
					input.type = field.type;
					input.name = field.name;
					input.required = field.mandatory;
					if (input.required){
						label.className = 'texto-obrigatorio';
					}
					if(input.name == 'submit'){
						input.value = 'Salvar';
						input.onclick = function(){validar();};
					}
					label.appendChild(input);
					article.appendChild(label);
				section.appendChild(article);
		}
		formulario.appendChild(section);
	}
	document.getElementsByTagName('body')[0].appendChild(formulario);
};
function validar(){
	var formElements = document.getElementsByTagName('input');
	var user = {};
	for(var i = 0, size = formElements.length; i < size; i++){
		var elem = formElements[i];
		if(elem.required && elem.type != 'checkbox' && elem.value == ''){
			alert('O campo '+elem.name+' é obrigatório.');
			return false;
		}
		if(elem.type != 'checkbox'){
			user[elem.name] = elem.value;
		}else{
			user[elem.name] = elem.checked;
		}
	}
	var stringified = JSON.stringify(user);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("post","application/user",true);
	xmlhttp.send(stringified);
}
const toDoForm = document.querySelector('.js-toDoForm'),
			toDoInput = toDoForm.querySelector('input'),
			toDoList = document.querySelector('.js-toDoList');
const TODOS_LS = 'toDos';

let toDos = []; //해야할 일을 생성했을 때 배열에 추가

function deleteToDo(event){
	const btn = event.target;
	const li = btn.parentNode;
	toDoList.removeChild(li);
	const cleanToDos = toDos.filter(function(toDo){
		return toDo.id !== parseInt(li.id); ///조건에 해당하는 요소 제외하고 배열로 재정리
	});
	toDos = cleanToDos;
	saveToDos();
}
//로컬스토리지에는 자바스크립트 데이터를 저장할 수 없다
//스트링으로만 저장가능

function saveToDos(){
	localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
	const li = document.createElement('li');
	const delBtn = document.createElement('button');
	const span = document.createElement('span');
	const newId = toDos.length + 1;
	delBtn.innerHTML = ' ❌';
	delBtn.setAttribute('type', 'button');
	delBtn.addEventListener('click', deleteToDo);
	span.innerText = text;
	li.appendChild(span);
	li.appendChild(delBtn);
	li.id = newId;
	toDoList.appendChild(li);
	const toDoObj = {
		text: text,
		id: newId
	};
	toDos.push(toDoObj);
	saveToDos();
}

function handleSubmit(event){
	event.preventDefault();
	const currentValue = toDoInput.value;
	paintToDo(currentValue);
	toDoInput.value= '';
}

function loadToDos(){
	const loadedToDos = localStorage.getItem(TODOS_LS);
	if(loadedToDos !== null) {	
		const parsedToDos = JSON.parse(loadedToDos); //자바스크립트 오브젝트로 변환
		parsedToDos.forEach(function(toDo){ //array에 대해 각각 함수 실행
			paintToDo(toDo.text);
		});
	}
}

function init(){
	loadToDos();
	toDoForm.addEventListener('submit', handleSubmit);
}
init();
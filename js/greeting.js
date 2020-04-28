const form = document.querySelector('.js-form');
const input = form.querySelector('input');
const greeting = document.querySelector('.js-greetings');

const USER_LS = 'currentUser'; //user local storege
const SHOWING_CN = 'showing'; //showing class name

function saveName(text){
	localStorage.setItem(USER_LS, text); //로컬스토리지에 전달된 현재값 저장
}

function handleSubmit(event){
	event.preventDefault(); 
	const currentValue = input.value;
	paintGreeting(currentValue); //현재 입력값 보여주기
	saveName(currentValue); //로컬스토리지에 현재값 보내기
}

function askForName(){
	form.classList.add(SHOWING_CN);
	form.addEventListener('submit', handleSubmit); //엔터키 동작시 실행될 함수 호출
}

function paintGreeting(text){
	form.classList.remove(SHOWING_CN);
	greeting.classList.add(SHOWING_CN);
	greeting.innerText = `Hello ${text}`;
}

function loadName(){
	const currentUser = localStorage.getItem(USER_LS); //로컬스토리지에 저장된 값이 있으면 가져온다
	if(currentUser == null) {
		askForName(); //입력값이 없는 상태 
	} else {
		paintGreeting(currentUser); //입력값이 있는 상태
	}
}

function init(){
	loadName();
}
init();

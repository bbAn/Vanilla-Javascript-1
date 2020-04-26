const clockContainer = document.querySelector('.js-clock'),
			clockTitle = clockContainer.querySelector('h1');

function getTime(){
	const date = new Date();
	const mimutes = date.getMinutes();
	const hours = date.getHours();
	const seconds = date.getSeconds();
	clockTitle.innerText = `${hours < 10 ? `0${hours}`: hours}:${mimutes < 10 ? `0${mimutes}`:mimutes}`; //:${seconds < 10 ? `0${seconds}`:seconds} 초단위
}

function init(){
	getTime();
	setInterval(getTime, 1000);
}
init();
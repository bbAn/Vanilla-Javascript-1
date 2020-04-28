const body = document.querySelector('body');
const momentum = document.querySelector('.momentum');
const IMG_NUMBER = 6;

function handleImgLoad(){
	console.log("finished loading");
	momentum.style.display = 'block';
}

function paintImage(imgNumber){
	const image = new Image();
	image.src = `images/${imgNumber + 1}.jpg`;
	image.classList.add('bgImage');
	body.appendChild(image);
	image.addEventListener('load', handleImgLoad);
}

function getRandom(){
	const number = Math.floor(Math.random() * IMG_NUMBER);
	// Math.floor() 버림함수
	// Math.ceiling() 올림함수
	return number;
}

function init(){
    const randomNumber = getRandom();
    paintImage(randomNumber);
}
init();

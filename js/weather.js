const weather = document.querySelector('.js-weather');
const API_KEY = '174acde45ab5bf011b07ce0580b0c709';
const COORDS = 'coords';

function getWeather(lat, lng){
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
		)
		.then(function(response){
			return response.json(); 
		})
		.then(function(json){
			const temperature = json.main.temp;
			const place = json.name;
			const skyCondition = json.weather[0].main;
			const nation = json.sys.country;
			weather.innerText = `${skyCondition} ${temperature} @ ${place} in ${nation}`;
		});
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude

        //객체의 변수 이름과 객체의 키의 이름을 같게 저장할때는 
        //아래같이 사용 가능
        //latitude,
        //longitude
    };
	saveCoords(coordsObj);
	getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log('Cant access geo location');
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
		const parseCoords = JSON.parse(loadedCoords);
		getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}
init();

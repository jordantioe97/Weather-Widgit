let appId='03f51d829073546c13a5a07bb5fc369c';
let units='imperial';
let searchMethod;

function getSearchMethod(searchTerm) {
	if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
		searchMethod = 'zip';
	else
		searchMethod = 'q';
}

function searchWeather(searchTerm) {
	getSearchMethod(searchTerm);
	fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
		return result.json();
	}).then(result => {
		init(result);
	})
	
	fetch(`http://api.openweathermap.org/data/2.5/forecast?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(resultforecast => {
		return resultforecast.json();
	}).then(resultforecast => {
		initforecast(resultforecast);
	})

}

function dateReformat(inputDateStr) {
	var weekday = new Array(7);
	weekday[0] =  "SUN"; 
	weekday[1] = "MON"; 
	weekday[2] = "TUE"; 
	weekday[3] = "WED";
	weekday[4] = "THU"; 
	weekday[5] = "FRI"; 
	weekday[6] = "SAT";
	
	var month = new Array(12);
	month[0] =  "JANUARY";
	month[1] = "FEBRUARY";
	month[2] = "MARCH";
	month[3] = "APRIL";
	month[4] = "MAY";
	month[5] = "JUNE";
	month[6] = "JULY";
	month[7] = "AUGUST";
	month[8] = "SEPTEMBER";
	month[9] = "OCTOBER";
	month[10] = "NOVEMBER";
	month[11] = "DECEMBER";

	thisday =  new Date(inputDateStr);
	var dow = weekday[thisday.getDay()];
	var mo = month[thisday.getMonth()];
	d = thisday.getDate();
	outputDateStr= dow + ", " + mo + " " + d;
	return outputDateStr;
}

function timeReformat(inputDateStr) {
	thisday =  new Date(inputDateStr);
    hours = thisday.getHours();
    minutes = thisday.getMinutes();
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	var suffix = "AM";
	if (hours >= 12) {
		suffix = "PM";
		hours = hours - 12;
	}
	if (hours == 0) {
		hours = 12;
	}
	outputTimeStr= hours + ":" + minutes + " " + suffix;
	return outputTimeStr;
}

function init(resultFromServer) {
	switch(resultFromServer.weather[0].main) {
		case 'Clear':
			document.body.style.backgroundImage = 'url("Img/clear.jpg")';
			break;
		case 'Clouds':	
			document.body.style.backgroundImage = 'url("Img/cloudy.jpg")';
			break;
		case 'Rain':
		case 'Drizzle':
		case 'Mist':
			document.body.style.backgroundImage = 'url("Img/rain.jpg")';
			break;
		case 'Thunderstorm':
			document.body.style.backgroundImage = 'url("Img/storm.jpg")';
			break;
		case 'Snow':
			document.body.style.backgroundImage = 'url("Img/snow.jpg")';
			break;
		default:
			break;
	}
	var inputDate =  new Date();
	document.getElementById("date").innerHTML = dateReformat(inputDate);
	document.getElementById("time").innerHTML = timeReformat(inputDate);

	let temperatureElement = document.getElementById('temperature');
	let minTemperature = document.getElementById('minTemperature');
	let maxTemperature = document.getElementById('maxTemperature');
	let cityName = document.getElementById('cityName');
	let weatherDescription = document.getElementById('weatherDescription');
	let resultWeatherDescription = resultFromServer.weather[0].description;
	let weatherIcon = document.getElementById('documentIconImg');
	weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';
	temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
	minTemperature.innerHTML = 'Lowest: ' + Math.floor(resultFromServer.main.temp_min) + '&#176';
	maxTemperature.innerHTML = 'Highest: ' + Math.floor(resultFromServer.main.temp_max) + '&#176';
	weatherDescription.innerHTML = resultWeatherDescription.charAt(0).toUpperCase() + resultWeatherDescription.slice(1);
	cityName.innerHTML = resultFromServer.name;
}

function initforecast(resultFromServer) {
	// forecast data: day1 in array-0, day2 in array-8, day3 in array-16, day4 in array-24, day5 in array-32	
	
	//Forecast Day 1
	let resultDate1 = resultFromServer.list[0].dt_txt;
	var inputDate =  new Date(resultDate1);
	document.getElementById("date1").innerHTML = dateReformat(inputDate);
	let minTemperature1 = document.getElementById('minTemperature1');
	let maxTemperature1 = document.getElementById('maxTemperature1');
	let weatherDescription1 = document.getElementById('weatherDescription1');
	let resultWeatherDescription1 = resultFromServer.list[0].weather[0].description;
	let weatherIcon1 = document.getElementById('documentIcon1Img');
	weatherIcon1.src = 'http://openweathermap.org/img/w/' + resultFromServer.list[0].weather[0].icon + '.png';
	weatherDescription1.innerHTML = resultWeatherDescription1.charAt(0).toUpperCase() + resultWeatherDescription1.slice(1);
	minTemperature1.innerHTML = 'Lowest: ' + Math.round(Math.min(resultFromServer.list[0].main.temp_min, resultFromServer.list[1].main.temp_min, resultFromServer.list[2].main.temp_min,
		resultFromServer.list[3].main.temp_min, resultFromServer.list[4].main.temp_min, resultFromServer.list[5].main.temp_min, resultFromServer.list[6].main.temp_min,
		resultFromServer.list[7].main.temp_min)) + '&#176';
	maxTemperature1.innerHTML = 'Highest: ' + Math.round(Math.max(resultFromServer.list[0].main.temp_max, resultFromServer.list[1].main.temp_max, resultFromServer.list[2].main.temp_max,
		resultFromServer.list[3].main.temp_max, resultFromServer.list[4].main.temp_max, resultFromServer.list[5].main.temp_max, resultFromServer.list[6].main.temp_max,
		resultFromServer.list[7].main.temp_max)) + '&#176';

	//Forecast Day 2
	let resultDate2 = resultFromServer.list[8].dt_txt;
	var inputDate =  new Date(resultDate2);
	document.getElementById("date2").innerHTML = dateReformat(inputDate);
	let minTemperature2 = document.getElementById('minTemperature2');
	let maxTemperature2 = document.getElementById('maxTemperature2');
	let weatherDescription2 = document.getElementById('weatherDescription2');
	let resultWeatherDescription2 = resultFromServer.list[1].weather[0].description;
	let weatherIcon2 = document.getElementById('documentIcon2Img');
	weatherIcon2.src = 'http://openweathermap.org/img/w/' + resultFromServer.list[8].weather[0].icon + '.png';
	weatherDescription2.innerHTML = resultWeatherDescription2.charAt(0).toUpperCase() + resultWeatherDescription2.slice(1);
	minTemperature2.innerHTML = 'Lowest: ' + Math.round(Math.min(resultFromServer.list[8].main.temp_min, resultFromServer.list[9].main.temp_min, resultFromServer.list[10].main.temp_min,
		resultFromServer.list[11].main.temp_min, resultFromServer.list[12].main.temp_min, resultFromServer.list[13].main.temp_min, resultFromServer.list[14].main.temp_min,
		resultFromServer.list[15].main.temp_min)) + '&#176';
	maxTemperature2.innerHTML = 'Highest: ' + Math.round(Math.max(resultFromServer.list[8].main.temp_max, resultFromServer.list[9].main.temp_max, resultFromServer.list[10].main.temp_max,
		resultFromServer.list[11].main.temp_max, resultFromServer.list[12].main.temp_max, resultFromServer.list[13].main.temp_max, resultFromServer.list[14].main.temp_max,
		resultFromServer.list[15].main.temp_max)) + '&#176';
	
	//Forecast Day 3
	let resultDate3 = resultFromServer.list[16].dt_txt;
	var inputDate =  new Date(resultDate3);
	document.getElementById("date3").innerHTML = dateReformat(inputDate);
	let minTemperature3 = document.getElementById('minTemperature3');
	let maxTemperature3 = document.getElementById('maxTemperature3');
	let weatherDescription3 = document.getElementById('weatherDescription3');
	let resultWeatherDescription3 = resultFromServer.list[2].weather[0].description;
	let weatherIcon3 = document.getElementById('documentIcon3Img');
	weatherIcon3.src = 'http://openweathermap.org/img/w/' + resultFromServer.list[16].weather[0].icon + '.png';
	weatherDescription3.innerHTML = resultWeatherDescription3.charAt(0).toUpperCase() + resultWeatherDescription3.slice(1);
	minTemperature3.innerHTML = 'Lowest: ' + Math.round(Math.min(resultFromServer.list[16].main.temp_min, resultFromServer.list[17].main.temp_min, resultFromServer.list[18].main.temp_min,
		resultFromServer.list[19].main.temp_min, resultFromServer.list[20].main.temp_min, resultFromServer.list[21].main.temp_min, resultFromServer.list[22].main.temp_min,
		resultFromServer.list[23].main.temp_min)) + '&#176';
	maxTemperature3.innerHTML = 'Highest: ' + Math.round(Math.max(resultFromServer.list[16].main.temp_max, resultFromServer.list[17].main.temp_max, resultFromServer.list[18].main.temp_max,
		resultFromServer.list[19].main.temp_max, resultFromServer.list[20].main.temp_max, resultFromServer.list[21].main.temp_max, resultFromServer.list[22].main.temp_max,
		resultFromServer.list[23].main.temp_max)) + '&#176';
	
	//Forecast Day 4
	let resultDate4 = resultFromServer.list[24].dt_txt;
	var inputDate =  new Date(resultDate4);
	document.getElementById("date4").innerHTML = dateReformat(inputDate);
	let minTemperature4 = document.getElementById('minTemperature4');
	let maxTemperature4 = document.getElementById('maxTemperature4');
	let weatherDescription4 = document.getElementById('weatherDescription4');
	let resultWeatherDescription4 = resultFromServer.list[3].weather[0].description;
	let weatherIcon4 = document.getElementById('documentIcon4Img');
	weatherIcon4.src = 'http://openweathermap.org/img/w/' + resultFromServer.list[24].weather[0].icon + '.png';
	weatherDescription4.innerHTML = resultWeatherDescription4.charAt(0).toUpperCase() + resultWeatherDescription4.slice(1);
	minTemperature4.innerHTML = 'Lowest: ' + Math.round(Math.min(resultFromServer.list[24].main.temp_min, resultFromServer.list[25].main.temp_min, resultFromServer.list[26].main.temp_min,
		resultFromServer.list[27].main.temp_min, resultFromServer.list[28].main.temp_min, resultFromServer.list[29].main.temp_min, resultFromServer.list[30].main.temp_min,
		resultFromServer.list[31].main.temp_min)) + '&#176';
	maxTemperature4.innerHTML = 'Highest: ' + Math.round(Math.max(resultFromServer.list[24].main.temp_max, resultFromServer.list[25].main.temp_max, resultFromServer.list[26].main.temp_max,
		resultFromServer.list[27].main.temp_max, resultFromServer.list[28].main.temp_max, resultFromServer.list[29].main.temp_max, resultFromServer.list[30].main.temp_max,
		resultFromServer.list[31].main.temp_max)) + '&#176';
	
	
}

document.getElementById('searchBtn').addEventListener('click',() => {
	let searchTerm = document.getElementById('searchInput').value;
	if (searchTerm)
		searchWeather(searchTerm);
})

const CLEFAPI = 'a297178d368ef54faf2c8580925721e1'
let resultatApi;

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(position =>{
		console.log(position);
		let long = position.coords.longitude;
		let lat = position.coords.latitude;
		AppelDeLAPI(long,lat);
	}, () => {
		alert(`Attention, sans géolocalisation l'aplication ne peut fonctionner, veuiller l'activer`)
	})
}

function AppelDeLAPI(long, lat) {
	console.log(long, lat);
	fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
	.then((reponse) => {
		return reponse.json();
	})
	.then((data) => {
		console.log(data);
	})
}
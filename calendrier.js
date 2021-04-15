import tableauJoursEnOrdre from './lesjours.js';
//console.log("depuis calendrier.js:" + tableauJoursEnOrdre);

const CLEFAPI = 'a297178d368ef54faf2c8580925721e1'
let resultatApi;

const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.prévisiondelheure');
const degrepourheure = document.querySelectorAll('.heuredegréprévision');
const joursDiv = document.querySelectorAll('.nomdujour');
const tempsJoursDiv = document.querySelectorAll('.tempsdujour');


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
		resultatApi = data;
		temps.innerText = resultatApi.current.weather[0].description;
		temperature.innerText = `${Math.trunc(resultatApi.current.temp)}°`;
		localisation.innerText = resultatApi.timezone;

		// toutes les 3h avec les temperatures 
		let heureActuelle = new Date().getHours();
		for (let i = 0; i < heure.length; i++) {
			let heureIncrementé = heureActuelle + i * 3 ;

			if (heureIncrementé > 24) {
				heure[i].innerText = `${heureIncrementé - 24} h`;
			} else if(heureIncrementé === 24){
					heure[i].innerHTML = "00 h";
				} else {
				heure[i].innerText = `${heureIncrementé} h`;
				}
			
			
		}

		//temps toutes les 3h

		for(let j = 0; j < degrepourheure.length; j++) {
			degrepourheure[j].innerText = `${Math.trunc(resultatApi.hourly[j * 3].temp)}°`;
		}


		// mettre les trois premieres lettres des jours
		for(let k = 0; k < tableauJoursEnOrdre.length; k++) {
		joursDiv[k].innerText = tableauJoursEnOrdre[k].slice(0,3);
		}

		// ajouter le temps pour chaques jours

		for(let m = 0; m < 7; m++){
			tempsJoursDiv[m].innerText = `${Math.trunc(resultatApi.daily[m + 1].temp.day)}°`
		}
	})
}


jQuery(function($){

	
	$.fn.formBackUp = function() {

		if(!localStorage){
			return false;
		}

		var forms = this;
		var datas = {};
		var ls = false;
		datas.href = 'window.location.href';
		

		// nous allons récuperer les données du localstorage

		if(localStorage['formBackUp']){
			ls = JSON.parse(localStorage['formBackUp']);
			//console.log(ls);
			if(ls.href == datas.href){
				for(var id in ls){
					if(id != 'href'){
						$('#'+id).val(ls[id]);
						datas[id] = ls[id];
					}
				}
			}

		}

		forms.find('imput,textarea').keyup(function(e){
			datas[$(this).attr('id')] = $(this).val();
			//console.log(datas);
			localStorage.setItem('formBackUp',JSON.stringify(datas));


		});
		console.log(localStorage);
	}

		$('form').formBackUp();
	

});
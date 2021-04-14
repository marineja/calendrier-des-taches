
const joursDeLaSemaine = ['lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

let aujourdhui = new Date();

let option = {weekday: 'long'};

let jourActuel = aujourdhui.toLocaleDateString('fr-FR', option);
console.log(jourActuel, aujourdhui);

//metre la premiere lettre en majuscule et rajouter le reste du mots 
jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);

// on a decoupé notre tableau à partir du jours actuel puis on a rajouté les jours manquants (que l'on avait enlevé) à la fin
let tableauJoursEnOrdre = joursDeLaSemaine.slice(joursDeLaSemaine.indexOf(jourActuel)).concat(joursDeLaSemaine.slice(0 , joursDeLaSemaine.indexOf(jourActuel)));
console.log(tableauJoursEnOrdre);

export default tableauJoursEnOrdre;
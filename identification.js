document.getElementById("inscription").addEventListener("submit", function(e) {
   

    var erreur;
    var pseudo = document.getElementById("pseudo");
    var mdp = document.getElementById("mdp");
    var inputs = this.getElementsByTagName("input");

    if (!pseudo.value) {
        erreur = "Veuillez renseigner un identifiant";
    }
    if (!mdp.value) {
        erreur = "Veuillez renseigner un mot de passe";
    }

    if (erreur) {
        e.preventDefault();
        document.getElementById("erreur").innerHTML = erreur;
        return false;
    } else {
        alert('Formulaire envoyé');

    }


    
})
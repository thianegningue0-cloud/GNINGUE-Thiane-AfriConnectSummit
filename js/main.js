const boutonTheme = document.getElementById('theme-toggle');

// cette fonction permet de changer le theme et de s'en souvenire
function basculerTheme(nomDuTheme){
    document.documentElement.setAttribute('data-theme', nomDuTheme);
    localStorage.setItem('themeChoisi', nomDuTheme);
}

// Optionnel : Met à jour l'émoji du bouton pour l'UX
const anCienThemme = localStorage.getItem('themeChoisi');

 if (boutonTheme && anCienThemme) {
        boutonTheme.textContent = anCienThemme === 'dark' ? '☀️' : '🌙';
    }
  

if (anCienThemme) {
    basculerTheme(anCienThemme);
}


if(boutonTheme) {
    boutonTheme.addEventListener('click', function(){
        const nomDuThemeActuel = document.documentElement.getAttribute('data-theme');
        if (nomDuThemeActuel=== 'dark'){
            basculerTheme('light');
        } else {
            basculerTheme('dark');

        }
    });
}

const barreMenu = document.querySelector('.main-header');
const flecheRemonter = document.getElementById('btn-top');
// calcule du scroll pour la navbar et la fleche de retour en haut
window.addEventListener('scroll', function (){
    if (window.scrollY > 80) {
        barreMenu.classList.add('navbar-scrolled');
    } else {
        barreMenu.classList.remove('navbar-scrolled')
    }

    if (flecheRemonter) {
        if (window.scrollY > 300) {
            flecheRemonter.style.display = 'inline-block';
        } else {
            flecheRemonter.style.display = 'none';
            
        }
    }
});

if (flecheRemonter) {
    flecheRemonter.addEventListener('click', function(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

}

const listeSections = document.querySelectorAll('section');
const optionsObservateur = {
    threshold: 0.15
};

//fonction pour faire appaitre les section au fur et à mesure du defilement
const observateurSection = new IntersectionObserver(function(lesEntrees, observateur) {
    for (let index =0; index < lesEntrees.length; index++) {
        if (lesEntrees[index].isIntersecting) {
            lesEntrees[index].target.classList.add('section-visible');
            observateur.unobserve(lesEntrees[index].target);//il permet désactivé l'écoute une  fois visible
        }
    }
}, optionsObservateur);
for (let s = 0; s < listeSections.length; s++){
    listeSections[s].classList.add('section-cachee');
    observateurSection.observe(listeSections[s]);
}
// ici les mois commencent à 0 en javaccript (0 = Janvier, 9 = Octobre)
const cibleDate = new Date(2026, 9, 15, 8, 0, 0).getTime();

// calcul du temps restant pour l'affichage du compte a rebours
function miseAJourCompteur() {
    const maintenant = new Date().getTime();
    const distanceTemps = cibleDate - maintenant;

    if (distanceTemps < 0) {
        const blocCompteur = document.getElementById('countdown');
        if (blocCompteur) {
            blocCompteur.innerHTML = "<span style='width:100%; min-width:100%;'>Le sommet a commence !</span>";
        }
        return;

        }

        const joursMs = 24 * 60 * 60 * 1000;
        const heuresMs = 60 * 60 * 1000;
        const minutesMs = 60 * 1000;

        const textJours = Math.floor(distanceTemps / joursMs);
        const textHeures = Math.floor((distanceTemps % joursMs) / heuresMs);
        const textMinutes= Math.floor((distanceTemps % heuresMs) / minutesMs);
        const textSecondes = Math.floor((distanceTemps % minutesMs) / 1000);


       const affichageJours = document.getElementById('jours');
       const affichageHeures = document.getElementById('heures');
       const affichageMinutes = document.getElementById('minutes');
       const affichageSecondes = document.getElementById('secondes');
       // padStart(2,0) permet de forcer l'affichage à deux à deux chiffre
       if (affichageJours) affichageJours.textContent = textJours.toString().padStart(2, '0');
       if (affichageHeures) affichageHeures.textContent = textHeures.toString().padStart(2, '0');
       if (affichageMinutes) affichageMinutes.textContent = textMinutes.toString().padStart(2, '0');
       if (affichageSecondes) affichageSecondes.textContent = textSecondes.toString().padStart(2, '0');
    }

    if (document.getElementById('countdown')){
        miseAJourCompteur();
        setInterval(miseAJourCompteur, 1000);
    }

    const boutonsDuProgramme = document.querySelectorAll('.bouton-jour');
    const tableauxDuProgramme = document.querySelectorAll('.container-tab');

    // boucle pour cacher ou afficher les tableaux du programme au clic
    if (boutonsDuProgramme.length > 0) {
    for (let i = 0; i < boutonsDuProgramme.length; i++) {
        boutonsDuProgramme[i].addEventListener('click', function() {
            // il eteint tous les boutons 
            for (let j =0; j < boutonsDuProgramme.length; j++) {
                boutonsDuProgramme[j].classList.remove('active');
            }
             // ici on cache tous les tableaux
            for (let k =0; k < tableauxDuProgramme.length; k++) {
                tableauxDuProgramme[k].classList.remove('active');
        }

        // c'est allumer le boutton pour sur lequel on cliqué

        this.classList.add('active');

        const cibleTableau = this.getAttribute('data-jour');
        const tableauSelectionne = document.getElementById(cibleTableau);
        if (tableauSelectionne) {
            tableauSelectionne.classList.add('active');
        }
    });
}

}

const listeFiltres = document.querySelectorAll('.btn-filtre');
const listeCartes = document.querySelectorAll('.carte-intervenant')
 
// ecouteur de clic pour filtrer les cartes des intervenants par categorie
for (let x = 0; x < listeFiltres.length; x++) {
    listeFiltres[x].addEventListener('click', function() {
        
        for (let y = 0; y < listeFiltres.length; y++) {
            listeFiltres[y].classList.remove('active');
        }
        this.classList.add('active');
        
        const categorieChoisie = this.getAttribute('data-filtre');
        
        for (let z = 0; z < listeCartes.length; z++) {
            const categorieCarte = listeCartes[z].getAttribute('data-categorie');
            
            if (categorieChoisie === 'tous' || categorieCarte === categorieChoisie) {
                listeCartes[z].style.display = 'block';
            } else {
                listeCartes[z].style.display = 'none';
            }
        }
    });
}

const leFormulaire = document.getElementById('formulaire-inscription');

// validation manuelle des champs du formulaire avant envoi
if (leFormulaire) {
    leFormulaire.addEventListener('submit', function(evenement){
        evenement.preventDefault(); // il bloque le rechargement automatique de la page

         // on récupére  des champs saisie
        const inputNom = document.getElementById('nom');
        const inputEmail = document.getElementById('email');
        const inputTel = document.getElementById('telephone');
        const inputTicket = document.getElementById('ticket');
        const inputPays = document.getElementById('pays-africain');
        const inputMotiv = document.getElementById('motivation');

        //récupération des zones d'affichage d'erreurs
        const errNom = document.getElementById('erreur-nom');
        const errEmail = document.getElementById('erreur-email');
        const errTel = document.getElementById('erreur-telephone');
        const errTicket = document.getElementById('erreur-ticket');
        const errPays = document.getElementById('erreur-pays-africain');
        const errMotiv = document.getElementById('erreur-motivation');
  
         // c'est la validation du champ du nom
        let validateurOk = true;
         if (inputNom.value.trim() === "") {
            errNom.textContent = "Le nom complet est obligatoire.";
            inputNom.style.borderColor = "red";
            validateurOk = false
         } else {
            errNom.textContent = "";
            inputNom.style.borderColor = "green";
         }

          // validation du champ email via expression régulière (regex)
        const modeleRegexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (inputEmail.value.trim() === "") {
            errEmail.textContent = "L'adresse email est obligatoire.";
            inputEmail.style.borderColor = "red";
            validateurOk = false;
        } else if (modeleRegexEmail.test(inputEmail.value.trim()) === false) {
            errEmail.textContent = "Veuillez entrer une adresse email au format valide.";
            inputEmail.style.borderColor = "red";
            validateurOk = false;
        } else {
            errEmail.textContent = "";
            inputEmail.style.borderColor = "green";
        } 
        
        //validation u numéro de telephone
        if (inputTel.value.trim()===""){
            errTel.textContent = "Le numero de telephone est obligatoire";
            inputTel.style.borderColor = "red";
            validateurOk = false;
        } else if (inputTel.value.trim().length < 8) {
            errTel.textContent = "Le telephone doit contenir au moins 8 chiffres.";
            inputTel.style.borderColor = "red";
            validateurOk = false;
        } else {
            errTel.textContent = "";
            inputTel.style.borderColor = "green";
        }

        //validation du choix billet
        if (inputTicket.value === "") {
            errTicket.textContent = "Veuillez choisir un type de billet.";
            inputTicket.style.borderColor = "#dc3545";
            validateurOk = false;
        } else {
            errTicket.textContent = "";
            inputTicket.style.borderColor = "#198754";
        }

        //validation du choix  pays
        
        if (inputPays.value === "") {
            errPays.textContent = "Veuillez choisir un pays.";
            inputPays.style.borderColor = "#dc3545";
            validateurOk = false;
        } else {
            errPays.textContent = "";
            inputPays.style.borderColor = "#198754";
        }

        //validation des motivations
        if (inputMotiv.value.trim().length < 20) {
            errMotiv.textContent = "Le message doit faire au moins 20 caracteres.";
            inputMotiv.style.borderColor = "#dc3545";
            validateurOk = false;
        } else {
            errMotiv.textContent = "";
            inputMotiv.style.borderColor = "#198754";
        }
         //si tous vlide on affiche le message de succés global
        if (validateurOk === true) {
            const conteneurSucces = document.getElementById('success-message');
            if (conteneurSucces) {
                conteneurSucces.textContent = "Votre demande d'inscription a bien été validée !";
                conteneurSucces.style.color = "#198754";
                conteneurSucces.style.fontWeight = "bold";
                conteneurSucces.style.marginTop = "15px";
                conteneurSucces.style.display = "block";
            }
            leFormulaire.reset(); //c'est pour vider les champs du formulaire aprés envoi
            // pour Réinitialiser les bordures vertes après le reset
            const inputs = leFormulaire.querySelectorAll('input, select, textarea');
            inputs.forEach(input => input.style.borderColor = 'var(--border-color)');
        }
    });

}
 //jour automatique de l'année du footer
const emplacementAnnee = document.getElementById('annee');
if (emplacementAnnee) {
    emplacementAnnee.textContent = new Date().getFullYear() + " ";
}
 //menu hambueger navigation mobile
const boutonHamburger = document.getElementById('menu-hamburger');
const menuNavigation = document.getElementById('nav-menu')

if (boutonHamburger && menuNavigation) {
    boutonHamburger.addEventListener('click', function() {
        menuNavigation.classList.toggle('nav-menu-ouvert');
    });

}

// animation des compteurs de statistique 

function animerLesCompteurs() {
    const LesChiffres = document.querySelectorAll('.stat-chiffre');
    LesChiffres.forEach(function(unChiffre) {
        const cible = parseInt(unChiffre.getAttribute('data-cible'));
        const duree = 1500; // il permet l'animation de duree 1,5 seconde
        const vitesse = duree / cible;
        let compteur = 0;
    
    // Si le chiffre est grand (comme 1200), on augmente le pas pour aller plus vite
        const pas = cible > 100 ? Math.ceil(cible / 50) : 1;

        const timer = setInterval(function() {
            compteur += pas;
            if (compteur >= cible) {
                unChiffre.textContent = cible;
                clearInterval(timer);
            } else {
                unChiffre.textContent = compteur;
            }
        }, vitesse * pas);

});
}
// Observateur pour déclencher l'animation dès que la section apparaît à l'écran
const sectionDesChiffres = document.querySelector('.chiffres-container');
if (sectionDesChiffres) {
    const observateurChiffres = new IntersectionObserver(function(lesEntrees, observateur) {
        if (lesEntrees[0].isIntersecting) {
            animerLesCompteurs(); // Lance l'animation
            observateur.unobserve(sectionDesChiffres); // Arrête d'observer pour ne le faire qu'une seule fois
        }
    }, { threshold: 0.1 });
    
    observateurChiffres.observe(sectionDesChiffres);
}

const elementsAAnimer = document.querySelectorAll('.fade-in, .slide-in, .zoom-in');

if (elementsAAnimer.length > 0) {
    const observateurAnimations = new IntersectionObserver(function(lesEntrees, observateur) {
        lesEntrees.forEach(function(entree) {
            if (entree.isIntersecting) {
                entree.target.classList.add('visible'); // Ajoute la classe qui déclenche l'animation CSS
                observateur.unobserve(entree.target); // Arrête d'observer une fois l'animation jouée
            }
        });
    }, { threshold: 0.15 }); // Se déclenche quand 15% de l'élément est visible

    elementsAAnimer.forEach(function(element) {
        observateurAnimations.observe(element);
    });
}









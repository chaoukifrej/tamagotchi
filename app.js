/* Script tamagotchi 
Contraintes :
- le tamagotchi commence avec EN: 10 (énergie), FAIM: 0, JOIE: 5
- 2 choix sont possibles: 
    jouer (EN - 2, FAIM + 1, JOIE +1)
    nourrir (FAIM - 1, JOIE - 1, EN + 2)
- FAIM ne peut dépasser 5
- JOIE ne peut être inférieure à 0
- EN ne peut être inférieure à 0
- tant que les limites sont respectée le tamagotchi reste vivant et un choix d’action est possible */

//VARIABLES et donnée initiales
const EN = document.getElementById("energie");
const JOIE = document.getElementById("joie");
const FAIM = document.getElementById("nourriture");
const PROPRETE = document.getElementById("proprete");
const JOUERBTN = document.getElementById("jouer");
const NOURRIRBTN = document.getElementById("nourrir");
const NETTOYERBTN = document.getElementById("nettoyer");
const CONTAINERFONCTIONS = document.getElementById("containerFonctions");
const CONTAINERTABLEAU = document.querySelector(".containerTableauDeBord");
const CONTAINERTAMAGO = document.querySelector(".containerTamagotchi");
const ENPP = document.getElementById("energiePP");
const JOIEPP = document.getElementById("joiePP");
const NOURRITUREPP = document.getElementById("nourriturePP");
const PROPRETEPP = document.getElementById("propretePP");
const TAMAGO = document.querySelector(".containerTamagotchi img");
const SAVEBTN = document.getElementById("save");
//------------

//EN COURS D'IMPLEMENTATION + manque musique
let playGame = true;

while (playGame == true) {
  break;
}
//-------------------------

/* en et joie doivent etre > a 0, faim < 5*/
let en = 10;
let joie = 5;
let faim = 0;
let proprete = 5;

//Sauvegarder -- A TERMINER (Continuer PARTIE ou nouvelle PARTIE)
SAVEBTN.addEventListener("click", function (e) {
  let monTam = {
    enO: en,
    joieO: joie,
    faimO: faim,
    propreteO: proprete,
  };
  console.log("SAUVEGARDE");
  console.log(monTam);
  anime({
    targets: ".containerTableauDeBord",
    keyframes: [{ scale: 1.2 }, { scale: 1 }],
    duration: 600,
    easing: "easeOutElastic(1, .9)",
  });
  anime({
    targets: "#save",
    keyframes: [{ scale: 1.2 }, { scale: 1 }],
    duration: 600,
    easing: "easeOutElastic(1, .9)",
  });
  let monTamStringed = JSON.stringify(monTam);
  localStorage.setItem("monTamKey", monTamStringed);
  let recup = JSON.parse(localStorage.getItem("monTamKey"));
  en = recup.enO;
  joie = recup.joieO;
  faim = recup.faimO;
  proprete = recup.propreteO;
});

EN.innerText = en;
JOIE.innerText = joie;
FAIM.innerText = faim;
PROPRETE.innerText = proprete;

//fonction pour mettre a jour les données sur la page
function transmetHtml(e, j, f, p) {
  en = e;
  joie = j;
  faim = f;
  proprete = p;
  EN.innerText = en;
  JOIE.innerText = joie;
  FAIM.innerText = faim;
  PROPRETE.innerText = proprete;
  //progressBar energie
  while (en >= 0) {
    let enPourcentage = en * 10;
    if (enPourcentage <= 20) {
      ENPP.style.backgroundColor = "red";
      EN.style.color = "red";
    } else if (enPourcentage <= 70) {
      ENPP.style.backgroundColor = "purple";
      EN.style.color = "purple";
    } else {
      ENPP.style.backgroundColor = "green";
      EN.style.color = "green";
    }
    ENPP.style.width = enPourcentage + "%";
    break;
  }
  //progressBar joie
  while (joie >= 0) {
    let joiePourcentage = joie * 10;
    if (joiePourcentage <= 20) {
      JOIEPP.style.backgroundColor = "red";
      JOIE.style.color = "red";
    } else if (joiePourcentage <= 70) {
      JOIEPP.style.backgroundColor = "pruple";
      JOIE.style.color = "purple";
    } else if (joiePourcentage <= 20) {
      JOIEPP.style.backgroundColor = "green";
      JOIE.style.color = "green";
    }
    JOIEPP.style.width = joiePourcentage + "%";
    break;
  }
  //progressBar faim (avec NOURRITUREPP et NOURRITUREP)
  while (faim <= 5) {
    let faimPourcentage = faim * 20;
    if (faimPourcentage <= 20) {
      NOURRITUREPP.style.backgroundColor = "green";
      FAIM.style.color = "green";
    } else if (faimPourcentage <= 60) {
      NOURRITUREPP.style.backgroundColor = "purple";
      FAIM.style.color = "purple";
    } else {
      NOURRITUREPP.style.backgroundColor = "red";
      FAIM.style.color = "red";
    }
    NOURRITUREPP.style.width = faimPourcentage + "%";
    break;
  }
  //progressBar proprete
  while (proprete >= 0) {
    let propretePourcentage = proprete * 10;
    if (propretePourcentage <= 20) {
      PROPRETEPP.style.backgroundColor = "red";
      PROPRETE.style.color = "red";
    } else if (propretePourcentage <= 70) {
      PROPRETEPP.style.backgroundColor = "purple";
      PROPRETE.style.color = "purple";
    } else if (propretePourcentage <= 100) {
      PROPRETEPP.style.backgroundColor = "green";
      PROPRETE.style.color = "green";
    }
    PROPRETEPP.style.width = propretePourcentage + "%";
    break;
  }
}

//fonction fin de partie
function mort() {
  CONTAINERTABLEAU.classList.add("displayNone");
  TAMAGO.classList.add("displayNone");
  let mort = document.createElement("h1");
  let ReplayBtn = document.createElement("button");
  ReplayBtn.innerText = "Ressusciter";
  mort.innerText = "Game Over";
  CONTAINERTAMAGO.appendChild(mort);
  CONTAINERFONCTIONS.appendChild(ReplayBtn);
  ReplayBtn.addEventListener("click", replay);
  JOUERBTN.classList.add("displayNone");
  NOURRIRBTN.classList.add("displayNone");
  NETTOYERBTN.classList.add("displayNone");
  SAVEBTN.classList.add("displayNone");
  console.log("Game Over");
  //fonction ressusciter
  function replay(e, j, f, p) {
    e = en;
    j = joie;
    f = faim;
    p = proprete;
    en = 10;
    joie = 5;
    faim = 0;
    proprete = 5;
    transmetHtml(10, 5, 0, 5);
    JOUERBTN.classList.remove("displayNone");
    NOURRIRBTN.classList.remove("displayNone");
    NETTOYERBTN.classList.remove("displayNone");
    SAVEBTN.classList.remove("displayNone");
    CONTAINERTABLEAU.classList.remove("displayNone");
    TAMAGO.classList.remove("displayNone");
    ReplayBtn.remove();
    mort.remove();
  }
}

//fonction jouer
function jouer(e, j, f, p) {
  e = en;
  j = joie;
  f = faim;
  p = proprete;
  let conditions = e > 0 && j > 0 && f < 5 && p > 0;
  while (conditions) {
    e -= 2;
    j++;
    f++;
    if (p > 0) {
      p -= 1;
    }
    break;
  }
  if (conditions != true) {
    mort();
  }
  transmetHtml(e, j, f, p);
  anime({
    targets: ".containerTamagotchi img",
    keyframes: [
      { rotate: 10 },
      { scale: 1.2 },
      { rotate: -10 },
      { scale: 1 },
      { rotate: 0 },
    ],
    duration: 600,
    easing: "easeOutElastic(1, .9)",
  });
}

//fonction nourrir
function nourrir(e, j, f, p) {
  e = en;
  j = joie;
  f = faim;
  p = proprete;
  let conditions = e > 0 && j > 0 && f < 5 && p > 0;
  while (conditions) {
    e += 2;
    j--;
    if (f > 0) {
      f--;
    }
    if (p > 0) {
      p--;
    }
    break;
  }
  if (conditions != true) {
    mort();
  }
  transmetHtml(e, j, f, p);
  anime({
    targets: ".containerTamagotchi img",
    keyframes: [
      { translateY: -10 },
      { translateY: 10 },
      { translateY: -10 },
      { translateY: 10 },
    ],
    duration: 400,
    easing: "easeOutExpo",
  });
}

//fonction nettoyer
function nettoyer(e, j, f, p) {
  e = en;
  j = joie;
  f = faim;
  p = proprete;
  let conditions = e > 0 && j > 0 && f < 5 && p > 0;
  while (conditions) {
    e -= 2;
    j++;
    f++;
    while (p < 10) {
      p += 3;
      if (p > 10) {
        p = 10;
      }
      break;
    }
    break;
  }
  if (conditions != true) {
    mort();
  }
  transmetHtml(e, j, f, p);
  anime({
    targets: ".containerTamagotchi img",
    rotate: {
      value: "+=2turn",
      duration: 1000,
      easing: "easeInOutSine",
    },
    direction: "left",
  });
}

//Listener au click
JOUERBTN.addEventListener("click", jouer);
NOURRIRBTN.addEventListener("click", nourrir);
NETTOYERBTN.addEventListener("click", nettoyer);

//TypeWriter titre h1
const TITRE = document.getElementById("titre");

let typewriter = new Typewriter(TITRE, {
  loop: true,
  delay: 75,
});

typewriter
  .pauseFor(500)
  .typeString("TAMAGOTCHI")
  .pauseFor(10000)
  .deleteChars(10)
  .typeString("TAMAGOTCHI")
  .pauseFor(1000)
  .start();

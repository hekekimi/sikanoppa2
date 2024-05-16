
//import { playTurn } from "./pelilogiikka.js";
import { handleWinning } from "./handlewin.js";
import { rollTwoDice } from "./dices.js";
let pelaajat = [];//pelaajat
let nykyinenPelaajaIndex = 0;//nykyinen pelaaja

// elementit
const aloita_peli = document.getElementById("aloita");
const pelaa_vuoro = document.getElementById("pelaa");
const lisaa = document.getElementById("lisaa");
const ilmoitus = document.getElementById("ilmoitukset");
const lopeta_vuoro = document.getElementById("lopeta");
const nykyisetPisteet = document.getElementById("yhteensa");
const pisteraja = document.getElementById("pisteraja");

// tapahtumakuuntelijat
aloita_peli.addEventListener("click", () => startGame());
pelaa_vuoro.addEventListener("click", () => playTurn());
lopeta_vuoro.addEventListener("click", () => switchTurn());
lisaa.addEventListener("click", () => addPlayer());

// tilan asetukset
aloita_peli.disabled = true;
pelaa_vuoro.style.visibility = "hidden";
pelaa_vuoro.disabled = true;
lopeta_vuoro.disabled = true;
lopeta_vuoro.style.visibility = "hidden";

// lisää pelaajat
function addPlayer() {
    const pelaajaInput = document.getElementById("pelaaja");
    const pelaajanNimi = pelaajaInput.value.trim();
    if (pelaajanNimi && pelaajat.length < 4) {
        pelaajat.push({ nimi: pelaajanNimi, pisteet: 0, tuplat: 0 });
        pelaajaInput.value = "";
        alert("Pelaaja lisätty: " + pelaajanNimi);
    } else {
        alert("Max 4 pelaajaa tai nimi puuttuu!");
    }
    if (pelaajat.length >= 2) {
        aloita_peli.disabled = false;
    }
}

// peli alkaa
function startGame() {
    if (pelaajat.length < 2) {
        window.alert("Ei tarpeeksi pelaajia");
    } else {
        clearTextFields();
        pelaa_vuoro.disabled = false;
        pelaa_vuoro.style.visibility = "visible";
        lopeta_vuoro.style.visibility = "visible";
        playTurn();
    }
}

// poista tekstikentät ym  pelin alkaessa
function clearTextFields() {
    let tekstikentatDiv = document.getElementById("tekstikentat");
    while (tekstikentatDiv.firstChild) {
        tekstikentatDiv.removeChild(tekstikentatDiv.firstChild);
    }
}

// vuoron vaihto napilla
function switchTurn() {
    pelaajat[nykyinenPelaajaIndex].tuplat = 0;
    ilmoitus.style.color = "green";
    ilmoitus.innerHTML = `Vuoro vaihtuu, säilytät ${pelaajat[nykyinenPelaajaIndex].pisteet} pistettä!`;
    nykyinenPelaajaIndex = (nykyinenPelaajaIndex + 1) % pelaajat.length;
    lopeta_vuoro.disabled = true;
    pelaa_vuoro.innerHTML = `Pelaa (${pelaajat[nykyinenPelaajaIndex].nimi})`;
    
    
}

//pelaa vuoro
function playTurn() {
    console.log( pelaajat[nykyinenPelaajaIndex].tuplat);
    pelaa_vuoro.innerHTML = `Pelaa (${pelaajat[nykyinenPelaajaIndex].nimi})`;
    lopeta_vuoro.disabled = false;
    ilmoitus.innerHTML = "";
    const { heitto1, heitto2 } = rollTwoDice();
    const summa = heitto1 + heitto2;

    const diceImage1 = "assets/dice" + heitto1 + ".png";
    const diceImage2 = "assets/dice" + heitto2 + ".png";
    document.querySelectorAll("img")[0].setAttribute("src", diceImage1);
    document.querySelectorAll("img")[1].setAttribute("src", diceImage2);

    const results = document.querySelector("h1");
    results.innerHTML = "Heittokierroksen tulokset: ";
    const currentResult = document.createElement("p");
    currentResult.innerHTML = `${pelaajat[nykyinenPelaajaIndex].nimi} heitti ${heitto1} ja ${heitto2}`;
    results.appendChild(currentResult);

    if (heitto1 === 1 && heitto2 === 1) {
        pelaajat[nykyinenPelaajaIndex].tuplat++;
        if (pelaajat[nykyinenPelaajaIndex].tuplat == 3) {
            ilmoitus.style.color = "crimson";
            ilmoitus.innerHTML = "Heitit kolme kertaa peräkkäin tuplat, vuoro päättyy ja pisteet nollaantuvat!";
            pelaajat[nykyinenPelaajaIndex].pisteet = 0;
            pelaajat[nykyinenPelaajaIndex].tuplat = 0;
            nextTurn();
        } else {
            pelaajat[nykyinenPelaajaIndex].pisteet += 25;
            nykyisetPisteet.innerHTML = `Sait tuplaykköset ja 25 pistettä! Pistemääräsi on ${pelaajat[nykyinenPelaajaIndex].pisteet} pistettä`;
            handleWinning(pelaajat, nykyinenPelaajaIndex, pisteraja);
        }
    } else if (heitto1 === heitto2) {
        pelaajat[nykyinenPelaajaIndex].tuplat++;
        if (pelaajat[nykyinenPelaajaIndex].tuplat == 3) {
            ilmoitus.style.color = "crimson";
            ilmoitus.innerHTML = "Heitit kolme kertaa peräkkäin tuplat, vuoro päättyy ja pisteet nollaantuvat!";
            pelaajat[nykyinenPelaajaIndex].pisteet = 0;
            pelaajat[nykyinenPelaajaIndex].tuplat = 0;
            nextTurn();
        } else {
            pelaajat[nykyinenPelaajaIndex].pisteet += summa * 2;
            nykyisetPisteet.innerHTML = `Sait tuplapisteet eli ${summa * 2}! Pistemääräsi on ${pelaajat[nykyinenPelaajaIndex].pisteet} pistettä`;
            handleWinning(pelaajat, nykyinenPelaajaIndex, pisteraja);
        }
    } else if (heitto1 === 1 || heitto2 === 1) {
        pelaajat[nykyinenPelaajaIndex].tuplat = 0;
        ilmoitus.style.color = "crimson";
        ilmoitus.innerHTML = "Nopan silmäluku oli 1, vuoro päättyy ja pisteet nollaantuvat!";
        pelaajat[nykyinenPelaajaIndex].pisteet = 0;
        nextTurn();
    } else {
        pelaajat[nykyinenPelaajaIndex].tuplat = 0;
        pelaajat[nykyinenPelaajaIndex].pisteet += summa;
        nykyisetPisteet.innerHTML = `Pistemääräsi on ${pelaajat[nykyinenPelaajaIndex].pisteet} pistettä`;
        handleWinning(pelaajat, nykyinenPelaajaIndex, pisteraja);
    }

    

    function nextTurn() {
        nykyisetPisteet.innerHTML = `Pistemääräsi on ${pelaajat[nykyinenPelaajaIndex].pisteet} pistettä`;
        nykyinenPelaajaIndex = (nykyinenPelaajaIndex + 1) % pelaajat.length;
        lopeta_vuoro.disabled = true;
        pelaa_vuoro.innerHTML = `Pelaa (${pelaajat[nykyinenPelaajaIndex].nimi})`;
    }
}


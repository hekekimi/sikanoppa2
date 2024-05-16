
export function showResults(pelaajat) {
    // poista tuloslista, jos sellainen löytyy
    const vanha_tuloslista = document.getElementById("tuloslista");
    if (vanha_tuloslista) {
        vanha_tuloslista.remove();
    }

    // uusi lista tuloksia varten
    let tuloslista = document.createElement("ol");
    tuloslista.setAttribute("id", "tuloslista");

    // lajittele pelaajat 
    const lajitellutPelaajat = [...pelaajat];
    lajitellutPelaajat.sort((a, b) => b.pisteet - a.pisteet);

    // luo lista pelaajille
    for (let i = 0; i < lajitellutPelaajat.length; i++) {
        const pelaaja = lajitellutPelaajat[i];
        let pelaajanTulos = document.createElement("li");
        pelaajanTulos.textContent = `${pelaaja.nimi}: ${pelaaja.pisteet} pistettä`;
        tuloslista.appendChild(pelaajanTulos);
    }

    
    document.body.appendChild(tuloslista);
}

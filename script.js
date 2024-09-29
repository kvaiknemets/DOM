// Võtab need asjad HTML'i failist:
const ülesandeInput = document.getElementById('ülesande-input');
const lisaÜlesanneNupp = document.getElementById('lisa-ülesanne-nupp');
const ülesandeList = document.getElementById('ülesande-list');
const sorteeriNupp = document.getElementById('sorteeri-nupp');
const filtreeriKõikNupp = document.getElementById('filtreeri-kõik');
const filtreeriTäitmataNupp = document.getElementById('filtreeri-täitmata');
const filtreeriTäidetudNupp = document.getElementById('filtreeri-täidetud');

// Funksioon, et lisada ülesanne loendisse HTML'is:
function lisaÜlesanne() {
    // Võtab sisestatud ülesande teksti
    const ülesandeTekst = ülesandeInput.value;

    // Kontrollib, et ülesanne ei oleks tühi
    if (ülesandeTekst.trim() !== "") {

        // Loob uue listi elemendi
        const uusÜlesanne = document.createElement('li');
        uusÜlesanne.classList.add('täitmata'); // Lisab klassi 'täitmata'

        // Loob märkeruudu
        const märkeruut = document.createElement('input');
        märkeruut.type = 'checkbox';
        märkeruut.style.marginRight = '10px';
        märkeruut.addEventListener('change', function () {
            if (märkeruut.checked) {
                ülesandeSpan.style.textDecoration = 'line-through'; // Läbikriipsutus
                uusÜlesanne.classList.remove('täitmata');
                uusÜlesanne.classList.add('täidetud'); // Märgib ülesande täidetuks
            } else {
                ülesandeSpan.style.textDecoration = 'none'; // Eemaldab läbikriipsutuse
                uusÜlesanne.classList.remove('täidetud');
                uusÜlesanne.classList.add('täitmata'); // Ülesanne on täitmata
            }
        });
        uusÜlesanne.appendChild(märkeruut);

        // Span hoiab ülesande teksti
        const ülesandeSpan = document.createElement('span');
        ülesandeSpan.textContent = ülesandeTekst;
        uusÜlesanne.appendChild(ülesandeSpan);

        // Loob tekstivälja teksti muutmise jaoks
        const muudaInput = document.createElement('input');
        muudaInput.type = 'text';
        muudaInput.value = ülesandeSpan.textContent;
        muudaInput.style.display = 'none'
        uusÜlesanne.appendChild(muudaInput);

        // Muutmise nupp
        const muudaNupp = document.createElement('button');
        muudaNupp.textContent = 'Muuda';
        muudaNupp.style.marginLeft = "10px";
        muudaNupp.addEventListener('click', function () {
            muudaÜlesanne(ülesandeSpan, muudaNupp, muudaInput, salvestaNupp);
        });
        uusÜlesanne.appendChild(muudaNupp);

        // Salvesta nupp
        const salvestaNupp = document.createElement('button')
        salvestaNupp.textContent = 'Salvesta'
        salvestaNupp.style.marginLeft = '10px'
        salvestaNupp.style.display = 'none'
        salvestaNupp.addEventListener('click', function () {
            salvestaMuudatus(ülesandeSpan, muudaInput, salvestaNupp, muudaNupp) // Need parameetrid peab siia lisama, et selle funksioonil oleks ligipääs sellele infole
        })
        uusÜlesanne.appendChild(salvestaNupp);

        // Kustutamise nupp
        const kustutaNupp = document.createElement('button');
        kustutaNupp.textContent = 'Kustuta';
        kustutaNupp.style.marginLeft = "10px";
        kustutaNupp.addEventListener('click', function () {
            ülesandeList.removeChild(uusÜlesanne);
        });
        uusÜlesanne.appendChild(kustutaNupp);

        // Lisab ülesande loendisse
        ülesandeList.appendChild(uusÜlesanne);

        // Tühjendab sisestusvälja
        ülesandeInput.value = "";
    }
}

// Funktsioon ülesande muutmiseks
function muudaÜlesanne(ülesandeSpan, muudaNupp, muudaInput, salvestaNupp) {
    // Asendab olemasoleva ülesande teksti tekstiväljaga
    ülesandeSpan.style.display = 'none';  // Peidab vana teksti
    muudaInput.style.display = 'inline' // Teeb nähtavaks tekstivälja
    muudaNupp.style.display = 'none' // Peidab "muuda" nupu
    salvestaNupp.style.display = 'inline' // Teeb "salvesta" nupu nähtavaks
}

// Funktsioon ülesande salvestamiseks
function salvestaMuudatus(ülesandeSpan, muudaInput, salvestaNupp, muudaNupp) {
    const uusTekst = muudaInput.value.trim(); // Trim eemaldab tühikud teksti ees ja taga
    if (uusTekst !== "") {
        ülesandeSpan.textContent = uusTekst; // Kui sisestusväli pole tühi, uuendab ülesande teksti
    }

    // Puhastab vaate eemaldades sisestusvälja ja näidates uuesti ülesande teksti
    muudaInput.style.display = 'none'  // Peidab muutmise tekstivälja
    ülesandeSpan.style.display = 'inline'; // Teeb nähtavaks ülesande teksti
    salvestaNupp.style.display = 'none' // Peidab salvesta nupu
    muudaNupp.style.display = 'inline' // Teeb nähtavaks muuda nupu
}

// Funktsioon ülesannete sorteerimiseks
function sorteeriÜlesanded() {
    // Võtab kõik loendis olevad ülesanded
    const ülesanded = Array.from(ülesandeList.getElementsByTagName('li'));

    // Sorteerib ülesanded täitmata-täidetud järjekorras (kui checkbox on märgitud, on ülesanne täidetud)
    ülesanded.sort(function (a, b) {
        const aTäidetud = a.querySelector('input[type="checkbox"]').checked;
        const bTäidetud = b.querySelector('input[type="checkbox"]').checked;
        return aTäidetud - bTäidetud; // Täitmata (false) tuleb enne täidetud (true)
    });

    // Tühjendab ülesannete loendi ja lisab uuesti sorditud ülesanded
    ülesandeList.innerHTML = '';
    ülesanded.forEach(function (ülesanne) {
        ülesandeList.appendChild(ülesanne);
    });
}

// Funktsioon ülesannete filtreerimiseks
function filtreeriÜlesanded(filtriTüüp) {
    const ülesanded = Array.from(ülesandeList.getElementsByTagName('li'));

    ülesanded.forEach(function (ülesanne) {
        switch (filtriTüüp) {
            case 'kõik':
                ülesanne.style.display = 'list-item'; // Näitab kõiki
                break;
            case 'täitmata':
                if (ülesanne.classList.contains('täitmata')) {
                    ülesanne.style.display = 'list-item'; // Näitab ainult täitmata
                } else {
                    ülesanne.style.display = 'none'; // Peidab täidetud
                }
                break;
            case 'täidetud':
                if (ülesanne.classList.contains('täidetud')) {
                    ülesanne.style.display = 'list-item'; // Näitab ainult täidetud
                } else {
                    ülesanne.style.display = 'none'; // Peidab täitmata
                }
                break;
        }
    });
}
// Paneb nupu tööle ehk lisab nupule vajutamise sündmuse kuulaja (see nupp mis on HTML failis)
lisaÜlesanneNupp.addEventListener('click', lisaÜlesanne); // Ülesande lisamine
sorteeriNupp.addEventListener('click', sorteeriÜlesanded); // Sorteerimine
filtreeriKõikNupp.addEventListener('click', function () { filtreeriÜlesanded('kõik'); });
filtreeriTäitmataNupp.addEventListener('click', function () { filtreeriÜlesanded('täitmata'); });
filtreeriTäidetudNupp.addEventListener('click', function () { filtreeriÜlesanded('täidetud'); });

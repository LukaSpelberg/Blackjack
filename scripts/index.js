const deck = ['harten2', 'harten3', 'harten4', 'harten5', 'harten6', 'harten7', 'harten8', 'harten9', 'harten10', 'hartenJ', 'hartenQ', 'hartenK', 'hartenA',
    'ruiten2', 'ruiten3', 'ruiten4', 'ruiten5', 'ruiten6', 'ruiten7', 'ruiten8', 'ruiten9', 'ruiten10', 'ruitenJ', 'ruitenQ', 'ruitenK', 'ruitenA',
    'schoppen2', 'schoppen3', 'schoppen4', 'schoppen5', 'schoppen6', 'schoppen7', 'schoppen8', 'schoppen9', 'schoppen10', 'schoppenJ', 'schoppenQ', 'schoppenK', 'schoppenA',
    'klaver2', 'klaver3', 'klaver4', 'klaver5', 'klaver6', 'klaver7', 'klaver8', 'klaver9', 'klaver10', 'klaverJ', 'klaverQ', 'klaverK', 'klaverA']


let spelerKaarten = []
let dealerKaarten = []
let deckNummer = 0
let hitButton = document.querySelector('#hitKnop')
let standButton = document.querySelector('#standKnop')
let winAudioElement = document.querySelector('#winAudio')
let verliesAduioElement = document.querySelector('#verliesAudio')
let popUpEindeElement = document.querySelector('#popUp')



//https://dev.to/areeburrub/randomly-sort-array-in-one-just-line-2oab//
const gehusseldDeck = deck
deck.sort(() => 0.5 - Math.random())

function deelKaarten() {
    const kaart = deck[deckNummer]
    deckNummer = deckNummer + 1
    return kaart 
}

// https://chatgpt.com/share/80c1bbc7-dfd8-48e6-809d-7743d9f3885a de hele waarde functie is door chat gpt. //
function handWaarde(hand, speler) {
    let waarde = 0;
    let aas = 0;

    for (let card of hand) {
        let kaartWaarde = card.slice(-1);

        if (kaartWaarde == "A") {
            waarde += 11;
            aas += 1;
        } else if (kaartWaarde == "K" || kaartWaarde === "Q" || kaartWaarde === "J") {
            waarde += 10;
        } else {
            waarde += parseInt(kaartWaarde);
        }
    }

    while (waarde > 21 && aas > 0) {
        waarde -= 10;
        aas -= 1;
    }

    if (speler === 'speler') {
        document.querySelector("#spelerWaardeVak").textContent = 'Speler Hand waarde: ' + waarde;
    } else if (speler === 'dealer') {
        document.querySelector("#dealerWaardeVak").textContent = 'Dealer Hand waarde: ' + waarde;
    }

    return waarde;
}



//research naar push functie via https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push //
function startGame() {
    spelerKaarten.push(deelKaarten())
    spelerKaarten.push(deelKaarten())
    dealerKaarten.push(deelKaarten())

    document.querySelector("#spelerHand").textContent = 'spelerhand: ' + spelerKaarten;
    document.querySelector("#dealerHand").textContent = 'dealerhand: ' + dealerKaarten;

    handWaarde(spelerKaarten, 'speler')
    handWaarde(dealerKaarten, 'dealer')
}

startGame()


function hit() {
    spelerKaarten.push(deelKaarten())
    document.querySelector("#spelerHand").textContent = 'spelerhand: ' + spelerKaarten
    handWaarde(spelerKaarten, 'speler')

    if (handWaarde(spelerKaarten, 'speler') >= 22) {
        eindegame()
    }

}

function stand() {
    while (handWaarde(dealerKaarten, 'dealer') < 16) {
        dealerKaarten.push(deelKaarten())
    }
    eindegame()
}

function eindegame() {

    const spelerWaarde = handWaarde(spelerKaarten, 'speler')
    const dealerWaarde = handWaarde(dealerKaarten, 'dealer')
    let eindeSpelUitslag = ''


    if (spelerWaarde > 21 && dealerWaarde > 21) {
        eindeSpelUitslag = "beide spelers zijn bust"
        verliesAduioElement.play()
    } else if (spelerWaarde === dealerWaarde) {
        eindeSpelUitslag = "Het is gelijkspel"
        verliesAduioElement.play()
    } else if (spelerWaarde > 21) {
        eindeSpelUitslag = "De speler verliest"
        verliesAduioElement.play()
    } else if (dealerWaarde > 21) {
        eindeSpelUitslag = "De speler wint!!"
        winAudioElement.play()
    } else if (spelerWaarde > dealerWaarde) {
        eindeSpelUitslag = "De speler wint!"
        winAudioElement.play()
    } else if (dealerWaarde > spelerWaarde) {
        eindeSpelUitslag = "De Dealer wint"
        verliesAduioElement.play()
    }


        document.querySelector('#eindeSpel').textContent = eindeSpelUitslag
        //De pop up is met de hulp van Vincent gedaan.//
        popUpEindeElement.style.display = "flex"
        document.querySelector('#eindScore').textContent = 'De waarde van je hand was ' + handWaarde(spelerKaarten, 'speler')

       
    }

   
   
    



standButton.addEventListener("click", stand)
hitButton.addEventListener("click", hit)





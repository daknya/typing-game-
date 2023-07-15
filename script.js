const RANDOM_QOUTE_API_URL = 'http://api.quotable.io/random'

const quoteDisplayELe = document.getElementById('quoteDisplay');
const quoteInputELement = document.getElementById('quoteInput')
const timerELement = document.getElementById('timer')

quoteInputELement.addEventListener('input', () => {

    let check = true;
    const arrayQuote = quoteDisplayELe.querySelectorAll('span');
    const arrayValue = quoteInputELement.value.split('')
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            check = false;
        }
        else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');

        }
        else {
            characterSpan.classList.add('incorrect');
            characterSpan.classList.remove('correct');
            check = false;
        }
    })
    if (check) renderNewQoute();

})


function getRandomQuote() {
    return fetch(RANDOM_QOUTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNewQoute() {
    const quote = await getRandomQuote()
    quoteDisplayELe.innerText = '';
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character;
        quoteDisplayELe.appendChild(characterSpan)
    });
    quoteInputELement.value = null;
    // startTimer();
}

let startTime;
function startTimer() {
    timerELement.innerText = 0
    startTime = new Date();
    setInterval(() => {
        timer.innerText = setTimerTime()
    }, 1000)
}

function setTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
}
renderNewQoute();

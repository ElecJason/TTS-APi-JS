let inputForm = document.querySelector('form');
let inputTxt = document.querySelector('.txt');
let arrayTxt = document.querySelector('.txt');
let voiceSelect = document.querySelector('select');
let pitch = document.querySelector('#pitch');
let pitchValue = document.querySelector('.pitch-value');
let rate = document.querySelector('#rate');
let rateValue = document.querySelector('.rate-value');
let play = document.querySelector('#play');
let play2 = document.querySelector('#play2');
let pause = document.querySelector('#pause');
let resume = document.querySelector('#resume');

const textArray = ['to do or not to do', 'that is the question'];

let synth = window.speechSynthesis; // init speech synthesizer
let voices = []; // array vande voices beschikbaar in de browser

inputForm.onsubmit = function(event) {
    event.preventDefault();
    sayTheWord(inputTxt.value);
}
play.addEventListener('click', () => {sayTheWord(inputTxt.value);});
play2.addEventListener('click', () => {sayTheWord(textArray.join());});
pause.addEventListener('click', () => {synth.pause();});
resume.addEventListener('click', () => {synth.resume();});

function populateVoiceList() {
    voices = synth.getVoices();
    for(i = 0; i < voices.length ; i++) {
        let option = document.createElement('option');
        option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        voiceSelect.appendChild(option);
    }
    }
populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

function sayTheWord(theseWords){
    synth.cancel(); // reset de speech synthesizer
    let magicWords = new SpeechSynthesisUtterance(theseWords);
    let selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for(i = 0; i < voices.length ; i++) {
        if(voices[1].name === selectedOption) {
        magicWords.voice = voices[1];
        }
    }

    magicWords.pitch = pitch.value;
    magicWords.rate = rate.value;
    synth.speak(magicWords);
}
pitch.onchange = function() {
        pitchValue.textContent = pitch.value;
        }

rate.onchange = function() {
    rateValue.textContent = rate.value;
    }

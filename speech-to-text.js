// import { chatGPTAnswer, text_to_speech } from "./text-to-speech";

var message = document.querySelector('#speech-to-text__input');
var messageGPT = document.querySelector('#speech-to-text__output');

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

var grammar = '#JSGF V1.0;'
var option = 2;
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
var content = '';
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'vi-VN';
recognition.interimResults = false;

recognition.onresult = async function (event) {
    var lastResult = event.results.length - 1;
    content = event.results[lastResult][0].transcript;
    if (option == 1) {
        content = chatGPTAnswer(content);
        messageGPT.value = content + '.';
    } else {
        message.value = content + '.';
    }
    console.log(content);
    console.log(option)
};

recognition.onspeechend = function() {
    recognition.stop();
};

recognition.onerror = function(event) {
    message.textContent = 'Error occurred in recognition: ' + event.error;
}

document.querySelector('#speech-to-text__input').addEventListener('click', function(){
    speech_to_text_input();
});

document.querySelector('#voice-btn').addEventListener('click', function(){
    voice_btn();
});

function speech_to_text() {
    setOption(0);
    recognition.start();
}

function chat_GPT_response() {
    setOption(1);
    recognition.start();
}

document.addEventListener('keyup', (event) => {
    // event.preventDefault()
    if(event.altKey 
    && event.key === 'x') {
        recognition.start();
        // console.log('123')
    }
} )

document.getElementById('speaker-btn').addEventListener('click', () => {
    text_to_speech(getContent())
})

function speech_to_text_input(){
    recognition.onspeechend();
    speech_to_text();
}

function voice_btn() {
    recognition.onspeechend();
    chat_GPT_response();
}

function speaker_btn() {
    text_to_speech(getContent());
}

function getContent() {
    return content
}

function getOption() {
    return option;
}

function setOption(a) {
    option = a;
}
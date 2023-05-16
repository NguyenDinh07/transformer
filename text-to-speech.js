// var msg = new SpeechSynthesisUtterance();
// var voices = window.speechSynthesis.getVoices();
// msg.voice = voices[10]; // Note: some voices don't support altering params
// msg.voiceURI = 'native';
// msg.volume = 1; // 0 to 1
// msg.rate = 1; // 0.1 to 10
// msg.pitch = 2; //0 to 2
// msg.text = 'Hello World';
// msg.lang = 'en-US';

// msg.onend = function(e) {
//     console.log('Finished in ' + event.elapsedTime + ' seconds.');
// };

// speechSynthesis.speak(msg);

const xSpeech = {};

// Capture a Web Speech Synthesis Instance
xSpeech.synth = window.speechSynthesis || null;

xSpeech.selectMenu = document.querySelector('#selectVoice');

// Voices available
xSpeech.voices = [];

xSpeech.populateVoiceList = function () {
    // fetch voices
    xSpeech.voices = xSpeech.synth.getVoices();
    // loop through while creating an Option Element for the Select Element
    for(let i = 0; i < xSpeech.voices.length ; i++) {
        // create Option Element
        let option = document.createElement('option');
        // The name and language of the Voice
        option.textContent = xSpeech.voices[i].name + ' (' + xSpeech.voices[i].lang + ')';
        // Check if the current language is Default
        if(xSpeech.voices[i].default) {
            option.textContent += ' -- DEFAULT';
        }
        // Create attributes to store a Voice's specs
        option.setAttribute('data-lang', xSpeech.voices[i].lang);
        option.setAttribute('data-name', xSpeech.voices[i].name);
        // Add it to the Select Menu
        xSpeech.selectMenu.appendChild(option);
    }
};

document.getElementById('speaker').addEventListener('click', () => {
    text_to_speech_input();
})

document.addEventListener('keyup', (event) => {
    event.preventDefault();
    if(event.ctrlKey && event.key === ' ') {
        text_to_speech_input();
    }
});

const API_KEY = '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';

document.getElementById('speaker2').addEventListener('click', async (e) => {
    e.preventDefault();
    text_to_speech_input2();
})

function selectedVoice() {
    let num = 0;
    let selectedOption = xSpeech.selectMenu.selectedOptions[0].getAttribute('data-name');
    // Loop through searching for the selected Language
    for(let i = 0; i < xSpeech.voices.length ; i++) {
      if(xSpeech.voices[i].name === selectedOption) {
        num = i;
        break;
      }
    }
    return num;
}

function text_to_speech(msg) {
    speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(msg)
    utterance.voice = xSpeech.voices[selectedVoice()];
    speechSynthesis.speak(utterance)
}

async function chatGPTAnswer (msg) {
    if (msg) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: msg }],
                    temperature: 1.0,
                    top_p: 0.7,
                    n: 1,
                    stream: false,
                    presence_penalty: 0,
                    frequency_penalty: 0,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                msg = data.choices[0].message.content;
            } else {
                msg = 'Error: Unable to process your request.';
            }
        } catch (error) {
            console.error(error);
            msg = 'Error: Unable to process your request.';
        }
    }
    return msg;
}

function text_to_speech_input(){
    var msg = document.getElementById('text-to-speech__input').value.trim();
    text_to_speech(msg);
}

function text_to_speech_input2(){
    var msg = document.getElementById('text-to-speech__input2').value.trim();
    msg = chatGPTAnswer(msg);
    text_to_speech(msg);
}
var message = document.querySelector('#speech-to-text__input');
var messageGPT = document.querySelector('#speech-to-text__output');

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

var grammar = '#JSGF V1.0;'
var option = 0;
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
        if (content) {
            try {
                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${API_KEY}`,
                    },
                    body: JSON.stringify({
                        model: 'gpt-3.5-turbo',
                        messages: [{ role: 'user', content: content }],
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
                    content = data.choices[0].message.content;
                } else {
                    content = 'Error: Unable to process your request.';
                }
            } catch (error) {
                console.error(error);
                content = 'Error: Unable to process your request.';
            }
        }
        messageGPT.value = content + '.';
    } else {
        message.value = content + '.';
    }
    console.log(content);
};

recognition.onspeechend = function() {
    recognition.stop();
};

recognition.onerror = function(event) {
    message.textContent = 'Error occurred in recognition: ' + event.error;
}

document.querySelector('#speech-to-text__input').addEventListener('click', function(){
    option = 0;
    recognition.start();
});

document.querySelector('#voice-btn').addEventListener('click', function(){
    option = 1;
    recognition.start();
});

document.addEventListener('keyup', (event) => {
    // event.preventDefault()
    if(event.altKey 
    && event.key === 'x') {
        recognition.start();
        // console.log('123')
    }
} )

document.getElementById('speaker-btn').addEventListener('click', () => {
    const utterance = new SpeechSynthesisUtterance(content)
    console.log(xSpeech.voices = xSpeech.synth.getVoices())
    utterance.voice = xSpeech.voices[3];
    speechSynthesis.speak(utterance)
})
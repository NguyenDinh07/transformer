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

// Voices available
xSpeech.voices = [];
document.getElementById('speaker').addEventListener('click', () => {
    var msg = document.getElementById('text-to-speech__input').value.trim();
    console.log(xSpeech.voices = xSpeech.synth.getVoices())
    const utterance = new SpeechSynthesisUtterance(msg)
    utterance.voice = xSpeech.voices[3];
    speechSynthesis.speak(utterance)
})

document.addEventListener('keyup', (event) => {
    // if (document.activeElement.id === 'text-to-speech__input') {
    //     return
    // }
    event.preventDefault();
    if(event.ctrlKey && event.key === ' ') {
        var msg = document.getElementById('text-to-speech__input').value
        const utterance = new SpeechSynthesisUtterance(msg)
        utterance.voice = xSpeech.voices[3];
        speechSynthesis.speak(utterance)
    }
});


const API_KEY = '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';

document.getElementById('speaker2').addEventListener('click', async (e) => {
    e.preventDefault();
    console.log(xSpeech.voices = xSpeech.synth.getVoices())
    var msg = document.getElementById('text-to-speech__input2').value.trim();
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
    const utterance = new SpeechSynthesisUtterance(msg)
    utterance.voice = xSpeech.voices[3];
    speechSynthesis.speak(utterance)
})

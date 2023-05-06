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

document.getElementById('speaker').addEventListener('click', () => {
    var msg = document.getElementById('text-to-speech__input').value
    const utterance = new SpeechSynthesisUtterance(msg)
    utterance.rate = 1
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
        utterance.rate = 1
        speechSynthesis.speak(utterance)
    }
});


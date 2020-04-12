/** 
 * Play audio when proper key input is entered
 * Add visual effects on related html element 
 */
function playAudio(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);

    // console.log(audio);
    // console.log(key);

    if (!audio) return;     // ignore when audio doesn't exist (= inappropriate key input)
    audio.playTime = 0;     // rewind the audio so that it can be duplicated
    audio.play();
    
    key.classList.add('playing');
}

window.addEventListener('keydown', playAudio);
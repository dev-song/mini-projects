// Get elements
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');

// Build out functions
function togglePlay() {
    video.paused ? video.play() : video.pause();
}

function updateButton() {
    toggle.textContent = this.paused ? '▶' : '❚ ❚';
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Hook up event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(btn => btn.addEventListener('click', skip));

ranges.forEach(rng => rng.addEventListener('change', handleRangeUpdate));
ranges.forEach(rng => rng.addEventListener('mousemove', handleRangeUpdate));

let clicking = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => clicking = true);
progress.addEventListener('mouseup', () => clicking = false);
progress.addEventListener('mousemove', (e) => clicking && scrub(e));
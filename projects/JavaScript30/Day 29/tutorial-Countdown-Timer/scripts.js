let countdown;
const timerTimeLeft = document.querySelector('.display__time-left')

function timer(seconds) {
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }

        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const timeText = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    
    timerTimeLeft.textContent = timeText;
    document.title = timeText;
}
let countdown;
const timerTimeLeft = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')

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

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const mins = end.getMinutes();
    endTime.textContent = `Be back at ${adjustedHour}:${mins < 10 ? '0' : ''}${mins}`;
}
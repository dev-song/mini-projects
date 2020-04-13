const secondHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate() {
    const now = new Date();
    const second = now.getSeconds();
    const secondDegree = ((second / 60) * 360) + 90;    // 90 is default
    const min = now.getMinutes();
    const minDegree = ((min / 60) * 360) + 90;
    const hour = now.getHours();
    const hourDegree = ((hour / 12) * 360) + 90;

    secondHand.style.transition = second === 0 ? "none" : "all 0.05s cubic-bezier(0.1, 3, 0.6, 1)";
    minHand.style.transition = min === 0 ? "none" : "all 0.05s cubic-bezier(0.1, 3, 0.6, 1)";
    hourHand.style.transition = hour === 0 ? "none" : "all 0.05s cubic-bezier(0.1, 3, 0.6, 1)";

    secondHand.style.transform = `rotate(${secondDegree}deg)`;
    minHand.style.transform = `rotate(${minDegree}deg)`;
    hourHand.style.transform = `rotate(${hourDegree}deg)`;
    console.log(`Current time: ${hour}:${min}:${second}`);
    console.log(typeof(second));
}

function runClock() {
    setTimeout(() => {
        setDate();
        runClock();
    }, 1000);
}

runClock();
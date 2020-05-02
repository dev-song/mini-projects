// because of security reason*, app needs a server
    // * webcam can't be loaded without https or localhost

const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

// get video piped into the video element
function getVideo() {
    // getUserMedia() returns Promise
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {
            console.log(localMediaStream);
        });
}

getVideo();
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
            // localMediaStream should be in a form of URL to make video work
                // URL-form localMediaStream can be checked at video tag's src attribute
            video.src = window.URL.createObjectURL(localMediaStream);
            // without play(), only snapshots of the video are shown
            video.play();
        })
        .catch(err => {
            console.error(`Oh no!`, err);
        });
}

getVideo();
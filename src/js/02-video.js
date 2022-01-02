import Player from '@vimeo/player';
var throttle = require('lodash.throttle');

const LOCALSTORAGE_KEY = "videoplayer-current-time";

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
 
player.on('timeupdate', throttle(getTimeWatching, 1000));

function getTimeWatching(sec) {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(sec))
}

player.setCurrentTime(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)).seconds).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
})
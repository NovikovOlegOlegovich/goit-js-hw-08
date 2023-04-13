import player from '@vimeo/player';
import _throttle from 'lodash.throttle';

const timeVideoKey = 'videoplayer-current-time';

iframeEl = document.querySelector('iframe');

const player1 = new player(iframeEl);


player1.on('timeupdate', _throttle(onPlay, 1000));
setCurrentTime();


function onPlay(event) {
  localStorage.setItem(timeVideoKey, event.seconds);
}

function setCurrentTime() {
  if (!localStorage.getItem(key)) {
    return;
  }
  player1.setCurrentTime(localStorage.getItem(key));
}

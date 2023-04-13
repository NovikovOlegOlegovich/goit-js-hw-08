// const player = require('@vimeo/player');
import player from '@vimeo/player';

iframeEl = document.querySelector('iframe');

const player1 = new Vimeo.Player(iframe);

player1.on('play', onPlay);

function onPlay(event) {
  console.log(event.seconds);
}

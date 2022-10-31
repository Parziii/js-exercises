const record1 = document.querySelector(".trac-1-r");
const play1 = document.querySelector(".trac-1-p");

const record2 = document.querySelector(".trac-2-r");
const play2 = document.querySelector(".trac-2-p");

const record3 = document.querySelector(".trac-3-r");
const play3 = document.querySelector(".trac-3-p");

const record4 = document.querySelector(".trac-4-r");
const play4 = document.querySelector(".trac-4-p");

const KeyToSound = {
  a: new Audio("./sounds/boom.wav"),
  s: new Audio("./sounds/clap.wav"),
  d: new Audio("./sounds/hihat.wav"),
  f: new Audio("./sounds/kick.wav"),
  g: new Audio("./sounds/openhat.wav"),
  h: new Audio("./sounds/ride.wav"),
  j: new Audio("./sounds/snare.wav"),
  k: new Audio("./sounds/tink.wav"),
  l: new Audio("./sounds/tom.wav"),
  z: new Audio("./sounds/boom.wav"),
};

function playSound(sound) {
  sound.play();
}

const handleRecord = () => {
  const track = [];
  const timestamp = 10;
  let currentTime = 0;
  let isRecording = false;

  const interval = setInterval(
    () => (currentTime = currentTime + timestamp),
    timestamp
  );

  return {
    pushEvent: (event) => {
      isRecording &&
        track.push({
          currentTime,
          event,
        });
    },
    stop: () => {
      clearInterval(interval);
      isRecording = false;
      currentTime = 0;
    },
    play: () => {
      track.forEach((item) => {
        setTimeout(() => {
          playSound(KeyToSound[item.event.key]);
        }, item.currentTime);
      });
    },
    record: () => (isRecording = true),
  };
};

const handleTrack1 = handleRecord();
const handleTrack2 = handleRecord();
const handleTrack3 = handleRecord();
const handleTrack4 = handleRecord();

record1.onclick = (e) => handleTrack1.record();

play1.onclick = (e) => {
  handleTrack1.stop();
  handleTrack1.play();
};

record2.onclick = (e) => handleTrack2.record();

play2.onclick = (e) => {
  handleTrack2.stop();
  handleTrack2.play();
};

record3.onclick = (e) => handleTrack3.record();

play3.onclick = (e) => {
  handleTrack3.stop();
  handleTrack3.play();
};

record4.onclick = (e) => handleTrack4.record();

play4.onclick = (e) => {
  handleTrack4.stop();
  handleTrack4.play();
};

function onKeyPress(event) {
  const sound = KeyToSound[event.key];
  playSound(sound);
  handleTrack1.pushEvent(event);
  handleTrack2.pushEvent(event);
  handleTrack3.pushEvent(event);
  handleTrack4.pushEvent(event);
}

window.addEventListener("keydown", (event) => onKeyPress(event));

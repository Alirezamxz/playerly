// Elements
const player = document.querySelector('.player');

const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');

const progressBar = player.querySelector('.progress-watched');

const toggle = player.querySelector('.toggle');

const skipButtons = player.querySelectorAll('[data-skip]');

const ranges = player.querySelectorAll('.player-slider');


// Functions
function togglePLay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function rangeUpdate() {
    video[this.name] = this.value;
}

function progressUpdate() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function progressMove(e) {
    const moveTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = moveTime;
} 


// Event Listeners
video.addEventListener('click', togglePLay);

video.addEventListener('play', updateButton);

video.addEventListener('pause', updateButton);

video.addEventListener('timeupdate', progressUpdate);

toggle.addEventListener('click', togglePLay);

skipButtons.forEach(btn => btn.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', rangeUpdate));

ranges.forEach(range => range.addEventListener('mousemove', rangeUpdate));

let mouseDown = false;

progress.addEventListener('click', progressMove);

progress.addEventListener('mousemove', (e) => mousedown && progressMove(e));

progress.addEventListener('mousedown', () => mouseDown = true);

progress.addEventListener('mouseup', () => mouseDown = false);
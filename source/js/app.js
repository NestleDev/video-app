
const containerVideo = document.querySelector('.video');
const video = containerVideo.querySelector('video');
const playpause = containerVideo.querySelector('.video__playpause');
const play = containerVideo.querySelector('.video__play');
const controls = containerVideo.querySelector('.video__controls');
const total = containerVideo.querySelector('.video__total');
const progress = containerVideo.querySelector('.video__current');
const dynamic = containerVideo.querySelector('.video__volume-control');
const volume = containerVideo.querySelector('.video__volume-progress');
const volumeProgress = volume.firstElementChild;

playpause.addEventListener('click', togglePlay);
play.addEventListener('click', togglePlay);
video.addEventListener('play', playPause);
video.addEventListener('pause', playPause);
total.addEventListener('click', setCurrentTime);
video.addEventListener('timeupdate', timeUpdate);
dynamic.addEventListener('click', mute);
volume.addEventListener('click', setVolume);

function setVolume() {
    volumeProgress.style.width = `${e.offsetX}px`;
    console.log(e.offsetX / volume.clientWidth)
    video.volume = e.offsetX / volume.clientWidth;
}

function mute(e) {
    dynamic.classList.toggle('muted');
    console.log(video.muted)
    video.muted = !video.muted;
}

function playPause() {
    controls.classList.toggle('paused');
}

function togglePlay() {
    video.paused ?  video.play() : video.pause();
}

function setCurrentTime(event) {
    const offsetX = e.offsetX / total.clientWidth;
    console.log(offsetX * video.duration)
    video.currentTime = offsetX * video.duration;
}

function timeUpdate() {
    console.log('up')
    const progressTime = video.currentTime / video.duration;

    progress.style.width = `${progressTime * total.clientWidth}px`;
}

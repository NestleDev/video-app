module.exports = class {
    constructor(selector) {
        this.container = document.querySelector(selector);
        this.video = this.container.querySelector('video');
        this.playpause = this.container.querySelector(`${selector}__playpause`);
        this.play = this.container.querySelector(`${selector}__play`);
        this.controls = this.container.querySelector(`${selector}__controls`);
        this.total = this.container.querySelector(`${selector}__total`);
        this.progress = this.container.querySelector(`${selector}__current`);
        this.dynamic = this.container.querySelector(`${selector}__volume-control`);
        this.volume = this.container.querySelector(`${selector}__volume-progress`);
        this.volumeProgress = this.volume.firstElementChild;

        this.initEvents();
    }

    initEvents() {
        this.playpause.addEventListener('click', this.togglePlayback.bind(this));
        this.play.addEventListener('click', this.togglePlayback.bind(this));
        this.video.addEventListener("timeupdate", this.timeUpdate.bind(this));
        this.total.addEventListener('click', this.setCurrentTime.bind(this));
        this.video.addEventListener("play", this.playPause.bind(this));
        this.video.addEventListener("pause", this.playPause.bind(this));
        this.dynamic.addEventListener('click', this.muted.bind(this));
        this.volume.addEventListener('click', this.setVolume.bind(this));
    }

    playPause() {
        this.controls.classList.toggle("paused");
    }


    togglePlayback() {
        (this.video.paused) ? this.video.play() : this.video.pause();
    }

    timeUpdate() {
        const progress = Math.floor(this.video.currentTime) / Math.floor(this.video.duration);

        this.progress.style.width = `${Math.floor(progress * this.total.clientWidth)}px`;
    }

    setCurrentTime(e) {
        const x = e.offsetX / this.total.clientWidth;
        console.log(e.offsetX)
        this.video.currentTime = x * this.video.duration;
    }

    muted(e) {
        e.currentTarget.classList.toggle('muted')
        this.video.muted = !this.video.muted;
    }

    setVolume(e) {
        this.volumeProgress.style.width = `${e.offsetX}px`;
        this.video.volume = e.offsetX / e.currentTarget.clientWidth;
    }
}
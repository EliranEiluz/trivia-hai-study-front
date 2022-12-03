class Beep{
    constructor() {
        this.audio = new Audio('https://sounds-mp3.com/mp3/0012921.mp3');
        this.isBeepPlaying = false;
    }

    stop() {
        if (this.isBeepPlaying) {
            this.audio.pause();
            this.audio.currentTime = 0;
            this.isBeepPlaying = false;
        }
    }

    play() {
        this.audio.play();
        this.isBeepPlaying = true;
    }

    isPlaying() {
        return this.isBeepPlaying;
    }


    pause() {
        if (this.isBeepPlaying) {
            this.audio.pause();
            this.isBeepPlaying = false;
        }
    }
}

export {Beep}
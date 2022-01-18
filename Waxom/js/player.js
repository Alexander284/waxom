'use strict';

window.addEventListener('DOMContentLoaded', () => {
  class Player {
    constructor(selector) {
      this.player = document.querySelector(selector)
      this.video = this.player?.querySelector('video')

      if (!this.player || !this.video) {
        throw new Error('Player or video not found')
      }

      this.initVideoListeners()
      this.initPlayerListeners()
      this.initTimeLinerListener()
      this.initPageListeners()
    }
    
    
    initVideoListeners() {
      this.video.addEventListener('click', this.toggleVideo.bind(this))
      this.video.addEventListener('loadedmetadata', this.setVideoDuration.bind(this))
      this.video.addEventListener('timeupdate', this.setVideoDuration.bind(this))
    }

    initPlayerListeners() {
      this.player.querySelector('.j-toogle-video').addEventListener('click', this.toggleVideo.bind(this))
    }

    initTimeLinerListener() {
      const line = this.player.querySelector('.j-line')

      line.addEventListener('mousemove', this.calcGhostLine.bind(this))
      line.addEventListener('click', (event) => {
        const { left } = event.target.getBoundingClientRect()
        this.video.currentTime = this.calcNeededLine(event, left)
      })
    }

    initPageListeners() {
      document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
          event.preventDefault()
          this.toggleVideo()
        } else if (event.code === 'ArrowRight') {
          this.video.currentTime += 5
        } else if (event.code === 'ArrowLeft') {
          this.video.currentTime -= 5
        }
      })
    }

    toggleVideo() {
      this.isPlaying = !this.isPlaying

      const icon = this.player.querySelector('.j-toogle-video .far')

      // this.player.querySelector('.j-play').style.display = this.isPlaying ? 'block' : 'none'
      this.player.querySelector('.j-pause').style.display = !this.isPlaying ? 'block' : 'none'

      icon.classList.toggle('fa-play-circle', !this.isPlaying)
      icon.classList.toggle('fa-pause-circle', this.isPlaying)

      this.video[this.isPlaying ? 'play' : 'pause']()
    }

    fixNumber(number) {
      return number < 10 ? `0${number}` : `${number}`
    }

    formatTime(seconds) {
      return `${this.fixNumber(Math.floor(seconds / 60))}:${this.fixNumber(Math.floor(seconds % 60))}`

    }

    setVideoDuration() {
      const duration = +this.video.duration.toFixed()
      const current = +this.video.currentTime.toFixed()
      const newTime = `${this.formatTime(current)} / ${this.formatTime(duration)}`
      const pauseTime = `${this.formatTime(current)}`
      const durationElement = this.player.querySelector('.j-duration')
      const currentTimePause = this.player.querySelector('.j-pause-time')

      this.player.querySelector('.j-line-current').style.width = `${current / (duration / 100)}%`
      
      if (durationElement.innerHTML !== newTime) {
        durationElement.innerHTML = newTime
        currentTimePause.innerHTML = pauseTime
      }
    }

    calcNeededLine(event, left) {
      const needPercent = (event.clientX - left) / event.target.offsetWidth
      
      return this.video.duration * needPercent
    }

    calcGhostLine(event) {
      const { left } = event.target.getBoundingClientRect()
      const hint = this.player.querySelector('.j-hint')
      const ghost = this.player.querySelector('.j-line-ghost')

      hint.innerHTML = this.formatTime(this.calcNeededLine(event, left))
      hint.style.left = `${event.clientX - (left + (hint.offsetWidth / 2))}px`
      ghost.style.width = `${event.clientX - left}px`
    }
  }

  const player = new Player('.j-video')
})

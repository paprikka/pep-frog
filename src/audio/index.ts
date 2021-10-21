import track1 from './track_1.mp3'
import track2 from './track_2.mp3'
import track3 from './track_3.mp3'
import track4 from './track_4.mp3'
import track5 from './track_5.mp3'
import track6 from './track_6.mp3'

const tracks = [track1, track2, track3, track4, track5, track6]
const elements: HTMLAudioElement[] = []
export const Audio = {
    init() {
        tracks.forEach((t) => {
            const el = document.createElement('audio')
            el.preload = 'preload'
            el.style.display = 'none'
            el.src = t
            document.body.appendChild(el)

            elements.push(el)
        })
    },

    play() {
        const player = elements[Math.floor(elements.length * Math.random())]
        player.play()
    },
}

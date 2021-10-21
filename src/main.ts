import { getRandomBlessing } from './data'
import './main.css'
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

import { Audio } from './audio'

Audio.init()

$$<SVGFEDisplacementMapElement>('feDisplacementMap').forEach((node) =>
    node.setAttribute('scale', (+node.getAttribute('scale')! * 0.25).toString())
)
const textContainer = $<SVGTextElement>('.frog__blessing')!

const render = (phrase: string) => (textContainer.textContent = phrase)

const cta = $<HTMLButtonElement>('.cta')!
const renderNewBlessing = () => {
    const blessing = getRandomBlessing()
    window.location.hash = `#${btoa(encodeURIComponent(blessing))}`
    render(blessing)
}
cta.onclick = () => {
    Audio.play()
    renderNewBlessing()
}

const shareBtn = $<HTMLButtonElement>('.share')!

const wait = (time: number) => () =>
    new Promise((resolve) => setTimeout(resolve, time))

const toastEl = $<HTMLDivElement>('.toast')!

shareBtn.onclick = () => {
    Audio.play()
    const text = location.href
    const type = 'text/plain'
    const blob = new Blob([text], { type })
    const data = [new (ClipboardItem as any)({ [type]: blob })]

    navigator.clipboard.write(data).then(function () {
        Promise.resolve()
            .then(() => toastEl.classList.add('toast--visible'))
            .then(wait(2000))
            .then(() => toastEl.classList.remove('toast--visible'))
    })
}

new Promise<string>((resolve, reject) => {
    const maybeBlessing = decodeURIComponent(atob(location.hash.slice(1)))
    if (maybeBlessing) return resolve(maybeBlessing)

    reject()
})
    .then(render)
    .catch(renderNewBlessing)

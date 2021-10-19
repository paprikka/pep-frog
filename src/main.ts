import { dict } from './data'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

$$<SVGFEDisplacementMapElement>('feDisplacementMap').forEach((node) =>
    node.setAttribute('scale', (+node.getAttribute('scale')! * 0.25).toString())
)
const textContainer = $<SVGTextElement>('.frog__blessing')!
const { floor, random } = Math

const render = (phrase: string) => (textContainer.textContent = phrase)

const cta = $<HTMLButtonElement>('.cta')!

const getNewBlessing = () => {
    const indices = dict.map((phrases) => floor(phrases.length * random()))
    location.hash = `#${indices.join(',')}`
    render(indices.map((phraseInd, ind) => dict[ind][phraseInd]).join(' '))
}
cta.onclick = getNewBlessing

const shareBtn = $<HTMLButtonElement>('.share')!

const wait = (time: number) => () =>
    new Promise((resolve) => setTimeout(resolve, time))

const toastEl = $<HTMLDivElement>('.toast')!

shareBtn.onclick = () => {
    const text = location.href
    const type = 'text/plain'
    const blob = new Blob([text], { type })
    const data = [new (ClipboardItem as any)({ [type]: blob })]

    navigator.clipboard.write(data).then(function () {
        Promise.resolve()
            .then(() => toastEl.classList.add('toast--visible'))
            .then(wait(2000))
            .then(() => toastEl.classList.remove('toast--visible'))

        // window.alert('URL copied to clipboard!')
    })
}

new Promise<string>((resolve, reject) => {
    const maybeIndices = location.hash
        .slice(1)
        .split(',')
        .map((_) => parseInt(_, 10))
        .map((phraseInd, ind) => dict[ind][phraseInd])
        .filter(Boolean)

    if (maybeIndices.length !== 4) return reject()
    resolve(maybeIndices.join(' '))
})
    .then(render)
    .catch(getNewBlessing)

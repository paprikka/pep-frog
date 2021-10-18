import './style.css'

import { dict } from './data'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

$$<SVGFEDisplacementMapElement>('feDisplacementMap').forEach((node) =>
    node.setAttribute('scale', (+node.getAttribute('scale')! * 0.25).toString())
)
const textContainer = $<SVGTextElement>('.frog__blessing')!
const { floor, random } = Math

const pickRandomItem = (phrases: string[]): string =>
    phrases[floor(phrases.length * random())]

const render = () =>
    (textContainer.textContent = dict.map(pickRandomItem).join(' '))

const cta = $<HTMLButtonElement>('.cta')!

cta.onclick = render

render()

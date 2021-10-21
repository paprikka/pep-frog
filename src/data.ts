import * as Tracery from 'tracery-grammar'
import { collapse, Filter } from './collapse'

const rules = {
    termOfEndearment: [
        'Buddy',
        'Pal',
        'Girl',
        'Bestie',
        'Gal',
        'Soul Sister',
        'Sis',
        'Chica',
        'Missy',
        'Homegirl',
        'King',
        'Champ',
        'Bro',
        'Amigo',
        'Bubba',
        'Tank',
        'Tiny',
        'Sport',
        'Slim',
        'Chief',
        'Buck',
        'Coach',
        'Dude',
        'Buster',
        'Bud',
        'Boo',
        'Mouse',
        'Munchkin',
        'Bee',
        'Dolly',
        'Precious',
        'Bug',
        'Chipmunk',
        'Dottie',
        'Cutie Pie',
        'Sweetums',
        'Nugget',
        'Kiddo',
        'Smarty',
        'Ace',
    ],
    otherPrefix: [
        'The amphibian oracle has spoken:',
        'Newsflash!',
        'I do declare,',
        'Oh boy,',
        'Sweet!',
        'Everyone knows that',
    ],
    prefix: ['#termOfEndearment#,', '#otherPrefix#'],
    suffix: [
        ", and that's a fact.",
        ', all night long.',
        '. (🎤 drop)',
        '.',
        ', high five!',
        ', you delicious beast.',
        ', <ribbit!>',
        ', so just get used to it.',
        ', according to wikipedia.',
        ", and frogs don't lie.",
    ],
    personProperty: [
        'soul',
        'heart',
        'gills',
        'touch',
        'interesting (yet pleasant) smell',
        'hair today',
        'style',
        'kindness',
        'tadpole',
        'chirp',
    ],
    actionActive: ['sing', 'croak', 'walk', 'chirp'],
    actionPassive: ['smell', 'look', 'sound'],
    action: ['#actionPassive#', '#actionActive#'],
    theWhat: ['your #personProperty#', 'the way you #action#'],
    nounCompliment: [
        'makes my heart dance',
        'is a national treasure',
        'is the bees knees',
        'makes my gills shiver',
        'is made of gold',
        'is legit',
        'does the job',
        'just glistens',
    ],
    bodyPart: ['heart', 'gills'],
    bodyPartAction: ['dance', 'shiver', 'tremble'],
    actionCompliment: [
        'is a national treasure',
        'is the bees knees',
        'makes my #bodyPart# #bodyPartAction#',
    ],
    reactionVerb: ['love', 'adore', 'worship', 'dig'],
    blessing: [
        '#termOfEndearment# you #actionPassive# nice.',
        '#otherPrefix# you #actionPassive# nice.',
        'I #reactionVerb# your #personProperty#.',
        'I #reactionVerb# the way you #actionPassive#.',
        'No one #actionPassive.plural# the way you do.',
        'The way you #actionPassive# makes my #bodyPart# #bodyPartAction#.',
        "#prefix# your #personProperty# is the cat's meow",
    ],
}

const filters: Record<string, Filter> = {
    plural: (_: string) => _ + 's',
    capitalise: ([first, ...rest]: string) => {
        if (!first) return ''
        return first.toLocaleUpperCase() + rest.join('')
    },
}

export const getRandomBlessing = () => collapse(rules, '#blessing#', filters)

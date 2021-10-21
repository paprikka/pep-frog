import { collapse } from './collapse'
import { mocked } from 'ts-jest/utils'

jest.mock('./pick-random', () => ({ pickRandom: jest.fn() }))
import { pickRandom } from './pick-random'

beforeEach(() => mocked(pickRandom).mockImplementation((arr) => arr[0]))

it('should replace a single token', () => {
    expect(collapse({ foo: ['bar'] }, '#foo#')).toBe('bar')
})

it('should replace nested tokens', () => {
    expect(
        collapse(
            {
                a: ['b: #b#'],
                b: ['c: #c#'],
                c: ['CCC'],
            },
            'a: #a#'
        )
    ).toBe('a: b: c: CCC')
})

it('should support custom filters', () => {
    expect(
        collapse(
            {
                name: ['rafal'],
                animal: ['dog'],
                babyAnimal: ['baby #animal#'],
            },
            '#name# has 2 #babyAnimal.plural#.',
            {
                plural: (str: string) => str + 's',
            }
        )
    ).toBe('rafal has 2 baby dogs.')
})

it('should pick a random item from the rules list', () => {
    expect(
        collapse(
            {
                name: ['rafal', 'gary'],
                animal: ['dog', 'cat', 'munchkin'],
            },
            '#name# has 2 #animal.plural#.',
            {
                plural: (str: string) => str + 's',
            }
        )
    ).toBe('rafal has 2 dogs.')

    mocked(pickRandom).mockImplementation((arr) => arr[1])

    expect(
        collapse(
            {
                name: ['rafal', 'gary'],
                animal: ['dog', 'cat', 'munchkin'],
            },
            '#name.pirate# has 2 #animal.plural#.',
            {
                plural: (str: string) => str + 's',
            }
        )
    ).toBe('gary has 2 cats.')

    mocked(pickRandom).mockImplementation((arr) => arr[arr.length - 1])

    expect(
        collapse(
            {
                name: ['rafal', 'gary'],
                animal: ['dog', 'cat', 'munchkin'],
                blessing: ['#name.pirate# has 2 #animal.plural#.'],
            },
            '#blessing#',
            {
                plural: (str: string) => str + 's',
            }
        )
    ).toBe('gary has 2 munchkins.')
})

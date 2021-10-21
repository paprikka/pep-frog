import { pickRandom } from './pick-random'

const tokenExp = new RegExp('#\\s*(\\w+|\\w+\\.\\w+)\\s*#', 'gi')

export type Rule = string[]
export type Filter = (s: string) => string
export type Rules = Record<string, Rule>

const pick = (k: string, r: Rules): string => pickRandom(r[k]) || ''

// a.k.a. stupid tracery: no state, no error checks, just a quick draft
export const collapse = (
    rules: Rules,
    phrase: string,
    filters: Record<string, Filter> = {}
): string =>
    phrase.replace(tokenExp, (_: any, tokenWithFilter: string) => {
        const [maybeToken, filterId] = tokenWithFilter.split('.')

        const maybeFilter =
            typeof filters[filterId] === 'function' ? filters[filterId]! : null

        const nextToken = pick(maybeToken, rules)

        if (!nextToken) return ''

        return maybeFilter
            ? maybeFilter(collapse(rules, nextToken))
            : collapse(rules, nextToken, filters)
    })

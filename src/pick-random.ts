const { random, floor } = Math

export const pickRandom = <T>(arr: T[]): T => arr[floor(random() * arr.length)]

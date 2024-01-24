

export const addSpaces = (str: string, behind: number = 0, front: number = 0): string => {
    return ' '.repeat(front) + str + ' '.repeat(behind);
}

export const addNewLines = (str: string, lines: number = 1): string => {
    return str + '\n'.repeat(lines);
}
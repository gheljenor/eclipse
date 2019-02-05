export function isMissed(roll: number, bonus: number, defence: number): boolean {
    return roll === 1 || roll !== 6 && roll + bonus < 6 + defence;
}

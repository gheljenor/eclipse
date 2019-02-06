export function isMissed(roll: number, bonus: number, defence: number): boolean {
    return roll !== 6 && (roll === 1 || roll + bonus < 6 + defence);
}

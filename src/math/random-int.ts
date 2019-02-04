export function randomInt(max: number): number {
    return Math.min(max, Math.floor(Math.random() * (max + 1)));
}

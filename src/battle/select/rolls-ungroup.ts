export function rollsUngroup(groupedRolls: number[][]): { rolls: number[], map: number[] } {
    const rollsInfo: { roll: number, group: number }[] = [];

    for (let group = 0, l = groupedRolls.length; group < l; group++) {
        for (const roll of groupedRolls[group]) {
            rollsInfo.push({roll, group});
        }
    }

    rollsInfo.sort((a, b) => b.roll - a.roll);

    const rolls: number[] = rollsInfo.map((a) => a.roll);
    const map: number[] = rollsInfo.map((a) => a.group);

    return {rolls, map};
}

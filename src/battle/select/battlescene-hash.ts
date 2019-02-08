import {IBattleScene} from "../sim/i-battle-scene";

export function battleSceneHash(battleScene: IBattleScene): string {
    return battleScene.ships.map((ship) => ship.owner + ship.type + ship.hp).sort().join(",");
}

export function battleSceneHashAndHp(battleScene: IBattleScene): { hp: number, hash: string } {
    let hp = 0;

    const hash = battleScene.ships.map((ship) => {
        hp += ship.hp;
        return ship.owner + ship.type + ship.hp;
    }).sort().join(",");

    return {hp, hash};
}

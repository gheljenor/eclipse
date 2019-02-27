import {distributeRolls} from "../battle/attack/distribute-rolls";
import {IBattleTactics} from "../battle/attack/i-battle-tactics";
import {IWeaponShot} from "../battle/attack/i-weapon-shot";
import {BattleShip} from "../battle/data/battle-ship";
import {Weapon} from "../battle/data/weapon";
import {countMaxTargets} from "../battle/select/count-max-targets";
import {isMissed} from "../battle/select/is-missed";
import {IBattleScene} from "../battle/sim/i-battle-scene";
import {ITurnInfo} from "../battle/sim/i-turn-info";
import {combineGenerators} from "../lib/combine-generators";
import {memo} from "../lib/memo";
import {memoHashed} from "../lib/memo-hashed";
import {randomInt} from "../math/random-int";
import {IGeneSolverCore, IGeneSolverOptions} from "./gene-solver";

export interface IAttackSolverData {
    battleScene: IBattleScene;
    turnInfo: ITurnInfo;
    rolls: number[];
    weapons: Weapon[];
    bonus: number;
    targets: BattleShip[];
    targetsDef: number[];
}

const defaultOptions: IGeneSolverOptions = {
    firstGeneration: 20,
    secondGeneration: 5,
    maxIterations: 6,

    freshBlood: 10,

    breeders: 10,
    minChildren: 2,
    maxChildren: 2,

    mutations: 10,

    best: 5,
    worst: 1,
    random: 5,
};

export class AttackGeneSolverCore implements IGeneSolverCore<IWeaponShot[], IAttackSolverData> {
    public hash = memo((shots: IWeaponShot[]): string => {
        const targets = this.data.targets;
        return shots
            .map((shot, idx) => `${idx}:${targets.indexOf(shot.target)}`)
            .join(",");
    });

    public appraise = memoHashed((shots: IWeaponShot[]): number => {
        const targets = this.data.targets;
        const missed = shots.some((shot) => isMissed(shot.roll, this.data.bonus, shot.target.defence));
        if (missed) {
            return null;
        }
        return this.tactics(this.data.battleScene, this.data.turnInfo, shots)
            + shots.reduce((a, shot) => a + 0.01 * targets.indexOf(shot.target) * shot.weapon.damage, 0);

    }, this.hash);

    private data: IAttackSolverData;
    private targetsCount: number[];

    constructor(private tactics: IBattleTactics) {
    }

    public breed(a: IWeaponShot[], b: IWeaponShot[]): IWeaponShot[] {
        const start = randomInt(a.length - 2);
        const end = start + 1 + randomInt(Math.min(a.length - start, a.length / 1.5));

        return [
            ...a.slice(0, start),
            ...b.slice(start, end),
            ...a.slice(end),
        ];
    }

    public mutate(shots: IWeaponShot[]): IWeaponShot[] {
        const result = shots.slice();
        const idx = randomInt(shots.length - 1);

        result[idx] = Object.assign({}, shots[idx], {target: this.randomTarget(idx)});

        return result;
    }

    public options(data): IGeneSolverOptions {
        return defaultOptions;
    }

    public generator(data: IAttackSolverData): IterableIterator<IWeaponShot[]> {
        this.data = data;
        const {rolls, bonus, targetsDef} = this.data;
        this.targetsCount = rolls.map((roll) => countMaxTargets(roll, bonus, targetsDef));

        return combineGenerators(
            this.generateDists(),
            this.generateRandom(),
        );
    }

    private randomTarget(rollId): BattleShip {
        const id = this.data.targets.length - this.targetsCount[rollId]
            + randomInt(this.targetsCount[rollId] - 1);

        return this.data.targets[id];
    }

    private* generateDists(): IterableIterator<IWeaponShot[]> {
        const {rolls, bonus, targets, weapons, targetsDef} = this.data;

        for (const dist of distributeRolls(rolls, bonus, targetsDef)) {
            const shots: IWeaponShot[] = dist.map((targetIdx, weaponIdx) => ({
                target: targets[targetIdx],
                weapon: weapons[weaponIdx],
                roll: rolls[weaponIdx],
            }));

            yield shots;
        }
    }

    private* generateRandom(): IterableIterator<IWeaponShot[]> {
        const {rolls, weapons} = this.data;

        while (true) {
            const shots: IWeaponShot[] = rolls.map((roll, idx) => ({
                target: this.randomTarget(idx),
                weapon: weapons[idx],
                roll,
            }));

            yield shots;
        }
    }
}

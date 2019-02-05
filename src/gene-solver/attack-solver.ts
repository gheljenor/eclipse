import {distributeRolls} from "../battle/attack/distribute-rolls";
import {IBattleTactics} from "../battle/attack/i-battle-tactics";
import {IWeaponShot} from "../battle/attack/i-weapon-shot";
import {Battleship} from "../battle/battleship";
import {IWeapon} from "../battle/i-weapon";
import {IBattleScene} from "../battle/sim/i-battle-scene";
import {ITurnInfo} from "../battle/sim/i-turn-info";
import {randomInt} from "../math/random-int";
import {GeneSolver, IGeneSolverCore} from "./index";

export interface IAttackSolverData {
    battleScene: IBattleScene;
    turnInfo: ITurnInfo;
    rolls: number[];
    weapons: IWeapon[];
    bonus: number;
    targets: Battleship[];
}

const defaultOptions = {
    firstGeneration: 5,
    initial: 5,
    iterations: 5,

    freshBlood: 5,

    breeders: 20,
    minChildren: 2,
    maxChildren: 2,

    mutations: 20,

    best: 5,
    worst: 1,
    random: 4,
};

export class AttackSolver extends GeneSolver<IWeaponShot[], IAttackSolverData> {
    constructor(tactics: IBattleTactics) {
        super(AttackSolver.core(tactics), Object.assign({}, defaultOptions));
    }

    private static core(tactics: IBattleTactics): IGeneSolverCore<IWeaponShot[], IAttackSolverData> {
        let currentData: IAttackSolverData;

        return {
            * generator(data: IAttackSolverData): IterableIterator<IWeaponShot[]> {
                currentData = data;

                const {rolls, bonus, targets, weapons} = data;
                const targetsDef = targets.map(({defence}) => defence);

                for (const dist of distributeRolls(rolls, bonus, targetsDef)) {
                    const shots: IWeaponShot[] = dist.map((targetIdx, weaponIdx) => ({
                        target: targets[targetIdx],
                        weapon: weapons[weaponIdx],
                        roll: rolls[weaponIdx],
                    }));

                    yield shots;
                }
            },

            breed(a: IWeaponShot[], b: IWeaponShot[]): IWeaponShot[] {
                const start = randomInt(a.length - 2);
                const end = start + 1 + randomInt(Math.min(a.length - start, a.length / 1.5));

                return [
                    ...a.slice(0, start),
                    ...b.slice(start, end),
                    ...a.slice(end),
                ];
            },

            mutate(shots: IWeaponShot[]): IWeaponShot[] {
                const targets = currentData.targets;
                const result = shots.slice();

                const idx = randomInt(shots.length - 1);
                const targetIdx = randomInt(targets.length - 1);

                result[idx] = Object.assign({}, shots[idx], {target: targets[targetIdx]});

                return result;
            },

            appraise(shots: IWeaponShot[]): number {
                return tactics(currentData.battleScene, currentData.turnInfo, shots);
            },
        };
    }

    public calculate(data: IAttackSolverData): IWeaponShot[] {
        // TODO: make dynamic options
        return super.calculate(data);
    }
}

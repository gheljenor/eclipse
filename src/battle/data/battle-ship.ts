import {yellowGun} from "./weapon";
import {Weapon} from "./weapon";

export enum BattleShipType {
    interceptor,
    cruiser,
    dreadnought,
    starbase,
    deathmoon,
}

type BattleShipProps = {
    type: BattleShipType;
    owner: string;
    weapons: Weapon[];
    hp: number;
    maxHp: number;
    initiative: number;
    defence: number;
    attack: number;
    heal: number;
};

export class BattleShip implements BattleShipProps {
    public readonly type: BattleShipType;
    public readonly owner: string;
    public readonly weapons: Weapon[];
    public readonly maxHp: number;
    public readonly initiative: number;
    public readonly defence: number;
    public readonly attack: number;
    public readonly heal: number;

    public hp: number;

    constructor(props: BattleShipProps) {
        Object.assign(this, props);
    }

    public static factory(
        owner: string = "player",
        type: BattleShipType = BattleShipType.interceptor,
        weapons: Weapon[] = [yellowGun],
        hp: number = 1,
        initiative: number = 0,
        defence: number = 0,
        attack: number = 0,
        heal: number = 0,
    ) {
        return new BattleShip({type, owner, weapons, hp, maxHp: hp, initiative, defence, attack, heal});
    }

    public clone(): BattleShip {
        return new BattleShip(this);
    }
}

import {IWeapon} from "./i-weapon";

export enum EBattleShipType {
    interceptor,
    cruiser,
    dreadnought,
    starbase,
    deathmoon
}

export class Battleship {
    public maxHp: number;

    constructor(
        public type: EBattleShipType,
        public owner: string = "player",
        public weapons: IWeapon[] = [],
        public hp: number = 1,
        public initiative: number = 0,
        public defence: number = 0,
        public attack: number = 0,
        public heal: number = 0,
    ) {
        this.maxHp = this.hp;
    }

    clone(): this {
        const Constructor = Object.getPrototypeOf(this).constructor;
        const ship = new Constructor(this.type, this.owner, this.weapons, this.hp, this.initiative, this.defence, this.attack, this.heal);
        ship.maxHp = this.maxHp;
        return ship;
    }
}

import {Weapon} from "./weapon";

export enum BattleShipType {
    interceptor,
    cruiser,
    dreadnought,
    starbase,
    deathmoon
}

export class Battleship {
    constructor(
        public type: BattleShipType,
        public owner: string = "player",
        public weapons: Weapon[] = [],
        public hp: number = 1,
        public initiative: number = 0,
        public defence: number = 0,
        public attack: number = 0,
        public heal: number = 0,
    ) {}

    clone(): this {
        const Constructor = Object.getPrototypeOf(this).constructor;
        return new Constructor(this.type, this.owner, this.weapons, this.hp, this.initiative, this.defence, this.attack, this.heal);
    }
}

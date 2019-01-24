import {expect} from "chai";
import {describe, it} from "mocha";

import {ancientTactics} from "../../../src/battle/attack/ancient-tactics";
import {IWeaponShot} from "../../../src/battle/attack/i-weapon-shot";
import {Battleship, EBattleShipType} from "../../../src/battle/battleship";
import {EWeaponType} from "../../../src/battle/i-weapon";
import {IBattleScene} from "../../../src/battle/sim/i-battle-scene";
import {ITurnInfo} from "../../../src/battle/sim/i-turn-info";
import {RED_GUN, YELLOW_GUN} from "../../../src/battle/weapons-helper";

const scene: IBattleScene = {
    ships: [],
    defender: "player",
};

const turnInfo: ITurnInfo = {
    initiative: 1,
    defender: true,
    player: "player",
    turn: 1,
};

function killShip(shipType: EBattleShipType): IWeaponShot {
    return {
        weapon: RED_GUN,
        target: new Battleship(shipType),
    };
}

function damageShip(shipType: EBattleShipType, damage: number): IWeaponShot {
    return {
        weapon: {
            type: EWeaponType.gun,
            damage,
        },
        target: new Battleship(shipType, "player", [], damage + 1),
    };
}

const killInterceptor: IWeaponShot[] = [killShip(EBattleShipType.interceptor)];
const killCruiser: IWeaponShot[] = [killShip(EBattleShipType.cruiser)];
const killDred: IWeaponShot[] = [killShip(EBattleShipType.dreadnought)];
const killStarbase: IWeaponShot[] = [killShip(EBattleShipType.starbase)];
const killDeathmoon: IWeaponShot[] = [killShip(EBattleShipType.deathmoon)];

const killInterceptorMax: IWeaponShot[] = [
    killShip(EBattleShipType.interceptor),
    killShip(EBattleShipType.interceptor),
    killShip(EBattleShipType.interceptor),
    killShip(EBattleShipType.interceptor),
];

const killCruiserMax: IWeaponShot[] = [
    killShip(EBattleShipType.cruiser),
    killShip(EBattleShipType.cruiser),
    killShip(EBattleShipType.cruiser),
    killShip(EBattleShipType.cruiser),
];

const killDredMax: IWeaponShot[] = [
    killShip(EBattleShipType.dreadnought),
    killShip(EBattleShipType.dreadnought),
];

const killStarbaseMax: IWeaponShot[] = [
    killShip(EBattleShipType.starbase),
    killShip(EBattleShipType.starbase),
    killShip(EBattleShipType.starbase),
    killShip(EBattleShipType.starbase),
];

const damageInterceptor1 = [damageShip(EBattleShipType.interceptor, 1)];
const damageCruiser1 = [damageShip(EBattleShipType.cruiser, 1)];
const damageDred1 = [damageShip(EBattleShipType.dreadnought, 1)];
const damageStarBase1 = [damageShip(EBattleShipType.starbase, 1)];
const damageDeathMoon1 = [damageShip(EBattleShipType.deathmoon, 1)];

const damageInterceptor4 = [damageShip(EBattleShipType.interceptor, 4)];
const damageCruiser4 = [damageShip(EBattleShipType.cruiser, 4)];
const damageDred4 = [damageShip(EBattleShipType.dreadnought, 4)];
const damageStarBase4 = [damageShip(EBattleShipType.starbase, 4)];
const damageDeathMoon4 = [damageShip(EBattleShipType.deathmoon, 4)];

describe("ancient-tactics", function () {
    it("kills 1 vs 1 higher", function () {
        expect(ancientTactics(scene, turnInfo, killInterceptor)).to.be.lt(ancientTactics(scene, turnInfo, killCruiser));
        expect(ancientTactics(scene, turnInfo, killCruiser)).to.be.lt(ancientTactics(scene, turnInfo, killDred));
        expect(ancientTactics(scene, turnInfo, killDred)).to.be.lt(ancientTactics(scene, turnInfo, killStarbase));
        expect(ancientTactics(scene, turnInfo, killStarbase)).to.be.lt(ancientTactics(scene, turnInfo, killDeathmoon));
    });

    it("kills 4 vs 1 higher", function () {
        expect(ancientTactics(scene, turnInfo, killInterceptorMax)).to.be.lt(ancientTactics(scene, turnInfo, killCruiser));
        expect(ancientTactics(scene, turnInfo, killCruiserMax)).to.be.lt(ancientTactics(scene, turnInfo, killDred));
        expect(ancientTactics(scene, turnInfo, killDredMax)).to.be.lt(ancientTactics(scene, turnInfo, killStarbase));
        expect(ancientTactics(scene, turnInfo, killStarbaseMax)).to.be.lt(ancientTactics(scene, turnInfo, killDeathmoon));
    });

    it("damage 1 vs 1 higher", function () {
        expect(ancientTactics(scene, turnInfo, damageInterceptor1)).to.be.lt(ancientTactics(scene, turnInfo, damageCruiser1));
        expect(ancientTactics(scene, turnInfo, damageCruiser1)).to.be.lt(ancientTactics(scene, turnInfo, damageDred1));
        expect(ancientTactics(scene, turnInfo, damageDred1)).to.be.lt(ancientTactics(scene, turnInfo, damageStarBase1));
        expect(ancientTactics(scene, turnInfo, damageStarBase1)).to.be.lt(ancientTactics(scene, turnInfo, damageDeathMoon1));
    });

    it("damage 4 vs 1 higher", function () {
        expect(ancientTactics(scene, turnInfo, damageInterceptor4)).to.be.lt(ancientTactics(scene, turnInfo, damageCruiser1));
        expect(ancientTactics(scene, turnInfo, damageCruiser4)).to.be.lt(ancientTactics(scene, turnInfo, damageDred1));
        expect(ancientTactics(scene, turnInfo, damageDred4)).to.be.lt(ancientTactics(scene, turnInfo, damageStarBase1));
        expect(ancientTactics(scene, turnInfo, damageStarBase4)).to.be.lt(ancientTactics(scene, turnInfo, damageDeathMoon1));
    });

    it("damage 4 vs kill 1", function () {
        expect(ancientTactics(scene, turnInfo, damageInterceptor4)).to.be.lt(ancientTactics(scene, turnInfo, killInterceptor));
        expect(ancientTactics(scene, turnInfo, damageCruiser4)).to.be.lt(ancientTactics(scene, turnInfo, killCruiser));
        expect(ancientTactics(scene, turnInfo, damageDred4)).to.be.lt(ancientTactics(scene, turnInfo, killDred));
        expect(ancientTactics(scene, turnInfo, damageStarBase4)).to.be.lt(ancientTactics(scene, turnInfo, killStarbase));
        expect(ancientTactics(scene, turnInfo, damageDeathMoon4)).to.be.lt(ancientTactics(scene, turnInfo, killDeathmoon));
    });

    it("damage by to shots", function () {
        const ship: Battleship = new Battleship(EBattleShipType.interceptor, "player", [], 5);
        const shots: IWeaponShot[] = [{
            weapon: YELLOW_GUN,
            target: ship,
        }, {
            weapon: YELLOW_GUN,
            target: ship,
        }];

        expect(ancientTactics(scene, turnInfo, shots)).to.be.equal(16);
    });

    it("kill by to shots", function () {
        const ship: Battleship = new Battleship(EBattleShipType.interceptor, "player", [], 2);
        const shots: IWeaponShot[] = [{
            weapon: YELLOW_GUN,
            target: ship,
        }, {
            weapon: YELLOW_GUN,
            target: ship,
        }];

        expect(ancientTactics(scene, turnInfo, shots)).to.be.equal(8589934592);
    });
});

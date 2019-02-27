import {expect} from "chai";
import {describe, it} from "mocha";

import {ancientTactics} from "../../../src/battle/attack/ancient-tactics";
import {IWeaponShot} from "../../../src/battle/attack/i-weapon-shot";
import {BattleShip, BattleShipType} from "../../../src/battle/data/battle-ship";
import {redGun, WeaponType} from "../../../src/battle/data/weapon";
import {IBattleScene} from "../../../src/battle/sim/i-battle-scene";
import {ITurnInfo} from "../../../src/battle/sim/i-turn-info";
import {yellowGun} from "../../../src/battle/data/weapon";

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

function killShip(shipType: BattleShipType): IWeaponShot {
    return {
        weapon: redGun,
        target: new BattleShip(shipType),
    };
}

function damageShip(shipType: BattleShipType, damage: number): IWeaponShot {
    return {
        weapon: {
            type: WeaponType.gun,
            damage,
        },
        target: new BattleShip(shipType, "player", [], damage + 1),
    };
}

const killInterceptor: IWeaponShot[] = [killShip(BattleShipType.interceptor)];
const killCruiser: IWeaponShot[] = [killShip(BattleShipType.cruiser)];
const killDred: IWeaponShot[] = [killShip(BattleShipType.dreadnought)];
const killStarbase: IWeaponShot[] = [killShip(BattleShipType.starbase)];
const killDeathmoon: IWeaponShot[] = [killShip(BattleShipType.deathmoon)];

const killInterceptorMax: IWeaponShot[] = [
    killShip(BattleShipType.interceptor),
    killShip(BattleShipType.interceptor),
    killShip(BattleShipType.interceptor),
    killShip(BattleShipType.interceptor),
];

const killCruiserMax: IWeaponShot[] = [
    killShip(BattleShipType.cruiser),
    killShip(BattleShipType.cruiser),
    killShip(BattleShipType.cruiser),
    killShip(BattleShipType.cruiser),
];

const killDredMax: IWeaponShot[] = [
    killShip(BattleShipType.dreadnought),
    killShip(BattleShipType.dreadnought),
];

const killStarbaseMax: IWeaponShot[] = [
    killShip(BattleShipType.starbase),
    killShip(BattleShipType.starbase),
    killShip(BattleShipType.starbase),
    killShip(BattleShipType.starbase),
];

const damageInterceptor1 = [damageShip(BattleShipType.interceptor, 1)];
const damageCruiser1 = [damageShip(BattleShipType.cruiser, 1)];
const damageDred1 = [damageShip(BattleShipType.dreadnought, 1)];
const damageStarBase1 = [damageShip(BattleShipType.starbase, 1)];
const damageDeathMoon1 = [damageShip(BattleShipType.deathmoon, 1)];

const damageInterceptor4 = [damageShip(BattleShipType.interceptor, 4)];
const damageCruiser4 = [damageShip(BattleShipType.cruiser, 4)];
const damageDred4 = [damageShip(BattleShipType.dreadnought, 4)];
const damageStarBase4 = [damageShip(BattleShipType.starbase, 4)];
const damageDeathMoon4 = [damageShip(BattleShipType.deathmoon, 4)];

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
        const ship: BattleShip = new BattleShip(BattleShipType.interceptor, "player", [], 5);
        const shots: IWeaponShot[] = [{
            weapon: yellowGun,
            target: ship,
        }, {
            weapon: yellowGun,
            target: ship,
        }];

        expect(ancientTactics(scene, turnInfo, shots)).to.be.equal(16);
    });

    it("kill by to shots", function () {
        const ship: BattleShip = new BattleShip(BattleShipType.interceptor, "player", [], 2);
        const shots: IWeaponShot[] = [{
            weapon: yellowGun,
            target: ship,
        }, {
            weapon: yellowGun,
            target: ship,
        }];

        expect(ancientTactics(scene, turnInfo, shots)).to.be.equal(8589934592);
    });
});

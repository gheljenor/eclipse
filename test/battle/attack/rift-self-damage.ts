import {expect} from "chai";
import {describe, it} from "mocha";
import {riftSelfDamage} from "../../../src/battle/attack/rift-self-damage";
import {BattleShip, BattleShipType} from "../../../src/battle/data/battle-ship";
import {battleSceneHash} from "../../../src/battle/select/battlescene-hash";
import {IBattleScene} from "../../../src/battle/sim/i-battle-scene";
import {ITurnInfo} from "../../../src/battle/sim/i-turn-info";
import {WeaponsHelper} from "../../../src/battle/data/weapons-helper";

const turnInfo: ITurnInfo = {
    player: "player",
    initiative: 1,
    defender: false,
    turn: 1,
};

describe("rift-self-damage", function () {
    it("1 ship, 1 hp, 1 weapon-group, 1 damage", function () {
        const scene: IBattleScene = {
            ships: [
                new BattleShip(BattleShipType.interceptor, "player", WeaponsHelper.factory().addRiftCannon().weapons),
                new BattleShip(BattleShipType.cruiser, "player", WeaponsHelper.factory().addOrangeGun().weapons, 2),
            ],
            defender: "player",
        };

        const result = riftSelfDamage(scene, 1, turnInfo);
        expect(battleSceneHash(result)).to.be.equal("player01,player11");
    });

    it("1 ship, 1 hp, 2 weapon-group, 1 damage", function () {
        const scene: IBattleScene = {
            ships: [
                new BattleShip(BattleShipType.interceptor, "player", WeaponsHelper.factory().addRiftTurret().weapons),
                new BattleShip(BattleShipType.cruiser, "player", WeaponsHelper.factory().addOrangeGun().weapons, 2),
            ],
            defender: "player",
        };

        const result = riftSelfDamage(scene, 1, turnInfo);
        expect(battleSceneHash(result)).to.be.equal("player01,player11");
    });

    it("1 ship, 1 hp, 2 weapon-group, 2 damage", function () {
        const scene: IBattleScene = {
            ships: [
                new BattleShip(BattleShipType.interceptor, "player", WeaponsHelper.factory().addRiftTurret().weapons),
                new BattleShip(BattleShipType.cruiser, "player", WeaponsHelper.factory().addOrangeGun().weapons, 2),
            ],
            defender: "player",
        };

        const result = riftSelfDamage(scene, 2, turnInfo);
        expect(battleSceneHash(result)).to.be.equal("player00,player11");
    });

    it("2 ship, 1 hp, 2 weapon-group, 2 damage", function () {
        const scene: IBattleScene = {
            ships: [
                new BattleShip(BattleShipType.interceptor, "player", WeaponsHelper.factory().addRiftTurret().weapons),
                new BattleShip(BattleShipType.interceptor, "player", WeaponsHelper.factory().addRiftTurret().weapons),
                new BattleShip(BattleShipType.cruiser, "player", WeaponsHelper.factory().addOrangeGun().weapons, 2),
            ],
            defender: "player",
        };

        const result = riftSelfDamage(scene, 2, turnInfo);
        expect(battleSceneHash(result)).to.be.equal("player00,player01,player11");
    });

    it("2 ship, 1 hp, 2 weapon-group, 3 damage", function () {
        const scene: IBattleScene = {
            ships: [
                new BattleShip(BattleShipType.interceptor, "player", WeaponsHelper.factory().addRiftTurret().weapons),
                new BattleShip(BattleShipType.interceptor, "player", WeaponsHelper.factory().addRiftTurret().weapons),
                new BattleShip(BattleShipType.cruiser, "player", WeaponsHelper.factory().addOrangeGun().weapons, 2),
            ],
            defender: "player",
        };

        const result = riftSelfDamage(scene, 3, turnInfo);
        expect(battleSceneHash(result)).to.be.equal("player00,player00,player11");
    });

    it("2 ship, 1 hp, 2 weapon-group, 4 damage", function () {
        const scene: IBattleScene = {
            ships: [
                new BattleShip(BattleShipType.interceptor, "player", WeaponsHelper.factory().addRiftTurret().weapons),
                new BattleShip(BattleShipType.interceptor, "player", WeaponsHelper.factory().addRiftTurret().weapons),
                new BattleShip(BattleShipType.cruiser, "player", WeaponsHelper.factory().addOrangeGun().weapons, 2),
            ],
            defender: "player",
        };

        const result = riftSelfDamage(scene, 4, turnInfo);
        expect(battleSceneHash(result)).to.be.equal("player00,player00,player10");
    });
});

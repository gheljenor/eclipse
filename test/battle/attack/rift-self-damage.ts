import {expect} from "chai";
import {describe, it} from "mocha";
import {riftSelfDamage} from "../../../src/battle/attack/rift-self-damage";
import {Battleship, EBattleShipType} from "../../../src/battle/battleship";
import {battleSceneHash} from "../../../src/battle/select/battlescene-hash";
import {IBattleScene} from "../../../src/battle/sim/i-battle-scene";
import {WeaponsHelper} from "../../../src/battle/weapons-helper";

describe("rift-self-damage", function () {
    it("1 ship, 1 hp, 1 weapon, 1 damage", function () {
        const scene: IBattleScene = {
            ships: [
                new Battleship(EBattleShipType.interceptor, "player", WeaponsHelper.factory().addRiftCannon().weapons),
                new Battleship(EBattleShipType.cruiser, "player", WeaponsHelper.factory().addOrangeGun().weapons, 2),
            ],
            defender: "player",
        };

        const result = riftSelfDamage(scene, 1, "player");
        expect(battleSceneHash(result)).to.be.equal("player00,player12");
    });

    it("1 ship, 1 hp, 2 weapon, 1 damage", function () {
        const scene: IBattleScene = {
            ships: [
                new Battleship(EBattleShipType.interceptor, "player", WeaponsHelper.factory().addRiftTurrel().weapons),
                new Battleship(EBattleShipType.cruiser, "player", WeaponsHelper.factory().addOrangeGun().weapons, 2),
            ],
            defender: "player",
        };

        const result = riftSelfDamage(scene, 1, "player");
        expect(battleSceneHash(result)).to.be.equal("player00,player12");
    });

    it("1 ship, 1 hp, 2 weapon, 2 damage", function () {
        const scene: IBattleScene = {
            ships: [
                new Battleship(EBattleShipType.interceptor, "player", WeaponsHelper.factory().addRiftTurrel().weapons),
                new Battleship(EBattleShipType.cruiser, "player", WeaponsHelper.factory().addOrangeGun().weapons, 2),
            ],
            defender: "player",
        };

        const result = riftSelfDamage(scene, 2, "player");
        expect(battleSceneHash(result)).to.be.equal("player00,player12");
    });

    it("2 ship, 1 hp, 2 weapon, 2 damage", function () {
        const scene: IBattleScene = {
            ships: [
                new Battleship(EBattleShipType.interceptor, "player", WeaponsHelper.factory().addRiftTurrel().weapons),
                new Battleship(EBattleShipType.interceptor, "player", WeaponsHelper.factory().addRiftTurrel().weapons),
                new Battleship(EBattleShipType.cruiser, "player", WeaponsHelper.factory().addOrangeGun().weapons, 2),
            ],
            defender: "player",
        };

        const result = riftSelfDamage(scene, 2, "player");
        expect(battleSceneHash(result)).to.be.equal("player00,player00,player12");
    });

    it("2 ship, 1 hp, 2 weapon, 3 damage", function () {
        const scene: IBattleScene = {
            ships: [
                new Battleship(EBattleShipType.interceptor, "player", WeaponsHelper.factory().addRiftTurrel().weapons),
                new Battleship(EBattleShipType.interceptor, "player", WeaponsHelper.factory().addRiftTurrel().weapons),
                new Battleship(EBattleShipType.cruiser, "player", WeaponsHelper.factory().addOrangeGun().weapons, 2),
            ],
            defender: "player",
        };

        const result = riftSelfDamage(scene, 3, "player");
        expect(battleSceneHash(result)).to.be.equal("player00,player00,player12");
    });

    it("2 ship, 1 hp, 2 weapon, 4 damage", function () {
        const scene: IBattleScene = {
            ships: [
                new Battleship(EBattleShipType.interceptor, "player", WeaponsHelper.factory().addRiftTurrel().weapons),
                new Battleship(EBattleShipType.interceptor, "player", WeaponsHelper.factory().addRiftTurrel().weapons),
                new Battleship(EBattleShipType.cruiser, "player", WeaponsHelper.factory().addOrangeGun().weapons, 2),
            ],
            defender: "player",
        };

        const result = riftSelfDamage(scene, 4, "player");
        expect(battleSceneHash(result)).to.be.equal("player00,player00,player12");
    });
});

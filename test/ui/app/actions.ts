import {expect} from "chai";
import {describe, it} from "mocha";

import {createStore} from "redux";
import {EBattleShipType} from "../../../src/battle/battleship";
import {EWeaponDamageType, EWeaponType} from "../../../src/battle/i-weapon";
import {actionAppAutoSim, actionAppSimulate} from "../../../src/ui/app/actions";
import {reducers} from "../../../src/ui/reducers";

describe("ui-app-actions", function () {
    it("ACTION_APP_SIMULATE", function () {
        const store = createStore(reducers, {
            players: {
                first: {name: "Player", ships: ["first:0"]},
                second: {name: "Enemy", ships: ["second:0"]},
                defender: "second",
            },
            ships: {
                "first:0": {
                    type: EBattleShipType.interceptor,
                    count: 1, hp: 1, attack: 0, defence: 0, heal: 0, initiative: 0,
                    weapons: ["first:0:0"],
                },
                "second:0": {
                    type: EBattleShipType.interceptor,
                    count: 1, hp: 1, attack: 0, defence: 0, heal: 0, initiative: 0,
                    weapons: ["second:0:0"],
                },
            },
            weapons: {
                "first:0:0": {damage: EWeaponDamageType.yellow, type: EWeaponType.gun, count: 1},
                "second:0:0": {damage: EWeaponDamageType.yellow, type: EWeaponType.gun, count: 1},
            },
        });

        const oldState = store.getState();

        store.dispatch(actionAppSimulate());

        const newState = store.getState();

        expect(newState.players).to.be.equal(oldState.players);
        expect(newState.ships).to.be.equal(oldState.ships);
        expect(newState.weapons).to.be.equal(oldState.weapons);

        expect(newState.summary).to.be.eql({
            results: {first: 0.45454545454545453, second: 0.5454545454545455},
            outcomes: {
                first: [{
                    probability: 0.45454545454545453,
                    ships: [{count: 1, type: EBattleShipType.interceptor}],
                }],
                second: [{
                    probability: 0.5454545454545455,
                    ships: [{count: 1, type: EBattleShipType.interceptor}],
                }],
            },
        });

        expect(newState.app.summaryState).to.be.eql("ready");
        expect(newState.app.duration).to.be.gt(0);
    });

    it("ACTION_APP_AUTOSIM", function () {
        const store = createStore(reducers);

        store.dispatch(actionAppAutoSim(true));
        expect(store.getState().app.autosim).to.be.true;

        store.dispatch(actionAppAutoSim(false));
        expect(store.getState().app.autosim).to.be.false;
    });
});

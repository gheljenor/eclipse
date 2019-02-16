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
                first: {name: "Player", ships: [0]},
                second: {name: "Enemy", ships: [1]},
                defender: "second",
            },
            ships: {
                counter: 1,
                list: {
                    0: {
                        type: EBattleShipType.interceptor,
                        count: 1, hp: 1, attack: 0, defence: 0, heal: 0, initiative: 0,
                        weapons: [0],
                    },
                    1: {
                        type: EBattleShipType.interceptor,
                        count: 1, hp: 1, attack: 0, defence: 0, heal: 0, initiative: 0,
                        weapons: [1],
                    },
                },
            },
            weapons: {
                counter: 1,
                list: {
                    0: {damage: EWeaponDamageType.yellow, type: EWeaponType.gun, count: 1},
                    1: {damage: EWeaponDamageType.yellow, type: EWeaponType.gun, count: 1},
                },
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
            state: "ready",
            duration: newState.summary.duration,
        });

        expect(newState.summary.duration).to.be.gte(0);
    });

    it("ACTION_APP_AUTOSIM", function () {
        const store = createStore(reducers);

        store.dispatch(actionAppAutoSim(true));
        expect(store.getState().app.autosim).to.be.true;

        store.dispatch(actionAppAutoSim(false));
        expect(store.getState().app.autosim).to.be.false;
    });
});

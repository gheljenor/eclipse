import {expect} from "chai";
import {describe, it} from "mocha";

import {createStore} from "redux";
import {EBattleShipType} from "../../../../src/battle/battleship";
import {actionShipUpdate} from "../../../../src/ui/components/ship/actions";
import {reducers} from "../../../../src/ui/reducers";

describe("ui-ship-actions", function () {
    it("ACTION_SHIP_UPDATE", function () {
        const store = createStore(reducers, {
            ships: {
                "first:0": {
                    type: EBattleShipType.interceptor,
                    count: 1,
                    hp: 1,
                    attack: 0,
                    defence: 0,
                    initiative: 0,
                    heal: 0,
                    weapons: [],
                },
            },
        });

        store.dispatch(actionShipUpdate("first:0", {attack: 2, defence: 3}));

        expect(store.getState().ships["first:0"]).to.be.eql({
            type: EBattleShipType.interceptor,
            count: 1,
            hp: 1,
            attack: 2,
            defence: 3,
            initiative: 0,
            heal: 0,
            weapons: [],
        });

        store.dispatch(actionShipUpdate("first:0", {
            type: EBattleShipType.cruiser,
            count: 2,
            hp: 3,
            attack: 4,
            defence: 5,
            initiative: 6,
            heal: 7,
        }));

        expect(store.getState().ships["first:0"]).to.be.eql({
            type: EBattleShipType.cruiser,
            count: 2,
            hp: 3,
            attack: 4,
            defence: 5,
            initiative: 6,
            heal: 7,
            weapons: [],
        });
    });
});

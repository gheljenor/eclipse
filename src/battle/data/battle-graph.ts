import {Battle} from "./battle";
import {BattleScene} from "./battle-scene";
import {BattleSceneTransition} from "./battle-scene-transition";

type BattleGraphProps = {
    hash: string;
    from: Map<BattleScene, BattleSceneTransition[]>;
    to: Map<BattleScene, BattleSceneTransition[]>;
    roots: Set<BattleScene>;
    leaves: Set<BattleScene>;
    transitions: BattleSceneTransition[];
    weights: Map<BattleScene, number>;
};

export class BattleGraph implements BattleGraphProps {
    public hash: string;
    public from: Map<BattleScene, BattleSceneTransition[]>;
    public to: Map<BattleScene, BattleSceneTransition[]>;
    public roots: Set<BattleScene>;
    public leaves: Set<BattleScene>;
    public transitions: BattleSceneTransition[];
    public weights: Map<BattleScene, number>;

    public accesability: Map<BattleScene, BattleScene[]>;

    constructor(props: BattleGraphProps) {
        Object.assign(this, props);
    }

    public static factory(battle: Battle, transitions: BattleSceneTransition[], excludeLeaf?: BattleScene): BattleGraph {
        if (excludeLeaf) {
            let total = 0;

            transitions = transitions.filter((transition) => {
                if (transition.to !== excludeLeaf) {
                    total += transition.weight;
                    return true;
                }
                return false;
            });

            transitions = transitions.map((transition) => {
                transition = BattleSceneTransition.factory(battle, transition.from, transition.to);
                transition.weight /= total;
                return transition;
            });
        }

        const hash = transitions.map((transition) => transition.hash).sort().join(",");

        const from: Map<BattleScene, BattleSceneTransition[]> = new Map();
        const to: Map<BattleScene, BattleSceneTransition[]> = new Map();

        for (const transition of transitions) {
            if (transition.from === transition.to) {
                continue;
            }

            if (!from.has(transition.from)) {
                from.set(transition.from, []);
            }
            from.get(transition.from).push(transition);

            if (!to.has(transition.to)) {
                to.set(transition.to, []);
            }
            from.get(transition.to).push(transition);
        }

        const roots = new Set();
        const leaves = new Set();

        for (const transition of transitions) {
            if (!from.has(transition.from)) {
                roots.add(transition.from);
            }

            if (!to.has(transition.to)) {
                leaves.add(transition.to);
            }
        }

        const battleGraph = new BattleGraph({hash, from, to, roots, leaves, transitions, weights: new Map()});

        return battleGraph;
    }

    public removeRings(): BattleGraph {

    }

    public accessableFrom(root: BattleScene) {
        const scenes = [root];

        while (scenes.length) {
            const scene = scenes.shift();
            const access = this.from.get(scene);
        }

    }

    public getSceneWeight(scene: BattleScene): number {
        if (this.roots.has(scene)) {
            return 1;
        }

        if (this.weights.has(scene)) {
            return this.weights.get(scene);
        }

        const ways = this.to.get(scene);
        let weight = 0;

        for (const way of ways) {
            weight += way.weight * this.getSceneWeight(way.from);
        }

        this.weights.set(scene, weight);

        return weight;
    }
}

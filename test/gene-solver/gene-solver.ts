import {expect} from "chai";
import {describe, it} from "mocha";

import {randomInt} from "../../src/math/random-int";
import {GeneSolver} from "../../src/gene-solver/gene-solver";

function shuffle(array: any[]) {
    array = array.slice();
    const result = [];

    while (array.length) {
        const i = randomInt(array.length - 1);
        result.push(
            array.splice(i, 1)[0],
        );
    }

    return result;
}

describe.skip("gene-solver", function () {
    it("sort", function () {
        function* generator(data: number[]): IterableIterator<number[]> {
            while (true) {
                yield shuffle(data);
            }
        }

        function breed(first: number[], second: number[]): number[] {
            const result = [];

            for (let i = 0; i < first.length; i++) {
                const a = first[i];
                const b = second[i];
                if (result.includes(a)) {
                    result.push(b);
                } else if (result.includes(b)) {
                    result.push(a);
                } else {
                    result.push(Math.random() > 0.5 ? a : b);
                }
            }

            return result;
        }

        function mutate(array: number[]): number[] {
            const result = array.slice();

            const from = randomInt(result.length - 1);
            const to = randomInt(result.length - 2);

            result.splice(to, 0, result.splice(from, 1)[0]);

            return result;
        }

        function appraise(array: number[]): number {
            let score = 0;
            const s = {};

            for (let i = 0; i < array.length; i++) {
                if (s[array[i]]) {
                    return null;
                }

                s[array[i]] = true;

                score -= Math.abs(i - array[i]);
            }

            return score;
        }

        const geneSolver = new GeneSolver({generator, appraise, breed, mutate}, {
            firstGeneration: 10,
            initial: 10,
            iterations: 10,
            breeders: 10,
            minChildren: 1,
            maxChildren: 3,
            mutations: 5,
            best: 3,
            worst: 3,
            random: 4,
        });

        const solution = geneSolver.calculate([6, 2, 7, 8, 3, 4, 9, 1, 5]);

        expect(solution).to.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
});

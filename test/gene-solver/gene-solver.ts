import {expect} from "chai";
import {describe, it} from "mocha";

import {randomInt} from "../../src/math/random-int";
import {GeneSolver} from "../../src/solvers/gene-solver";

describe("solvers-solver", function () {
    it("sort", function () {
        this.timeout(500);

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

        function* generator(data: number[]): IterableIterator<number[]> {
            while (true) {
                yield shuffle(data);
            }
        }

        function breed(first: number[], second: number[]): number[] {
            const start = randomInt(first.length - 2);
            const end = start + 1 + randomInt(Math.min(first.length - start, first.length / 1.5));

            const subset = second.slice(start, end);
            first = first.filter((i) => !subset.includes(i));

            return [
                ...first.slice(0, start),
                ...subset,
                ...first.slice(start),
            ];

        }

        function mutate(array: number[]): number[] {
            const result = array.slice();

            const from = randomInt(result.length - 1);
            const count = 1 + randomInt(result.length - 2);

            const subset = result.splice(from, count);
            const to = randomInt(result.length);

            result.splice(to, 0, ...subset);

            return result;
        }

        function appraise(array: number[]): number {
            let score = 0;

            for (let i = 0; i < array.length; i++) {
                score -= Math.abs(i + 1 - array[i]);
            }

            return score;
        }

        function options() {
            return {
                firstGeneration: 5,
                initial: 5,
                iterations: 5,

                freshBlood: 5,

                breeders: 20,
                minChildren: 2,
                maxChildren: 2,

                mutations: 20,

                best: 5,
                worst: 1,
                random: 4,
            };
        }

        const geneSolver = new GeneSolver({generator, appraise, breed, mutate, options});

        const test = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let success = 0;

        for (let i = 0; i < 100; i++) {
            try {
                const solution = geneSolver.calculate(shuffle(test));
                expect(solution).to.be.eql(test);
                success++;
            } catch (e) {
                /* empty */
            }
        }

        expect(success).to.be.gte(80);
    });
});

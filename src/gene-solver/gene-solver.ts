import {memo} from "../lib/memo";
import {randomInt} from "../math/random-int";

interface IGeneSolverOptions {
    firstGeneration: number;
    iterations: number;
    initial: number;

    best: number;
    worst: number;
    random: number;

    breeders: number;
    minChildren: number;
    maxChildren: number;

    mutations: number;
}

interface IGeneSolverCore<Solution> {
    generator: (data: any) => IterableIterator<Solution>;
    breed: (a: Solution, b: Solution) => Solution;
    mutate: (solution: Solution) => Solution;
    appraise: (solution: Solution) => number | null;
}

export class GeneSolver<Solution> {
    private generation: Solution[];
    private readonly appraise: (solution: Solution) => number | null;

    constructor(
        private readonly core: IGeneSolverCore<Solution>,
        private readonly options: IGeneSolverOptions,
    ) {
        this.appraise = memo(this.core.appraise);
    }

    public calculate(data: any): Solution {
        const best: Solution[] = [];

        const generator = this.core.generator(data);

        for (let i = 0; i < this.options.firstGeneration; i++) {
            console.log("generation", i);
            const candidates: Solution[] = [];

            for (const candidate of this.core.generator(data)) {
                candidates.push(candidate);

                if (candidates.length >= this.options.initial) {
                    break;
                }
            }

            best.push(this.generateOneBest(candidates));
        }

        return this.generateOneBest(best);
    }

    private generateOneBest(candidates: Solution[]): Solution {
        this.generation = candidates;

        for (let i = 0; i < this.options.iterations; i++) {
            console.log("iteration", i, this.generation.length);
            this.iteration();
        }

        return this.generation[0];
    }

    private iteration() {
        let generationNext = [...this.generation];

        this.breeding(generationNext);
        this.mutating(generationNext);

        generationNext = generationNext
            .filter((a) => this.appraise(a) != null)
            .sort((a, b) => this.appraise(b) - this.appraise(a));

        this.generation = [
            ...generationNext.slice(0, this.options.best),
            ...generationNext.slice(-this.options.worst),
        ];

        generationNext = generationNext.slice(this.options.best, -this.options.worst);

        for (let i = 0, l = Math.min(this.options.random, generationNext.length); i < l; i++) {
            this.generation.push(
                generationNext.splice(randomInt(generationNext.length - 1), 1)[0],
            );
        }
    }

    private breeding(generationNext) {
        for (let i = 0; i < this.options.breeders; i++) {
            const a = randomInt(this.generation.length - 1);
            const b = randomInt(this.generation.length - 1);

            // regenerate if parents are the same
            if (a === b) {
                i--;
                continue;
            }

            const count = this.options.minChildren
                + randomInt(this.options.maxChildren - this.options.minChildren);

            for (let k = 0; k < count; k++) {
                const child = this.core.breed(this.generation[a], this.generation[b]);
                generationNext.push(child);
            }
        }
    }

    private mutating(generationNext) {
        for (let i = 0; i < this.options.mutations; i++) {
            const idx = randomInt(this.generation.length - 1);
            const mutant = this.core.mutate(this.generation[idx]);
            generationNext.push(mutant);
        }
    }
}

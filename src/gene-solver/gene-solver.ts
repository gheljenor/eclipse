import {randomInt} from "../math/random-int";

export interface IGeneSolverCore<Solution> {
    generator: (data: any) => IterableIterator<Solution>;
    breed: (a: Solution, b: Solution) => Solution;
    mutate: (solution: Solution) => Solution;
    appraise: (solution: Solution) => number | null;
}

export interface IGeneSolverOptions {
    firstGeneration: number;
    iterations: number;
    initial: number;

    freshBlood: number;

    breeders: number;
    minChildren: number;
    maxChildren: number;

    mutations: number;

    best: number;
    worst: number;
    random: number;
}

export class GeneSolver<Solution> {
    public generation: Solution[];

    private generator: IterableIterator<Solution>;

    private readonly breedRandom: number;

    constructor(
        private readonly core: IGeneSolverCore<Solution>,
        private readonly options: IGeneSolverOptions,
    ) {
        this.breedRandom = this.options.maxChildren - this.options.minChildren;
    }

    public calculate(data: any): Solution {
        this.generator = this.core.generator(data);

        const best: Solution[] = [];

        for (let i = 0; i < this.options.firstGeneration; i++) {
            const candidates = this.spawnCandidates(this.options.initial);

            if (candidates.length) {
                best.push(this.generateOneBest(candidates));
            } else {
                break;
            }
        }

        return this.generateOneBest(best);
    }

    private spawnCandidates(count: number): Solution[] {
        if (!this.generator) {
            return [];
        }

        const result = [];

        for (let i = 0; i < count; i++) {
            const generated = this.generator.next();

            if (generated.done) {
                delete this.generator;
                break;
            }

            result.push(generated.value);
        }

        return result;
    }

    private generateOneBest(candidates: Solution[]): Solution {
        this.generation = candidates;

        for (let i = 0; i < this.options.iterations; i++) {
            this.iteration();
        }

        return this.generation[0];
    }

    private iteration() {
        let generationNext = this.generation
            .concat(this.spawnCandidates(this.options.freshBlood));

        this.breeding(generationNext);
        this.mutating(generationNext);

        generationNext = generationNext
            .filter((a) => this.core.appraise(a) != null)
            .sort((a, b) => this.core.appraise(b) - this.core.appraise(a));

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
        for (let i = 0, l = this.options.breeders; i < l; i++) {
            const a = randomInt(this.generation.length - 1);
            let b = randomInt(this.generation.length - 2);

            if (b >= a) {
                b++;
            }

            const count = this.options.minChildren + (this.breedRandom && randomInt(this.breedRandom));

            for (let k = 0; k < count; k++) {
                const child = this.core.breed(this.generation[a], this.generation[b]);
                generationNext.push(child);
            }
        }
    }

    private mutating(generationNext) {
        for (let i = 0, l = this.options.mutations; i < l; i++) {
            const idx = randomInt(this.generation.length - 1);
            const mutant = this.core.mutate(this.generation[idx]);
            generationNext.push(mutant);
        }
    }
}

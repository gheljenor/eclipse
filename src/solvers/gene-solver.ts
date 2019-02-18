import {uniqueOp} from "../lib/unique-op";
import {randomInt} from "../math/random-int";

export interface IGeneSolverCore<Solution, Data> {
    generator: (data: Data) => IterableIterator<Solution>;
    breed: (a: Solution, b: Solution) => Solution;
    mutate: (solution: Solution) => Solution;
    appraise: (solution: Solution) => number | null;
    hash: (a: Solution) => string;
    options: (data: Data) => IGeneSolverOptions;
}

export interface IGeneSolverOptions {
    firstGeneration: number;
    secondGeneration: number;
    maxIterations: number;

    freshBlood: number;

    breeders: number;
    minChildren: number;
    maxChildren: number;

    mutations: number;

    best: number;
    worst: number;
    random: number;
}

export class GeneSolver<Solution, Data> {
    private generation: Solution[];
    private generatorInstance: IterableIterator<Solution>;

    private options: IGeneSolverOptions;
    private breedRandom: number;

    constructor(
        private readonly core: IGeneSolverCore<Solution, Data>,
    ) {

    }

    public calculate(data: Data): Solution {
        this.options = this.core.options(data);
        this.breedRandom = this.options.maxChildren - this.options.minChildren;

        this.generatorInstance = this.core.generator(data);

        const best: Solution[] = [];

        for (let i = 0; i < this.options.secondGeneration; i++) {
            const candidates = this.spawnCandidates(this.options.firstGeneration);

            if (candidates.length) {
                best.push(this.generateOneBest(candidates));
            }

            if (!candidates.length || !this.generatorInstance) {
                break;
            }
        }

        return this.generateOneBest(best);
    }

    private spawnCandidates(count: number): Solution[] {
        if (!this.generatorInstance) {
            return [];
        }

        const result = [];

        for (let i = 0; i < count; i++) {
            const generated = this.generatorInstance.next();

            if (generated.done) {
                delete this.generatorInstance;
                break;
            }

            result.push(generated.value);
        }

        return result;
    }

    private generateOneBest(candidates: Solution[]): Solution {
        this.generation = candidates;

        let lastBest: string = this.core.hash(this.generation[0]);
        let sameResult: number = 0;

        for (let i = 0; i < this.options.maxIterations; i++) {
            this.iteration();

            if (!this.generatorInstance) {
                break;
            }

            const hash = this.core.hash(this.generation[0]);

            if (hash === lastBest) {
                sameResult++;
            } else {
                sameResult = 0;
            }

            if (sameResult > 2) {
                break;
            }

            lastBest = hash;
        }

        return this.generation[0];
    }

    private iteration() {
        let generationNext = this.generation
            .concat(this.spawnCandidates(this.options.freshBlood));

        this.breeding(generationNext);
        this.mutating(generationNext);

        const filterUnique = uniqueOp(this.core.hash);

        generationNext = generationNext
            .filter((a) => this.core.appraise(a) != null && filterUnique(a))
            .sort((a, b) => {
                const rate = this.core.appraise(b) - this.core.appraise(a);
                if (rate !== 0) {
                    return rate;
                }
                const ha = this.core.hash(a);
                const hb = this.core.hash(b);
                return hb > ha ? 1 : -1;
            });

        this.generation = [
            ...generationNext.slice(0, this.options.best),
            ...(this.options.worst ? generationNext.slice(-this.options.worst) : []),
        ];

        if (!this.generatorInstance) {
            return;
        }

        generationNext = generationNext.slice(this.options.best, -this.options.worst);

        for (let i = 0, l = Math.min(this.options.random, generationNext.length); i < l; i++) {
            this.generation.push(
                generationNext.splice(randomInt(generationNext.length - 1), 1)[0],
            );
        }
    }

    private breeding(generationNext) {
        if (!this.generatorInstance || this.generation.length < 2) {
            return;
        }

        const breeders = Math.min(Math.pow(this.generation.length, 2), this.options.breeders);

        for (let i = 0; i < breeders; i++) {
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
        if (!this.generatorInstance) {
            return;
        }

        for (let i = 0, l = this.options.mutations; i < l; i++) {
            const idx = randomInt(this.generation.length - 1);
            const mutant = this.core.mutate(this.generation[idx]);
            generationNext.push(mutant);
        }
    }
}

import {memo} from "../lib/memo";

export const factorial = memo(function (x: number): number {
    if (x < 2) {
        return 1;
    }

    return x * factorial(x - 1);
});

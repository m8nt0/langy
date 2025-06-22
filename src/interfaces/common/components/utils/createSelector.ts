/**
 * A very simple memoization utility for creating selectors.
 * It only re-calculates the result if the inputs have changed.
 */
export function createSelector<S extends any[], R>(
    inputFuncs: { [K in keyof S]: { getState: () => S[K] } | ((...args: any[]) => S[K]) },
    computeFn: (...args: S) => R
): () => R {
    let lastInputs: S | null = null;
    let lastResult: R | null = null;

    return () => {
        const nextInputs = inputFuncs.map(fn => 'getState' in fn ? fn.getState() : fn()) as S;

        if (lastInputs && lastInputs.every((val, i) => val === nextInputs[i])) {
            return lastResult as R;
        }

        lastInputs = nextInputs;
        lastResult = computeFn(...nextInputs);
        return lastResult;
    };
}
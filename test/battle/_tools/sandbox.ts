export function graphSandbox(graph, start, exclude, iterations = 1000000) {
    const runs = [];
    const result = [];
    const waysList = {};
    const invertWays = {};
    const graphEntires = Object.keys(graph);

    graphEntires.forEach((from) => {
        waysList[from] = Object.keys(graph[from]);
        result[from] = 0;

        for (const to of waysList[from]) {
            result[to] = 0;
            if (exclude[from] !== to) {
                invertWays[to] = from;
            }
        }
    });

    for (let i = 0; i < iterations; i++) {
        let nodeName = start;
        let node;

        while (node = graph[nodeName]) {
            let rand = Math.random();

            for (const way of waysList[nodeName]) {
                rand -= node[way];
                nodeName = way;
                if (rand < 0) {
                    break;
                }
            }
        }

        runs.push(nodeName);
    }

    for (const from in exclude) {
        delete graph[from][exclude[from]];
    }

    for (const run of runs) {
        let node = run;
        do {
            result[node]++;
        } while (node = invertWays[node]);
    }

    for (const from of graphEntires) {
        let total = 0;
        const ways = Object.keys(graph[from]);
        for (const to of ways) {
            total += result[to];
        }
        for (const to of ways) {
            result[to] /= total;
        }
    }

    return result;
}

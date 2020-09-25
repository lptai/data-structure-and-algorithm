const bfs = (s, graph) => {
    const queue = [];
    const path = Array(arr.length).fill(-1);
    const visited = Array(arr.length).fill(false);

    visited[s] = true;
    queue.push(s);

    while (queue.length > 0) {
        let u = queue.shift();
        for (let i = 0; i < graph[u].length; i++) {
            let v = graph[u][i];
            if (!visited[v]) {
                visited[v] = true;
                queue.push(v);
                path[v] = u;
            }
        }
    }

    return path;
};

const printPath = (s, f, path) => {
    if (s === f) {
        return;
    }

    if (path[f] === -1) {
        console.log('No path');
    }


}
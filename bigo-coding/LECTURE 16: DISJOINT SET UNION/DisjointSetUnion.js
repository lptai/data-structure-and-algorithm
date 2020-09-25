const parent = [];

const makeSet = () => {
    for (let i = 1; i <= 500000; i++) {
        parent[i] = i;
    }
};

const findSet = (u) => {
    while (u !== parent[u]) {
        u = parent[u];
    }

    return u;
};

const unionSet = (u, v) => {
    const up = findSet(u);
    const vp = findSet(v);

    parent[up] = vp;
};



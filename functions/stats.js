export async function onRequestGet({ env, request, waitUntil }) {
    let res = await caches.default.match(request.url);

    if (res) {
        res = await res.json();
        waitUntil(getStats(env).then(r => caches.default.put(request.url, new Response(JSON.stringify(r), {
            headers: {
                'content-type': 'application/json',
                'cache-control': 'public, max-age=3600'
            }
        }))));
    } else {
        res = await getStats(env);
        waitUntil(caches.default.put(request.url, new Response(JSON.stringify(res), {
            headers: {
                'content-type': 'application/json',
                'cache-control': 'public, max-age=3600'
            }
        })));
    }

    return new Response(JSON.stringify(res), {
        headers: {
            'content-type': 'application/json',
            'cache-control': 'no-cache, no-store, must-revalidate, max-age=0'
        }
    });
}

async function getStats(env) {
    const query = `{
        a: repository(owner: "HienMinh56", name: "SellingDrawingCoure ") { stargazers { totalCount } forks { totalCount } }
        b: repository(owner: "HienMinh56", name: "BookStoreManagement-C-Sharp") { stargazers { totalCount } forks { totalCount } }
        c: repository(owner: "HienMinh56", name: "NodeJS-ExpressJS-Handlebars") { stargazers { totalCount } forks { totalCount } }

        z: user(login: "HienMinh56") {
            repositories(first: 100, ownerAffiliations: OWNER) {
                nodes {
                    stargazerCount
                    forkCount
                }
            }
            contributionsCollection {
                totalCommitContributions
            }
            pullRequests(first: 1) {
                totalCount
            }
            issues(first: 1) {
                totalCount
            }
            repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
                totalCount
            }
        }
    }`;

    const { data } = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'authorization': `bearer ${env.GITHUB_TOKEN}`,
            'user-agent': 'HienMinh56'
        },
        body: JSON.stringify({ query })
    }).then(r => r.json());

    const repos = Object.values(data);
    const stats = repos.pop();

    const statsArr = [
        stats.repositories.nodes.reduce((a, b) => a + b.stargazerCount, 0),
        stats.repositories.nodes.reduce((a, b) => a + b.forkCount, 0),
        stats.contributionsCollection.totalCommitContributions,
        stats.pullRequests.totalCount,
        stats.issues.totalCount,
        stats.repositoriesContributedTo.totalCount
    ];

    const res = repos.map(i => ([
        i.stargazers.totalCount,
        i.forks.totalCount
    ]));

    res.push(statsArr);

    return res;
}
import Arweave from 'arweave';

import * as ArcFramework from 'arcframework';

/*
    Goldsky
    - multiple connections working with getPools query
    - neither connection works for getArtifacts

    Arweave.net
    - multiple connections intermitten with getPools query
*/

(async function () {
    console.log(`Testing Artifacts By Pool GQL Request ...`);
    const gqlData: ArcFramework.ArtifactResponseType = await ArcFramework.getArtifactsByPool({
        ids: ['zoljIRyzG5hp-R4EZV2q8kFI49OAoy23_B9YJ_yEEws'],
        owner: null,
        uploader: null,
        cursor: null,
        reduxCursor: 'poolAll',
    });

    console.log({
        contracts: gqlData.contracts.length,
        nextCursor: gqlData.nextCursor,
        previousCursor: gqlData.previousCursor,
    });
})();

(async function () {
    const data: any = [];
    // const ids = JSON.stringify(['zoljIRyzG5hp-R4EZV2q8kFI49OAoy23_B9YJ_yEEws']);
    // const ids = ['zoljIRyzG5hp-R4EZV2q8kFI49OAoy23_B9YJ_yEEws'];
    // const tags: any = JSON.stringify([
    //     {
    //         name: 'Pool-Id',
    //         values: ['zoljIRyzG5hp-R4EZV2q8kFI49OAoy23_B9YJ_yEEws'],
    //     },
    // ]).replace(/"([^"]+)":/g, '$1:');

    const tagFilters = [
        {
            name: 'Pool-Id',
            values: ['zoljIRyzG5hp-R4EZV2q8kFI49OAoy23_B9YJ_yEEws']
        }
    ]

    // const tagFilters = [{name:"App-Type",values:["Alex-Archiving-Pool-v1.2","Alex-Archiving-Pool-v1.4"]}]

    // [{name:"App-Type",values:["Alex-Archiving-Pool-v1.2","Alex-Archiving-Pool-v1.4"]}]

    const tags = tagFilters ? unquoteJsonKeys(tagFilters) : null;

    // const tags = [
    //     {
    //         name: "Pool-Id",
    //         values: JSON.stringify(['zoljIRyzG5hp-R4EZV2q8kFI49OAoy23_B9YJ_yEEws'])
    //     }
    // ].map(tag => `{name:${JSON.stringify(tag.name)},values:${tag.values}}`).join(',');

    // const tagsString = `[${tags}]`;

    // const tags = JSON.stringify([
    //     {
    //         name: 'Pool-Id',
    //         values: ['zoljIRyzG5hp-R4EZV2q8kFI49OAoy23_B9YJ_yEEws'],
    //     },
    // ]).replace(/"([^"]+)":/g, '$1:').replace(/\\\"/g, '"');

    const operation = {
        query: `
                query {
                    transactions(
                        ids: null,
                        tags: ${tags},
                        owners: null,
                        first: 100, 
                        after: null
                    ){
                    edges {
                        cursor
                        node {
                            id
                            tags {
                                name 
                                value 
                            }
                            data {
                                size
                                type
                            }
                        }
                    }
                }
            }
        `,
    };

    console.log(operation);

    const GET_ENDPOINT = 'arweave-search.goldsky.com';

    const PORT = 443;
    const PROTOCOL = 'https';
    const TIMEOUT = 40000;
    const LOGGING = false;

    const arweaveGet: any = Arweave.init({
        host: GET_ENDPOINT,
        port: PORT,
        protocol: PROTOCOL,
        timeout: TIMEOUT,
        logging: LOGGING,
    });

    const response = await arweaveGet.api.post('/graphql', operation);
    console.log(response);
    if (response.data.data) {
        const responseData = response.data.data.transactions.edges;
        if (responseData.length > 0) {
            data.push(...responseData);
        }
    }

    console.log({ data: data, nextCursor: null });
})();

function unquoteJsonKeys(json: Object): string {
    return JSON.stringify(json).replace(/"([^"]+)":/g, '$1:')
}

function convertQuery(queryObject) {
    const query = queryObject.query;
    const escapedTags = query.replace(/(\[.*?\])/g, (match) => `\\"${match}\\"`);
    return {
        query: escapedTags
    };
}
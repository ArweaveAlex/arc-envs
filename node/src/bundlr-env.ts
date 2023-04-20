import fs from 'fs';

import Bundlr from '@bundlr-network/client';
import * as ArcFramework from 'arcframework';

(async function () {
    const jwk = JSON.parse(Buffer.from(fs.readFileSync('./wallets/wallet.json')).toString('utf-8'));

    /* Uncomment bundlr instantiation and GQL will not run */
    // const bundlr = new Bundlr('https://node2.bundlr.network', 'arweave', jwk);
    
    const gqlData: ArcFramework.ArtifactResponseType = await ArcFramework.getArtifactsByPool({
        ids: ['zoljIRyzG5hp-R4EZV2q8kFI49OAoy23_B9YJ_yEEws'],
        owner: null,
        uploader: null,
        cursor: null,
        reduxCursor: 'poolAll',
    });
    
    console.log(gqlData);
})();
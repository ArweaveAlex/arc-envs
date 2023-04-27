import fs from 'fs';

import Bundlr from '@bundlr-network/client';
import * as ArcFramework from 'arcframework';

(async function () {
    const jwk = JSON.parse(Buffer.from(fs.readFileSync('./wallets/wallet.json')).toString('utf-8'));

    /* Uncomment bundlr instantiation and GQL will not run with Alex. Pool Id value */
    const bundlr = new Bundlr('https://node2.bundlr.network', 'arweave', jwk);
    
    // Both log 200 response from Arweave
    // Works - A4wHgj_FqirSt6LiVejyoSqC_DSF22mUFqh4lz5XOIg
    // Fails - zoljIRyzG5hp-R4EZV2q8kFI49OAoy23_B9YJ_yEEws
    const gqlData: ArcFramework.ArtifactResponseType = await ArcFramework.getArtifactsByPool({
        ids: ['A4wHgj_FqirSt6LiVejyoSqC_DSF22mUFqh4lz5XOIg'],
        owner: null,
        uploader: null,
        cursor: null,
        reduxCursor: 'poolAll',
    });
    
    console.log(gqlData);
})();
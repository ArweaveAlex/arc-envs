import React from 'react';

// import { WebBundlr } from '@bundlr-network/client';
import * as ArcFramework from 'arcframework';

export default function App() {
	const [time, setTime] = React.useState<number>(0);
	const [loading, setLoading] = React.useState<boolean>(false);
	
	// const gqlData: ArcFramework.ArtifactResponseType = await ArcFramework.getArtifactsByPool({
	// 	ids: ['zoljIRyzG5hp-R4EZV2q8kFI49OAoy23_B9YJ_yEEws'],
	// 	owner: null,
	// 	uploader: null,
	// 	cursor: null,
	// 	reduxCursor: 'poolAll',
	// });

	// const gqlData: ArcFramework.ArtifactResponseType = await ArcFramework.getArtifactsByUser({
	// 	ids: null,
	// 	owner: 'uf_FqRvLqjnFMc8ZzGkF4qWKuNmUIQcYP0tPlCGORQk',
	// 	uploader: null,
	// 	cursor: null,
	// 	reduxCursor: 'accountAll',
	// });

	React.useEffect(() => {
		(async function () {
			const t0 = performance.now();
			setLoading(true);
			const gqlData: ArcFramework.ArtifactResponseType = await ArcFramework.getArtifactsByPool({
				ids: ['zoljIRyzG5hp-R4EZV2q8kFI49OAoy23_B9YJ_yEEws'],
				owner: null,
				uploader: null,
				cursor: null,
				reduxCursor: 'poolAll',
			});

			const pools = await ArcFramework.getPools();

			console.log(pools)

			console.log({
				contracts: gqlData.contracts.length,
				nextCursor: gqlData.nextCursor,
				previousCursor: gqlData.previousCursor,
			});
			const t1 = performance.now();
			setLoading(false);
			setTime((t1 - t0) / 1000);
		})();
	}, []);

	return <div>{loading ? `Loading...` : `Execution time ${time}s`}</div>;
}

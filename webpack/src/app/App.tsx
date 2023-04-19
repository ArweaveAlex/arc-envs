import React from 'react';

// import { WebBundlr } from '@bundlr-network/client';
import * as ArcFramework from 'arcframework';

export default function App() {
	const [loading, setLoading] = React.useState<boolean>(false);
	const [pools, setPools] = React.useState<ArcFramework.PoolType[] | null>(null);
	
	// const bundlr = new WebBundlr('https://node2.bundlr.network', 'arweave', '');

	React.useEffect(() => {
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
	}, [])

	// React.useEffect(() => {
	// 	(async function () {
	// 		setLoading(true);
	// 		setPools(await ArcFramework.getPools());
	// 		setLoading(false);
	// 	})();
	// }, []);

	function getData() {
		if (loading) {
			return <p>Loading ...</p>;
		} else {
			if (pools && pools.length) {
				return (
					<>
						{pools.map((pool: ArcFramework.PoolType, index: number) => {
							return (
								<div key={index}>
									<p>{`${pool.state.title}: ${pool.id}`}</p>
								</div>
							);
						})}
					</>
				);
			} else {
				return null;
			}
		}
	}

	return <div>{getData()}</div>;
}

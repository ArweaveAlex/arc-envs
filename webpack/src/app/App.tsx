import React from 'react';
import { WebBundlr } from '@bundlr-network/client';

import { getPools, PoolType } from 'arcframework';

export default function App() {
	const [loading, setLoading] = React.useState<boolean>(false);
	const [pools, setPools] = React.useState<PoolType[] | null>(null);
	
	const bundlr = new WebBundlr('https://node2.bundlr.network', 'arweave', '');

	React.useEffect(() => {
		(async function () {
			setLoading(true);
			setPools(await getPools());
			setLoading(false);
		})();
	}, []);

	function getData() {
		if (loading) {
			return <p>Loading ...</p>;
		} else {
			if (pools && pools.length) {
				return (
					<>
						{pools.map((pool: PoolType, index: number) => {
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

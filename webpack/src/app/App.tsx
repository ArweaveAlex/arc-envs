import React from 'react';

import { getPools } from 'arcframework';

export default function App() {
	const [loading, setLoading] = React.useState<boolean>(false);
	const [pools, setPools] = React.useState<any[] | null>(null);

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
						{pools.map((pool: any) => {
                            return (
                                <p>{`${pool.state.title}: ${pool.id}`}</p>
                            )
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

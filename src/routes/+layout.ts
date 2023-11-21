import { db } from './../lib/db';
import { collection, onSnapshot } from 'firebase/firestore';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = () => {
	let ranking: object[] = [];
	const query = collection(db, 'rats');
	onSnapshot(query, (snapshot) => {
		snapshot.docChanges().forEach((doc) => {
			if (doc.type === 'added') {
				ranking.push(doc.doc.data());
			}
		});
	});

	return { data: ranking };
};

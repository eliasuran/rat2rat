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
		ranking = ranking.sort((a: any, b: any) => b.ratsSent - a.ratsSent);
	});

	return { data: ranking };
};

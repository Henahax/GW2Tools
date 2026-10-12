import type { PageServerLoad } from './$types';
import resetData from './reset.json';

const taskIds = resetData.flatMap((interval) =>
	interval.categories.flatMap((category) => category.tasks.map((task) => task.id))
);

export const load: PageServerLoad = ({ cookies }) => ({
	resetCookies: taskIds.flatMap((namespace) =>
		(['display', 'daily', 'weekly'] as const).flatMap((subname) => {
			const value = cookies.get(`${namespace}.${subname}`);
			return value === undefined ? [] : [{ namespace, subname, value }];
		})
	)
});

import type { FilterItem } from '@api/types/Filter'

import { filterItems } from '@temp/filterData'

const FETCH_DELAY_MS = 1000

export const fetchFilters = async (): Promise<FilterItem[]> => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(filterItems)
		}, FETCH_DELAY_MS)
	})
}

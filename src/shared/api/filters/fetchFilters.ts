import type { FilterItem } from '@api/types/Filter'

import data from '@temp/filterData.json'

const FETCH_DELAY_MS = 1000

export const fetchFilters = async (): Promise<FilterItem[]> => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(data.filterItems as FilterItem[])
		}, FETCH_DELAY_MS)
	})
}

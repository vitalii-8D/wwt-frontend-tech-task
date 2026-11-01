import type { FilterItem } from '@api/types/Filter'

import data from './filterData.json'

// Stand-in for the typed API response: the JSON is typed once here so API code
// does not cast.
export const filterItems = data.filterItems as FilterItem[]

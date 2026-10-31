import { create } from 'zustand'

import type { SearchRequestFilter } from '@api/types/SearchRequest/SearchRequestFilter'

interface FilterState {
	filter: SearchRequestFilter
	setFilter: (filter: SearchRequestFilter) => void
}

export const useFilterStore = create<FilterState>()(set => ({
	filter: [],
	setFilter: filter => set({ filter })
}))

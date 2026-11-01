import { useState } from 'react'

import type { FilterChoose, FilterItem } from '@api/types/Filter'

import { useFilterStore } from '@store/filterStore'

import {
	type FilterDraft,
	toDraft,
	toSearchRequestFilter,
	toggleAll,
	toggleOption
} from './filterDraft'

interface UseFilterDraft {
	draft: FilterDraft
	toggle: (filterId: string, optionId: string) => void
	toggleAll: (item: FilterChoose) => void
	save: () => void
}

export const useFilterDraft = (items: FilterItem[]): UseFilterDraft => {
	const saved = useFilterStore(state => state.filter)
	const setFilter = useFilterStore(state => state.setFilter)
	const [draft, setDraft] = useState(() => toDraft(saved))

	return {
		draft,
		toggle: (filterId, optionId) =>
			setDraft(prev => toggleOption(prev, filterId, optionId)),
		toggleAll: item => setDraft(prev => toggleAll(prev, item)),
		save: () => setFilter(toSearchRequestFilter(draft, items))
	}
}

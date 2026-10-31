import {
	type FilterChoose,
	type FilterItem,
	FilterType
} from '@api/types/Filter'
import type { SearchRequestFilter } from '@api/types/SearchRequest/SearchRequestFilter'

export type FilterDraft = Record<string, ReadonlySet<string>>

export const toDraft = (saved: SearchRequestFilter): FilterDraft => {
	return Object.fromEntries(
		saved.map(item => [item.id, new Set(item.optionsIds)])
	)
}

export const toggleOption = (
	draft: FilterDraft,
	filterId: string,
	optionId: string
): FilterDraft => {
	const next = new Set(draft[filterId])
	if (next.has(optionId)) {
		next.delete(optionId)
	} else {
		next.add(optionId)
	}
	return { ...draft, [filterId]: next }
}

export const toggleAll = (
	draft: FilterDraft,
	filter: FilterChoose
): FilterDraft => {
	const current = draft[filter.id]
	const isAllSelected = filter.options.every(option => current?.has(option.id))
	const next = isAllSelected
		? new Set<string>()
		: new Set(filter.options.map(option => option.id))
	return { ...draft, [filter.id]: next }
}

export const toSearchRequestFilter = (
	draft: FilterDraft,
	items: FilterItem[]
): SearchRequestFilter => {
	return items.flatMap(item => {
		const selected = draft[item.id]
		const optionsIds = item.options
			.map(option => option.id)
			.filter(id => selected?.has(id))
		return optionsIds.length > 0
			? [{ id: item.id, type: FilterType.OPTION as const, optionsIds }]
			: []
	})
}

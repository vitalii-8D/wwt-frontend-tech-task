import { useQuery } from '@tanstack/react-query'

import { fetchFilters } from './fetchFilters'

export const filtersQueryKey = ['filters'] as const

export const useFiltersQuery = () => {
	return useQuery({
		queryKey: filtersQueryKey,
		queryFn: fetchFilters,
		staleTime: Infinity
	})
}

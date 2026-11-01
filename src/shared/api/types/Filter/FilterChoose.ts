import type { FilterBase } from './FilterBase'
import type { FilterChooseOption } from './FilterChooseOption'
import type { FilterType } from './FilterType'

export interface FilterChoose extends FilterBase {
	type: FilterType.OPTION
	allowAll?: boolean
	options: FilterChooseOption[]
}

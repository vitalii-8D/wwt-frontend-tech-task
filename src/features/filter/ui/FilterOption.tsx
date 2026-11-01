import type { FilterChooseOption } from '@api/types/Filter'

import { Checkbox } from '@components/Checkbox'
import { InfoTooltip } from '@components/InfoTooltip'

interface FilterOptionProps {
	filterId: string
	option: FilterChooseOption
	isChecked: boolean
	onToggle: (filterId: string, optionId: string) => void
}

export const FilterOption = ({
	filterId,
	option,
	isChecked,
	onToggle
}: FilterOptionProps) => (
	<div className="flex min-h-11 break-inside-avoid items-center gap-4 pb-4 lg:min-h-0">
		<Checkbox
			id={`${filterId}-${option.id}`}
			label={option.name}
			checked={isChecked}
			onChange={() => onToggle(filterId, option.id)}
		/>
		{option.description ? (
			<InfoTooltip description={option.description} />
		) : null}
	</div>
)

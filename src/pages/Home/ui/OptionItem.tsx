import { FilterChooseOption } from '@/shared/api/types/Filter'
import InfoIcon from '@assets/info.svg?react'

interface OptionItemProps {
	itemId: string
	option: FilterChooseOption
	onToggle: (filterId: string, optionId: string) => void
	isChecked: boolean
}

export const OptionItem = ({
	itemId,
	option,
	onToggle,
	isChecked
}: OptionItemProps) => {
	return (
		<div
			key={option.id}
			title={option.description}
			className="flex items-center gap-4"
		>
			<input
				id={`${itemId}-${option.id}`}
				type="checkbox"
				className="filter-checkbox"
				checked={isChecked}
				onChange={() => onToggle(itemId, option.id)}
			/>
			<label htmlFor={`${itemId}-${option.id}`}>{option.name}</label>
			{option.description ? (
				<span title={option.description}>
					<InfoIcon aria-hidden="true" />
				</span>
			) : null}
		</div>
	)
}

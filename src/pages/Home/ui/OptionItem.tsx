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
			className="flex min-h-11 break-inside-avoid items-center gap-4 pb-4 lg:min-h-0"
		>
			<input
				id={`${itemId}-${option.id}`}
				type="checkbox"
				className="filter-checkbox"
				checked={isChecked}
				onChange={() => onToggle(itemId, option.id)}
			/>
			<label
				htmlFor={`${itemId}-${option.id}`}
				className="min-w-0 break-words"
			>
				{option.name}
			</label>
			{option.description ? (
				<span title={option.description}>
					<InfoIcon aria-hidden="true" />
				</span>
			) : null}
		</div>
	)
}

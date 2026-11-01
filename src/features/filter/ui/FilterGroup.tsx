import { useId } from 'react'
import { useTranslation } from 'react-i18next'

import type { FilterChoose } from '@api/types/Filter'

import { Checkbox } from '@components/Checkbox'
import { InfoTooltip } from '@components/InfoTooltip'

import { type FilterDraft, isAllSelected } from '../model/filterDraft'
import { FilterOption } from './FilterOption'

interface FilterGroupProps {
	item: FilterChoose
	draft: FilterDraft
	onToggle: (filterId: string, optionId: string) => void
	onToggleAll: (item: FilterChoose) => void
}

export const FilterGroup = ({
	item,
	draft,
	onToggle,
	onToggleAll
}: FilterGroupProps) => {
	const { t } = useTranslation()
	const allId = useId()
	const selected = draft[item.id]

	return (
		<fieldset className="border-b border-grey-200 py-6 sm:py-8">
			<legend className="float-left mb-4 flex flex-wrap items-center gap-2 text-xl font-medium sm:mb-6 sm:text-2xl">
				{item.allowAll ? (
					<Checkbox
						id={allId}
						label={t('all')}
						checked={isAllSelected(draft, item)}
						onChange={() => onToggleAll(item)}
					/>
				) : null}
				{item.name}
				{item.description ? (
					<InfoTooltip description={item.description} />
				) : null}
			</legend>
			<div className="clear-both columns-1 gap-x-8 sm:columns-2 lg:columns-3">
				{item.options.map(option => (
					<FilterOption
						key={option.id}
						filterId={item.id}
						option={option}
						isChecked={selected?.has(option.id) ?? false}
						onToggle={onToggle}
					/>
				))}
			</div>
		</fieldset>
	)
}

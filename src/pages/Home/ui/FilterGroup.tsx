import { useId } from 'react'
import { useTranslation } from 'react-i18next'

import type { FilterChoose } from '@api/types/Filter'

import InfoIcon from '@assets/info.svg?react'

import type { FilterDraft } from '../model/filterDraft'
import { OptionItem } from './OptionItem.tsx'

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
	const { t } = useTranslation('filter')
	const allId = useId()
	const selected = draft[item.id]
	const isAllSelected = item.options.every(option => selected?.has(option.id))
	const rows = Math.ceil(item.options.length / 3)

	return (
		<fieldset className="border-b border-grey-200 py-8">
			<legend className="float-left mb-6 flex items-center gap-2 text-2xl font-medium">
				{item.allowAll ? (
					<div className="flex items-center gap-4">
						<input
							id={allId}
							type="checkbox"
							className="filter-checkbox"
							checked={isAllSelected}
							onChange={() => onToggleAll(item)}
						/>
						<label htmlFor={allId}>{t('all')}</label>
					</div>
				) : null}
				{item.name}
				{item.description ? (
					<span title={item.description}>
						<InfoIcon aria-hidden="true" />
					</span>
				) : null}
			</legend>
			<div
				className="grid clear-both grid-flow-col grid-cols-3 gap-x-8 gap-y-4"
				style={{ gridTemplateRows: `repeat(${rows}, auto)` }}
			>
				{item.options.map(option => (
					<OptionItem
						itemId={item.id}
						option={option}
						onToggle={onToggle}
						isChecked={selected?.has(option.id) ?? false}
						key={option.id}
					/>
				))}
			</div>
		</fieldset>
	)
}

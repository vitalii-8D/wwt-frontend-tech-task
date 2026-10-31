import { type FormEvent, useId, useState } from 'react'
import { useTranslation } from 'react-i18next'

import type { FilterItem } from '@api/types/Filter'

import CloseIcon from '@assets/close.svg?react'
import { Dialog } from '@components/Dialog'
import { useFilterStore } from '@store/filterStore'

import {
	toDraft,
	toSearchRequestFilter,
	toggleAll,
	toggleOption
} from '../model/filterDraft'
import { ConfirmDialog } from './ConfirmDialog'
import { FilterGroup } from './FilterGroup'

interface FilterModalProps {
	items: FilterItem[]
	onClose: () => void
}

export const FilterModal = ({ items, onClose }: FilterModalProps) => {
	const { t } = useTranslation('filter')
	const titleId = useId()
	const [draft, setDraft] = useState(() =>
		toDraft(useFilterStore.getState().filter)
	)
	const [isConfirming, setConfirming] = useState(false)

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault()
		setConfirming(true)
	}

	const handleConfirm = () => {
		useFilterStore.getState().setFilter(toSearchRequestFilter(draft, items))
		onClose()
	}

	return (
		<Dialog
			onClose={onClose}
			labelledBy={titleId}
			className="m-auto max-h-dvh w-full max-w-7xl overflow-y-auto rounded-card bg-white p-8 backdrop:bg-black/40"
		>
			<form onSubmit={handleSubmit}>
				<header className="relative flex items-center justify-center border-b border-grey-200 pb-8">
					<h2
						id={titleId}
						className="text-[40px] font-medium"
					>
						{t('title')}
					</h2>

					<button
						type="button"
						aria-label={t('close')}
						onClick={onClose}
						className="absolute right-0"
					>
						<CloseIcon aria-hidden="true" />
					</button>
				</header>

				{items.map(item => (
					<FilterGroup
						key={item.id}
						item={item}
						draft={draft}
						onToggle={(filterId, optionId) =>
							setDraft(prev => toggleOption(prev, filterId, optionId))
						}
						onToggleAll={filter => setDraft(prev => toggleAll(prev, filter))}
					/>
				))}

				<footer className="mt-8 flex justify-center">
					<button
						type="submit"
						className="w-[184px] rounded-card bg-brand py-4 font-semibold text-white"
					>
						{t('apply')}
					</button>
				</footer>
			</form>

			{isConfirming ? (
				<ConfirmDialog
					onConfirm={handleConfirm}
					onCancel={() => setConfirming(false)}
					onDiscard={onClose}
				/>
			) : null}
		</Dialog>
	)
}

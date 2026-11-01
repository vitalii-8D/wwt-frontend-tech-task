import { type FormEvent, useId, useState } from 'react'
import { useTranslation } from 'react-i18next'

import type { FilterItem } from '@api/types/Filter'

import CloseIcon from '@assets/close.svg?react'
import { Button } from '@components/Button'
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
			className="m-0 h-dvh max-h-none w-full max-w-none scroll-py-20 overflow-y-auto rounded-none bg-white p-4 backdrop:bg-black/40 sm:m-auto sm:h-auto sm:max-h-dvh sm:max-w-7xl sm:rounded-card sm:p-6 lg:p-8"
		>
			<form onSubmit={handleSubmit}>
				<header className="sticky top-0 z-10 -mt-4 flex items-center justify-center border-b border-grey-200 bg-white pt-4 pb-4 sm:relative sm:mt-0 sm:pt-0 sm:pb-8 lg:pt-2 lg:pb-[25px]">
					<h2
						id={titleId}
						className="px-10 text-center text-2xl font-medium sm:px-0 sm:text-3xl lg:text-[40px]"
					>
						{t('title')}
					</h2>

					<button
						type="button"
						aria-label={t('close')}
						onClick={onClose}
						className="absolute right-0 flex size-11 items-center justify-center lg:size-auto"
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

				<footer className="sticky bottom-0 z-10 -mb-4 flex justify-center border-t border-grey-200 bg-white pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:static sm:mt-8 sm:mb-0 sm:border-0 sm:pt-0 sm:pb-0 lg:pb-2">
					<Button
						type="submit"
						className="w-full max-w-[184px]"
					>
						{t('apply')}
					</Button>
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

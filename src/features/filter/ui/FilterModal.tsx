import { type FormEvent, useId, useState } from 'react'
import { useTranslation } from 'react-i18next'

import type { FilterItem } from '@api/types/Filter'

import { Button } from '@components/Button'
import { Dialog } from '@components/Dialog'
import { ModalHeader } from '@components/ModalHeader'

import { useFilterDraft } from '../model/useFilterDraft'
import { ConfirmDialog } from './ConfirmDialog'
import { FilterGroup } from './FilterGroup'

interface FilterModalProps {
	items: FilterItem[]
	onClose: () => void
}

export const FilterModal = ({ items, onClose }: FilterModalProps) => {
	const { t } = useTranslation()
	const titleId = useId()
	const { draft, toggle, toggleAll, save } = useFilterDraft(items)
	const [isConfirming, setConfirming] = useState(false)

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault()
		setConfirming(true)
	}

	const handleConfirm = () => {
		save()
		onClose()
	}

	return (
		<Dialog
			onClose={onClose}
			labelledBy={titleId}
			className="m-0 h-dvh max-h-none w-full max-w-none scroll-py-20 overflow-y-auto rounded-none p-4 sm:m-auto sm:h-auto sm:max-h-dvh sm:max-w-7xl sm:rounded-card sm:p-6 lg:p-8"
		>
			<form onSubmit={handleSubmit}>
				<ModalHeader
					titleId={titleId}
					title={t('title')}
					closeLabel={t('close')}
					onClose={onClose}
					className="sticky top-0 z-10 -mt-4 border-b border-grey-200 bg-white pt-4 pb-4 sm:relative sm:mt-0 sm:pt-0 sm:pb-8 lg:pt-2 lg:pb-[25px]"
				/>

				{items.map(item => (
					<FilterGroup
						key={item.id}
						item={item}
						draft={draft}
						onToggle={toggle}
						onToggleAll={toggleAll}
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

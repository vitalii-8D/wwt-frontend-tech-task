import { useId } from 'react'
import { useTranslation } from 'react-i18next'

import CloseIcon from '@assets/close.svg?react'
import { Dialog } from '@components/Dialog'

interface ConfirmDialogProps {
	onConfirm: () => void
	onCancel: () => void
	onDiscard: () => void
}

export const ConfirmDialog = ({
	onConfirm,
	onCancel,
	onDiscard
}: ConfirmDialogProps) => {
	const { t } = useTranslation('filter')
	const titleId = useId()

	return (
		<Dialog
			onClose={onCancel}
			labelledBy={titleId}
			className="m-auto w-[calc(100%-2rem)] max-w-5xl rounded-card bg-white p-4 shadow-card sm:w-full sm:p-8 backdrop:bg-black/40"
		>
			<header className="relative flex items-center justify-center">
				<h2
					id={titleId}
					className="px-10 text-center text-2xl font-medium sm:px-0 sm:text-3xl lg:text-[40px]"
				>
					{t('confirm.title')}
				</h2>
				<button
					type="button"
					aria-label={t('close')}
					onClick={onCancel}
					className="absolute right-0 flex size-11 items-center justify-center lg:size-auto"
				>
					<CloseIcon aria-hidden="true" />
				</button>
			</header>
			<div className="mt-8 flex flex-col-reverse gap-3 sm:mt-16 sm:flex-row sm:justify-center sm:gap-8 lg:mt-[120px]">
				<button
					type="button"
					onClick={onDiscard}
					className="w-full rounded-card border-2 border-grey-200 bg-white px-6 py-4 sm:px-[49px] sm:py-[26px] font-semibold text-grey-400 sm:w-[280px]"
				>
					{t('confirm.no')}
				</button>
				<button
					type="button"
					onClick={onConfirm}
					className="w-full rounded-card bg-brand px-6 py-4 sm:px-[49px] sm:py-[26px] font-semibold text-white sm:w-[280px]"
				>
					{t('confirm.yes')}
				</button>
			</div>
		</Dialog>
	)
}

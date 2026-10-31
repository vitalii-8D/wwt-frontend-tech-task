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
			className="m-auto w-full max-w-5xl rounded-card bg-white p-8 shadow-card backdrop:bg-black/40"
		>
			<header className="relative flex items-center justify-center">
				<h2
					id={titleId}
					className="text-center text-[40px] font-medium"
				>
					{t('confirm.title')}
				</h2>
				<button
					type="button"
					aria-label={t('close')}
					onClick={onCancel}
					className="absolute right-0"
				>
					<CloseIcon aria-hidden="true" />
				</button>
			</header>
			<div className="mt-[120px] flex justify-center gap-8">
				<button
					type="button"
					onClick={onDiscard}
					className="w-[280px] rounded-card border-2 border-grey-200 bg-white px-[49px] py-[26px] font-semibold text-grey-400"
				>
					{t('confirm.no')}
				</button>
				<button
					type="button"
					onClick={onConfirm}
					className="w-[280px] rounded-card bg-brand px-[49px] py-[26px] font-semibold text-white"
				>
					{t('confirm.yes')}
				</button>
			</div>
		</Dialog>
	)
}

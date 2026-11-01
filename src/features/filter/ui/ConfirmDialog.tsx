import { useId } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@components/Button'
import { Dialog } from '@components/Dialog'
import { ModalHeader } from '@components/ModalHeader'

interface ConfirmDialogProps {
	onConfirm: () => void
	onCancel: () => void
	onDiscard: () => void
}

const BUTTON_WIDTH = 'w-full max-w-[280px] sm:w-[280px]'

export const ConfirmDialog = ({
	onConfirm,
	onCancel,
	onDiscard
}: ConfirmDialogProps) => {
	const { t } = useTranslation()
	const titleId = useId()

	return (
		<Dialog
			onClose={onCancel}
			labelledBy={titleId}
			className="m-auto w-[calc(100%-2rem)] max-w-5xl rounded-card p-4 shadow-card sm:w-full sm:p-8"
		>
			<ModalHeader
				titleId={titleId}
				title={t('confirm.title')}
				closeLabel={t('close')}
				onClose={onCancel}
			/>
			<div className="mt-8 flex flex-col-reverse items-center gap-3 sm:mt-16 sm:flex-row sm:justify-center sm:gap-8 lg:mt-[120px]">
				<Button
					variant="secondary"
					onClick={onDiscard}
					className={BUTTON_WIDTH}
				>
					{t('confirm.no')}
				</Button>
				<Button
					onClick={onConfirm}
					className={BUTTON_WIDTH}
				>
					{t('confirm.yes')}
				</Button>
			</div>
		</Dialog>
	)
}

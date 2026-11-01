import {
	type MouseEvent,
	type ReactNode,
	type SyntheticEvent,
	useEffect,
	useRef
} from 'react'

import { cn } from '@lib/cn'

interface DialogProps {
	onClose: () => void
	labelledBy: string
	className?: string
	children: ReactNode
}

export const Dialog = ({
	onClose,
	labelledBy,
	className,
	children
}: DialogProps) => {
	const ref = useRef<HTMLDialogElement>(null)

	useEffect(() => {
		const dialog = ref.current
		if (dialog && !dialog.open) {
			dialog.showModal()
		}
	}, [])

	// Clicks on the backdrop (or the dialog's own padding) land on the <dialog>
	// element itself, outside its content box. Events bubbling from a nested
	// dialog have a different target, so they are ignored here.
	const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
		const dialog = ref.current
		if (!dialog || event.target !== dialog) {
			return
		}
		const rect = dialog.getBoundingClientRect()
		const isOutside =
			event.clientX < rect.left ||
			event.clientX > rect.right ||
			event.clientY < rect.top ||
			event.clientY > rect.bottom
		if (isOutside) {
			dialog.close()
		}
	}

	// React bubbles `close` through the component tree, so a nested dialog's
	// close would otherwise also fire the parent's onClose.
	const handleClose = (event: SyntheticEvent<HTMLDialogElement>) => {
		if (event.target === event.currentTarget) {
			onClose()
		}
	}

	return (
		<dialog
			ref={ref}
			aria-labelledby={labelledBy}
			className={cn('bg-white backdrop:bg-black/40', className)}
			onClick={handleClick}
			onClose={handleClose}
		>
			{children}
		</dialog>
	)
}

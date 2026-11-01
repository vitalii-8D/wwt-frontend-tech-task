import { cn } from '@lib/cn'

import CloseIcon from '@assets/close.svg?react'

interface ModalHeaderProps {
	titleId: string
	title: string
	closeLabel: string
	onClose: () => void
	className?: string
}

export const ModalHeader = ({
	titleId,
	title,
	closeLabel,
	onClose,
	className
}: ModalHeaderProps) => (
	<header
		className={cn('relative flex items-center justify-center', className)}
	>
		<h2
			id={titleId}
			className="px-10 text-center text-2xl font-medium sm:px-0 sm:text-3xl lg:text-[40px]"
		>
			{title}
		</h2>
		<button
			type="button"
			aria-label={closeLabel}
			onClick={onClose}
			className="absolute right-0 flex size-11 items-center justify-center lg:size-auto"
		>
			<CloseIcon aria-hidden="true" />
		</button>
	</header>
)

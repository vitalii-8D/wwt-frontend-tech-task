import type { ComponentProps } from 'react'

type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'md' | 'lg'

interface ButtonProps extends ComponentProps<'button'> {
	variant?: ButtonVariant
	size?: ButtonSize
}

const BASE_STYLES = 'rounded-card font-semibold disabled:opacity-50'

// Colors from the design: primary is the brand fill, secondary is the outlined one.
const VARIANT_STYLES: Record<ButtonVariant, string> = {
	primary: 'bg-brand text-white',
	secondary: 'border-2 border-grey-200 bg-white text-grey-400'
}

// `lg` is the 64px high design button; `md` is the compact homepage button.
const SIZE_STYLES: Record<ButtonSize, string> = {
	md: 'px-8 py-4',
	lg: 'h-16 px-6 sm:px-[49px]'
}

export const Button = ({
	variant = 'primary',
	size = 'lg',
	type = 'button',
	className,
	...props
}: ButtonProps) => (
	<button
		type={type}
		className={[
			BASE_STYLES,
			VARIANT_STYLES[variant],
			SIZE_STYLES[size],
			className
		]
			.filter(Boolean)
			.join(' ')}
		{...props}
	/>
)

import { cn } from '@lib/cn'

interface CheckboxProps {
	id: string
	label: string
	checked: boolean
	onChange: () => void
	className?: string
}

export const Checkbox = ({
	id,
	label,
	checked,
	onChange,
	className
}: CheckboxProps) => (
	<div className={cn('flex min-w-0 items-center gap-4', className)}>
		<input
			id={id}
			type="checkbox"
			className="filter-checkbox"
			checked={checked}
			onChange={onChange}
		/>
		<label
			htmlFor={id}
			className="min-w-0 break-words"
		>
			{label}
		</label>
	</div>
)

import { useTranslation } from 'react-i18next'

interface FiltersStatusProps {
	isPending: boolean
	isError: boolean
	onRetry: () => void
}

export const FiltersStatus = ({
	isPending,
	isError,
	onRetry
}: FiltersStatusProps) => {
	const { t } = useTranslation()

	if (isPending) {
		return <p>{t('loading')}</p>
	}

	if (isError) {
		return (
			<p role="alert">
				{t('error')}{' '}
				<button
					type="button"
					className="underline"
					onClick={onRetry}
				>
					{t('retry')}
				</button>
			</p>
		)
	}

	return null
}

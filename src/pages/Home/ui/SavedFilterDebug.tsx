import { useTranslation } from 'react-i18next'

import { useFilterStore } from '@store/filterStore'

export const SavedFilterDebug = () => {
	const { t } = useTranslation()
	const filter = useFilterStore(state => state.filter)

	return (
		<section className="w-full">
			<h2 className="mb-2 text-xl font-medium">{t('debugTitle')}</h2>
			<pre className="max-w-full overflow-auto rounded-card bg-grey-50 p-4 text-sm">
				<code>{JSON.stringify(filter, null, 2)}</code>
			</pre>
		</section>
	)
}

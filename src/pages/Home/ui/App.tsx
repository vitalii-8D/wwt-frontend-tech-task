import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useFiltersQuery } from '@api/filters'

import { useFilterStore } from '@store/filterStore'

import { FilterModal } from './FilterModal'

export const App = () => {
	const { t } = useTranslation('filter')
	const { data, isPending, isError, refetch } = useFiltersQuery()
	const filter = useFilterStore(state => state.filter)
	const [isOpen, setOpen] = useState(false)

	return (
		<main className="mx-auto flex min-h-dvh max-w-3xl flex-col items-center gap-6 p-4 font-sans sm:gap-8 sm:p-8">
			{/* eslint-disable-next-line i18next/no-literal-string */}
			<h1 className="text-center text-2xl text-gray-600 sm:text-4xl">
				WinWinTravel frontend test task
			</h1>

			<section className="flex w-full flex-col items-center gap-4">
				<button
					type="button"
					aria-haspopup="dialog"
					disabled={isPending || isError}
					onClick={() => setOpen(true)}
					className="max-w-[280px] rounded-card bg-brand px-8 py-4 font-semibold text-white disabled:opacity-50 sm:w-auto"
				>
					{t('open')}
				</button>
				{isPending ? <p>{t('loading')}</p> : null}
				{isError ? (
					<p role="alert">
						{t('error')}{' '}
						<button
							type="button"
							className="underline"
							onClick={() => refetch()}
						>
							{t('retry')}
						</button>
					</p>
				) : null}
			</section>

			<section className="w-full">
				<h2 className="mb-2 text-xl font-medium">{t('debugTitle')}</h2>
				<pre className="max-w-full overflow-auto rounded-card bg-grey-50 p-4 text-sm">
					<code>{JSON.stringify(filter, null, 2)}</code>
				</pre>
			</section>

			{isOpen && data ? (
				<FilterModal
					items={data}
					onClose={() => setOpen(false)}
				/>
			) : null}
		</main>
	)
}

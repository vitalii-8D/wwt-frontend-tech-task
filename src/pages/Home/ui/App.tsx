import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FilterModal } from '@features/filter'

import { useFiltersQuery } from '@api/filters'

import { Button } from '@components/Button'

import { FiltersStatus } from './FiltersStatus'
import { SavedFilterDebug } from './SavedFilterDebug'

export const App = () => {
	const { t } = useTranslation()
	const { data, isPending, isError, refetch } = useFiltersQuery()
	const [isOpen, setOpen] = useState(false)

	return (
		<main className="mx-auto flex min-h-dvh max-w-3xl flex-col items-center gap-6 p-4 font-sans sm:gap-8 sm:p-8">
			{/* eslint-disable-next-line i18next/no-literal-string */}
			<h1 className="text-center text-2xl text-gray-600 sm:text-4xl">
				WinWinTravel frontend test task
			</h1>

			<section className="flex w-full flex-col items-center gap-4">
				<Button
					size="md"
					aria-haspopup="dialog"
					disabled={isPending || isError}
					onClick={() => setOpen(true)}
					className="max-w-[280px] sm:w-auto"
				>
					{t('open')}
				</Button>
				<FiltersStatus
					isPending={isPending}
					isError={isError}
					onRetry={() => void refetch()}
				/>
			</section>

			<SavedFilterDebug />

			{isOpen && data ? (
				<FilterModal
					items={data}
					onClose={() => setOpen(false)}
				/>
			) : null}
		</main>
	)
}

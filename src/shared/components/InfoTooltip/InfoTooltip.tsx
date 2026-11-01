import InfoIcon from '@assets/info.svg?react'

interface InfoTooltipProps {
	description: string
}

export const InfoTooltip = ({ description }: InfoTooltipProps) => (
	<span title={description}>
		<InfoIcon aria-hidden="true" />
	</span>
)

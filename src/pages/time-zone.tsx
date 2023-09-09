import { PageContainer } from '~/shared/ui/PageContainer'
import { ClockTimeZone } from '~/widgets/clock/time-zone'

export default function TimeZonePage() {
  return (
    <PageContainer title='LocalTime Zone'>
      <ClockTimeZone />
    </PageContainer>
  )
}

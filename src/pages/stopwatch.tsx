import { PageContainer } from '~/shared/ui/PageContainer'
import { ClockStopwatch } from '~/widgets/clock/stopwatch'

export default function StopwatchPage() {
  return (
    <PageContainer title='Stopwatch'>
      <ClockStopwatch />
    </PageContainer>
  )
}

import { PageContainer } from '~/shared/ui/PageContainer'
import { ClockTimer } from '~/widgets/clock/timer'

export default function TimerPage() {
  return (
    <PageContainer title='Timer'>
      <ClockTimer />
    </PageContainer>
  )
}

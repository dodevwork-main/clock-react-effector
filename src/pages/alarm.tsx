import { PageContainer } from '~/shared/ui/PageContainer'
import { ClockAlarm } from '~/widgets/clock/alarm'

export default function AlarmPage() {
  return (
    <PageContainer title='Alarm'>
      <ClockAlarm />
    </PageContainer>
  )
}

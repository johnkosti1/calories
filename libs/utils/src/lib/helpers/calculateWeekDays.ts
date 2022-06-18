import moment from 'moment'

const daysInWeek = 7;

export function calculateWeekDays(num = 0, format: string): [moment.Moment, moment.Moment] {
  const weekStart = moment().add(-(daysInWeek * num + daysInWeek - 1), 'day')
  const weekEnd = moment().add(-(daysInWeek * num), 'day')

  return [
    moment(weekStart.format(format), format),
    moment(weekEnd.format(format), format).add(23, 'hour')
    .add(59, 'minute')
    .add(59, 'second')]
}

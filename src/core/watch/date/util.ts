import {ComponentStatus, DateData, State} from "../../../types/store"
import {daysInAMonth, getNext, getPre, joinDate, monthFirstDay} from "../../../utils/date"
import {dateRangeStatus} from "./type/date-range"
import {dateStatus} from "./type/date"

export function updateComponents(
  this: State,
  year: number,
  month: number,
  date: string,
  state: DateData
): void {
  const [preYear, preMonth] = getPre(month, year)
  const preDays = daysInAMonth(preYear, preMonth)
  const [fd, days] = [monthFirstDay(year, month), daysInAMonth(year, month)]
  state.components.forEach((item, index) => {
      const idx = index + 1
      const currentIdx = idx - fd
      const newDate = {
        pre() {
          const day = preDays + currentIdx
          return [String(day), joinDate(...getPre(month, year), day)]
        },
        next() {
          const day = currentIdx - days
          return [String(day), joinDate(...getNext(month, year), day)]
        },
        other: () => [String(currentIdx), joinDate(year, month, currentIdx)]
      }
      item.status = index < fd ? 'pre' : fd + days <= index ? 'next' : 'other'
      ;[item.text, item.date] = newDate[item.status]()
      if (item.status === 'other') item.status = otherStatus(this, item.date)
    }
  )
}

export function otherStatus(self: State, date: string): ComponentStatus {
  const typeStatus = {
    date: () => dateStatus(self.start.date, date),
    'date-range'() {
      const {start, end} = self.range
      return dateRangeStatus(start, end, date)
    }
  }
  return typeStatus[self.options.type]()
}

export function monthYearLink(
  month: number,
  state: DateData
): void {
  if (month === 13) {
    state.month = 1
    state.year += 1
  }
  if (month === 0) {
    state.month = 12
    state.year -= 1
  }
}

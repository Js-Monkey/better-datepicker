import {getStatus} from "./public"
import {Sub} from "../../../../../types/observer"
import {updateYear,updateMonth} from "./public"
import {ComponentsName} from "../../../../../types/components"

const key = (name: string) => {
  return {name, childKey: ['year', 'date']}
}
const rangeKey = {name: 'range', childKey: ['start', 'end']}

export function monthOrYear(type = true, name = 'start'): Sub {
  return {
    key: key(name),
    cb: type ? updateMonth : updateYear,
  }
}


export function LinkYear(name: 'start' | 'end' = 'start'): Sub {
  return {
    key: {name, childKey: ['year']},
    cb(year: number): void {
      if (name === 'start') {
        this.end.year = ++year
      } else {
        this.start.year = --year
      }
    }
  }

}

export function hover(type:ComponentsName = 'month'): Sub{
  return {
    key: rangeKey,
    cb() {
      (['start', 'end'] as ['start', 'end']).forEach(name => {
        this[name][('_'+type) as '_month'].forEach((item,idx) => item.status = getStatus(this, item.date,idx,type))
      })
    }
  }
}

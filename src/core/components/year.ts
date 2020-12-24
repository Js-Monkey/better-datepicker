import {createElement} from '../../utils/element'
import {year} from '../../utils/classes'
import {pageName} from '../../types/store'
import {toMonthPage} from './utils'

export function Year(): Node {
  return createElement({
    class: [year],
    children: Array.from({length: 10}).map((_, idx) => {
      return {
        name: 'span',
        event: {
          cb: toMonthPage,
          params: ['startYear', idx]
        }
      }
    })
  })
}
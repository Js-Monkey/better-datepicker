import {monthYearLink, updateComponents} from "../public"

export const startLink = {
  key: {name: 'start', childKey: ['month']},
  cb: monthYearLink
}

export const startComponents = {
  key: {name: 'start', childKey: ['month', 'year', 'date']},
  cb: updateComponents,
}

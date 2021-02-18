import BD from './core'
import extend from './utils/extend'
import Options from './types/options'
import './svg'
import {BetterInstance} from "./types/core"

function createInstance(): BetterInstance {
  return function (el: HTMLInputElement, options?: Options) {
    const Better = BD()
    const context = new Better(el, options)
    const instance = Better
    extend(context, instance)
    return instance
  }
}

const better = createInstance()

export default better

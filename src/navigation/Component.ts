import { isArray, each, map, invokeMap, defer, mapValues } from 'lodash-es'
import { TinyEmitter } from 'tiny-emitter'

import { IComponentClass, ModuleEntry, ModuleMap } from '@/core/modulesMap'

export const forceArray = <T>(a: T | T[]) => (isArray(a) ? a : [a])
export const unforceArray = <T>(a: T[]) => (a.length === 0 ? null : a.length === 1 ? a[0] : a)

/*
  Fonction utilitaire pour récupérer les éléments DOM référencés
  - Prend en charge les références uniques (data-ref) et les listes d'éléments (data-refs)
  - Facilite l'accès direct aux éléments depuis le JS
*/
export type BaseComponentType = {
  refs?: Record<string, HTMLElement | HTMLElement[]>;
  modules?: Record<string, any>;
  options?: Record<string, any>;
}

export const extractRefs = (target: HTMLElement) => {
  const parseRefs = (selector: string, forceArray: boolean, refs: BaseComponentType['refs']) => {
    return Array.from(target.querySelectorAll(`*[${selector}]`)).reduce((memo, el) => {
      const keys = el.getAttribute(selector)
      if (keys) {
        keys.split(/[ ,]+/).forEach((key) => {
          if (memo[key] || forceArray) {
            if (!memo[key]) memo[key] = []
            else if (!isArray(memo[key])) memo[key] = [memo[key]]
            memo[key].push(el)
          } else {
            memo[key] = el
          }
        })
      }
      return memo
    }, refs as any) as BaseComponentType['refs']
  }

  let refs = parseRefs('data-ref', false, {} as BaseComponentType['refs'])
  refs = parseRefs('data-refs', true, refs)
  return refs
}

/*
  Classe de base pour les composants/pages
  - Gère les références DOM (refs) pour éviter les querySelector répétés
  - Initialise et lie les modules associés, avec prise en charge de la récursivité sur les sous-modules
  - Fournit un mécanisme de nettoyage (flush) lors de la suppression des composants
*/

class Component<Type extends BaseComponentType = BaseComponentType> extends TinyEmitter {
  el: HTMLElement
  options: Type['options']
  refs: Type['refs']
  modules: Type['modules']
  binded: boolean = false
  parent: IComponentClass | null = null
  protected flushed: boolean = false

  constructor (el: HTMLElement, options: Type['options'] = {}) {
    super()
    this.el = el
    this.refs = {} as Type['refs']
    this.modules = {} as Type['modules']
    this.options = options || {}
    defer(() => this.initialized())
  }

  initialized () {
    this.bindEvents(true)
  }

  /* BINDINGS EVENTS */
  bindEvents (_add = true) {}

  /* BINDINGS REFS */
  bindRefs (target?: HTMLElement) {
    if (!target) target = this.el
    this.refs = extractRefs(target) as Type['refs']
  }

  bindModules () {
    if (!this.modules) this.modules = {} as Type['modules']

    const modulesMap = this.getModulesMap()

    if (this.modules) {
      // Clean older
      this.modules = mapValues(this.modules, (modules, key) => {
        return forceArray(modules)?.filter((module: Component) => {
          if (
            module.el.parentElement &&
            document.body.contains(module.el) &&
            !!modulesMap[key]
          ) return true

          module.flush()
          return false
        })
      })
      for (const module in this.modules) {
        if (this.modules[module].length !== undefined && this.modules[module].length === 0)
          delete this.modules[module]
      }
    }

    each(modulesMap, ([selector, Module]: ModuleEntry, key) => {
      if (!Module) return
      const array = map((selector === 'self' ? [this.el] : this.el.querySelectorAll(selector)) as any[], (el) => {
        const alreadyExist = !!forceArray(this.modules?.[key])?.find((m: Component) => m?.el === el)
        if (alreadyExist) return
        const m = new Module(el, this.getModuleParams())
        m.parent = this

        return m
      }).filter(Boolean)

      const existingModules = this.modules?.[key]

      if (existingModules)
        array.unshift(...forceArray(existingModules))
      
      if (array?.length) (this.modules as any)[key] = unforceArray(array)
    })
  }

  getModulesMap (): ModuleMap {
    return {}
  }

  getModuleParams (): Record<string, any> {
    return {
      parent: this
    }
  }

  resize () {
    this.invoke('resize')
  }

  invoke (method: string) {
    each(this.modules, (module) => {
      if (isArray(module)) invokeMap(module, method)
      else if (module) (module as any)[method]?.()
    })
  }

  flush () {
    this.flushed = true
    this.bindEvents(false)
    this.invoke('flush')
  }
}

export default Component

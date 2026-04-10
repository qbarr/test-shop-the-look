import { isArray, each, map, invokeMap, defer, mapValues } from 'lodash-es'
import { TinyEmitter } from 'tiny-emitter'

export const forceArray = (a) => (isArray(a) ? a : [a])
export const unforceArray = (a) => (a.length === 0 ? null : a.length === 1 ? a[0] : a)

/*
  Fonction utilitaire pour récupérer les éléments DOM référencés
  - Prend en charge les références uniques (data-ref) et les listes d'éléments (data-refs)
  - Facilite l'accès direct aux éléments depuis le JS
*/

export const extractRefs = (target) => {
  const parseRefs = (selector, forceArray, refs) => {
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
    }, refs)
  }

  let refs = parseRefs('data-ref', false, {})
  refs = parseRefs('data-refs', true, refs)
  return refs
}

/*
  Classe de base pour les composants/pages
  - Gère les références DOM (refs) pour éviter les querySelector répétés
  - Initialise et lie les modules associés, avec prise en charge de la récursivité sur les sous-modules
  - Fournit un mécanisme de nettoyage (flush) lors de la suppression des composants
*/

class Component extends TinyEmitter {
  constructor (el, options) {
    super()
    this.el = el
    this.refs = {}
    this.modules = {}
    this.options = options || {}
    this.flushed = false

    defer(() => this.initialized())
  }

  initialized () {
    this.bindEvents(true)
  }

  /* BINDINGS EVENTS */
  bindEvents (add = true) {}

  /* BINDINGS REFS */
  bindRefs (target) {
    if (!target) target = this.el
    this.refs = extractRefs(target)
  }

  /* BINDINGS MODULES */
  bindModules () {
    if (!this.modules) this.modules = {}

    const modulesMap = this.getModulesMap()

    if (this.modules) {
      // Clean older
      this.modules = mapValues(this.modules, (modules, key) => {
        return forceArray(modules)?.filter((module) => {
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

    each(modulesMap, ([selector, Module], key) => {
      if (!Module) return
      const array = map((selector === 'self' ? [this.el] : this.el.querySelectorAll(selector)), (el) => {
        const alreadyExist = !!forceArray(this.modules?.[key])?.find((m) => m?.el === el)
        if (alreadyExist) return
        const m = new Module(el, this.getModuleParams(el, Module))
        m.parent = this
        return m
      }).filter(Boolean)

      if (this.modules?.[key])
        array.unshift(...this.modules?.[key])

      if (array?.length) (this.modules)[key] = unforceArray(array)
    })
  }

  getModulesMap () {
    return {}
  }

  getModuleParams (el, componentConstructor) {
    return {
      parent: this
    }
  }

  resize () {
    this.invoke('resize')
  }

  invoke (method) {
    each(this.modules, (module) => {
      if (isArray(module)) invokeMap(module, method)
      else if (module) (module)[method]?.()
    })
  }

  flush () {
    console.log('flush', this)
    this.flushed = true
    this.bindEvents(false)
    this.invoke('flush')
  }
}

export default Component

import Component, { BaseComponentType } from './Component'

import modulesMap from '@/core/modulesMap'

/*
  Classe de base pour une page
  - Hérite de Component et gère les modules spécifiques à la page
  - Minimale et très simplifé dans le cadre du test
*/
export interface IPage {
  el: HTMLElement
  flush: () => void
  show: () => void
}

export interface IPageClass {
  pageName?: string
  new (el: HTMLElement, options?: any): IPage
}

class Page<
  Type extends BaseComponentType = BaseComponentType
> extends Component<Type> implements IPage {
  static pageName = 'Page'

  constructor (el : HTMLElement, options?: Type['options']) {
    super(el, options)

    // Initialisation des références DOM et des modules
    this.bindRefs()
    this.bindModules()
  }
  
  // Retourne la map des modules qu'on peut utiliser sur les pages
  getModulesMap () {
    return { ...modulesMap }
  }

  show () {
    this.el.classList.add('ready')
  }

  // Nettoie tous les modules liés à cette page
  flush () {
    this.invoke('flush')
  }
}

export default Page

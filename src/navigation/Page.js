import Component from './Component'

import modulesMap from '@/core/modulesMap'

/*
  Classe de base pour une page
  - Hérite de Component et gère les modules spécifiques à la page
  - Minimale et très simplifé dans le cadre du test
*/

class Page extends Component {
  constructor (el, options) {
    super(el, options)

    // Initialisation des références DOM et des modules
    this.bindRefs()
    this.bindModules()
  }
  
  // Retourne la map des modules qu'on peut utiliser sur les pages
  getModulesMap () {
    return { ...modulesMap }
  }

  // Nettoie tous les modules liés à cette page
  flush () {
    this.invoke('flush')
  }
}

Page.pageName = 'Page'

export default Page

import pageMap from './core/pageMap'
import Page, { IPage } from './navigation/Page'

import Component from '@/navigation/Component'
/*
  Classe principale d'initialisation du site
  - Sélectionne et instancie la page appropriée selon le template
    (idéalement via un PageManager pour un chargement AJAX, mais simplifié ici vu qu'il n'y a que 2 pages)
*/
type AppRefs = {
  page?: HTMLElement
}

class App extends Component<{ refs: AppRefs }> {
  page: IPage

  initialized () {
    this.bindRefs()
    this.initializePage()
  }

  initializePage () {
    if (!this.refs?.page) return
    const pageClassName = this.refs.page?.getAttribute('data-template') || ''
    const PageClass = pageMap[pageClassName] || Page

    this.page = new PageClass(this.refs.page)
  }
}

export default App

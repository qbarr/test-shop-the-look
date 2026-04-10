import { bindMethod } from '@/helpers/bind'
import Page from '@/navigation/Page'

type LookRefs = {
  lookProducts?: HTMLElement[]
}

/*
   Gère les interactions de la page "Look".
   Implémente l’action d’ajout groupé au panier
*/
class Look extends Page<{ refs: LookRefs }> {
  static pageName = 'Look'

  bindEvents (add = true) {
    const method = bindMethod(add)
    const addAllButton = this.el.querySelector<HTMLButtonElement>('.look__add-all-button')

    if (!(addAllButton instanceof HTMLButtonElement)) return

    addAllButton[method]('click', this.onAddAllToCart)
  }

  getButtons () {
    return this.refs.lookProducts
      ?.map((product) => product.querySelector<HTMLButtonElement>('[ref="addToCartButton"]'))
      .filter((button) => button instanceof HTMLButtonElement)
  }

  onAddAllToCart = (event: MouseEvent) => {
    const button = event.currentTarget
    const buttonsToClick = this.getButtons()
      .filter((buttonToCheck) => !buttonToCheck.disabled)

    if (!(button instanceof HTMLButtonElement) || buttonsToClick.length <= 0) return

    buttonsToClick.forEach((buttonToClick) => {
      buttonToClick.click()
    })
  }
}

export default Look

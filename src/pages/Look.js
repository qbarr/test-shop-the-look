import { bindMethod } from '@/helpers/bind'
import Page from '@/navigation/Page'

/*
   Gère les interactions de la page "Look".
   Implémente l’action d’ajout groupé au panier
*/
class Look extends Page {
  bindEvents (add = true) {
    const method = bindMethod(add)
    const addAllButton = this.el.querySelector('.look__add-all-button')

    if (!(addAllButton instanceof HTMLButtonElement)) return

    addAllButton[method]('click', this.onAddAllToCart)
  }

  getButtons () {
    return this.refs.lookProducts
      .map((product) => product.querySelector('[ref="addToCartButton"]'))
      .filter((button) => button instanceof HTMLButtonElement)
  }

  onAddAllToCart = (event) => {
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

Look.pageName = 'Look'

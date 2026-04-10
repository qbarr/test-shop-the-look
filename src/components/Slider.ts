import { bindMethod } from '@/helpers/bind'
import Component from '@/navigation/Component'

type SliderRefs = {
  prevButton?: HTMLButtonElement
  nextButton?: HTMLButtonElement
  track?: HTMLElement
}

/*
 * Slider — composant de navigation horizontal minimaliste.
 *
 *
 * Fonctionnalités :
 * - Scroll horizontal via 2 boutons next/previous
 * - Mise à jour dynamique de l’état lors du scroll utilisateur
 *
 */
const EDGE_TOLERANCE = 10

class Slider extends Component<{ refs: SliderRefs }> {
  initialized () {
    this.bindRefs()
    this.bindEvents()
    this.updateControls()
  }

  bindEvents (add = true) {
    const method = bindMethod(add)

    this.refs.prevButton?.[method]('click', () => this.goToSlide(-1))
    this.refs.nextButton?.[method]('click', () => this.goToSlide(1))
    this.refs.track?.[method]('scroll', this.onScroll, { passive: true })
  }

  onScroll = () => {
    this.updateControls()
  }

  goToSlide (direction: number) {
    const track = this.refs.track

    if (!track) return

    const maxScrollLeft = Math.max(track.scrollWidth - track.clientWidth, 0)
    const targetLeft = Math.min(
      Math.max(track.scrollLeft + (direction * track.clientWidth), 0),
      maxScrollLeft
    )

    track.scrollTo({
      left: targetLeft,
      behavior: 'smooth'
    })
  }

  updateControls (scrollLeft = this.refs.track?.scrollLeft ?? 0) {
    const track = this.refs.track

    if (!track) return

    const isAtStart = scrollLeft <= EDGE_TOLERANCE
    const isAtEnd = scrollLeft + track.clientWidth >= track.scrollWidth - EDGE_TOLERANCE

    this.setButtonState(this.refs.prevButton, isAtStart)
    this.setButtonState(this.refs.nextButton, isAtEnd)
  }

  setButtonState (button: HTMLButtonElement | undefined, isDisabled: boolean) {
    if (!(button instanceof HTMLButtonElement)) return

    button.disabled = isDisabled
    button.setAttribute('aria-disabled', isDisabled ? 'true' : 'false')
  }
}

export default Slider

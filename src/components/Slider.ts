import { bindMethod } from '@/helpers/bind'
import Component from '@/navigation/Component'

type SliderRefs = {
  dots?: HTMLElement[]
  prevButton?: HTMLButtonElement
  nextButton?: HTMLButtonElement
  track?: HTMLElement
  items?: HTMLElement[]
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
  count: number

  initialized () {
    this.bindRefs()
    this.bindEvents()
    this.count = this.refs.items?.length ?? 1
    this.el.style.setProperty('--items-count', String(this.count))
    this.updateControls()

    this.emit('ready')
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

    const maxScrollLeft = Math.max(track.scrollWidth - track.clientWidth, 0)
    const progress = maxScrollLeft > 0 ? scrollLeft / maxScrollLeft : 0

    const currentWidth = this.el.clientWidth / this.count
    const maxIndicatorOffset = this.el.clientWidth - currentWidth
    const indicatorOffset = progress * maxIndicatorOffset

    this.el.style.setProperty('--current-offset', `${indicatorOffset}px`)
  }

  setButtonState (button: HTMLButtonElement | undefined, isDisabled: boolean) {
    if (!(button instanceof HTMLButtonElement)) return

    button.disabled = isDisabled
    button.setAttribute('aria-disabled', isDisabled ? 'true' : 'false')
  }
}

export default Slider

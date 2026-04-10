import App from '../App'

window.addEventListener('load', () => new App(document.documentElement))

document.documentElement.classList.add('app-started')

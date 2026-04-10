/*
  Helper pour déterminer le nom de la méthode à utiliser
  - Permet de binder ou unbinder un événement en fonction d'un booléen
*/

export const bindMethod = (add: boolean): 'addEventListener' | 'removeEventListener' => add
  ? 'addEventListener'
  : 'removeEventListener'

export const bindEmitterMethod = (add: boolean): 'on' | 'off' => add
  ? 'on'
  : 'off'

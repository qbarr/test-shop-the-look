/*
  Helper pour déterminer le nom de la méthode à utiliser
  - Permet de binder ou unbinder un événement en fonction d'un booléen
*/

export const bindMethod = (add) => add ? 'addEventListener' : 'removeEventListener'
export const bindEmitterMethod = (add) => add ? 'on' : 'off'

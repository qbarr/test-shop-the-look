import Slider from '@/components/Slider'
/*
  Map des modules réutilisables de manière autonome
*/
export interface IComponentClass {
  new (el: HTMLElement, options: any): any
}

export type ModuleMapping = [string, IComponentClass | null]
export type ModulesMappping = Record<string, ModuleMapping>

const modulesMap: ModulesMappping = {
  slider: ['.slider', Slider]
}

export default modulesMap

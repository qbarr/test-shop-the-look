import Slider from '@/components/Slider'
/*
  Map des modules réutilisables de manière autonome
*/
export interface IComponentClass {
  new (el: HTMLElement, options: any): any
}

export type ModuleEntry = [string, IComponentClass | null]
export type ModuleMap = Record<string, ModuleEntry>

const modulesMap: ModuleMap = {
  slider: ['.slider', Slider]
}

export default modulesMap

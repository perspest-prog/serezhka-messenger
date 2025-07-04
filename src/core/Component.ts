import type { TemplateDelegate } from 'handlebars'
import { nanoid } from 'nanoid'

import EventBus from './EventBus'

interface Props {
  events?: Record<string, () => void>
}

type State<P> = any
type Children<P> = any

enum PHASES {
  'MOUNT' = 'MOUNT',
  'UPDATE' = 'UPDATE',
  'UNMOUNT' = 'UNMOUNT'
}

abstract class Component<P extends Props = any> {
  private id = nanoid(6)

  // @ts-ignore
  private element: HTMLElement
  private callEventBus = new EventBus()
  
  protected state: State<P>
  protected children: Children<P>

  constructor(props: P) {
    const { state, children } = Component.getStateAndChildren(props)
    
    this.state = this.makeProxy(state)
    this.children = children
    
    this.callEventBus.on(PHASES.MOUNT, this._componentDidMount)
    this.callEventBus.on(PHASES.UPDATE, this._componentDidUpdate)
    this.callEventBus.on(PHASES.UNMOUNT, this._componentWillUnmount)
    
    this.init()
  }

  private static getStateAndChildren<P extends Props>(props: P) {
    const state = {} as State<P>
    const children = {} as Children<P>
    
    for (const key in props) {
      const value = props[key]
      
      if (value instanceof Component || Array.isArray(value) && value.every((prop) => prop instanceof Component)) {
        children[key] = value
      } else {
        state[key] = value
      }
    }
    
    return { state, children }
  }

  private makeProxy(state: State<P>) {
    const self = this
    
    return new Proxy(state, {
      set: (target, prop, value) => {
        if (prop in target) {
          self.callEventBus.emit(PHASES.UPDATE)
          return target[prop] = value
        }
      }
    })
  }

  private init() {
    const template = this.render()
    const html = this.compile(template)
    
    this.element.replaceWith(html)
    this.element = html

    this.addEvents()
  }

  private compile(template: TemplateDelegate) {
    const context: Record<string, string | string[]> = {}
    
    for (const name in this.children) {
      const field = this.children[name]
      
      if (Array.isArray(field)) {
        context[name] = field.map((component) => `<div data-id="${component.id}"></div>`)
      } else {
        context[name] = `<div data-id="${field.id}"></div>`
      }
    }
    
    const tmp = document.createElement('template')
    tmp.innerHTML = template({...this.state, ...context})
    
    const replaceStub = (component: Component) => {
      const stub = tmp.querySelector(`[data-id="${component.id}"]`)
      
      stub!.replaceWith(component.getContent())
    }
    
    for (const name in this.children) {
      const field = this.children[name]
      
      if (Array.isArray(field)) {
        field.forEach((element) => replaceStub(element))
      } else {
        replaceStub(field)
      }
    }
    
    return tmp.content.firstElementChild as HTMLElement
  }

  private addEvents() {
    const events = this.state.events
    
    for (const event in events) {
      this.element.addEventListener(event, events[event])
    }
  }
  
  private removeEvents() {
    const events = this.state.events
    
    for (const event in events) {
      this.element.removeEventListener(event, events[event])
    }
  }

  private _componentDidMount() {
    this.componentDidMount()
  }
  
  private _componentDidUpdate() {
    this.removeEvents()
    
    const template = this.render()
    const html = this.compile(template)
    
    this.element.replaceWith(html)
    this.element = html
    
    this.addEvents()
    
    this.componentDidUpdate()
  }
  
  private _componentWillUnmount() {
    this.componentWillUnmount()
  }
  
  protected componentDidMount() {}
  
  protected componentDidUpdate() {}
  
  protected componentWillUnmount() {}
  
  protected abstract render(): TemplateDelegate
  
  public dispatchComponentDidMount() {
    this.callEventBus.emit(PHASES.MOUNT)
    
    for (const name in this.children) {
      const field = this.children[name]
      
      if (Array.isArray(field)) {
        field.forEach((element) => element.callEventBus.emit(PHASES.MOUNT))
      } else {
        field.callEventBus.emit(PHASES.MOUNT)
      }
    }
  }
  
  public dispatchComponentWillUmnout() {
    this.callEventBus.emit(PHASES.UNMOUNT)
    
    for (const name in this.children) {
      const field = this.children[name]
      
      if (Array.isArray(field)) {
        field.forEach((element) => element.callEventBus.emit(PHASES.UNMOUNT))
      } else {
        field.callEventBus.emit(PHASES.UNMOUNT)
      }
    }
  }
  
  public getContent() {
    return this.element
  }
}

export default Component

class EventBus {
  private readonly listeners = new Map<string, Set<(...args: any[]) => void>>()
  on = (event: string, callback: (...arg: any[]) => void) => {
    let getEntries = this.listeners.get(event)
      if (!this.listeners.get(event)) {
          this.listeners.set(event, new Set)
      }
      this.listeners.get(event)!.add(callback)
    }
  off = (event: string, callback: (...arg: any[]) => void) => {
    let getEntries = this.listeners.get(event)
    if (!getEntries) {
      throw new Error('такого метода не существует')
    }
    else {
      this.listeners.get(event)!.delete(callback)
    }
  }
  emit = (event: string) => {
    let getEntries = this.listeners.get(event)
    if (getEntries) {
      getEntries.forEach((func) => {func()})
    }
  }
}
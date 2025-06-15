type VoidFunction = (...args: any[]) => void
class EventBus {
  private readonly listeners = new Map<string, Set<VoidFunction>>()
  on = (event: string, callback: VoidFunction) => {
    let getEntries = this.listeners.get(event)
      if (!getEntries) {
          this.listeners.set(event, new Set)
      }
      getEntries!.add(callback)
    }
  off = (event: string, callback: VoidFunction) => {
    let getEntries = this.listeners.get(event)
    if (!getEntries) {
      throw new Error('Неизвестный ключ')
    }
    else {
      getEntries!.delete(callback)
    }
  }
  emit = (event: string) => {
    let getEntries = this.listeners.get(event)
    if (getEntries) {
      getEntries.forEach((func) => {func()})
    }
  }
}
export default EventBus
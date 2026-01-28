class BaseApi {
  private pathname: string
  protected http

  private static url = 'https://ya-praktikum.tech/api/v2'
  constructor(pathname: string) {
    this.pathname = pathname
    this.http = {
      get: this.get,
      post: this.post,
      put: this.put,
      delete: this.delete
    }
  }
  private async fetchWrapper<T>(method: string, pathname: string, body?: FormData, query?: Record<string, string>, json: boolean = true): Promise<T> {
    const url = new URL(BaseApi.url + this.pathname + pathname)
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        url.searchParams.set(key, value)
      }
    }
    const data = await fetch(url, {
      credentials: 'include',
      method,
      body: body ? !json ? body : JSON.stringify(Object.fromEntries(body)) : null
    })
    if (data.ok) {
      return data.json()
    }
    else {
      throw new Error('Not ok')
    }
  }
  protected get<T>(pathname: string): Promise<T> {
    return this.fetchWrapper<T>(pathname,'GET')
  }
  protected post<T>(pathname: string, body: FormData): Promise<T>{
    return this.fetchWrapper<T>(pathname, 'POST', body)
  }
  protected put<T>(pathname: string, body: FormData): Promise<T> {
    return this.fetchWrapper<T>(pathname, 'PUT', body)
  }
  protected delete<T>(pathname: string, body: FormData): Promise<T> {
    return this.fetchWrapper<T>(pathname, 'DELETE', body)
  }
}

export default BaseApi
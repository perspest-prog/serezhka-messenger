abstract class BaseAPI {
  private static BASE_URL = 'https://ya-praktikum.tech/api/v2'

  private pathname: string
  protected http

  constructor(pathname: string) {
    this.pathname = pathname

    this.http = {
      get: this.get,
      post: this.post,
      put: this.put,
      delete: this.delete
    }
  }

  private async fetchWrapper<T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', pathname: string, body?: FormData, query?: Record<string, string>, toJSON: boolean = true): Promise<T> {
    const url = new URL(BaseAPI.BASE_URL + this.pathname + pathname)
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        url.searchParams.set(key, value)
      }
    }
    const data = await fetch(url, {
      credentials: 'include',
      method,
      body: body ? !toJSON ? body : JSON.stringify(Object.fromEntries(body)) : null
    })
    if (data.ok) {
      return data.json()
    }
    else {
      throw new Error('Not ok')
    }
  }
  private get<T>(pathname: string, body?: FormData, query?: Record<string, string>, toJSON: boolean = true): Promise<T> {
    return this.fetchWrapper<T>('GET', pathname, body, query, toJSON)
  }
  private post<T>(pathname: string, body?: FormData, query?: Record<string, string>, toJSON: boolean = true): Promise<T>{
    return this.fetchWrapper<T>('POST', pathname, body, query, toJSON)
  }
  private put<T>(pathname: string, body?: FormData, query?: Record<string, string>, toJSON: boolean = true): Promise<T> {
    return this.fetchWrapper<T>('PUT', pathname, body, query, toJSON)
  }
  private delete<T>(pathname: string, body?: FormData, query?: Record<string, string>, toJSON: boolean = true): Promise<T> {
    return this.fetchWrapper<T>('DELETE', pathname, body, query, toJSON)
  }
}

export default BaseAPI
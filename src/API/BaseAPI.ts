abstract class BaseAPI {
  private static BASE_URL = 'https://ya-praktikum.tech/api/v2'

  private pathname: string
  protected http

  constructor(pathname: string) {
    this.pathname = pathname

    this.http = {
      get: this.get.bind(this),
      post: this.post.bind(this),
      put: this.put.bind(this),
      delete: this.delete.bind(this),
    }
  }

  private async fetchWrapper<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    pathname: string,
    body?: FormData,
    query?: Record<string, string>,
    toJSON: boolean = true,
  ) {
    const url = new URL(BaseAPI.BASE_URL + this.pathname + pathname)

    if (query) {
      for (const [key, value] of Object.entries(query)) {
        url.searchParams.set(key, value)
      }
    }
    const headers = toJSON ? { 'Content-Type': 'application/json' } : undefined
    const responce = await fetch(url, {
      method,
      credentials: 'include',
      headers,
      body: body ? (toJSON ? JSON.stringify(Object.fromEntries(body)) : body) : null,
    })

    if (!responce.ok) {
      throw new Error('Not ok')
    }

    return (responce.headers.get('Content-Type') === 'application/json; charset=utf-8' ? responce.json() : responce.text()) as T
  }
  private get<T>(pathname: string, body?: FormData, query?: Record<string, string>, toJSON: boolean = true) {
    return this.fetchWrapper<T>('GET', pathname, body, query, toJSON)
  }
  private post<T>(pathname: string, body?: FormData, query?: Record<string, string>, toJSON: boolean = true) {
    return this.fetchWrapper<T>('POST', pathname, body, query, toJSON)
  }
  private put<T>(pathname: string, body?: FormData, query?: Record<string, string>, toJSON: boolean = true) {
    return this.fetchWrapper<T>('PUT', pathname, body, query, toJSON)
  }
  private delete<T>(pathname: string, body?: FormData, query?: Record<string, string>, toJSON: boolean = true) {
    return this.fetchWrapper<T>('DELETE', pathname, body, query, toJSON)
  }
}

export default BaseAPI
class BaseApi {
  private pathname: string
  protected http

  private static url = 'https://ya-praktikum.tech/api/v2'
  constructor(pathname: string) {
    this.pathname = pathname
    this.http = {
      get: this.get.bind(this),
      post: this.post.bind(this),
      put: this.put.bind(this),
      delete: this.delete.bind(this)
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
      body: body ? !json ? body : JSON.stringify(Object.fromEntries(body)) : null,
      headers: {
        'Content-Type': json ? 'application/json' : 'multipart/form-data'
      },
    })
    if (data.ok) {
      return data.headers.get('Content-Type') === 'application/json' ? data.json() : data.text() as T
    }
    else {
      throw new Error('Not ok')
    }
  }
  protected get<T>(pathname: string): Promise<T> {
    return this.fetchWrapper<T>('GET', pathname)
  }
  protected post<T>(pathname: string, body: FormData): Promise<T>{
    return this.fetchWrapper<T>('POST', pathname, body)
  }
  protected put<T>(pathname: string, body: FormData): Promise<T> {
    return this.fetchWrapper<T>('PUT', pathname, body)
  }
  protected delete<T>(pathname: string, body: FormData): Promise<T> {
    return this.fetchWrapper<T>('DELETE', pathname, body)
  }
}

export default BaseApi;
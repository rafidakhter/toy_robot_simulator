export class DataClient {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url)

    if (!response.ok) {
      const error = await response.json()
      console.error(`[FetchHttpClient] GET failed: ${JSON.stringify(error)}`)
      throw new Error('Failed to fetch data')
    }

    return response.json()
  }

  async post<T>(url: string, body: any): Promise<T> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error(`[FetchHttpClient] POST failed: ${JSON.stringify(error)}`)
      throw new Error('Failed to post data')
    }

    return response.json()
  }
}

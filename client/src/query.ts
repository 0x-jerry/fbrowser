export const queryUtils = {
  set(options: Record<string, string>) {
    const url = new URL(location.href)

    for (const key in options) {
      const value = options[key]
      url.searchParams.set(key, encodeURIComponent(value))
    }

    history.pushState({}, document.title, url.toString())
  },
  get() {
    const url = new URL(location.href)
    const r: Record<string, string> = {}

    url.searchParams.forEach((v, k) => (r[k] = decodeURIComponent(v)))

    return r
  }
}

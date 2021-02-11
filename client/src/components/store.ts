import { reactive } from 'vue'
import { IFile } from '../../../typings/common'
import path from 'path'
import { config } from '../config'
import { queryUtils } from '../query'

export const store = reactive({
  dir: '/',
  current: {
    name: '',
    url: '',
    show: false,
    type: 'unknown'
  },
  setSrc(file: IFile) {
    const base = config.isDev ? '//localhost:3000/assets' : '/assets'

    const filePath = base + encodeURI(path.join(store.dir, file.name))

    store.current = {
      name: file.name,
      show: true,
      type: file.type,
      url: filePath
    }

    updateQuery()
  },
  isCurrent(file: IFile) {
    const base = config.isDev ? '//localhost:3000/assets' : '/assets'

    const filePath = base + encodeURI(path.join(store.dir, file.name))

    return store.current.url === filePath
  }
})

parseStoreFromQuery()

function parseStoreFromQuery() {
  const option = queryUtils.get()

  const current = {
    name: option.n || '',
    url: option.u || '',
    show: !!option.u,
    type: option.t || 'unknown'
  }

  store.dir = option.d || '/'

  store.current = current
}

export function updateQuery() {
  queryUtils.set({
    // current
    u: store.current.url,
    t: store.current.type,
    n: store.current.name,
    // dir
    d: store.dir
  })
}

window.addEventListener('popstate', () => {
  parseStoreFromQuery()
})

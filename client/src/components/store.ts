import { reactive } from 'vue'
import { IFile } from '../../../typings/common'
import path from 'path'
import { config } from '../config'

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
  },
  isCurrent(file: IFile) {
    const base = config.isDev ? '//localhost:3000/assets' : '/assets'

    const filePath = base + encodeURI(path.join(store.dir, file.name))

    return store.current.url === filePath
  }
})

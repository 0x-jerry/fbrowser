import { reactive } from 'vue'
import { IFile } from '../../typings/common'
import path from 'path'

export const store = reactive({
  dir: '/',
  current: null as IFile | null,
  setSrc(file: IFile) {
    const filePath = '//localhost:3000/assets' + path.join(store.dir, file.name)

    store.current = {
      name: filePath,
      folder: false,
      type: file.type
    }
  }
})

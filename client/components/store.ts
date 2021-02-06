import { reactive } from 'vue'
import { IFile } from '../../typings/common'

export const store = reactive({
  dir: '/',
  file: null as IFile | null
})

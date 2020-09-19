import path from 'path'

const resolve = (...args: string[]) => path.join(__dirname, '..', ...args)

export const config = {
  assetsDir: resolve('data'),
  htmlDir: resolve('public'),
  filter(fileName: string, filePath: string) {
    return !fileName.startsWith('.')
  }
}

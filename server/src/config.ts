import path from 'path'

const resolve = (...args: string[]) => path.join(__dirname, '..', '..', ...args)

export const config = {
  isDev: process.env.NODE_ENV === 'development',
  assetsDir: resolve('data'),
  htmlDir: resolve('dist-client'),
  filter(fileName: string, filePath: string) {
    return !fileName.startsWith('.')
  }
}

import path from 'path'

const resolve = (...args: string[]) => path.join(__dirname, '..', ...args)

const isDev = process.env.NODE_ENV === 'development'

export const config = {
  isDev: isDev,
  assetsDir: isDev ? resolve('test-data') : resolve('data'),
  htmlDir: resolve('public'),
  filter(fileName: string, filePath: string) {
    return !fileName.startsWith('.')
  }
}

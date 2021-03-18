import { Context, Middleware } from 'koa'
import fs from 'fs'
import path from 'path'
import { config } from './config'
import mime from 'mime-types'
import { IFile } from '../../typings/common'

const debug = require('debug')('fbrowser:api')

interface Route {
  (ctx: Context): Promise<void>
}

const getFileType = (filePath: string) => {
  const type = mime.lookup(filePath)

  return type || 'unknown'
}

const query: Route = async (ctx) => {
  const { dir } = ctx.query
  debug('api: %O', ctx.query)

  const distDir = path.join(config.assetsDir, dir)
  const stat = fs.statSync(distDir)

  const result = {
    path: dir,
    files: [] as IFile[]
  }

  if (stat.isDirectory()) {
    const files = fs.readdirSync(distDir)

    files
      .filter((file) => {
        const filePath = path.join(distDir, file)
        return config.filter(file, filePath)
      })
      .forEach((file) => {
        const distFilePath = path.join(distDir, file)
        const stat = fs.statSync(distFilePath)

        result.files.push({
          name: file,
          modifiedAt: stat.mtimeMs,
          createAt: stat.birthtimeMs,
          folder: stat.isDirectory(),
          type: getFileType(distFilePath)
        })
      })
  }

  result.files = result.files.sort((a, b) => b.createAt - a.createAt)

  ctx.body = result
}

export function API(): Middleware {
  return async (ctx, next) => {
    if (!ctx.path.startsWith('/api')) {
      await next()
      return
    }

    const routePath = ctx.path.replace(/\/api/, '')

    debug(`route path: ${routePath}`)

    const routes: Record<string, Route> = {
      '/query': query
    }

    const routeFunc = routes[routePath]

    if (!routeFunc) {
      await next()
      return
    }

    await routeFunc(ctx)
  }
}

import { Middleware } from 'koa'
import send from 'koa-send'
import path from 'path'

const debug = require('debug')('fbrowser:public')

export function PublicAssets(root?: string): Middleware {
  root = root || path.join(__dirname, '..', 'public')

  return async (ctx, next) => {
    if (!ctx.path.startsWith('/public')) {
      await next()
      return
    }

    let filePath = ctx.path.replace(/^\/public/, '')

    if (!filePath) {
      ctx.redirect('/public/')
      return
    }

    if (filePath === '/') {
      filePath += 'index.html'
    }

    debug(`public assets: ${filePath}`)

    await send(ctx, filePath, { root })
  }
}

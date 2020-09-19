import { Middleware } from 'koa'
import send from 'koa-send'

const debug = require('debug')('fbrowser:public')

export function PublicAssets(root: string): Middleware {
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

    ctx.set('', '')
    await send(ctx, filePath, { root })
  }
}

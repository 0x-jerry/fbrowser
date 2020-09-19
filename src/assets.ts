import { Context, Middleware } from 'koa'
import co from 'co'
import send from 'koa-send'
import sendStream from 'koa-stream'

const sendVideo = co.wrap(sendStream.file) as (
  ctx: Context,
  filepath: string,
  options: { root: string }
) => Promise<null | undefined>

const debug = require('debug')('fbrowser:assets')

export function AssetsResources(root: string): Middleware {
  return async (ctx, next) => {
    if (!ctx.path.startsWith('/assets')) {
      await next()
      return
    }

    const filePath = ctx.path.replace(/^\/assets/, '')

    debug(`assets resources: ${filePath}`)

    if (filePath.endsWith('.mp4')) {
      await sendVideo(ctx, filePath, { root })
    } else {
      await send(ctx, filePath, { root })
    }
  }
}

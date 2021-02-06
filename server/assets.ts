import { Context, Middleware } from 'koa'
import co from 'co'
import send from 'koa-send'
import sendStream from 'koa-stream'
import mime from 'mime-types'

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

    const isMedia = /^(audio|video)/.test(mime.lookup(filePath) || '')

    if (isMedia) {
      await sendVideo(ctx, filePath, { root })
    } else {
      await send(ctx, filePath, { root })
    }
  }
}

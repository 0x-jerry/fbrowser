import { Context, Middleware } from 'koa'

const debug = require('debug')('fbrowser:api')

interface Route {
  (ctx: Context): Promise<void>
}

const query: Route = async (ctx) => {
  const { dir } = ctx.query
  debug('api: %O', ctx.query)

  if (dir) {
    console.log(dir)
  }
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

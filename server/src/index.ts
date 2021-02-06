import Koa from 'koa'
import { API } from './api'
import { AssetsResources } from './assets'
import { config } from './config'
import { PublicAssets } from './public'
import koaCash from 'koa-cash'
import LRU from 'lru-cache'

const debug = require('debug')('fbrowser:app')

const cacheMaxAge = 3600 * 12

const cache = new LRU({
  maxAge: cacheMaxAge
})

const app = new Koa()

app
  .use(async (ctx, next) => {
    if (ctx.path === '/') {
      ctx.redirect('/public/')
      return
    }

    await next()

    if (config.isDev) {
      ctx.set('Access-Control-Allow-Origin', '*')
    }
  })
  .use(API())
  .use(
    koaCash({
      maxAge: cacheMaxAge,
      setCachedHeader: true,
      compression: true,
      async get(key) {
        return cache.get(key)
      },
      async set(key, value) {
        cache.set(key, value)
      }
    })
  )
  .use(async (ctx, next) => {
    const isCached = await ctx.cashed()
    debug(`is cached: ${isCached}`)

    if (!isCached) {
      await next()
    }
  })
  .use(PublicAssets(config.htmlDir))
  .use(AssetsResources(config.assetsDir))

app.listen(3000, () => {
  console.log(`server listen(${process.env.NODE_ENV}): http://localhost:3000`)
})

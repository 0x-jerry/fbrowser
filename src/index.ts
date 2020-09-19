import Koa from 'koa'
import { API } from './api'
import { AssetsResources } from './assets'
import { config } from './config'
import { PublicAssets } from './public'

const app = new Koa()

app
  .use(async (ctx, next) => {
    if (ctx.path === '/') {
      ctx.redirect('/public/')
      return
    }

    await next()
  })
  .use(PublicAssets(config.htmlDir))
  .use(AssetsResources(config.assetsDir))
  .use(API())

app.listen(3000, () => {
  console.log(`server listen(${process.env.NODE_ENV}): http://localhost:3000`)
})

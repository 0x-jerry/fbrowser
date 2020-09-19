import Koa from 'koa'

console.log(process.env.NODE_ENV)

const app = new Koa()

app.listen(3000)

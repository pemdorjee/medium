import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'


const app = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}> ()
app.use('/*', cors({
  origin: 'medium-pink-seven.vercel.app', 
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowHeaders: ['Content-Type', 'Authorization'], 
}))

app.route('/api/v1/user', userRouter);

app.route('/api/v1/blog',blogRouter);


export default app
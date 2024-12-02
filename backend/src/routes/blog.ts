import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign ,verify} from "hono/jwt";
import { createBlog, updateBlogInput } from "@pemdorjee11/medium-common"

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET:string
    },
    Variables :{
        userId: string
    }
}>();

blogRouter.use('/*', async(c,next) => {

 
    const authHeader =  c.req.header("Authorization") || "";
    
  
    
   try {
    const user = await verify (authHeader, c.env.JWT_SECRET);
    if (user){
        
        console.log("entered middleware")
        c.set ("userId", user.id as string);
        await next();
    }
    else{
        c.status(403);
        return c.json({
            message: "you are not logged in"
        })
    }
   } catch (error) {
        c.json({error: error})
        return c.json({
            message: "you are not logged in"
        })
   }


})

blogRouter.post('/', async(c) => {
  const data = await c.req.json();
    const { success} = createBlog.safeParse(data)
    if (!success){
      c.status(411)
      return c.json({
        message: "invalid inputs"
      })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const userId = c.get("userId")
    console.log(userId)
    
    try{
      const blog = await prisma.post.create({
        data:{
          title: data.title,
          content: data.content,
          authorId: userId,
          
        }
      })
      c.status(200)
      return c.json({
        blog
      })
      
    }catch(e){
        console.log(e)
      c.status(411)
      return c.text ("invalid")
    }
  })
  
  blogRouter.put ('/', async(c) =>{
    const data = await c.req.json();
    const { success} = updateBlogInput.safeParse(data)
    if (!success){
      c.status(411)
      return c.json({
        message: "invalid inputs"
      })
    }
    
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    try{
      const blog = await prisma.post.update({
        where:{
          id: data.id,
        },
        data: {
            title: data.title,
            content: data.content
        }
      })
      
      
      return c.json({
        id: blog.id
      })
    }catch(e){
      console.log(e);
      c.status(411);
      return c.json ("invalid")
    }
  })
  
  blogRouter.get ('/bulk', async(c) =>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    
    try{
      const blogs = await prisma.post.findMany({  
        select:{
          content: true,
          title: true,
          id: true,
          author:{
            select:{
              name: true
            }
          }
        }
      })
      //todo :pagination
      c.status(200)
      return c.json({
        blogs
      })
    }catch(e){
      console.log(e);
      c.status(411);
      return c.json ("invalid")
    }
  })

  blogRouter.get ('/:id', async(c) =>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const id = c.req.param("id");
    
    
    try{
      const blog = await prisma.post.findFirst({
        where:{
          id: id,
        },
        select:{
          id:true,
          title: true,
          content: true,
          author: {
            select:{
              name: true
            }
          }
        }
      })
      c.status(200)
      return c.json({
        blog
      })
    }catch(e){
      console.log(e);
      c.status(411);
      return c.json ("invalid")
    }
  })


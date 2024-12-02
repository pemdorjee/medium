import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@pemdorjee11/medium-common";
export const userRouter = new Hono();
userRouter.post('/signup', async (c) => {
    const data = await c.req.json();
    console.log("hello signup");
    const { success } = signupInput.safeParse(data);
    if (!success) {
        c.status(411);
        return c.json({
            message: "inputs are incorrect"
        });
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const user = await prisma.user.findFirst({
        where: {
            email: data.email
        }
    });
    if (!user) {
        try {
            const user = await prisma.user.create({
                data: {
                    email: data.email,
                    password: data.password,
                    name: data.name
                }
            });
            const jwt = await sign({
                id: user.id
            }, c.env.JWT_SECRET);
            return c.text(jwt, 200);
        }
        catch (e) {
            console.log(e);
            return c.text("invalid", 404);
        }
    }
    else {
        return c.text("user already exists");
    }
});
userRouter.post('/signin', async (c) => {
    const data = await c.req.json();
    const { success } = signinInput.safeParse(data);
    if (!success) {
        c.status(411);
        return c.json({
            message: "inputs are incorrect"
        });
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: data.email,
                password: data.password
            }
        });
        if (!user) {
            c.status(403);
            return c.text("invalid", 404);
        }
        const jwt = await sign({
            id: user.id
        }, c.env.JWT_SECRET);
        return c.text(jwt, 200);
    }
    catch (e) {
        console.log(e);
        c.status(411);
        return c.text("invalid");
    }
});
userRouter.get("/test", async (c) => {
    // const prisma = new PrismaClient({
    //   datasourceUrl: c.env.DATABASE_URL,
    // }).$extends(withAccelerate())
    return c.json({
        helloo: "hello from test end point"
    });
});

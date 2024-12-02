import { Blog } from "../hooks";
import { Avatar } from "./BlogCard"



export const MainBlog = ({
    blog
}:{blog: Blog}) => {
    return <div className="m-10 ">
        <div className="grid grid-cols-12 p-10 pb-10 border-1 border border-slate-200 ">
                <div className="grid col-span-8  mt-20 ">
                    <div className="font-extrabold text-5xl leading-[60px] ">
                        {blog.title}
                    </div>
                    <div className="flex text-slate-500 text-lg mt-5">
                        <div>
                            Posted on
                        </div>
                        <div className="pl-3">
                           22nd March 2024
                        </div>
                    </div>
                    <div className="text-lg text-slate-800 mt-4 "> 
                        {blog.content}
                    </div>
                </div>

                <div className="col-span-4 mt-20 " >
                        
                        <span  className="text-md text-slate-800 ">Author</span>
                        <div className="grid grid-cols-12 mt-3 ">
                            <div className=" col-span-1 text-md mb-3  text-slate-800 flex flex-col justify-center ">
                            <Avatar  authorname={blog.author.name} size="big"/>
                            </div>
                            <div className="col-span-11 ml-4 ">
                                <div className="font-semibold text-xl">
                                {blog.author.name}
                                </div>
                                <div className="text-md font-extralight text-slate-500">
                                    whatever i write is shit 
                                </div>
                            </div>
                        </div>
                        </div>
                       
                </div>


    </div>
    
}


import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"



export const Blogs = () => {
    const {loading, blogs} = useBlogs();
    if (loading){
        
        return <div className="">
            <Appbar/>
           <BlogSkeleton />
           <BlogSkeleton />
           <BlogSkeleton />
           <BlogSkeleton />
           <BlogSkeleton />
           <BlogSkeleton />
           <BlogSkeleton />

        </div>
    }
    return <div>
                <Appbar />
                <div className="flex justify-center">
                    <div className=" max-w-xl">
                {blogs.map((blog, index) => 
                        <BlogCard
                        id= {blog.id}
                        key={index}
                        authorName={blog.author.name}
                        title={blog.title}
                        content={blog.content}
                        publishedDate="22/04/2024"
                    />
                )}
                    
                    </div>
                       
                </div>
    </div>
}


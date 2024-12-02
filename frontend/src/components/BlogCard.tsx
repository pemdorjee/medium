import { Link } from "react-router-dom";
import { Appbar } from "./Appbar";
import { getJSDocReturnTag } from "typescript";
interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id:string;
   
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id
   
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
    <div>
       
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
                <Avatar authorname={authorName} />
                <div className="font-extralight pl-2 text-sm flex justify-center flex-col">{authorName}</div>
                <div className="flex justify-center flex-col pl-2">
                    <Circle />
                </div>
                <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0, 100) + "..."}
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
        </div>

    </div>
    </Link>

}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}

export const Avatar = ({authorname, size="small"}:{authorname: string, size? : "small"| "big"}) => {
   return  <div className={`relative inline-flex items-center justify-center ${size === "small" ? "w-6 h-6" : "w-10 h-10"} overflow-hidden bg-gray-600 rounded-full`}>
    <span className= {`${size === "small"? "text-xs" : "text-md"}text-gray-600 font-extralight dark:text-gray-300`}>{authorname[0]}</span>
</div>
 
}
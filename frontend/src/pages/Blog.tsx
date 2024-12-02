
import { useBlog } from '../hooks'
import { useParams } from 'react-router-dom';
import { MainBlog } from '../components/MainBlog';
import { Appbar } from '../components/Appbar';

// import { SkeletonBlog } from '../components/SkeltonBlog';

export const Blog =() => {

 
  const {id} = useParams();
 

    const {blog, loading} = useBlog({
      id : id || ""
    });
    if (loading || !blog){
        return <div>
         loading...
            
        </div>
    }
  return (
    <div>
      <Appbar />
      <MainBlog blog = {blog}
      />
    </div>
  )
}


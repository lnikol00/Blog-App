import { useContext } from 'react';
import BlogContext, { BlogContextType } from '../context/BlogProvider';

const useBlog = () => {
    return useContext(BlogContext) as BlogContextType;
};

export default useBlog;
import { SET_BLOG, ADD_BLOG_POST, UPDATE_BLOG_POST, DELETE_BLOG_POST } from '../actions/blogActions';

const blogReducer = (blog = {}, action) => {
    switch (action.type) {
        case SET_BLOG:
            return ({
                ...action.payload
            })
        case ADD_BLOG_POST:
            return({
                ...blog,
                blogPosts: [ ...(blog ? blog.blogPosts : []), action.payload ]
            })
        case UPDATE_BLOG_POST:
            const post = blog.blogPosts.find(x => `${x.id}` === `${action.payload.id}`);
            console.log(post);
            post.text = action.payload.text;
            post.title = action.payload.title;
            post.description = action.payload.description;
            post.tags = action.payload.tags;
            return({
                ...blog
            });
        case DELETE_BLOG_POST:
            return({
                ...blog,
                blogPosts: [ ...(blog ? blog.blogPosts.filter(x => `${x.id}` !== `${action.payload.id}`) : [])]
            })
        default:
            return blog;
    }
};

export default blogReducer;
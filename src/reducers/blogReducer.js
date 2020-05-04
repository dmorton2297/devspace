import { SET_BLOG, ADD_BLOG_POST, UPDATE_BLOG_POST, DELETE_BLOG_POST, SET_BLOG_DETAILS } from '../actions/blogActions';

const blogReducer = (blog = {}, action) => {
    switch (action.type) {
        case SET_BLOG:
            return ({
                ...action.payload
            })
        case SET_BLOG_DETAILS:
            return ({
                ...action.payload,
                blogPosts: blog.blogPosts
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
            console.log(action.payload);
            return({
                ...blog,
                blogPosts: [ ...(blog ? blog.blogPosts.filter(x => `${x._id}` !== `${action.payload}`) : [])]
            })
        default:
            return blog;
    }
};

export default blogReducer;
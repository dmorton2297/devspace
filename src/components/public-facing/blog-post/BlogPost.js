import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/styles';
import styles from '../../blog/styles';
import { getBlogPost } from '../../../services/webService';
import { withRouter } from 'react-router-dom';
import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';
import './styles.css';

const BlogPost = ({ match, classes }) => {
    console.log(match);
    const [post, setPost] = useState(null);
    useEffect(() => {
        getBlogPost(match.params.id, match.params.userId).then((res) => {
            setPost(res.data);
        });
    }, [setPost, match]);

    if (!post) {
        return <React.Fragment>Loading...</React.Fragment>
    }

    const md = MarkdownIt({
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    const test = hljs.highlight(lang, str).value;
                    console.log(test);
                    return hljs.highlight(lang, str).value;
                } catch (__) { }
            }

            return ''; // use external default escaping
        }
    });

    const style = `
    h1, h2, h3, h4, h5, p, li, div {
        font-family: 'Roboto';
    }
    
    h1  {
        font-size: 30px;
        font-weight: 400;
        padding: 20px 0;
    }
    
    h2 {
        font-size: 24;
        padding: 20px 0;
    }
    
    h3 {
        font-size: 18px
        padding: 20px 0;
    }
    
    h4 {
        font-size: 18px;
        font-weight: 500
        padding: 20px 0;

    }
    
    li {
        font-size: 16px
        padding: 20px 0;
    }
    
    pre {
        padding: 20px;
        background-color: #ebebeb;
        padding: 20px;
        overflow-x: scroll;
    }    

    .image-container {
        display: flex;
        justify-content: center;
        background-color: #ebebeb;
        padding: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    `
    let t = `<style>${style}</style>${md.render(post.text)}`;
    t = t.replace(/\\"/g, '"');
    t = t.replace('<p><img', '<p class="image-container"><img')
    console.log(t);
    return (
        <div className={classes.container}>
            <div dangerouslySetInnerHTML={{ __html: t }}></div>
        </div>
        
    );
};

export default withStyles(styles)(withRouter(BlogPost));


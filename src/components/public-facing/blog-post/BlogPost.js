import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import styles from '../../blog/styles';
import { getBlogPost } from '../../../services/webService';
import { withRouter } from 'react-router-dom';
import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';
import './styles.css';

const BlogPost = ({ match, classes }) => {
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
                    return hljs.highlight(lang, str).value;
                } catch (__) { }
            }

            return ''; // use external default escaping
        },
        breaks: true
    });

    const style = `
    h1, h2, h3, h4, h5, p, li, div {
        font-family: 'Roboto';
    }
    
    h1  {
        font-size: 40px;
        font-weight: 400;
        padding: 20px 0;
    }
    
    h2 {
        font-size: 30px;
        padding: 20px 0;
        font-weight: 400;
    }
    
    h3 {
        font-size: 18px
        padding: 20px 0;
    }
    
    p {
        padding: 10px 0;
        font-size: 20px;
    }

    h4 {
        font-size: 18px;
        font-weight: 500
        padding: 20px 0;

    }
    
    li {
        font-size: 20px;
        padding: 10px 0px;
        font-weight: 300;
        margin: 0;
    }
    
    ul {
        padding: 0 20px;
    }
    
    pre {
        padding: 20px;
        background-color: #ebebeb;
        padding: 20px;
        overflow-x: scroll;
    }

    table {
        width: 100%;
    }
    
    thead {
        background-color: lightgray;
    }

    th {
        padding: 20;
        text-align: left !important;
    }

    td {
        padding: 20;
        text-align: left !important;
    }

    .image-container {
        display: flex;
        justify-content: center;
        background-color: #ebebeb;
        padding: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .image-container > img {
        width: 100%;
        height: 300px;
        object-fit: cover;
    }
    `
    let t = `<style>${style}</style>${md.render(post.text)}`;
    t = t.replace(/\\"/g, '"');
    t = t.replaceAll('<p><img', '<p class="image-container"><img')
    return (
        <div className={classes.container}>
            <div dangerouslySetInnerHTML={{ __html: t }} style={{ paddingBottom: 200 }}></div>
        </div>
        
    );
};

export default withStyles(styles)(withRouter(BlogPost));


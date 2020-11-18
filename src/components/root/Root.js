import React from 'react'
import styles from './styles';
import { withStyles } from '@material-ui/core';
import { object } from 'prop-types';
import Login from '../login';
import Home from '../home';
import { Route, Switch } from 'react-router-dom'
import classNames from 'classnames';
import ProtectedRoute from './protected-route';
import Navigation from '../navigation';
import BlogPost from '../public-facing/blog-post';
import PublicBlog from '../public-facing/blog';
import SignUp from '../sign-up';


/**
 * Root Component of portfolium-frontend.
 * @param {object} $0 - Object holding the props for this object.
 * @param {object} $0.classes - Styling classes. 
 */
const Root = ({ classes }) => {
    return (
        <div className={classNames(classes.root, 'root')}>
            <div className={classes.navigation}>
                <Navigation />
            </div>
            <div className={classNames(classes.scrollContainer)} id='scroll-container'>
                <div className={classes.mainContainer}>
                    <Switch>
                        <ProtectedRoute path="/home" component={Home} />
                        <Route path="/signup" component={SignUp} />s
                        <Route path="/posts/:id/" component={BlogPost} />
                        <Route path ="/blog/:email" component={PublicBlog} />
                        <Route path="/" component={Login} />
                    </Switch>
                </div>
            </div>
            <div className={classes.footer}>
                <span><strong>DevSpace</strong> - Personal Blogging Platform - Maintained by Dan Morton - <strong>deepspacedevelopment@gmail.com</strong></span>
                <img src="/linked-in.png" width={20} height={20} alt="linkedIn" />
                <img src="/github.png" width={20} height={20} alt="linkedIn" />
            </div>
        </div>

    );
};

Root.propTypes = {
    classes: object.isRequired
};

export default withStyles(styles)(Root);

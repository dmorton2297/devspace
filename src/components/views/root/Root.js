import React, { useEffect } from 'react'
import styles from './styles';
import { withStyles } from '@material-ui/core';
import { object } from 'prop-types';
import Login from '../login';
import Home from '../home';
import { Route, Switch } from 'react-router-dom'
import classNames from 'classnames';
import ProtectedRoute from './protected-route';
import Navigation from '../../core/navigation';
import BlogPost from '../public-facing/blog-post';
import PublicBlog from '../public-facing/blog';
 import SignUp from '../sign-up';


/**
 * Root Component of portfolium-frontend.
 * @param {object} $0 - Object holding the props for this object.
 * @param {object} $0.classes - Styling classes. 
 */
const Root = ({ classes }) => {

    const TemporaryRedirect = ({ history }) => {
        useEffect(() => {
            history.push('/dmorton2297')
        });
    
        return null;
    }

    return (
        <div className={classNames(classes.root, 'root')}>
            <div className={classes.navigation}>
                <Navigation />
            </div>
            <div className={classNames(classes.scrollContainer)} id='scroll-container'>
                <div className={classes.mainContainer}>
                    <Switch>
                        <ProtectedRoute path="/app/home" component={Home} />
                        <Route path="/app/signup" component={SignUp} />
                        <Route path="/app/login" component={Login} />
                        <Route path="/posts/:id/" component={BlogPost} />
                        <Route path ="/:email" component={PublicBlog} />
                        <Route path ="/" exact component={TemporaryRedirect} />
                    </Switch>
                </div>
            </div>
            <div className={classes.footer}>
                <span style={{marginRight: 10}}><strong>DevSpace</strong> - Personal Blogging Platform - Maintained by Dan Morton - <strong>deepspacedevelopment@gmail.com</strong></span>
                <a href="http://github.com/dmorton2297" style={{marginRight: 10}}><img src="/github.png" width={20} height={20} alt="github" /></a>
                <a href="http://www.linkedin.com/in/dan-morton-a10a83101/" style={{marginRight: 10}}><img src="/linked-in.png" width={20} height={20} alt="linkedIn" /></a>
            </div>
        </div>

    );
};

Root.propTypes = {
    classes: object.isRequired
};

export default withStyles(styles)(Root);

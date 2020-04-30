import React, { useState } from 'react'
import styles from './styles';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { setTab } from '../../actions/tabActions';

const Button = ({ classes, clicked, first, onClick, text }) => {
    return clicked ?
        <button onClick={onClick} className={classNames(classes.navigationButton, classes.clicked)}>{text}</button> :
        <button onClick={onClick} className={classNames(classes.navigationButton)}>{text}</button>
}



const Navigation = ({ classes }) => {
    const user = useSelector(state => state.userReducer);
    const [space, setSpace] = useState(true);
    const [blog, setBlog] = useState(false);
    const [settings, setSettings] = useState(false);
    const dispatch = useDispatch();

    const onSpaceClicked = () => {
        dispatch(setTab('space'));
        setSpace(true);
        setBlog(false);
        setSettings(false);
    };

    const onBlogClicked = () => {
        dispatch(setTab('blog'));
        setBlog(true);
        setSpace(false);
        setSettings(false);
    };

    const onSettingsClicked = () => {
        dispatch(setTab('settings'));
        setSettings(true);
        setSpace(false);
        setBlog(false);
    };

    return (
        <div className={classNames(classes.container, 'navigation-container')}>
            <div className={classes.logo}>
                <img src="/app-logo.png" width="160px" alt="app-logo" />
            </div>
            <div></div>
            {user.id &&
                <div className={classes.navigationControl}>
                    <Button classes={classes} clicked={space} first={true} onClick={onSpaceClicked} text={'Space'} />
                    <Button classes={classes} clicked={blog} first={false} onClick={onBlogClicked} text={'Blog'} />
                    <Button classes={classes} clicked={settings} first={false} onClick={onSettingsClicked} text={'Settings'} />
                </div>
            }
        </div>
    )
}

export default withStyles(styles)(Navigation);

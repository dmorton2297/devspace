import React, { useState } from 'react'
import styles from './styles';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

const Button = ({ classes, clicked, first, onClick, text }) => {
    return clicked ?
        <button onClick={onClick} className={classNames(classes.navigationButton, first ? classes.firstNavigationButton : '', classes.clicked)}>{text}</button> :
        <button onClick={onClick} className={classNames(classes.navigationButton, classes.firstNavigationButton)}>{text}</button>
}



const Navigation = ({ classes }) => {
    const user = useSelector(state => state.userReducer);
    const [profile, setProfile] = useState(true);
    const [blog, setBlog] = useState(false);
    const [settings, setSettings] = useState(false);

    const onProfileClicked = () => {
        setProfile(true);
        setBlog(false);
        setSettings(false);
    };

    const onBlogClicked = () => {
        setBlog(true);
        setProfile(false);
        setSettings(false);
    };

    const onSettingsClicked = () => {
        setSettings(true);
        setProfile(false);
        setBlog(false);
    };

    return (
        <div className={classNames(classes.container, 'navigation-container')}>
            <div className={classes.logo}>
                <img src="app-logo.png" alt="app-logo" />
            </div>
            {user.user &&
                <div className={classes.navigationControl}>
                    <Button classes={classes} clicked={profile} first={true} onClick={onProfileClicked} text={'Profile'} />
                    <Button classes={classes} clicked={blog} first={false} onClick={onBlogClicked} text={'Blog'} />
                    <Button classes={classes} clicked={settings} first={false} onClick={onSettingsClicked} text={'Settings'} />
                </div>
            }
        </div>
    )
}

export default withStyles(styles)(Navigation);

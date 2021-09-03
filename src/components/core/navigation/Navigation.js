import React, { useState } from 'react'
import styles from './styles';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { setTab } from '../../../actions/tabActions';
import { IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

const Button = ({ classes, clicked, first, onClick, text }) => {
    return clicked ?
        <button onClick={onClick} className={classNames(classes.navigationButton, classes.clicked)}>{text}</button> :
        <button onClick={onClick} className={classNames(classes.navigationButton)}>{text}</button>
}



const Navigation = ({ classes }) => {
    const [space, setSpace] = useState(true);
    const [blog, setBlog] = useState(false);
    const [settings, setSettings] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();

    const onSpaceClicked = () => {
        if (showMenu) {
            setShowMenu(false);
        }
        dispatch(setTab('space'));
        setSpace(true);
        setBlog(false);
        setSettings(false);
    };

    const onBlogClicked = () => {
        if (showMenu) {
            setShowMenu(false);
        }
        dispatch(setTab('blog'));
        setBlog(true);
        setSpace(false);
        setSettings(false);
    };

    const onSettingsClicked = () => {
        if (showMenu) {
            setShowMenu(false);
        }
        dispatch(setTab('settings'));
        setSettings(true);
        setSpace(false);
        setBlog(false);
    };

    const showAppMenu = () => {
        setShowMenu(true);
    }

    const closeAppMenu = () => {
        setShowMenu(false);
    }

    const user =  useSelector(state => state.userReducer);
    const authenticated = !!user._id;



    return (
        <div className={classNames(classes.container, 'navigation-container')}>
            <div className={classes.logo}>
                <img src="/app-logo.png" width="160px" alt="app-logo" />
            </div>
            <div></div>
            {authenticated && window.innerWidth > 1000 &&
                <div className={classes.navigationControl}>
                    <Button classes={classes} clicked={space} first={true} onClick={onSpaceClicked} text={'Space'} />
                    <Button classes={classes} clicked={blog} first={false} onClick={onBlogClicked} text={'Blog'} />
                    <Button classes={classes} clicked={settings} first={false} onClick={onSettingsClicked} text={'Settings'} />
                </div>
            }
            {authenticated && window.innerWidth < 1000 && showMenu &&
                <div className={classes.mobileMenu}>
                    <IconButton className={classes.closeMenuButton} onClick={closeAppMenu}>
                        <CloseIcon className={classes.closeMenuIcon}></CloseIcon>
                    </IconButton>
                    <div className={classes.mobileMenuButtonsContaine}>
                        <div onClick={onSpaceClicked} className={classes.mobileMenuButton}>
                            <Typography variant="h2">Space</Typography>
                        </div>
                        <div onClick={onBlogClicked} className={classes.mobileMenuButton}>
                            <Typography variant="h2">Blog</Typography>
                        </div>
                        <div onClick={onSettingsClicked} className={classes.mobileMenuButton}>
                            <Typography variant="h2">Settings</Typography>
                        </div>
                    </div>

                </div>
            }
            {authenticated && window.innerWidth < 1000 && !showMenu &&
                <div className={classes.menuButtonContainer}>
                    <IconButton className={classes.menuButton} onClick={showAppMenu}>
                        <MenuIcon className={classes.menuIcon}></MenuIcon>
                    </IconButton>
                </div>
            }
        </div>
    )
}

export default withStyles(styles)(Navigation);

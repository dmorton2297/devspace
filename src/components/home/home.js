import React from 'react'
import { withStyles } from '@material-ui/styles';
import styles from './styles';
import { object } from 'prop-types';
import { useSelector } from 'react-redux';
import Space from '../space';
import Blog from '../blog';

const Home = ({ classes }) => {
    const user = useSelector(state => state.userReducer);
    const tab = useSelector(state => state.tabReducer);

    if (!user.id) {
        return <div></div>; // TODO - Add spinner
    }

    /**
     * Function to render the correct component for the current tab set in state.
     * @param {string} tab - Tab to render
     * @returns {Element} - Element to display
     */
    const renderTab = tab => {
        switch (tab) {
            case 'space':
                return <Space user={user} />;
            case 'blog':
                return <Blog user={user} />;
            case 'settings':
                return <p>Settings</p>
            default:
                return <Blog user={user} />;
        }
    };

    return (
        <div className={classes.container}>
            {renderTab(tab)}
        </div>
    );
};

Home.propTypes = {
    classes: object.isRequired,
    history: object.isRequired,
}

export default withStyles(styles)(Home);

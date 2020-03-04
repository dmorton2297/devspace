import React from 'react'
import { withStyles } from '@material-ui/styles';
import styles from './styles';
import { object  } from 'prop-types';
import { useSelector } from 'react-redux';
import Profile from '../profile';

const Home = ({ classes }) => {
    const user = useSelector(state => state.userReducer);
    if (!user.id) {
        return <div></div>; // TODO - Add spinner
    } 
    return (
        <div className={classes.container}>
            <Profile user={user}/>
        </div>
    );
};

Home.propTypes = {
    classes: object.isRequired,
    history: object.isRequired,
}

export default withStyles(styles)(Home);

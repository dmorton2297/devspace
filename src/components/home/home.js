import React from 'react'
import { withStyles } from '@material-ui/styles';
import styles from './styles';
import { object  } from 'prop-types';
import { useSelector } from 'react-redux';

const Home = ({ classes }) => {
    const user = useSelector(state => state.userReducer);
    return (
        <div className={classes.container}>
            <h1>Welcome {user.user.name}</h1>
        </div>
    );
};

Home.propTypes = {
    classes: object.isRequired,
    history: object.isRequired
}

export default withStyles(styles)(Home);

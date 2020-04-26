const styles = theme => {
    return ({
        container: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        },
        warning: {
            color: theme.palette.primary.warn,
            padding: 50,
            height: 100,
            width: 100,
            borderRadius: 5,
            backgroundColor: theme.palette.primary.medium
        }
    });
};

export default styles;
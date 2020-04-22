const styles = theme => {
    return({
        container: {
            overflow: 'hidden',
            padding: 0
        },
        projectName: {
            padding: 30,
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.light,
            flexGrow: 1
        },
        projectImage: {
            height: 400,
            objectFit: 'cover'
        },
        projImage: {
            
        },
        controlButton: {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.light,
            '&:hover': {
                color: 'lightgray'
            },
            padding: '0 10px'
        },
        deleteButton: {
            '&:hover': {
                color: theme.palette.primary.warn
            },
            paddingRight: 20
        },
        header: {
            backgroundColor: theme.palette.primary.dark,
            position: 'sticky',
            justifyContent: 'space-between'
        }
    });
};

export default styles;
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
        editButton: {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.light,
            '&:hover': {
                color: 'lightgray'
            },
            padding: '0 20px'
        },
        header: {
            backgroundColor: theme.palette.primary.dark
        }
    });
};

export default styles;
const styles = theme => {
    return({
        container: {
            overflow: 'hidden',
            padding: 0

        },
        projectName: {
            padding: 30,
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.light
        },
        projectImage: {
            height: 400,
            objectFit: 'cover'
        },
        projImage: {
            
        }
    });
};

export default styles;
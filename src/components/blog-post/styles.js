const styles = theme => {
    return ({
        container: {
            justfiyContent: 'space-between',
            padding: 0
        },
        title: {
            maxWidth: 400,
            minWidth: 400,
            padding: 20,
            fontWeight: theme.typography.bold.fontWeight
        },
        description: {
            maxWidth: 400,
            padding: 20
        },
        infoContainer: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.lightAlternate,
            '&:hover': {
                backgroundColor: theme.palette.primary.darkAlternate,
            }
        },
        tagContainer: {
            padding: '5px 0',
            justifyContent: 'flex-end',
            backgroundColor: theme.palette.primary.lightAlternateTransparent
        }
    })
};

export default styles;
const styles = theme => {
    return ({
        container: {
            width: '100%',
            height: '100%',
            '@media(max-width: 1000px)': {
                padding: 15,
                width: 'calc(100% - 40px)'
            }
        },
        titleTags: {
            justifyContent: 'space-between',
        },
        description: {
            padding: '20px 0'
        },
        editButton: {
            display: 'flex',
            padding: '20px 0',
            '&:hover': {
                cursor: 'pointer',
                color: theme.palette.primary.medium
            }
        },
        titleTextBox: {
            paddingRight: '5%',
            display: 'flex',
            '@media(max-width: 1000px)': {
                display: 'block'
            }

        },
        title: {
            marginBottom: 10,
            fontSize: 32
        },
        headerContainer: {
            padding: '20px 0'
        }
    });
};

export default styles;
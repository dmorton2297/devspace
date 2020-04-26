const styles = theme => {
    return ({
        container: {
            width: '100%',
            height: '100%'
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
            paddingRight: '5%'
        }
    });
};

export default styles;
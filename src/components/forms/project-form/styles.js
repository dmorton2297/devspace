const styles = theme => {
    return({
        addImageButton: {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.light,
            width: 200,
            marginRight: 10
        },
        imageRow: {
            display: 'flex',
            padding: 20,
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.dark,
            border: `1px solid ${theme.palette.primary.dark}`,
            borderRadius: 5,
            margin: '10px 0'
        },
        imageRowContent: {
            marginTop: 2,
            flexGrow: 1
        }
    });
};

export default styles;

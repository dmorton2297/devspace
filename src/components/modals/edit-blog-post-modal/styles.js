const styles = theme => {
    return({
        content: {
            height: '100%'
        },
        generalInfoForm: {
            padding: '20px 0'
        },
        addImageButton: {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.light,
            width: 200,
            marginRight: 10
        },
    })
};

export default styles;
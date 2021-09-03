const styles = theme => {
    return {
        contentContainer: {
            height: '90%',
            overflowY: 'auto',
            marginBottom: 40
        },
        buttonContainer: {
            display: 'flex'
        },
        cancelButton: {
            backgroundColor: '#f44336',
            color: theme.palette.primary.light,
            width: 100
        }
    };
};

export default styles;
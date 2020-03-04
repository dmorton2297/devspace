const styles = (theme) => {
    return ({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: theme.palette.primary.light
        },
        infoContainer: {
            display: 'grid',
            gridTemplateColumns: '320px calc(100% - 320px)'
        },
        generalInfoContainer: {
            padding: '0 10px',
            display: 'flex',
            justifyContent: 'center'
        },
        infoItem: {
            marginBottom: 10
        },
        header: {
            padding: '20px 0',
        },
        headerText: {
            fontWeight: 400,
        }
    });
};

export default styles;
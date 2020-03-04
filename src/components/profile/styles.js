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
            display: 'flex'
        },
        headerText: {
            fontWeight: 400,
        },
        test: {
            marginLeft: 50
        },
        projectsHeader: {
            marginTop: 10,
            borderBottom: `1px solid ${theme.palette.primary.dark}`,
            paddingBottom: 10
        },
        summary: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.light,
            padding: 30,
            fontStyle: 'italic',
            fontSize: '18px'
        },
        tag: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.light,
            padding: 10,
            borderRadius: 10,
            marginRight: 5
        },
        tags: {
            display: 'flex',
            justifyContent: 'flex-end',
            flexGrow: 1,
        }
    });
};

export default styles;
const styles = (theme) => {
    return ({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: theme.palette.primary.light,
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
            paddingBottom: 10
        },
        test: {
            marginLeft: 50
        },
        projectsHeader: {
            display: 'flex',
            position: 'sticky',
            backgroundColor: theme.palette.primary.light,
            padding: '25px 0',
            zIndex: 2,
            top: 0
        },
        summary: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.light,
            padding: 30,
            borderRadius: 5
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
        },
        topPortion: {
            position: 'sticky',
            top: 0,
            zIndex: 0
        },
        projects: {
            position: 'sticky',
            top: 0,
            zIndex: 1,
            backgroundColor: theme.palette.primary.light,
            minHeight: '102%',
        },
        projectCards: {
            padding: '0 2px',
            paddingTop: 18
        },
        noProjectsMessage: {
            padding: '20px 0'
        },
        editButton: {
            display: 'flex',
            '&:hover': {
                cursor: 'pointer',
                color: theme.palette.primary.medium
            }
        },
        cancelButton: {
            backgroundColor: theme.palette.primary.warn
        },
        inputs: {
            maxHeight: 280,
            overflowY: 'auto'
        }
    });
};

export default styles;
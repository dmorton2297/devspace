const styles = (theme) => {
    return ({
        container: {
            width: '100%',
            height: '100%',
        },
        firstTimeUser: {
            minHeight: 430,
            height: 430,
        },
        infoMessage: {
            borderBottom: `1px solid ${theme.palette.primary.main}`,
            padding: '20px 0'
        },
        firstTimeFieldsContainer: {
            overflowY: 'auto',
            maxHeight: 350,
            marginTop: 10
        },
        infoContainer: {
            display: 'grid',
            gridTemplateColumns: '320px calc(100% - 320px)',
            '@media(max-width: 1000px)': {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }
        },
        generalInfoContainer: {
            padding: '0 10px',
            display: 'flex',
            justifyContent: 'center',
            '@media(max-width: 1000px)': {
                padding: 0
            }
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
            padding: '25px 0',
            zIndex: 2,
            top: 0
        },
        summary: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.light,
            padding: 30,
            '@media(max-width: 1000px)': {
                padding: 20
            }
        },
        tag: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.light,
            padding: 10,
            borderRadius: 10,
            marginRight: 10,
            height: 20
        },
        tags: {
            display: 'flex',
            justifyContent: 'flex-end',
            flexGrow: 1,
            '@media(max-width: 1000px)': {
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
            }

        },
        topPortion: {
            top: 0,
            zIndex: 0,
            padding: '0 3px'
        },
        projects: {
            position: 'sticky',
            top: 0,
            zIndex: 1,
            minHeight: '102%',
            '@media(max-width: 1000px)': {
                margin: 10
            }
        },
        projectCards: {
            padding: '0 2px',
            paddingTop: 18
        },
        projectCard: {
            '@media(max-width: 1000px)': {
                margin: 10
            }
        },
        noProjectsMessage: {
            padding: '20px 0'
        },
        editButton: {
            display: 'flex',
            '&:hover': {
                cursor: 'pointer',
                color: theme.palette.primary.medium
            },
            '@media(max-width: 1000px)': {
                width: '100%',
                marginBottom: 10
            }
        },
        cancelButton: {
            backgroundColor: theme.palette.primary.warn
        },
        inputs: {
            maxHeight: 280,
            overflowY: 'auto'
        },
        imageContainer: {
            '@media(max-width: 1000px)': {
                backgroundColor: theme.palette.primary.medium,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 10
            }
        },
        socialButtons: {
            '@media(max-width: 1000px)': {
                display: 'flex',
                width: '100%',
            }
        },
    });
};

export default styles;
const mainSidePadding = 100;
const mainWidth = `calc(100% - ${mainSidePadding * 2}px)`;
const navigationHeight = 80;

const styles = theme => {
    return ({
        root: {
            width: '100%',
            height: 'calc(100vh)',
            backgroundColor: theme.palette.primary.light,
        },
        navigation: {
            height: navigationHeight,
        },
        scrollContainer: {
            overflowY: 'scroll',
            display: 'grid',
            justifyItems: 'center'
        },
        mainContainer: {
            padding: `0 ${mainSidePadding}px`,
            width: mainWidth,
            maxWidth: '1500px',
            height: `calc(100vh - ${navigationHeight + 10}px)`,
        },
        '@global': {
            '.full-size-modal': {
                margin: 50,
                height: 'calc(100vh - 140px)',
                backgroundColor: theme.palette.primary.light,
                '@media(min-width: 1500px)': {
                    maxWidth: 1400,
                    transform: `translate(calc(50vw - ${1612 / 2}px), 0%) !important;`                    
                },
            },
            '.bottom-margin': {
                marginBottom: 10
            },
            '.invalid': {
                boxSizing: 'border-box',
                borderBottom: '1px solid red',
                borderLeft: '1px solid red'
            },
            '.flex': {
                display: 'flex'
            },
            '.flex-vert': {
                display: 'flex',
                flexDirection: 'column'
            },
            '.snackbar-width': {
                width: '90%'
            }
        }
    })
};

export default styles;
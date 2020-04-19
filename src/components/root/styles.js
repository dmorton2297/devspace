const mainSidePadding = 100;
const mainWidth = `calc(100% - ${mainSidePadding * 2}px)`;
const navigationHeight = 80;

const styles = theme => {
    return ({
        root: {
            width: '100%',
            height: 'calc(100vh)',
            backgroundColor: theme.palette.primary.light
        },
        navigation: {
            height: navigationHeight,
        },
        mainContainer: {
            padding: `0 ${mainSidePadding}px`,
            width: mainWidth,
            height: `calc(100vh - ${navigationHeight}px)`,
        },
        '@global': {
            '.full-size-modal': {
                margin: 50,
                height: 'calc(100vh - 140px)',
                backgroundColor: theme.palette.primary.light
            },
            '.bottom-margin': {
                marginBottom: 10
            },
            '.invalid': {
                boxSizing: 'border-box',
                borderBottom: '1px solid red',
                borderLeft: '1px solid red'
            }
        }
    })
};

export default styles;
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
            padding: `0 ${ mainSidePadding }px`,
            width: mainWidth,
            height: `calc(100vh - ${navigationHeight}px)`,
        }
    })
};

export default styles;
const mainSidePadding = 30;
const mainWidth = `calc(100% - ${mainSidePadding * 2}px)`;
const navigationHeight = 80;

const styles = () => {
    return ({
        root: {
            width: '100vw',
            height: '100vh',
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
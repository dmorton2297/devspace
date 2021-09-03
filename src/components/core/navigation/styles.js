const styles = theme => {
    return ({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: theme.palette.primary.dark,
            display: 'grid',
            gridTemplateColumns: '150px calc(100% - 620px) auto'
        },
        logo: {
            height: '100%',
            width: '100%',
            display: 'grid',
            alignItems: 'center',
            justifyConent: 'center'
        },
        navigationControl: {
            paddingLeft: 20,
            display: 'grid',
            gridTemplateColumns: '150px 150px 150px auto',
            alignItems: 'end'
        },
        navigationButton: {
            fontFamily: 'Rajdhani',
            fontSize: '18px',
            textAlign: 'right',
            paddingTop: 10,
            background: 'transparent',
            height: 40,
            border: 'none',
            color: 'white',
            borderRight: '1px solid #fff',
            backgroundPosition:'right bottom',
            backgroundSize: '200% 100%',
            transition:'all 0.3s ease',
            outline: 0
        },
        clicked: {
            background: 'white',
            color: 'black',
        },
        mobileMenu: {
            position: 'absolute',
            width: '250px',
            height: '100%',
            top: 0,
            backgroundColor: theme.palette.primary.mainTransparent,
            zIndex: 100,
            left: `${window.innerWidth - 250}px`
        },
        menuButtonContainer: {
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-end',
            paddingRight: 30
        },
        menuIcon: {
            color: theme.palette.primary.light
        },
        menuButton: {
            marginRight: 20
        },
        closeMenuIcon: {
            width: 30,
            height: 30,
            color: theme.palette.primary.light
        },
        closeMenuButton: {
            padding: 20
        },
        mobileMenuButton: {
            color: theme.palette.primary.light,
            cursor: 'pointer',
            padding: 20,
            '&:hover': {
                backgroundColor: theme.palette.primary.darkAlternate
            }
        }
    });
}

export default styles;
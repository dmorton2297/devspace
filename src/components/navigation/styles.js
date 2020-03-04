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
    });
}

export default styles;
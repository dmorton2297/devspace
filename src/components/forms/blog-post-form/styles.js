const styles = ({ palette }) => {
    return ({
        inputContainer: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10
        },
        renderedContent: {
            overflowY: 'auto',
            padding: 10,
            marginTop: 10,
            height: 'calc(100vh - 310px)',
            border: `1px solid ${palette.primary.main}`
        }
    });
};

export default styles;
import {styled} from '@mui/material/styles';


const SeverityPillRoot = styled('span')(({theme}) => {
    // @ts-ignore
    const backgroundColor = theme.palette['success'].main;
    // @ts-ignore
    const color = theme.palette['success'].contrastText;

    return {
        alignItems: 'center',
        backgroundColor,
        borderRadius: 12,
        color,
        cursor: 'default',
        display: 'inline-flex',
        flexGrow: 0,
        flexShrink: 0,
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.pxToRem(12),
        lineHeight: 2,
        fontWeight: 600,
        justifyContent: 'center',
        letterSpacing: 0.5,
        minWidth: 20,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        textTransform: 'uppercase',
        whiteSpace: 'nowrap'
    };
});

export const SeverityPill = (props: any) => {
    const {color = 'primary', children, ...other} = props;

    const ownerState = {color};

    return (
        <SeverityPillRoot
            ownerState={ownerState}
            {...other}
        >
            {children}
        </SeverityPillRoot>
    )
}
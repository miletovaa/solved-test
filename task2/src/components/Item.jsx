// took this from Jou UI documentation
// https://mui.com/joy-ui/react-grid/
import styled from '@mui/system/styled'
import Sheet from '@mui/joy/Sheet'

const Item = styled(Sheet)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography['body-sm'],
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius: 4,
    color: theme.vars.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.background.level1,
    }),
}));

export default Item
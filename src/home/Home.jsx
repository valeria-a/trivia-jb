import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

const Home = () => {
    return(
        <Stack direction={'column'} m={'auto'} maxWidth={'30em'}>
            <Typography variant='h6' sx={{textAlign: 'center'}}>
                New Game
            </Typography>
        </Stack>
    )
}

export default Home;
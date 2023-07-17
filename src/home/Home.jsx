
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Quiz from '../game/quiz/Quiz';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { GAME_ACTION_NEW_GAME_LOADING, GAME_ACTION_NEW_GAME_RECEIVED, GamesContext, GamesDispatchContext } from '../context/gamesContext';

const Home = () => {

    const dispatch = useContext(GamesDispatchContext)
    const gamesState = useContext(GamesContext)

    useEffect(() => {
        const fetchGame = async () => {

            dispatch({type: GAME_ACTION_NEW_GAME_LOADING})
            const response = await axios.get("https://the-trivia-api.com/v2/questions?limit=5")
            dispatch({
                type: GAME_ACTION_NEW_GAME_RECEIVED, 
                context: {data: response.data}
            })
            console.log(response)
        }
        fetchGame()
        },[]
    )

    const notSubmittedQuiz = Object.values(gamesState.games).filter((g) => g.submitted === false)


    

    return(
        <Stack direction={'column'} m={'auto'} maxWidth={'30em'}>
            <Typography variant='h6' sx={{textAlign: 'center'}}>
                New Game
            </Typography>
            {notSubmittedQuiz.length !== 0 &&
                <Quiz quiz={notSubmittedQuiz[0]}/>
            }
            
        </Stack>
    )
}

export default Home;
import { Button, Divider, Stack } from "@mui/material"
import Question from "../question/Question"
import { GAME_ACTION_RESET, GAME_ACTION_SUBMIT, useGamesDispatch } from "../../context/gamesContext"
import { useNavigate } from "react-router-dom"

const Quiz = ({gameData, fetchNewGame}) => {

    console.log('rendering Quiz')

    const gameDispatch = useGamesDispatch()
    const navigate = useNavigate()

    const handleSubmit = () => {
        gameDispatch({
            type: GAME_ACTION_SUBMIT,
            context: {
                gameId: gameData.id
            }
        })
        navigate(`/previous-games/${gameData.id}`)
    }

    const handleReset = () => {
        gameDispatch({
            type: GAME_ACTION_RESET,
            context: {
                gameId: gameData.id
            }
        })
    }

    const items = Object.values(gameData.quiz).map((questionAndAnswers) => {
        return(
            <Question 
                key={questionAndAnswers.question}
                questionAndAnswers={questionAndAnswers}
                gameId={gameData.id}
                submitted={gameData.submitted}
                />
        )
    })

    return(
        <>
            <Stack direction='column' spacing={5} divider={<Divider />}>
                {items}
            </Stack>

            <Divider />

            {!gameData.submitted &&
                <Stack direction='row' justifyContent='space-between' my='2em'>
                    <Button variant='contained' onClick={handleSubmit}>SUBMIT</Button>
                    <Button variant='contained' onClick={handleReset}>RESET</Button>
                    <Button variant='contained' onClick={fetchNewGame}>NEW GAME</Button>
                </Stack>
            }

        </>
    )
}
export default Quiz
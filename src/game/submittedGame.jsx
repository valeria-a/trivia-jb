import { useParams } from "react-router-dom";
import Quiz from "./quiz/Quiz";
import { useGames } from "../context/gamesContext";
import { Typography } from "@mui/material";

const SubmittedGame = () => {

    const params = useParams()
    const gamesState = useGames()

    // console.log(params)
    const gameId = params.gameId

    return(
        <>
        <Typography variant="h5" my='1em' color={'primary'}>
            {`Game ${gameId}`}
        </Typography>
        <Quiz gameData={gamesState.games[gameId]}/>
        </>
    )

}
export default SubmittedGame;
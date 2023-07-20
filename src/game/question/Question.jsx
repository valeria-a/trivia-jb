import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { GAME_ACTION_SELECT_ANSWER, useGames, useGamesDispatch } from '../../context/gamesContext';
import { FormHelperText } from '@mui/material';

const Question = ({questionAndAnswers, gameId, submitted}) => {

    // {
    //     text: 'Dangerous Waters',
    //     correct: false,
    //     selected: false
    // },

    // const [value, setValue] = React.useState('');

    const gamesDispatch = useGamesDispatch();


    const handleChange = (event) => {
        // setValue(event.target.value);
        gamesDispatch({
            type: GAME_ACTION_SELECT_ANSWER,
            context: {
                gameId: gameId,
                question: questionAndAnswers.question,
                answer: event.target.value
            }
        })
    };

    const answerItems = questionAndAnswers.answers.map((answer) => {
        return(
            <FormControlLabel key={answer}
                value={answer} 
                control={<Radio />} 
                label={answer} 
                disabled={submitted}/>
        )
    })


    const isCorrectAnswer = questionAndAnswers.selectedAnswer === questionAndAnswers.correctAnswer
    const isError = submitted && !isCorrectAnswer
    const helperText = isCorrectAnswer ? "Great job!" : `The correct answer is: ${questionAndAnswers.correctAnswer}`

    return(
        <FormControl error={isError}>
            <FormLabel id="demo-controlled-radio-buttons-group">{questionAndAnswers.question}</FormLabel>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={questionAndAnswers.selectedAnswer}
                onChange={handleChange}>

                {answerItems}

            </RadioGroup>
            {submitted &&
                <FormHelperText>{helperText}</FormHelperText>
            }
        </FormControl>
    )
}
export default Question;
import { Button } from "@mui/material"
import Question from "../question/Question"

const Quiz = ({quiz}) => {

    const items = quiz.quiz.map((questionAndAnswers) => {
        return(
            <Question question={questionAndAnswers.question} answers={questionAndAnswers.answers} />
        )
    })

    return(
        <>
            {items}
            <Button>Submit</Button>
            <Button>Reset</Button>
        </>
    )
}
export default Quiz
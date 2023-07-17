const Question = ({question, answers}) => {

    // {
    //     text: 'Dangerous Waters',
    //     correct: false,
    //     selected: false
    // },

    const answerItems = answers.map((answer) => {
        return(
            <>
                <input id={answer.text} type="radio" value={answer.text}/>
                <label for={answer.text}>{answer.text}</label>
            </>
        )
    })

    return(
        <>
            <p>{question}</p>

            {answerItems}

        </>
    )
}
export default Question;
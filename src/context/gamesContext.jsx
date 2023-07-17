import { createContext } from "react"

const TEMP = {
    loading_new: false,
    // isError: false,
    games: {
        123123: {
            quiz:[
                {
                    question: 'Which television series showcases the perils of crab fishermen in the Bering Sea?',
                    answers: [
                        {
                            text: 'Dangerous Waters',
                            correct: false,
                            selected: false
                        },
                        {
                            text: 'Extreme Fishing',
                            correct: false,
                            selected: false
                        },
                        {
                            text: 'Ocean Adventurers',
                            correct: false,
                            selected: false
                        },
                        {
                            text: 'Deadliest Catch"',
                            correct: true,
                            selected: false
                        }
                    ]
                },
                {
                    question: 'Which television series showcases the perils of crab fishermen in the Bering Sea?',
                    answers: [
                        {
                            text: 'Dangerous Waters',
                            correct: false,
                            selected: false
                        },
                        {
                            text: 'Extreme Fishing',
                            correct: false,
                            selected: false
                        },
                        {
                            text: 'Ocean Adventurers',
                            correct: false,
                            selected: false
                        },
                        {
                            text: 'Deadliest Catch"',
                            correct: true,
                            selected: false
                        }
                    ]
                }
            ],
            submitted: false
        },
        3222222: {
            submitted: true
        }
    }
}

export const GAMES_INITIAL_STATE = {
    loading_new: false,
    games: {}
}

export const GAME_ACTION_NEW_GAME_LOADING = 'new_game_loading'
export const GAME_ACTION_NEW_GAME_RECEIVED = 'new_game_received'


export const gamesReducer = (prevGames, {type, context}) => {
    switch (type) {
        case GAME_ACTION_NEW_GAME_LOADING:
            return {
                ...prevGames,
                loading_new: true
            }
        case GAME_ACTION_NEW_GAME_RECEIVED:

            const gameId = Date.now()

            const data = context.data

            const game = {
                quiz: [],
                submitted: false
            }
            
            for (const element of data) {
                const questionAndAnswers = {
                    question: element.question.text,
                    answers: []
                }
                questionAndAnswers.answers.push({
                    text: element.correctAnswer,
                    correct: true,
                    selected: false
                })
                for (const incorrectAnswer of element.incorrectAnswers) {
                    questionAndAnswers.answers.push({
                        text: incorrectAnswer,
                        correct: false,
                        selected: false
                    })
                }
                questionAndAnswers.answers = 
                    questionAndAnswers.answers.sort((a, b) => 0.5 - Math.random())
                game.quiz.push(questionAndAnswers)
            }

            return {
                ...prevGames,
                // loading_new: true,
                // games: {....}
                loading_new: false,
                games: {
                    ...prevGames.games,
                    [gameId]: game
                }
            }
        default:
            throw Error('Action does not exist')
    }
}

export const GamesContext = createContext(null)
export const GamesDispatchContext = createContext(null)


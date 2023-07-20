import { createContext, useContext } from "react"

const TEMP = {
    loading_new: false,
    // isError: false,
    games: {
        123123: {
            id: 123123,
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

const NEW = {
    loading_new: false,
    // isError: false,
    games: {
        123123: {
            id: 123123,
            quiz: {
                'Which television series showcases the perils of crab fishermen in the Bering Sea?': {
                    question: 'Which television series showcases the perils of crab fishermen in the Bering Sea?',
                    answers: ['Dangerous Waters', 'Extreme Fishing', 'Ocean Adventurers','Deadliest Catch'],
                    correctAnswer: 'Dangerous Waters',
                    selectedAnswer: ''
                }
            },
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
export const GAME_ACTION_SELECT_ANSWER = 'select_answer'
export const GAME_ACTION_SUBMIT = 'submit'
export const GAME_ACTION_RESET = 'reset'


export const gamesReducer = (prevGames, {type, context}) => {
    console.log('games reducer', type, context, prevGames)
    let newState = null
    switch (type) {
        case GAME_ACTION_NEW_GAME_LOADING:
            // remove previous not submitted game if exists
            let gameIdToRemove = null
            for (const gameId in prevGames.games) {
                const game = prevGames.games[gameId]
                if (!game.submitted) {
                    gameIdToRemove = gameId
                    break
                }
            }
            delete prevGames.games[gameIdToRemove]

            return {
                ...prevGames,
                loading_new: true,
                games: {...prevGames.games}
            }
        case GAME_ACTION_NEW_GAME_RECEIVED:

            const gameId = Date.now()

            const data = context.data

            const game = {
                id: gameId,
                quiz: {},
                submitted: false
            }
            
            for (const element of data) {
                const questionAndAnswers = {
                    question: element.question.text,
                    answers: [...element.incorrectAnswers, element.correctAnswer],
                    correctAnswer: element.correctAnswer,
                    selectedAnswer: ""
                }
                questionAndAnswers.answers = 
                    questionAndAnswers.answers.sort((a, b) => 0.5 - Math.random())
                game.quiz[questionAndAnswers.question] = questionAndAnswers
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
        case GAME_ACTION_SELECT_ANSWER:
            const selectedGameId = context.gameId;
            const selectedQuestion = context.question;
            const selectedAnswer = context.answer;

            // find the relevant game and question
            
            const selectedGame = prevGames.games[selectedGameId]
            let updatedQuiz = {}

            for (const question in selectedGame.quiz) {
                const quizElem = {...selectedGame.quiz[question]}
                if (question === selectedQuestion) {
                    quizElem.selectedAnswer = selectedAnswer
                }
                updatedQuiz[question] = quizElem
            }

            newState =  {
                ...prevGames,
                games: {
                    ...prevGames.games,
                    [selectedGameId]: {
                        ...selectedGame,
                        quiz: updatedQuiz
                    }
                }
            }
            console.log('returning state', newState)
            return newState
        case GAME_ACTION_SUBMIT:
            const submittedGameId = context.gameId
            newState = {
                ...prevGames,
                games: {
                    ...prevGames.games,
                    [submittedGameId]: {
                        ...prevGames.games[submittedGameId],
                        submitted: true
                    }
                }
            }
            console.log('returning from submit', newState)
            return newState;

        case GAME_ACTION_RESET:
            const resetGameId = context.gameId
            const quizToReset = prevGames.games[resetGameId].quiz
            const resetQuiz = {}
            for (const q in quizToReset) {
                const quizElem = quizToReset[q]
                quizElem.selectedAnswer = ""
                resetQuiz[q] = {...quizElem}
            }

            return {
                ...prevGames,
                games: {
                    ...prevGames.games,
                    [resetGameId]: {
                        ...prevGames.games[resetGameId],
                        quiz: resetQuiz
                    }
                }
            }

        default:
            throw Error('Action does not exist')
    }
}

export const GamesContext = createContext(null)
export const GamesDispatchContext = createContext(null)

export const useGames = () => {
    return useContext(GamesContext)
}

export const useGamesDispatch = () => {
    return useContext(GamesDispatchContext)
}


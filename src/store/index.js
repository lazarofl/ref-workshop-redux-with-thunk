import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { actionTypes } from "../actions/todoActions";
import thunk from 'redux-thunk'; 

const initialState = { 
    todos: [],
    loading: false,
    error: null
 }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD:
            return {
                ...state,
                todos: [...state.todos, {
                    text: action.todoName,
                    completed: false
                }]
            }
        case actionTypes.REMOVE:
            return {
                ...state,
                todos: [...state.todos.filter(x=>x.text !== action.todoName)]
            }
            case actionTypes.TOGGLE:
            return {
                ...state,
                todos: [...state.todos.map((todo) => {
                    if (todo.text === action.todoName) {
                        return {...todo, completed: !todo.completed}
                    }
                    return todo
                  })]
            }
        case actionTypes.LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                todos: action.todos
            }
        case actionTypes.LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}

export default createStore(reducer, applyMiddleware(logger, thunk))
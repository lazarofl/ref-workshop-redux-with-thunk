export const actionTypes = {
    ADD: "TODO_ADD",
    REMOVE: "TODO_REMOVE",
    TOGGLE: "TODO_TOGGLE",
    LOADING: "TODO_LOADING",
    LOAD_SUCCESS: "TODO_LOAD_SUCCESS",
    LOAD_FAILURE: "TODO_LOAD_FAILURE"
}

export const addTodo = (todoName) => {
    return {type: actionTypes.ADD, todoName: todoName}
}

export const removeTodo = (todoName) => {
    return {type: actionTypes.REMOVE, todoName: todoName}
}

export const toggleTodo = (todoName) => {
    return {type: actionTypes.TOGGLE, todoName: todoName}
}

export const loadingTodos = () => {
    return {type: actionTypes.LOADING}
}

export const loadTodos = (todos) => {
    return {type: actionTypes.LOAD_SUCCESS, todos: todos}
}

export const loadTodosFailure = (error) => {
    return {type: actionTypes.LOAD_FAILURE, error: error}
}

export const fetchTodos = () => {
    return dispatch => {
      dispatch(loadingTodos());
      return fetch("https://5ddc6188041ac10014de1e35.mockapi.io/todos")
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
            setTimeout(() => {
                dispatch(loadTodos(json));
                return json.todos;
            }, 3000)
        })
        .catch(error => dispatch(loadTodosFailure(error)));
    };
  }

const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
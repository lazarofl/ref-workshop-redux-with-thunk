import React, {useState, useEffect} from 'react';

import { connect } from 'react-redux'
import { addTodo, removeTodo, toggleTodo, fetchTodos } from "./actions/todoActions";

import './styles.css'

function App({todos, loading, error, dispatch}) {
  
  const [todoInput, setTodoInput] = useState('');

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch]);

  const handleAddTodo = () => {
    dispatch(addTodo(todoInput)) //adicionar na store
    setTodoInput('')
  }

  const handleRemoveTodo = (todo) => {
    dispatch(removeTodo(todo)) 
  }

  const handleToggleTodo = (todo) => {
    dispatch(toggleTodo(todo))
  }

  return (
    <div className="App">
      <h1>Todo app</h1>
      <input onChange={e => setTodoInput(e.target.value)} type="text" value={todoInput}/>
      <button type="button" onClick={handleAddTodo}>Adicionar</button>
      { loading ? <div>CARREGANDO...</div> : null}
      { error !== null ? <div style={{color: 'red'}}>{error.message}</div> : null}
      <ul>
        {todos.map(todo => (<li className={todo.completed ? 'done' : ''} key={Math.random()}><span onClick={() => handleToggleTodo(todo.text)}>{todo.text}</span> - <button onClick={() => handleRemoveTodo(todo.text)}>x</button></li> ))}
      </ul>
    </div>
  );
}

const mapStateToProps = store => ({ 
  todos: store.todos, 
  loading: store.loading, 
  error: store.error 
})

export default connect(mapStateToProps)(App);

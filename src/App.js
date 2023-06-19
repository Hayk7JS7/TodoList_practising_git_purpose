
import { useState } from 'react';
import './App.css';
import Clock from './clock/clock';

function App() {
  const initialTodo = [
    {name: "learn js", completed: false, id: Math.random()},
    {name: "learn React js", completed: false, id: Math.random()},
    {name: "learn Node js", completed: false, id: Math.random()}
  ]
  const [todoValue, settodoValue] = useState("")
  const [todos, setTodos] = useState(initialTodo)

  const handleAdd = () => {
    setTodos([...todos, {name: todoValue, completed: false, id: Math.random()}])
    settodoValue("")
  }
  const handleDelete = (todo) => {
    setTodos(prevTodos => prevTodos.filter(todoItem => todoItem.id !== todo.id))
  }
  const handleCompleted = (todo) => {
    const completedTodo = todos.map(todosList => todosList.id === todo.id ? {...todosList, completed: !todosList.completed, id: Math.random()} : todosList)
    setTodos(completedTodo)
  }
  const deleteCompleted = () => {
    const deleteCompletedList = todos.filter(todo => !todo.completed)
    setTodos(deleteCompletedList)
  }

  return (
    <div className="App">
      <Clock timezone={14400} /> 
      <hr />
      <button onClick={() => setTodos(initialTodo)}>↻</button>
      <input type="text" placeholder='todo...' value={todoValue} onChange={(e) => settodoValue(e.target.value)} />
      <button onClick={handleAdd}>add</button>
      {todos.map(todo => {
        return (
          <div key={Math.random()}>
            <input type="checkbox" name="todos" checked={todo.completed}   onChange={() => handleCompleted(todo)}/>
            {todo.name}
            <button onClick={() => handleDelete(todo)}>X</button>
          </div>
        )
      })}
      <button onClick={deleteCompleted}>clear completed</button>
      {`${todos.filter(todo => todo.completed).length}/${todos.length} completed`}
    </div>
  );
}

export default App;

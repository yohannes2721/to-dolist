import React, { useState } from 'react'
import './todolist.css'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

function Todolist() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [editIndex, setEditIndex] = useState(null)

  const addTodo = (event) => {
    event.preventDefault()
    const task = inputValue.trim()
    if (!task) return

    if (editIndex !== null) {
      setTodos((currentTodos) =>
        currentTodos.map((todo, index) =>
          index === editIndex ? { ...todo, task } : todo
        )
      )
      setEditIndex(null)
    } else {
      setTodos((currentTodos) => [...currentTodos, { task, completed: false }])
    }
    setInputValue('')
  }

  const editTodo = (index) => {
    setInputValue(todos[index].task)
    setEditIndex(index)
  }

  const cancelEdit = () => {
    setInputValue('')
    setEditIndex(null)
  }

  const toggleTodo = (index) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo, todoIndex) =>
        todoIndex === index ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (index) => {
    setTodos((currentTodos) => currentTodos.filter((_, todoIndex) => todoIndex !== index))
    if (editIndex === index) cancelEdit()
    else if (editIndex !== null && editIndex > index) setEditIndex(editIndex - 1)
  }

  return (
    <div className='todo-container'>
      <h1>Todo List</h1>
      <form className='input-section' onSubmit={addTodo}>
        <input
          type='text'
          className='input-field'
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder='What needs to get done?'
          aria-label='Todo task'
        />
        <button className='action-btn' type='submit'>
          {editIndex === null ? 'Add task' : 'Save'}
        </button>
        {editIndex !== null && (
          <button className='cancel-btn' type='button' onClick={cancelEdit}>
            Cancel
          </button>
        )}
      </form>
      {todos.length > 0 ? (
        <ul className='todo-list'>
          {todos.map((todo, index) => (
            <li className='todo-item' key={`${todo.task}-${index}`}>
              <label className={`todo-task${todo.completed ? ' completed' : ''}`}>
                <input
                  type='checkbox'
                  checked={todo.completed}
                  onChange={() => toggleTodo(index)}
                  aria-label={`Mark ${todo.task} as ${todo.completed ? 'incomplete' : 'complete'}`}
                />
                <span>{todo.task}</span>
              </label>
              <div className='todo-actions'>
                <button className='text-btn' type='button' onClick={() => editTodo(index)}>
                  <FiEdit2 aria-hidden='true' />
                  Edit
                </button>
                <button className='text-btn delete-btn' type='button' onClick={() => deleteTodo(index)}>
                  <FiTrash2 aria-hidden='true' />
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className='empty-state'>Your list is clear. Add a task to get started.</p>
      )}
    </div>
  )
}

export default Todolist

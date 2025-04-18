import React, { useRef, useState } from 'react'
import { nanoid } from 'nanoid'

import Header from '../Header'
import TaskList from '../TaskList'
import Footer from '../Footer'
import NewTaskForm from '../NewTaskForm'
import './App.css'

export default function App() {
  const [todoData, setTodoData] = useState([])
  const [activeFilter, setActiveFilter] = useState('All')
  const [errorMessage, setErrorMessage] = useState('')
  const intervalsRef = useRef({})

  const createTodoItem = (label, totalTime = 0) => ({
    text: label,
    id: nanoid(),
    completed: false,
    atCreatedTime: new Date(),
    timer: totalTime,
    isRunning: false,
  })

  const addItem = (text, totalTime) => {
    if (totalTime <= 0) {
      setErrorMessage('Укажите время задачи!')
      return
    }

    const newItem = createTodoItem(text, totalTime)
    setErrorMessage('')
    setTodoData((prevData) => [...prevData, newItem])
  }

  const deleteTask = (id) => {
    setTodoData((prevData) => prevData.filter((el) => el.id !== id))
  }

  const toggleTaskDone = (id) => {
    setTodoData((prevData) =>
      prevData.map((task) => {
        if (task.id === id) {
          if (task.isRunning && intervalsRef.current[id] && task.completed) {
            clearInterval(intervalsRef.current[id])
            delete intervalsRef.current[id]
          }
          return { ...task, completed: !task.completed, isRunning: false }
        }
        return task
      })
    )
  }

  const editTask = (id, newTask) => {
    setTodoData((prevData) => prevData.map((task) => (task.id === id ? { ...task, text: newTask } : task)))
  }

  const changeFilter = (filter) => {
    setActiveFilter(filter)
  }

  const clearCompleted = () => {
    setTodoData((prevData) => prevData.filter((task) => !task.completed))
  }

  const getFilteredTasks = () => {
    switch (activeFilter) {
      case 'Active':
        return todoData.filter((task) => !task.completed)
      case 'Completed':
        return todoData.filter((task) => task.completed)
      case 'All':
      default:
        return todoData
    }
  }

  const filteredTasks = getFilteredTasks()

  return (
    <section className="todoapp">
      <Header>
        <NewTaskForm onItemAdded={addItem} setErrorMessage={setErrorMessage} errorMessage={errorMessage} />
      </Header>
      <section className="main">
        <TaskList
          todos={filteredTasks}
          onDeleteTask={deleteTask}
          onToggleTaskDone={toggleTaskDone}
          onEditTask={editTask}
        />
        <Footer
          tasksLeft={todoData.filter((task) => !task.completed).length}
          onFilterChange={changeFilter}
          onClearCompleted={clearCompleted}
          activeFilter={activeFilter}
        />
      </section>
    </section>
  )
}

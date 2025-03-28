import React, { Component } from 'react'
import { nanoid } from 'nanoid'

import Header from '../Header'
import TaskList from '../TaskList'
import Footer from '../Footer'
import NewTaskForm from '../NewTaskForm'
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.nanoid = nanoid
    this.state = {
      todoData: [],
      activeFilter: 'All',
      errorMessage: '',
    }
  }

  setErrorMessage = (message) => {
    this.setState({ errorMessage: message })
  }

  addItem = (text, totalTime) => {
    if (totalTime <= 0) {
      this.setErrorMessage('Укажите время задачи!')
      return
    }
    const newItem = this.createTodoItem(text, totalTime)
    this.setErrorMessage('')
    this.setState(({ todoData }) => ({
      todoData: [...todoData, newItem],
    }))
  }

  deleteTask = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((el) => el.id !== id),
    }))
  }

  toggleTaskDone = (id) => {
    this.setState(({ todoData }) => {
      const updatedTodoData = todoData.map((task) => {
        if (task.id === id) {
          if (task.isRunning) {
            clearInterval(this.intervalsRef.current[id])
          }
          return { ...task, completed: !task.completed, isRunning: false }
        }
        return task
      })

      return {
        todoData: updatedTodoData,
      }
    })
  }

  editTask = (id, newText) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((task) => (task.id === id ? { ...task, text: newText } : task)),
    }))
  }

  changeFilter = (filter) => {
    this.setState({ activeFilter: filter })
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((task) => !task.completed),
    }))
  }

  getFilteredTasks = () => {
    const { todoData, activeFilter } = this.state
    switch (activeFilter) {
      case 'All':
        return todoData
      case 'Active':
        return todoData.filter((task) => !task.completed)
      case 'Completed':
        return todoData.filter((task) => task.completed)
      default:
        return todoData
    }
  }

  createTodoItem(label, totalTime = 0) {
    return {
      text: label,
      id: this.nanoid(),
      completed: false,
      atCreatedTime: new Date(),
      timer: totalTime,
      isRunning: false,
    }
  }

  render() {
    const { todoData, activeFilter, errorMessage } = this.state
    const filteredTasks = this.getFilteredTasks()

    return (
      <section className="todoapp">
        <Header>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <NewTaskForm onItemAdded={this.addItem} />
        </Header>
        <section className="main">
          <TaskList
            todos={filteredTasks}
            onDeleteTask={this.deleteTask}
            onToggleTaskDone={this.toggleTaskDone}
            onEditTask={this.editTask}
          />
          <Footer
            tasksLeft={todoData.filter((task) => !task.completed).length}
            onFilterChange={this.changeFilter}
            onClearCompleted={this.clearCompleted}
            activeFilter={activeFilter}
          />
        </section>
      </section>
    )
  }
}

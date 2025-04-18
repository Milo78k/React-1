import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Task from '../Task'
import './TaskList.css'

export default function TaskList({ todos = [], onDeleteTask, onToggleTaskDone, onEditTask }) {
  const [timers, setTimers] = useState(() => {
    const savedTimers = localStorage.getItem('taskTimers')
    return savedTimers ? JSON.parse(savedTimers) : {}
  })

  const intervalsRef = useRef({})

  // Инициализация таймеров новых задач
  useEffect(() => {
    setTimers((prevTimers) => {
      const newTimers = { ...prevTimers }
      todos.forEach(({ id, timer, completed }) => {
        if (!(id in newTimers) && timer > 0 && !completed) {
          newTimers[id] = { time: timer, isRunning: false }
        }
      })
      return newTimers
    })
  }, [todos])

  // стоп для завершённых задач
  useEffect(() => {
    const localIntervals = intervalsRef.current

    todos.forEach((task) => {
      const { id, completed } = task
      if (completed && localIntervals[id]) {
        clearInterval(localIntervals[id])
        delete localIntervals[id]
        setTimers((prev) => ({
          ...prev,
          [id]: { ...prev[id], isRunning: false },
        }))
      }
    })
  }, [todos])

  const handleToggleTimer = (id) => {
    const taskData = todos.find((t) => t.id === id)
    if (!taskData || taskData.completed) return // не запускаем таймер для завершённых задач

    setTimers((prevTimers) => {
      const isRunning = !prevTimers[id]?.isRunning
      const updatedTimers = { ...prevTimers }

      if (!updatedTimers[id]) {
        if (taskData.timer > 0) {
          updatedTimers[id] = { time: taskData.timer, isRunning }
        }
      } else {
        updatedTimers[id] = { ...updatedTimers[id], isRunning }
      }

      if (!isRunning && intervalsRef.current[id]) {
        clearInterval(intervalsRef.current[id])
        delete intervalsRef.current[id]
      } else if (isRunning) {
        intervalsRef.current[id] = setInterval(() => {
          setTimers((prevState) => {
            const current = prevState[id]
            const task = todos.find((t) => t.id === id)

            if (!current || current.time <= 0 || (task && task.completed)) {
              clearInterval(intervalsRef.current[id])
              delete intervalsRef.current[id]
              return {
                ...prevState,
                [id]: { ...current, time: 0, isRunning: false },
              }
            }

            const newTime = current.time - 1
            const updated = {
              ...prevState,
              [id]: { ...current, time: newTime },
            }

            localStorage.setItem('taskTimers', JSON.stringify(updated))
            return updated
          })
        }, 1000)
      }

      return updatedTimers
    })
  }

  return (
    <ul className="todo-list">
      {todos.map(({ id, text, completed, atCreatedTime, timer }) => {
        const taskTimer = timers[id] || { time: timer, isRunning: false }

        return (
          <Task
            key={id}
            id={id}
            text={text}
            completed={completed}
            atCreatedTime={atCreatedTime}
            timer={taskTimer.time}
            isRunning={taskTimer.isRunning}
            onToggleTimer={() => handleToggleTimer(id)}
            onDeleteTask={onDeleteTask}
            onToggleTaskDone={onToggleTaskDone}
            onEditTask={onEditTask}
          />
        )
      })}
    </ul>
  )
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      atCreatedTime: PropTypes.string.isRequired,
      timer: PropTypes.number.isRequired,
    })
  ).isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onToggleTaskDone: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
}

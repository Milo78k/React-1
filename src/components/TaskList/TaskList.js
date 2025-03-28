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

  useEffect(() => {
    setTimers((prevTimers) => {
      const newTimers = { ...prevTimers }
      todos.forEach(({ id, timer }) => {
        if (!(id in newTimers) && timer > 0) {
          newTimers[id] = {
            time: timer,
            isRunning: false,
          }
        }
      })
      return newTimers
    })
  }, [todos])

  useEffect(() => {
    const localIntervals = intervalsRef.current
    Object.keys(timers).forEach((id) => {
      const task = timers[id]
      if (!localIntervals[id] && task.isRunning) {
        localIntervals[id] = setInterval(() => {
          setTimers((prevTimers) => {
            let newTime = prevTimers[id].time

            if (newTime > 0) {
              newTime -= 1
            }

            if (newTime <= 0) {
              clearInterval(localIntervals[id])
              delete localIntervals[id]

              return {
                ...prevTimers,
                [id]: { ...prevTimers[id], time: 0, isRunning: false },
              }
            }
            return {
              ...prevTimers,
              [id]: { ...prevTimers[id], time: newTime },
            }
          })
        }, 1000)
      }
    })

    return () => {
      Object.keys(localIntervals).forEach((id) => {
        if (!timers[id]?.isRunning) {
          clearInterval(localIntervals[id])
          delete localIntervals[id]
        }
      })
    }
  }, [timers])

  const handleToggleTimer = (id) => {
    setTimers((prevTimers) => {
      const isRunning = !prevTimers[id]?.isRunning

      const updatedTimers = { ...prevTimers }

      if (!updatedTimers[id]) {
        const task = todos.find((t) => t.id === id)
        if (task && task.timer > 0) {
          updatedTimers[id] = { time: task.timer, isRunning }
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
            const newState = { ...prevState }
            const currentTime = newState[id].time

            if (currentTime > 0) {
              newState[id].time = currentTime - 1
            }

            localStorage.setItem('taskTimers', JSON.stringify(newState))
            return newState
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

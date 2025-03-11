import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'
import './TaskList.css'

function TaskList({ todos, onDeleteTask, onToggleTaskDone }) {
  return (
    <ul className="todo-list">
      {todos.map(({ id, text, completed, atCreatedTime }) => (
        <Task
          key={id}
          id={id}
          text={text}
          completed={completed}
          atCreatedTime={atCreatedTime}
          onDeleteTask={onDeleteTask}
          onToggleTaskDone={onToggleTaskDone}
        />
      ))}
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
    })
  ),
  onDeleteTask: PropTypes.func.isRequired,
  onToggleTaskDone: PropTypes.func.isRequired,
}

TaskList.defaultProps = {
  todos: [],
}

export default TaskList

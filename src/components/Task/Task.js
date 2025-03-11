import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

function Task({ id, text, atCreatedTime, completed, onToggleTaskDone, onDeleteTask }) {
  const taskCreationTime = formatDistanceToNow(new Date(atCreatedTime), { includeSeconds: true })

  return (
    <li className={completed ? 'completed' : ''} data-id={id}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={() => onToggleTaskDone(id)} />
        <label>
          <span className="description">{text}</span>
          <span className="created">created {taskCreationTime} ago</span>
        </label>
        <button type="button" className="icon icon-edit" />
        <button type="button" className="icon icon-destroy" onClick={() => onDeleteTask(id)} />
      </div>
    </li>
  )
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  atCreatedTime: PropTypes.instanceOf(Date).isRequired,
  onToggleTaskDone: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
}

export default Task

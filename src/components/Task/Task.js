import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

export default function Task({
  id,
  text,
  atCreatedTime,
  completed,
  timer,
  isRunning,
  onToggleTimer,
  onToggleTaskDone,
  onDeleteTask,
  onEditTask,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [newText, setNewText] = useState(text)
  const taskCreationTime = formatDistanceToNow(new Date(atCreatedTime), { includeSeconds: true })

  const handleEdit = () => {
    setIsEditing(true)
    setNewText(text)
  }

  const handleChange = (e) => {
    setNewText(e.target.value)
  }

  const handleSubmit = () => {
    if (newText) {
      onEditTask(id, newText)
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    } else if (e.key === 'Escape') {
      setNewText(text)
      setIsEditing(false)
    }
  }

  function getAriaLabel() {
    if (completed) return 'Task completed'
    return isRunning ? 'Pause timer' : 'Start timer'
  }

  function getIconClassName() {
    if (completed) return 'icon-play completed'
    return isRunning ? 'icon-pause' : 'icon-play'
  }

  return (
    <li className={`${completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`} data-id={id}>
      {isEditing ? (
        <input
          type="text"
          className="edit"
          value={newText}
          onChange={handleChange}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onChange={() => onToggleTaskDone(id)} />
          <label>
            <span className="title">{text}</span>
            <div className="description">
              <button
                type="button"
                className={`${getIconClassName()} icon`}
                aria-label={getAriaLabel()}
                onClick={() => onToggleTimer(id)}
              />
              <span className="timer">{`${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')}`} </span>
            </div>
            <span className="created">created {taskCreationTime} ago</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={handleEdit} />
          <button type="button" className="icon icon-destroy" onClick={() => onDeleteTask(id)} />
        </div>
      )}
    </li>
  )
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  atCreatedTime: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  onToggleTimer: PropTypes.func.isRequired,
  onToggleTaskDone: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
}

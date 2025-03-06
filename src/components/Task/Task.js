import React from 'react';

const Task = ({ id, text, completed, onDeleteTask, onToggleTaskDone }) => {
  return (
    <li className={completed ? 'completed' : ''} data-id={id}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={() => onToggleTaskDone(id)}
        />
        <label>
          <span className="description">{text}</span>
          <span className="created">created 17 seconds ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button
          className="icon icon-destroy"
          onClick={() => onDeleteTask(id)}
        ></button>
      </div>
    </li>
  );
};

export default Task;

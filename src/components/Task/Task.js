import React from 'react';

const Task = ({ id, text, completed }) => {
  return (
    <li className={completed ? 'completed' : ''} data-id={id}>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description">{text}</span>
          <span className="created">created 17 seconds ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
    </li>
  );
};

export default Task;

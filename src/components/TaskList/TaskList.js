import React from 'react';
import Task from '../Task';
import './TaskList.css';
const TaskList = ({ todos, onDeleteTask, onToggleTaskDone }) => {
  return (
    <ul className="todo-list">
      {todos.map(({ id, text, completed }) => (
        <Task
          key={id}
          id={id}
          text={text}
          completed={completed}
          onDeleteTask={onDeleteTask}
          onToggleTaskDone={onToggleTaskDone}
        />
      ))}
    </ul>
  );
};

export default TaskList;

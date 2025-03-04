import React from 'react';
import Task from '../Task';
import './TaskList.css';
const TaskList = ({ todos }) => {
  const elements = todos.map((task) => {
    const { id, ...itemProps } = task;
    return <Task key={id} {...itemProps} />;
  });
  return <ul className="todo-list">{elements}</ul>;
};

export default TaskList;

import React from 'react';
import './Footer.css';
import TaskFilters from '../TaskFilters';

const Footer = ({ tasksLeft }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{tasksLeft} items left</span>
      <TaskFilters />
      <button className="clear-completed">Clear completed</button>
    </footer>
  );
};

export default Footer;

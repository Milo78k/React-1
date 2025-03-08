import React from 'react';
import './Footer.css';
import TaskFilters from '../TaskFilters';

const Footer = ({
  tasksLeft,
  activeFilter,
  onFilterChange,
  onClearCompleted,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">{tasksLeft} items left</span>
      <TaskFilters
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
      />
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;

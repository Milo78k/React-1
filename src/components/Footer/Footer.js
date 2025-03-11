import './Footer.css'
import PropTypes from 'prop-types'
import React from 'react'
import TaskFilters from '../TaskFilters'

function Footer({ tasksLeft, activeFilter, onFilterChange, onClearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{tasksLeft} items left</span>
      <TaskFilters activeFilter={activeFilter} onFilterChange={onFilterChange} />
      <button type="button" className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer

Footer.propTypes = {
  tasksLeft: PropTypes.number.isRequired,
  activeFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
}

import React from 'react'
import './TaskFilters.css'
import PropTypes from 'prop-types'

export default function TaskFilters({ activeFilter, onFilterChange }) {
  const handleFilterChange = (filter) => {
    onFilterChange(filter)
  }

  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          className={activeFilter === 'All' ? 'selected' : ''}
          onClick={() => handleFilterChange('All')}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          className={activeFilter === 'Active' ? 'selected' : ''}
          onClick={() => handleFilterChange('Active')}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={activeFilter === 'Completed' ? 'selected' : ''}
          onClick={() => handleFilterChange('Completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

TaskFilters.propTypes = {
  activeFilter: PropTypes.oneOf(['All', 'Active', 'Completed']).isRequired,
  onFilterChange: PropTypes.func.isRequired,
}

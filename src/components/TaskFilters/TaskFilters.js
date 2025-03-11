import './TaskFilters.css'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class TaskFilters extends Component {
  handleFilterChange = (filter) => {
    const { onFilterChange } = this.props
    onFilterChange(filter)
  }

  render() {
    const { activeFilter } = this.props
    return (
      <ul className="filters">
        <li>
          <button
            type="button"
            className={activeFilter === 'All' ? 'selected' : ''}
            onClick={() => this.handleFilterChange('All')}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={activeFilter === 'Active' ? 'selected' : ''}
            onClick={() => this.handleFilterChange('Active')}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={activeFilter === 'Completed' ? 'selected' : ''}
            onClick={() => this.handleFilterChange('Completed')}
          >
            Completed
          </button>
        </li>
      </ul>
    )
  }
}

TaskFilters.propTypes = {
  activeFilter: PropTypes.oneOf(['All', 'Active', 'Completed']).isRequired,
  onFilterChange: PropTypes.func.isRequired,
}

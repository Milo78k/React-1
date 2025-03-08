import React, { Component } from 'react';
import './TaskFilters.css';

export default class TaskFilters extends Component {
  handleFilterChange = (filter) => {
    this.props.onFilterChange(filter);
  };

  render() {
    const { activeFilter } = this.props;
    const filters = ['All', 'Active', 'Completed'];

    return (
      <ul className="filters">
        <li>
          <button
            className={activeFilter === 'All' ? 'selected' : ''}
            onClick={() => this.handleFilterChange('All')}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={activeFilter === 'Active' ? 'selected' : ''}
            onClick={() => this.handleFilterChange('Active')}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={activeFilter === 'Completed' ? 'selected' : ''}
            onClick={() => this.handleFilterChange('Completed')}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

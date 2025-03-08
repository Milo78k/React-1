import React, { Component } from 'react';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  state = {
    text: '',
  };

  onLabelChange = (e) => {
    this.setState({ text: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.text);
    this.setState({ text: '' });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          value={this.state.text}
          onChange={this.onLabelChange}
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
        />
      </form>
    );
  }
}

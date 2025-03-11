import './NewTaskForm.css'
import React, { Component } from 'react'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
    }
  }

  onLabelChange = (e) => {
    this.setState({ text: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { onItemAdded } = this.props
    const { text } = this.state
    onItemAdded(text)
    this.setState({ text: '' })
  }

  render() {
    const { text } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          value={text}
          onChange={this.onLabelChange}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    )
  }
}

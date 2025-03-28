import './NewTaskForm.css'
import React, { Component } from 'react'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      min: '',
      sec: '',
      error: '',
    }
  }

  onLabelChange = (e) => {
    this.setState({ text: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { onItemAdded } = this.props
    const { text, min, sec } = this.state

    if (text.trim() === '') {
      this.setState({ error: 'Задача не может быть пустой!' })
      return
    }

    const minValue = min === '' ? 0 : parseInt(min, 10)
    const secValue = sec === '' ? 0 : parseInt(sec, 10)

    if (Number.isNaN(minValue) || minValue < 0 || minValue > 59) {
      this.setState({ error: 'Минуты должны быть числом от 0 до 59!' })
      return
    }
    if (Number.isNaN(secValue) || secValue < 0 || secValue > 59) {
      this.setState({ error: 'Секунды должны быть числом от 0 до 59!' })
      return
    }

    const totalTime = minValue * 60 + secValue
    this.setState({ error: '' })
    onItemAdded(text, totalTime)
    this.setState({ text: '', min: '', sec: '' })
  }

  render() {
    const { text, min, sec, error } = this.state

    return (
      <form className="new-todo-form" type="submit" onSubmit={this.onSubmit}>
        <input type="text" value={text} onChange={this.onLabelChange} className="new-todo" placeholder="Task" />
        <input
          type="number"
          value={min}
          onChange={(e) => this.setState({ min: e.target.value })}
          className="new-todo-form__timer"
          placeholder="Min"
          min="0"
          max="59"
        />
        <input
          type="number"
          value={sec}
          onChange={(e) => this.setState({ sec: e.target.value })}
          className="new-todo-form__timer"
          placeholder="Sec"
          min="0"
          max="59"
        />
        <input type="submit" className="submit-button" value="" />
        {error && <div className="error-message">{error}</div>}
      </form>
    )
  }
}

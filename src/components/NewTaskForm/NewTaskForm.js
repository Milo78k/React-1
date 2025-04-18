import React, { useState } from 'react'
import ErrorMessage from '../ErrorMessage'
import './NewTaskForm.css'

export default function NewTaskForm({ onItemAdded, setErrorMessage, errorMessage }) {
  const [text, setText] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const onLabelChange = (e) => {
    setText(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (text.trim() === '') {
      setErrorMessage('Нет названия')
      return
    }

    const minValue = min === '' ? 0 : parseInt(min, 10)
    const secValue = sec === '' ? 0 : parseInt(sec, 10)

    if (Number.isNaN(minValue) || minValue < 0 || minValue > 59) {
      setErrorMessage('Минуты должны быть числом от 0 до 59!')
      return
    }
    if (Number.isNaN(secValue) || secValue < 0 || secValue > 59) {
      setErrorMessage('Секунды должны быть числом от 0 до 59!')
      return
    }

    const totalTime = minValue * 60 + secValue
    onItemAdded(text, totalTime)
    setText('')
    setMin('')
    setSec('')
  }

  return (
    <form className="new-todo-form" type="submit" onSubmit={onSubmit}>
      <input type="text" value={text} onChange={onLabelChange} className="new-todo" placeholder="Task" />
      <input
        type="number"
        value={min}
        onChange={(e) => setMin(e.target.value)}
        className="new-todo-form__timer"
        placeholder="Min"
        min="0"
        max="59"
      />
      <input
        type="number"
        value={sec}
        onChange={(e) => setSec(e.target.value)}
        className="new-todo-form__timer"
        placeholder="Sec"
        min="0"
        max="59"
      />
      <input type="submit" className="submit-button" value="" />
      <ErrorMessage message={errorMessage} />
    </form>
  )
}

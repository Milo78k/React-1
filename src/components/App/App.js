import React, { Component } from 'react';
import Header from '../Header';
import TaskList from '../TaskList';
import Footer from '../Footer';

import './App.css';

export default class App extends Component {
  state = {
    todoData: [
      { id: 1, text: 'Create React App', completed: true },
      { id: 2, text: 'Finish React course', completed: false },
      { id: 3, text: 'Pass all the reviews', completed: false },
    ],
  };

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((el) => el.id !== id);
      return { todoData: newArray };
    });
  };

  toggleTaskDone = (id) => {
    this.setState(({ todoData }) => {
      const updatedTasks = todoData.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      );
      return { todoData: updatedTasks };
    });
  };

  render() {
    const { todoData } = this.state;

    return (
      <section className="todoapp">
        <Header />
        <section className="main">
          <TaskList
            todos={todoData}
            onDeleteTask={this.deleteTask}
            onToggleTaskDone={this.toggleTaskDone}
          />
          <Footer
            tasksLeft={todoData.filter((task) => !task.completed).length}
          />
        </section>
      </section>
    );
  }
}

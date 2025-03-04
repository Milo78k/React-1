import Header from '../Header';
import TaskList from '../TaskList';
import Footer from '../Footer';

import './App.css';
const App = () => {
  const tasks = [
    { id: 1, text: 'Create React App', completed: true },
    { id: 2, text: 'Finish React course', completed: false },
    { id: 3, text: 'Pass all the reviews', completed: false },
  ];

  const tasksLeft = 3;
  return (
    <section className="todoapp">
      <Header />
      <section className="main">
        <TaskList todos={tasks} />
        <Footer tasksLeft={tasksLeft} />
      </section>
    </section>
  );
};

export default App;

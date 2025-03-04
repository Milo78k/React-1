import React from 'react';
import './Header.css';
const Header = () => {
  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
      />
    </header>
  );
};
export default Header;

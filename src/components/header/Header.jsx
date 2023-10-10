import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

let activeClassName = {
  color: '#2196f3',
};

const Header = () => {
  return (
    <div className={styles.header}>
      <NavLink
        to="/"
        className={styles.link}
        style={({ isActive }) => (isActive ? activeClassName : undefined)}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={styles.link}
        style={({ isActive }) => (isActive ? activeClassName : undefined)}
      >
        Movies
      </NavLink>
    </div>
  );
};

export default Header;

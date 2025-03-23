import { NavLink } from 'react-router-dom';
import css from "./Navigation.module.css"
import clsx from 'clsx';

const linkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

export default function Navigation() {
    return (
        <header className={css.header}>
            <nav className={css.nav}>
                <ul className={css.ul}>
                    <li>  <NavLink className={linkClass} to="/">Home</NavLink></li>
       
                    <li> <NavLink className={linkClass} to="/movies">Movies</NavLink></li> 
          </ul>     
            </nav>
            </header>
    )
}
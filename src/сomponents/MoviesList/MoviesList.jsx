import {  NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import css from "./MoviesList.module.css"



export default function MovieList({ movies }) {
    const location = useLocation()
    return (
        <ul className={css.ul}>
            {movies.map((movie) => (
                    <li className={css.li} key={movie.id}>

                <NavLink to={`/movies/${movie.id}` }state={{ from: location }}>
                        <p className={css.link}>{movie.title || movie.name || movie.original_title}</p>
                   
                    </NavLink>
                 </li>
            ))}
        </ul>
    );
}
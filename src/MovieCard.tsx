import type { Movie } from "./types";

interface MovieCardProps {
    movie: Movie;
}

function MovieCard({movie}: MovieCardProps) {
    return (
        <div className="movie-card">
            <h2>{movie.title}</h2>
            <p>{movie.year}</p>
            <p>{movie.rating}</p>
            <p>{movie.genre}</p>
        </div>
    );
}

export default MovieCard;
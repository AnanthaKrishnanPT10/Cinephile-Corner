import type { Movie } from "./types";


interface MovieCardProps {
    movie: Movie;
    isLiked: boolean;
    onToggleLike: () => void;
}



function MovieCard({movie, isLiked, onToggleLike}: MovieCardProps) {
    const posterLink = `https://image.tmdb.org/t/p/w500${movie.posterPath}`;
    return (
        <div className="movie-card"> 
            <h2>{movie.title}</h2>
            <p>{movie.year}</p>
            <p>{movie.rating.toFixed(1)}</p>
            {movie.posterPath !== null ? (
                <img src ={posterLink} alt={movie.title}/>):(<p>No poster</p>)}
            
            <button onClick={onToggleLike}>{isLiked ? "♥ Liked" : "♡ Like"}</button>
        </div>
    );
}

export default MovieCard;
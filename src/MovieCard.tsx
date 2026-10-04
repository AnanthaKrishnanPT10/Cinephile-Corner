import type { Movie } from "./types";
//import { useState } from "react";

interface MovieCardProps {
    movie: Movie;
    isLiked: boolean;
    onToggleLike: () => void;
}

function MovieCard({movie, isLiked, onToggleLike}: MovieCardProps) {
    return (
        <div className="movie-card">
            <h2>{movie.title}</h2>
            <p>{movie.year}</p>
            <p>{movie.rating}</p>
            <p>{movie.genre}</p>
            <button onClick={onToggleLike}>{isLiked ? "♥ Liked" : "♡ Like"}</button>
        </div>
    );
}

export default MovieCard;
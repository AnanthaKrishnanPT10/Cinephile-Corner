import MovieCard  from "./MovieCard";
import type { Movie } from "./types";
import { useState } from "react";

const movies: Movie[] = [
  {id:1, title: "Past Lives", year: 2023, rating: 4.5, genre: "Romance" },
  { id: 2, title: "Parasite", year: 2019, rating: 4.6, genre: "Thriller" },
  { id: 3, title: "Whiplash", year: 2014, rating: 4.4, genre: "Drama" },
  { id:4, title: "Heat", year: 1995, rating: 4.5, genre: "Action" }
];



function App(){
  const [query, setQuery] = useState("");
  const [likedIds, setLikedIds] = useState<number[]>([]);

  const normalizedQuery = query.toLowerCase();
  const filteredMovies = movies.filter((movie) => 
    movie.title.toLowerCase().includes(normalizedQuery) 
  || movie.genre.toLowerCase().includes(normalizedQuery)
  );

  const count = filteredMovies.length;

  function toggleLike(id: number){
    setLikedIds((prev)=>
    prev.includes(id)
  ? prev.filter((likedId)=> likedId !== id)
  : [...prev,id]);
  }

  return (
    <div>
      <h1>Movie Finder</h1>
      <input
       type="text"
       placeholder="Search movies..."
       value={query}
       onChange={(e) => setQuery(e.target.value)}
       />
      {
      count === 0 ? ( <h3>No Movies found</h3>) : (
      filteredMovies.map((movie) => (
        <MovieCard 
        key={ movie.id } 
        movie={ movie } 
        isLiked={likedIds.includes(movie.id)}
        onToggleLike={() => toggleLike(movie.id) }/>
      )))
      }
      {query !== "" && ( <p> {count} {count === 1 ? "movie" : "movies"}</p>) }
    </div>
  )
}

export default App;


import MovieCard  from "./MovieCard";
import type { Movie } from "./types";

const movies: Movie[] = [
  { id:1, title: "Past Lives", year: 2023, rating: 4.5 },
  { id: 2, title: "Parasite", year: 2019, rating: 4.6 },
  { id: 3, title: "Whiplash", year: 2014, rating: 4.4 },
];

function App(){
  return (
    <div>
      <h1>Movie Finder</h1>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default App;


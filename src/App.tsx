import MovieCard  from "./MovieCard";
import type { Movie } from "./types";
import { useState } from "react";
import { useEffect } from "react";



function App(){
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading,setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [likedIds, setLikedIds] = useState<number[]>([]);

  useEffect(() => {
  const controller = new AbortController();

  async function loadMovies() {
    setLoading(true);
    setError(null);
    try {
      const base = "https://api.themoviedb.org/3";
      const key = import.meta.env.VITE_TMDB_KEY;
      const url = debouncedQuery
        ? `${base}/search/movie?api_key=${key}&query=${encodeURIComponent(debouncedQuery)}`
        : `${base}/movie/popular?api_key=${key}`;

      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();

      setMovies(
        data.results.map((m: any) => ({
          id: m.id,
          title: m.title,
          year: m.release_date?.slice(0, 4) ?? "",
          rating: m.vote_average,
          posterPath: m.poster_path,
        }))
      );
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      console.error(err);
      setError("Couldn't load movies.");
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }

  loadMovies();
  return () => controller.abort();
}, [debouncedQuery]);

 useEffect(() => {
  const timer = setTimeout(() => setDebouncedQuery(query.trim()), 400);
  return () => clearTimeout(timer);
 }, [query]);




  const count = movies.length;

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
       <p>Liked : {likedIds.length}</p>
       <div className="movie-grid">
        {
        loading ? (
          <p>Loading...</p>
        ): error ? (
          <p>{error}</p>
        ) : debouncedQuery === "" ? ( <h3>No Movies found</h3>) : (
        movies.map((movie) => (
        <MovieCard 
        key={ movie.id } 
        movie={ movie } 
        isLiked={likedIds.includes(movie.id)}
        onToggleLike={() => toggleLike(movie.id) }/>
      )))
      }
      </div>
      {query !== "" && (
         <p> 
          {count} {count === 1 ? "movie" : "movies"}
         </p>
        ) }
    </div>
  )
}

export default App;


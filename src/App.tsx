import MovieCard  from "./MovieCard";
import type { Movie } from "./types";
import { useState } from "react";
import { useEffect } from "react";



function App(){
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading,setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [likedIds, setLikedIds] = useState<number[]>([]);

  useEffect(()=>{
    async function loadMovies(){
    try{
      const res= await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_KEY}`
      );
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setMovies(
        data.results.map((m: any) => ({
          id: m.id,
          title: m.title,
          year: m.release_date?.slice(0,4) ?? "",
          rating: m.vote_average,
          posterPath: m.poster_path,
        }))
      );
    } catch(err) {
      console.error(err);
      setError("Couldn't load movies.");
    } finally {
      setLoading(false);
    }
  }
  loadMovies();
},[]);

  const normalizedQuery = query.toLowerCase();
  const filteredMovies = movies.filter((movie) => 
    movie.title.toLowerCase().includes(normalizedQuery)

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
       <p>Liked : {likedIds.length}</p>
       
      {
        loading ? (
          <p>Loading...</p>
        ): error ? (
          <p>{error}</p>
        ) : count === 0 ? ( <h3>No Movies found</h3>) : (
        filteredMovies.map((movie) => (
        <MovieCard 
        key={ movie.id } 
        movie={ movie } 
        isLiked={likedIds.includes(movie.id)}
        onToggleLike={() => toggleLike(movie.id) }/>
      )))
      }
      {query !== "" && (
         <p> 
          {count} {count === 1 ? "movie" : "movies"}
         </p>
        ) }
    </div>
  )
}

export default App;


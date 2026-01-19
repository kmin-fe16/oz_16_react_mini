import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard.jsx";

export default function MainPageApi() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = import.meta.env.VITE_TMDB_TOKEN;

    async function load() {
      try {
        if (!token) {
          setError("VITE_TMDB_TOKEN 이 없습니다 (.env 확인 후 서버 재시작)");
          return;
        }

        const res = await fetch(
          "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`TMDB 실패: ${res.status} ${txt}`);
        }

        const data = await res.json();
        setMovies(data.results ?? []);
      } catch (e) {
        setError(String(e.message || e));
      }
    }

    load();
  }, []);

  if (error) return <div style={{ padding: 24 }}>{error}</div>;

  return (
    <div>
      <h1>OZ무비(API)</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 16,
        }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

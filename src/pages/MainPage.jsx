import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard.jsx";

const TMDB_LIST_URL =
  "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1";

export default function MainPageApi() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setErrorMsg("");

        const token = import.meta.env.VITE_TMDB_TOKEN;

        const res = await fetch(TMDB_LIST_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json;charset=utf-8",
          },
        });

        if (!res.ok) throw new Error(`TMDB 요청 실패: ${res.status}`);

        const data = await res.json();
        setMovies(data.results ?? []);
      } catch (err) {
        setErrorMsg(err?.message ?? "알 수 없는 오류");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  if (loading) return <div style={{ padding: 24 }}>불러오는 중...</div>;
  if (errorMsg) return <div style={{ padding: 24 }}>에러: {errorMsg}</div>;

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

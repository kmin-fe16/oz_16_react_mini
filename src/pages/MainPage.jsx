// src/pages/MainPage.jsx

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard.jsx";
import { searchMovies } from "../api/searchMovies.js";

const TMDB_LIST_URL =
  "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1";

export default function MainPage() {
  // ✅ URL query (?query=...)
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const isSearching = query.trim().length > 0;

  // ✅ 검색 관련 state
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // ✅ 기존(미션2) 인기 목록 state
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ 검색 API 호출 (query가 있을 때만)
  useEffect(() => {
    let ignore = false;

    async function run() {
      const q = query.trim();

      if (!q) {
        setSearchResults([]);
        setSearchError(null);
        setSearchLoading(false);
        return;
      }

      setSearchLoading(true);
      setSearchError(null);

      try {
        const results = await searchMovies(q);
        if (!ignore) setSearchResults(results);
      } catch (e) {
        if (!ignore) setSearchError(e?.message || "검색 실패");
      } finally {
        if (!ignore) setSearchLoading(false);
      }
    }

    run();
    return () => {
      ignore = true;
    };
  }, [query]);

  // ✅ 기존 인기 목록 호출(미션2)
  useEffect(() => {
    let ignore = false;

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

        if (!res.ok) throw new Error("Failed to fetch popular movies");

        const data = await res.json();
        if (!ignore) setMovies(data.results || []);
      } catch (e) {
        if (!ignore) setErrorMsg(e?.message || "목록 불러오기 실패");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchMovies();
    return () => {
      ignore = true;
    };
  }, []);

  // ✅ 화면에 뿌릴 리스트는 "검색 중이면 검색결과, 아니면 인기목록"
  const list = isSearching ? searchResults : movies;
  const title = isSearching ? `“${query}” 검색 결과` : "OZ무비(API)";

  // ✅ 로딩/에러도 검색/기본에 맞게 분기
  const showLoading = isSearching ? searchLoading : loading;
  const showError = isSearching ? searchError : errorMsg;

  return (
    <div>
      <h1 style={styles.title}>{title}</h1>

      {showLoading && <p style={styles.info}>로딩 중...</p>}
      {showError && (
        <p style={{ ...styles.info, color: "crimson" }}>{showError}</p>
      )}

      {!showLoading && !showError && (
        <div style={styles.grid}>
          {list.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  title: {
    fontSize: "3.2em",
    lineHeight: 1.1,
    margin: "20px 0",
  },
  info: {
    margin: "12px 0",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 16,
  },
};

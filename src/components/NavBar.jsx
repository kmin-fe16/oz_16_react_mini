import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

export default function NavBar() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const q = debouncedSearch.trim();

    if (q) {
      setSearchParams({ query: q });
    } else {
      setSearchParams({});
    }
  }, [debouncedSearch, setSearchParams]);

  return (
    <header style={styles.header}>
      <h1 style={styles.logo}>OZ Movie</h1>

      <input
        style={styles.input}
        type="text"
        placeholder="영화 제목으로 검색..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    borderBottom: "1px solid #eee",
    position: "sticky",
    top: 0,
    backgroundColor: "white",
    zIndex: 10,
  },
  logo: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "bold",
  },
  input: {
    width: "240px",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
  },
};

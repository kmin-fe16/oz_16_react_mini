import { useState } from "react";

export default function Navbar() {
  const [search, setSearch] = useState("");

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
    gap: "12px",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    borderBottom: "1px solid #eee",
    position: "sticky",
    top: 0,
    background: "white",
    zIndex: 10,
  },
  logo: { margin: 0, fontSize: "18px" },
  input: {
    width: "240px",
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none",
  },
};

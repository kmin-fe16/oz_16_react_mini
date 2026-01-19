import { Routes, Route } from "react-router-dom";
import MovieDetail from "./pages/MovieDetail.jsx";
import Layout from "./pages/Layout.jsx";
import MainPageApi from "./pages/MainPageApi.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPageApi />} />
        <Route path="details/:id" element={<MovieDetail />} />
      </Route>
    </Routes>
  );
}

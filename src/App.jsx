import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LatestPage from "./pages/LatestPage";
import MoviePage from "./pages/MoviePage";
import Nav from "./components/Nav";
import AnimePage from "./pages/AnimePage";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/latest" element={<LatestPage />} />
        <Route path="/anime" element={<AnimePage />} />
        <Route path="/movie" element={<MoviePage />} />
      </Routes>
    </Router>
  );
}

export default App;

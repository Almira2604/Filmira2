import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar component/Sidebar";
import Navbar from "./Components/Navbar component/Navbar";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import TVShows from "./pages/TVShows";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col md:flex-row bg-[#0f172a]">
        {/* Sidebar remains fixed with w-16 on mobile and w-56 on desktop */}
        <Sidebar />

        <main className="flex-1 ml-16 md:ml-56">
          {/* FIX: Added ml-16 (margin-left) for small screens to push content
            past the fixed w-16 sidebar. md:ml-56 handles the desktop layout.
          */}
          <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm">
            <Navbar />
          </div>

          <div className="p-4 sm:p-6 md:p-4 lg:p-8 mt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie" element={<Movies />} />
              <Route path="/series" element={<Series />} />
              <Route path="/tvshows" element={<TVShows />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;

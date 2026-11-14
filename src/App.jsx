
import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import HotelList from "./component/HotelList";
import HotelDetails from "./component/HotelDetails";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">StayFinder</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/hotels">Hotels</Link>
      </div>
    </nav>
  );
}


function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<HotelList />} />
        <Route path="/hotels" element={<HotelList />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
        <Route path="/about" element={<h1>About Page</h1>} />
      </Routes>
    </div>
  );
}

export default App;

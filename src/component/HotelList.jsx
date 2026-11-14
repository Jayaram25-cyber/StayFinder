import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/HotelList.css";
import HotelCard from "./HotelCard"
import HotelForm from "./HotelForm";
import { Helmet } from "react-helmet-async";
import {
  setHotels,
  addHotel,
  updateHotel,
  deleteHotel,
} from "../redux/hotelSlice";

function HotelList() {

  const hotelList = useSelector((state) => state.hotels.hotelList);

  const dispatch = useDispatch();
  const [totalHotels, setTotalHotels] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const hotelsPerPage = 6;

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const params = new URLSearchParams({
          search: searchTerm,
          minPrice: minPrice,
          maxPrice: maxPrice,
          limit: hotelsPerPage,
          offset: (currentPage - 1) * hotelsPerPage,
        });

        const response = await fetch(
          `http://localhost:5000/api/hotels?${params}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch hotels");
        }

        const data = await response.json();

        dispatch(setHotels(data.hotels));
        setTotalHotels(data.total);

      } catch (error) {
        console.error("Error fetching hotels:", error.message);
      }
    };

    fetchHotels();
  }, [searchTerm, minPrice, maxPrice, currentPage]);

  const currentHotels = hotelList;

  const totalPages = Math.ceil(totalHotels / hotelsPerPage);
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const [showForm, setShowForm] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const addNewHotel = async (formData) => {
    try {
      const isEditing = selectedHotel !== null;

      const url = isEditing
        ? `http://localhost:5000/api/hotels/${selectedHotel.id}`
        : "http://localhost:5000/api/hotels";

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save hotel");
      }

      if (isEditing) {
        dispatch(updateHotel(data.hotel));

        alert("Hotel updated successfully!");
      } else {
        dispatch(addHotel(data.hotel));

        alert("Hotel added successfully!");
      }

      setShowForm(false);
      setSelectedHotel(null);

    } catch (error) {
      console.error("Error saving hotel:", error.message);
      alert(error.message);
    }
  };


  const handleEditHotel = (hotel) => {
    setSelectedHotel(hotel);
    setShowForm(true);
  };

  const handleDeleteHotel = async (hotelId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this hotel?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/hotels/${hotelId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete hotel");
      }

      dispatch(deleteHotel(hotelId));
      setTotalHotels((prev) => Math.max(0, prev - 1));

      setShowSuccess(true);

    } catch (error) {
      console.error("Error deleting hotel:", error.message);
      alert(error.message);
    }
  };


  return (

    <>
      <Helmet>
        <title>Explore Hotels | StayFinder</title>

        <meta
          name="description"
          content="Explore and discover comfortable hotels at the best prices with StayFinder."
        />

        <meta
          name="keywords"
          content="hotels, hotel booking, hotel search, StayFinder"
        />
      </Helmet>


      <section className="hotel-section">
        <div className="hotel-head">
          <div>
            <h1>Available Hotels</h1>
            <p>Find the perfect place for your next stay.</p>
          </div>

          <div>
            <button
              className="add-hotel-btn"
              onClick={() => {
                setSelectedHotel(null);
                setShowForm(true);
              }}
            >
              + Add Hotel
            </button>
          </div>
        </div>

        <div className="hotel-filters">

          <div className="search-box">
            <input
              type="text"
              placeholder="Search hotels by name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="price-filter">
            <input
              type="number"
              placeholder="Min Price (₹)"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value);
                setCurrentPage(1);
              }}
            />

            <input
              type="number"
              placeholder="Max Price (₹)"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <button
            className="reset-filter-btn"
            onClick={() => {
              setSearchTerm("");
              setMinPrice("");
              setMaxPrice("");
              setCurrentPage(1);
            }}
          >
            Reset Filters
          </button>

        </div>


        {showForm && (
          <div className="hotel-modal-overlay">
            <div className="hotel-modal">

              <div className="hotel-modal-header">
                <h2>{selectedHotel ? "Edit Hotel" : "Add New Hotel"}</h2>

                <button
                  className="hotel-modal-close"
                  onClick={() => setShowForm(false)}
                >
                  &times;
                </button>
              </div>

              <div className="hotel-modal-body">
                <HotelForm onAddHotel={addNewHotel} selectedHotel={selectedHotel} />
              </div>

            </div>
          </div>
        )}

        {showSuccess && (
          <div className="success-overlay">
            <div className="success-modal">

              <div className="success-icon">
                ✓
              </div>

              <h2>Hotel Deleted!</h2>

              <p>The hotel has been deleted successfully.</p>

              <button
                onClick={() => setShowSuccess(false)}
              >
                OK
              </button>

            </div>
          </div>
        )}

        <div className="hotel-container">
          {currentHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} onEdit={handleEditHotel} onDelete={handleDeleteHotel} />
          ))}
        </div>

        <div className="pagination">

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>

          {pageNumbers.map((number) => (
            <button key={number} className={currentPage === number ? "active" : ""}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          ))}

          <button disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}>
            Next
          </button>

        </div>
      </section>
    </>
  );

}

export default HotelList;
import "../styles/HotelCard.css";
import { useNavigate } from "react-router-dom";

function HotelCard({ hotel, onEdit, onDelete }) {

    const navigate = useNavigate();

    const imageUrl = hotel.image
        ? `http://localhost:5000${hotel.image}`
        : "";

    return (
        <div className="hotel-card" onClick={() => navigate(`/hotel/${hotel.id}`)}>

            <div className="hotel-info">
                <img
                    src={imageUrl}
                    alt={hotel.name}
                    className="hotel-image"
                />
                <h2>{hotel.name}</h2>
                <p>{hotel.description}</p>
                <h3>₹{hotel.price}</h3>

                <button className="edit-hotel-btn" onClick={(e) => {
                    e.stopPropagation();
                    onEdit(hotel)
                }}>
                    Edit
                </button>

                <button className="delete-hotel-btn" onClick={(e) => {
                    e.stopPropagation();
                    onDelete(hotel.id)
                }} >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default HotelCard;
import { useState } from "react";
import "../styles/HotelForm.css";

function HotelForm({ onAddHotel, selectedHotel }) {

    const [hotelName, setHotelName] = useState(selectedHotel?.name || "");
    const [description, setDescription] = useState(selectedHotel?.description || "");
    const [latitude, setLatitude] = useState(selectedHotel?.latitude || "");
    const [longitude, setLongitude] = useState(selectedHotel?.longitude || "");
    const [price, setPrice] = useState(selectedHotel?.price || "");
    const [imagePreview, setImagePreview] = useState(selectedHotel?.image || null);
    const [imageFile, setImageFile] = useState(null);


    const handleSubmit = (event) => {
        event.preventDefault();

        if (!imagePreview) {
            alert("Please upload a hotel image");
            return;
        }

        if (!selectedHotel && !imageFile) {
            alert("Please select a hotel image");
            return;
        }

        if (!hotelName.trim()) {
            alert("Please enter hotel name");
            return;
        }

        if (!description.trim()) {
            alert("Please enter hotel description");
            return;
        }

        if (
            latitude === "" ||
            !Number.isFinite(Number(latitude)) ||
            Number(latitude) < -90 ||
            Number(latitude) > 90
        ) {
            alert("Please enter a valid latitude");
            return;
        }

        if (
            longitude === "" ||
            !Number.isFinite(Number(longitude)) ||
            Number(longitude) < -180 ||
            Number(longitude) > 180
        ) {
            alert("Please enter a valid longitude");
            return;
        }

        if (price === "" || !Number.isFinite(Number(price)) || Number(price) <= 0) {
            alert("Please enter a valid hotel price");
            return;
        }

        const formData = new FormData();

        formData.append("name", hotelName);
        formData.append("description", description);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        formData.append("price", price);

        if (imageFile) {
            formData.append("image", imageFile);
        }

        onAddHotel(formData);
    };


    return (
        <form className="hotel-form" onSubmit={handleSubmit}>
            <h2>{selectedHotel ? "Edit Hotel" : "Add New Hotel"}</h2>

            <div className="form-group">
                <label htmlFor="hotelImage">Hotel Image</label>
                <input type="file" id="hotelImage" accept="image/*" onChange={(event) => {
                    const file = event.target.files[0];

                    if (file) {
                        setImageFile(file);
                        setImagePreview(URL.createObjectURL(file));
                    }
                }} />
            </div>
            {imagePreview && (
                <div className="image-preview">
                    <img src={imagePreview} alt="Hotel Preview" />
                </div>
            )}

            <div className="form-group">
                <label htmlFor="hotelName">Hotel Name</label>
                <input type="text" id="hotelName" placeholder="Enter hotel name" value={hotelName}
                    onChange={(event) => {
                        const hotelnamee = event.target.value;
                        setHotelName(hotelnamee);
                    }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Hotel Description</label>

                <textarea
                    id="description"
                    placeholder="Enter hotel description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    rows="4"
                />
            </div>

            <div className="form-group">
                <label htmlFor="latitude">Latitude</label>
                <input
                    type="number"
                    id="latitude"
                    placeholder="Enter latitude"
                    value={latitude}
                    onChange={(event) => setLatitude(event.target.value)}
                    step="any"
                />
            </div>

            <div className="form-group">
                <label htmlFor="longitude">Longitude</label>
                <input
                    type="number"
                    id="longitude"
                    placeholder="Enter longitude"
                    value={longitude}
                    onChange={(event) => setLongitude(event.target.value)}
                    step="any"
                />
            </div>

            <div className="form-group">
                <label htmlFor="price">Price Per Night (₹)</label>

                <input
                    type="number"
                    id="price"
                    placeholder="Enter hotel price"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    min="1"
                />
            </div>

            <button type="submit" className="submit-btn">
                {selectedHotel ? "Update Hotel" : "Add Hotel"}
            </button>
        </form>
    );
}




export default HotelForm;
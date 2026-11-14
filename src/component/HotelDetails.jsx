import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import hotels from "../data/Hotels";
import "../styles/HotelDetails.css";
import HotelMap from "./HotelMap";

function HotelDetails() {

    const { id } = useParams();

    const hotel = hotels.find(
        (hotel) => hotel.id === Number(id)
    );


    if (!hotel) {
        return <h2>Hotel not found!</h2>;
    }

    return (
        <>
            <Helmet>
                <title>{hotel.name} | StayFinder</title>

                <meta
                    name="description"
                    content={hotel.description}
                />

                <meta
                    name="keywords"
                    content={`${hotel.name}, hotel booking, hotel details, StayFinder`}
                />
            </Helmet>

            
            <section className="hotel-details-section">

                <div className="hotel-details-container">

                    <div className="details-image-wrapper">
                        <img
                            src={hotel.image}
                            alt={hotel.name}
                            className="details-image"
                        />
                    </div>

                    <div className="details-content">

                        <span className="details-label">
                            HOTEL DETAILS
                        </span>

                        <h1>{hotel.name}</h1>

                        <p className="details-description">
                            {hotel.description}
                        </p>

                        <div className="details-price">
                            <span>Starting from</span>
                            <h2>₹{hotel.price}</h2>
                            <span>per night</span>
                        </div>

                        <div className="details-location">
                            <h3>Location Information</h3>

                            <div className="coordinate-item">
                                <span>Latitude</span>
                                <strong>{hotel.latitude}</strong>
                            </div>

                            <div className="coordinate-item">
                                <span>Longitude</span>
                                <strong>{hotel.longitude}</strong>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="hotel-map-section">
                    <h2>Hotel Location</h2>

                    <HotelMap
                        latitude={hotel.latitude}
                        longitude={hotel.longitude}
                        name={hotel.name}
                    />
                </div>
            </section>
        </>
    );

}

export default HotelDetails;
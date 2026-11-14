
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const hotelMarker = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function HotelMap({ latitude, longitude, name }) {

    const [userLocation, setUserLocation] = useState(null);
    const [error, setError] = useState("");

    const position = [
        Number(latitude),
        Number(longitude),
    ];

    const handleGetLocation = () => {

        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            return;
        }

        setError("");

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            () => {
                setError(
                    "Unable to get your location. Please allow location access."
                );
            }
        );
    };

    return (
        <div>

            <button
                className="show-location-btn"
                onClick={handleGetLocation}
            >
                <span>📍</span> Show My Location
            </button>

            {error && <p>{error}</p>}

            <MapContainer
                center={position}
                zoom={14}
                scrollWheelZoom={false}
                style={{ height: "400px", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={position} icon={hotelMarker}>
                    <Popup>{name}</Popup>
                </Marker>

                {userLocation && (
                    <Marker
                        position={[
                            userLocation.latitude,
                            userLocation.longitude,
                        ]}
                    >
                        <Popup>You are here!</Popup>
                    </Marker>
                )}

            </MapContainer>

        </div>
    );
}

export default HotelMap;

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getDistance } from "geolib";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import AOS from "aos";
import "aos/dist/aos.css";

const buses = [
  { id: "Bus 101", lat: 28.7041, lng: 77.1025, route: "Kashmere Gate" },
  { id: "Bus 102", lat: 28.4595, lng: 77.0266, route: "Gurgaon" },
  { id: "Bus 103", lat: 28.5355, lng: 77.391, route: "Noida" },
];

const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
  iconSize: [30, 30],
});

const busIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61205.png",
  iconSize: [30, 30],
});

// Routing component
function Routing({ userLocation, busLocation }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !userLocation || !busLocation) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(userLocation.lat, userLocation.lng),
        L.latLng(busLocation.lat, busLocation.lng),
      ],
      lineOptions: {
        styles: [{ color: "blue", weight: 5 }],
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, userLocation, busLocation]);

  return null;
}

export default function Track() {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);
  const [showDistance, setShowDistance] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => alert("Location access denied")
    );
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false }); // 👈 animations trigger every time
  }, []);

  const calculateDistance = (bus) => {
    if (!userLocation || !bus) return null;
    return (getDistance(userLocation, bus) / 1000).toFixed(2);
  };

  return (
    <div id="track" className="min-h-screen px-6 pt-20">
      <h2
        className="text-4xl font-bold text-center mb-20 mt-10"
        data-aos="zoom-out"
      >
        Track Your Bus 🚌
      </h2>
      <div className="flex justify-around">
        {/* Left */}
        <div
          className="bg-gray-100 dark:bg-gray-950 p-6 rounded-lg w-[40vw] ml-10"
          style={{ border: "2px solid blue" }}
          data-aos="zoom-out"
        >
          <select
            onChange={(e) =>
              setSelectedBus(
                buses.find((b) => b.id === e.target.value) || null
              )
            }
            className="p-2 rounded mb-4 w-full text-black"
            style={{ border: "2px solid red" }}
          >
            <option value="">Select Your Bus</option>
            {buses.map((bus) => (
              <option key={bus.id} value={bus.id}>
                {bus.id} - {bus.route}
              </option>
            ))}
          </select>
          <div className="h-80" data-aos="zoom-out">
            {userLocation ? (
              <MapContainer
                center={[userLocation.lat, userLocation.lng]}
                zoom={12}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={userLocation} icon={userIcon}>
                  <Popup>You are here 📍</Popup>
                </Marker>
                {selectedBus && (
                  <Marker position={[selectedBus.lat, selectedBus.lng]} icon={busIcon}>
                    <Popup>
                      {selectedBus.id} - {selectedBus.route}
                    </Popup>
                  </Marker>
                )}
                {selectedBus && showDistance && (
                  <Routing userLocation={userLocation} busLocation={selectedBus} />
                )}
              </MapContainer>
            ) : (
              <p className="text-center text-gray-500">Fetching your location...</p>
            )}
          </div>

          {selectedBus && (
            <button
              onClick={() => setShowDistance(true)}
              className="mt-4 bg-yellow-600 text-white px-4 py-2 mx-[30%] rounded-lg"
            >
              Distance From Me
            </button>
          )}
        </div>

        {/* Right */}
        <div
          className="flex-1 p-6 rounded-xl border border-gray-700 w-[40vw] ml-32 mr-10"
          style={{ border: "2px solid blue" }}
          data-aos="zoom-out"
        >
          <h3 className="text-2xl font-bold mb-4 text-center">
            Bus Information
          </h3>
          {selectedBus ? (
            <>
              <p>
                <span className="font-semibold">Bus ID:</span> {selectedBus.id}
              </p>
              <p>
                <span className="font-semibold">Route:</span> {selectedBus.route}
              </p>
              <p>
                <span className="font-semibold">Coordinates:</span>{" "}
                {selectedBus.lat.toFixed(4)}, {selectedBus.lng.toFixed(4)}
              </p>
              {userLocation && (
                <p className="text-green-400 font-semibold">
                  Distance: {calculateDistance(selectedBus)} km
                </p>
              )}
            </>
          ) : (
            <p className="text-gray-400 text-center">
              Select a bus to see details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

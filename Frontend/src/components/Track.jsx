import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getDistance } from "geolib";
import { BASE_URL } from "../config";

// ✅ Import routing
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import PlanJourney from "./Planjourney";

const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const busIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61205.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

// ✅ Custom routing component
function Routing({ userLocation, busLocation, showPath }) {
  const map = useMap();

  useEffect(() => {
    if (!userLocation || !busLocation || !showPath) return;

    // Clear old routes
    map.eachLayer((layer) => {
      if (layer instanceof L.Routing.Control) {
        map.removeControl(layer);
      }
    });

    // Add new route
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(userLocation.lat, userLocation.lng),
        L.latLng(busLocation.latitude, busLocation.longitude),
      ],
      lineOptions: {
        styles: [{ color: "blue", weight: 4 }],
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [userLocation, busLocation, showPath, map]);

  return null;
}

// ✅ Custom map updater for focusing on user location
function MapUpdater({ userLocation }) {
  const map = useMap();

  useEffect(() => {
    if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], 15, {
        animate: true,
      });
    }
  }, [userLocation, map]);

  return null;
}

export default function TrackBus() {
  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [locationEnabled, setLocationEnabled] = useState(false);

  const [buses, setBuses] = useState([]);
  const [busData, setBusData] = useState({});
  const [selectedBus, setSelectedBus] = useState("");
  const [distance, setDistance] = useState(null);
  const [showPath, setShowPath] = useState(false);

  // User location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        setLocationEnabled(true);

        // Reverse geocoding
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${loc.lat}&lon=${loc.lng}`
        )
          .then((res) => res.json())
          .then((data) => setUserAddress(data.display_name || "Unknown Place"))
          .catch(() => setUserAddress("Unknown Place"));
      },
      (err) => {
        alert("Location access denied!");
        console.error(err);
      }
    );
  };

  // Fetch buses from backend
  useEffect(() => {
    fetch(`${BASE_URL}/api/busdata`)
      .then((res) => res.json())
      .then((data) => {
        const latest = {};
        const uniqueBuses = [...new Set(data.map((d) => d.busNumber))];
        data.forEach((d) => {
          if (!latest[d.busNumber] || d.timestamp > latest[d.busNumber].timestamp) {
            latest[d.busNumber] = d;
          }
        });
        setBuses(uniqueBuses);
        setBusData(latest);
      })
      .catch((err) => console.error("❌ Fetch error:", err));
  }, []);

  // WebSocket live updates
  useEffect(() => {
    const ws = new WebSocket("wss://backendbus-1-9fdh.onrender.com");
    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setBusData((prev) => ({
        ...prev,
        [newData.busNumber]: newData,
      }));
    };
    return () => ws.close();
  }, []);

  // Distance calc
  useEffect(() => {
    if (userLocation && selectedBus && busData[selectedBus]) {
      const busLoc = busData[selectedBus];
      const dist =
        getDistance(
          { latitude: userLocation.lat, longitude: userLocation.lng },
          { latitude: busLoc.latitude, longitude: busLoc.longitude }
        ) / 1000;
      setDistance(dist.toFixed(2));
    }
  }, [selectedBus, busData, userLocation]);

  return (
    <section id="track" className="min-h-screen bg-gray-100 dark:bg-gray-900 py-16 px-6">
      <h2 className="text-4xl font-bold text-center mt-12 mb-2">Track Bus</h2>
      <p className="text-center my-6">You can Track your bus and can find the distance from you and you can find the fair of your journey</p>
      <PlanJourney />

      {!locationEnabled && (
        <div className="flex justify-center mb-6">
          <button
            onClick={getUserLocation}
            className="bg-green-600 hover:bg-green-700 text-white mt-10 px-6 py-3 rounded-lg font-semibold"
          >
            Enable Location
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div style={{ border: "3px solid grey" }} className="rounded-xl">
          <label className="block text-gray-700 dark:text-gray-300 mb-1 pt-4 pl-[5%]">
            Select Bus
          </label>
          <select
            value={selectedBus}
            onChange={(e) => setSelectedBus(e.target.value)}
            className="w-[90%] p-2 border rounded-lg dark:bg-gray-700 dark:text-white mb-5 ml-[5%]"
          >
            <option value="" className="py-2">
              -- Choose Bus --
            </option>
            {buses.map((bus) => (
              <option key={bus} value={bus}>
                {bus}
              </option>
            ))}
          </select>

          {/* Map */}
          <MapContainer
            center={userLocation || [20.5937, 78.9629]}
            zoom={5}
            className="mx-auto"
            style={{ height: "340px", width: "90%" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {userLocation && (
              <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                <Popup>
                  <b>Your Location</b>
                  <br />
                  {userAddress}
                </Popup>
              </Marker>
            )}
            {selectedBus && busData[selectedBus] && (
              <Marker
                position={[busData[selectedBus].latitude, busData[selectedBus].longitude]}
                icon={busIcon}
              >
                <Popup>{selectedBus}</Popup>
              </Marker>
            )}

            {/* ✅ Auto focus map on user location */}
            <MapUpdater userLocation={userLocation} />

            {/* ✅ Road-wise route */}
            {showPath &&
              userLocation &&
              selectedBus &&
              busData[selectedBus] && (
                <Routing
                  userLocation={userLocation}
                  busLocation={busData[selectedBus]}
                  showPath={showPath}
                />
              )}
          </MapContainer>

          <button
            className="mt-8 ml-[5%] mb-6 w-[90%] bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
            onClick={() => setShowPath(!showPath)}
          >
            {showPath ? "Hide Path" : "Show Distance and Path"}
          </button>
        </div>

        {/* Info Panel */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg" style={{ border: "3px solid grey" }}>
          <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white text-center">
            Information
          </h2>
          {selectedBus && busData[selectedBus] ? (
            <div>
              <p className="mb-2">
                <strong>Bus Number:</strong> {selectedBus}
              </p>
              <p className="mb-2">
                <strong>Latitude:</strong>{" "}
                {busData[selectedBus].latitude.toFixed(6)}
              </p>
              <p className="mb-2">
                <strong>Longitude:</strong>{" "}
                {busData[selectedBus].longitude.toFixed(6)}
              </p>
              {distance && (
                <p className="text-lg font-semibold text-green-600">
                  Distance: {distance} km
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-500">Please select a bus to view details.</p>
          )}
        </div>
      </div>
    </section>
  );
}

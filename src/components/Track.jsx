import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import "leaflet-routing-machine";
import { getDistance } from "geolib";
import PlanJourney from "./PlanJourney";
import { databases, DATABASE_ID, BUSES_COLLECTION_ID, client } from "../lib/appwrite";

// Error Boundary Component (unchanged)
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <p className="text-red-500 text-center">
          Error loading route: {this.state.error?.message || "Unknown error"}. Please try again.
        </p>
      );
    }
    return this.props.children;
  }
}

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

function Routing({ start, end }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !start || !end || !start.lat || !start.lng || !end.lat || !end.lng) {
      console.log("Routing skipped: Invalid or missing coordinates", { map, start, end });
      return;
    }

    if (typeof L.Routing === "undefined") {
      console.error("leaflet-routing-machine is not loaded correctly.");
      return;
    }

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(start.lat, start.lng),
        L.latLng(end.lat, end.lng),
      ],
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
      }),
      lineOptions: { styles: [{ color: "blue", weight: 5 }] },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
    })
      .on("routingerror", (err) => {
        console.error("Routing error:", err);
        alert("Failed to load route. Please check your network or try again.");
      })
      .addTo(map);

    return () => {
      try {
        map.removeControl(routingControl);
      } catch (err) {
        console.error("Error removing routing control:", err);
      }
    };
  }, [map, start, end]);

  return null;
}

export default function Track() {
  const [userLocation, setUserLocation] = useState(null);
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [route, setRoute] = useState(null);
  const [showRoute, setShowRoute] = useState(false);
  const [error, setError] = useState(null);

  // Dummy bus data with predefined routes (using stations from PlanJourney.jsx)
  const dummyBuses = [
    {
      busNumber: "B001",
      start: { lat: 28.7041, lng: 77.1025, name: "Central Station" }, // central_station
      end: { lat: 28.4595, lng: 77.0266, name: "North Terminal" },   // north_terminal
      latitude: 28.7041, // Starting point for now
      longitude: 77.1025,
      seats: Array.from({ length: 5 }).map((_, i) => ({ number: i + 1, occupied: Math.random() > 0.5 })),
    },
    {
      busNumber: "B002",
      start: { lat: 28.5355, lng: 77.391, name: "South Plaza" },     // south_plaza
      end: { lat: 28.6507, lng: 77.231, name: "East Gate" },         // east_gate
      latitude: 28.5355,
      longitude: 77.391,
      seats: Array.from({ length: 5 }).map((_, i) => ({ number: i + 1, occupied: Math.random() > 0.5 })),
    },
    {
      busNumber: "B003",
      start: { lat: 28.6692, lng: 77.089, name: "West End" },        // west_end
      end: { lat: 28.7041, lng: 77.1025, name: "Central Station" },  // central_station
      latitude: 28.6692,
      longitude: 77.089,
      seats: Array.from({ length: 5 }).map((_, i) => ({ number: i + 1, occupied: Math.random() > 0.5 })),
    },
  ];

  // Use dummy data instead of Appwrite fetch for testing
  useEffect(() => {
    setBuses(dummyBuses); // Set dummy buses immediately
    setSelectedBus(dummyBuses[0]); // Default to first bus
  }, []);

  // Get user location (unchanged)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setUserLocation(location);
        console.log("User location set:", location);
      },
      (err) => {
        console.error("Geolocation error:", err.message);
        setError("Unable to fetch location. Using default location.");
        setUserLocation({ lat: 28.7041, lng: 77.1025 });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  const calculateDistance = (start, end) => {
    if (!start || !end || !start.lat || !start.lng || !end.lat || !end.lng) {
      console.error("Invalid coordinates for distance calculation:", { start, end });
      return "N/A";
    }
    return (getDistance(start, end) / 1000).toFixed(2); // in km
  };

  const handleBusSelect = (e) => {
    const bus = dummyBuses.find(b => b.busNumber === e.target.value);
    setSelectedBus(bus);
    setRoute(null);
    setShowRoute(false);
  };

  const handleShowRoute = () => setShowRoute(!showRoute);

  const handleRouteSelect = (selectedRoute) => {
    setRoute(selectedRoute);
    setSelectedBus(null);
    setShowRoute(false);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-16 px-6">
      <h2 className="text-4xl font-bold text-center mb-10" data-aos="zoom-out">
        Track Bus 🚌
      </h2>
      <p className="text-center max-w-2xl mx-auto mb-10" data-aos="zoom-out">
        Track buses in real-time, check seat availability, and plan your journey.
      </p>
      <PlanJourney onRouteSelect={handleRouteSelect} />
      <div className="flex flex-col md:flex-row justify-center items-start gap-8 mt-10 max-w-6xl mx-auto">
        <div className="flex-1 p-6 rounded-xl border border-gray-700" style={{ border: "2px solid blue" }} data-aos="zoom-out">
          <h3 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
            Select Bus to Track
          </h3>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <select
            onChange={handleBusSelect}
            className="w-full p-2 border rounded mb-4 text-black dark:text-white dark:bg-gray-800"
            aria-label="Select bus to track"
            value={selectedBus?.busNumber || ""}
          >
            <option value="">Select a bus</option>
            {dummyBuses.map(bus => (
              <option key={bus.busNumber} value={bus.busNumber}>
                {bus.busNumber} - {bus.start.name} to {bus.end.name} ({bus.seats.filter(s => !s.occupied).length} seats available)
              </option>
            ))}
          </select>
          <div className="h-80 w-full" data-aos="none">
            {userLocation ? (
              <MapContainer
                center={[userLocation.lat, userLocation.lng]}
                zoom={12}
                style={{ height: "100%", width: "100%" }}
                key={`${userLocation.lat}-${userLocation.lng}`}
              >
                <TileLayer
                  url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={userLocation} icon={userIcon}>
                  <Popup>You are here 📍</Popup>
                </Marker>
                {selectedBus && selectedBus.latitude && selectedBus.longitude && (
                  <Marker
                    position={[selectedBus.latitude, selectedBus.longitude]}
                    icon={busIcon}
                  >
                    <Popup>
                      {selectedBus.busNumber} - {selectedBus.start.name} to {selectedBus.end.name} ({selectedBus.seats.filter(s => !s.occupied).length} seats available)
                    </Popup>
                  </Marker>
                )}
                <ErrorBoundary>
                  {route && showRoute && (
                    <Routing
                      start={route.from}
                      end={route.to}
                    />
                  )}
                  {selectedBus && showRoute && !route && selectedBus.latitude && selectedBus.longitude && (
                    <Routing
                      start={userLocation}
                      end={{ lat: selectedBus.latitude, lng: selectedBus.longitude }}
                    />
                  )}
                </ErrorBoundary>
              </MapContainer>
            ) : (
              <p className="text-center text-gray-500">
                Fetching your location...
              </p>
            )}
          </div>
          {(selectedBus || route) && (
            <button
              type="button"
              onClick={handleShowRoute}
              className="mt-4 bg-yellow-600 text-center text-white text-[8px] md:text-[16px] px-2 md:px-4 py-2 rounded-lg"
              aria-label="Show route and distance"
            >
              Show Route & Distance
            </button>
          )}
        </div>
        <div
          className="flex-1 p-6 rounded-xl border border-gray-700 w-10/12 md:w-[40vw]"
          style={{ border: "2px solid blue" }}
          data-aos="zoom-out"
        >
          <h3 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
            Route Information
          </h3>
          {selectedBus || route ? (
            <>
              {selectedBus && selectedBus.latitude && selectedBus.longitude && (
                <>
                  <p><span className="font-semibold">Bus ID:</span> {selectedBus.busNumber}</p>
                  <p><span className="font-semibold">Route:</span> {selectedBus.start.name} to {selectedBus.end.name}</p>
                  <p>
                    <span className="font-semibold">Coordinates:</span>{" "}
                    {selectedBus.latitude.toFixed(4)}, {selectedBus.longitude.toFixed(4)}
                  </p>
                  <p>
                    <span className="font-semibold">Available Seats:</span>{" "}
                    {selectedBus.seats.filter(s => !s.occupied).length} / {selectedBus.seats.length}
                  </p>
                  {userLocation && (
                    <p className="text-green-400 font-semibold">
                      Distance to Bus: {calculateDistance(userLocation, { lat: selectedBus.latitude, lng: selectedBus.longitude })} km
                    </p>
                  )}
                </>
              )}
              {route && (
                <>
                  <p><span className="font-semibold">Journey:</span> {route.from.name} to {route.to.name}</p>
                  <p className="text-green-400 font-semibold">
                    Distance: {calculateDistance(route.from, route.to)} km
                  </p>
                </>
              )}
            </>
          ) : (
            <p className="text-gray-400 text-center">
              Select a bus or plan a journey to see details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
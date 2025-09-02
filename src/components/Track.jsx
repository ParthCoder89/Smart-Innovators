import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import "leaflet-routing-machine"; // Explicitly import leaflet-routing-machine
import { getDistance } from "geolib";
import PlanJourney from "./components/PlanJourney";


// Error Boundary Component
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

const buses = [
  { id: "Bus 101", lat: 28.7041, lng: 77.1025, route: "Kashmere Gate" },
  { id: "Bus 102", lat: 28.4595, lng: 77.0266, route: "Gurgaon" },
  { id: "Bus 103", lat: 28.5355, lng: 77.391, route: "Noida" },
];

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
  const [selectedBus, setSelectedBus] = useState(null);
  const [route, setRoute] = useState(null);
  const [showRoute, setShowRoute] = useState(false);
  const [error, setError] = useState(null);

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
    try {
      return (getDistance(start, end) / 1000).toFixed(2);
    } catch (err) {
      console.error("Distance calculation error:", err);
      return "N/A";
    }
  };

  const handleRouteSelect = (selectedRoute) => {
    setRoute(selectedRoute);
    setShowRoute(false); // Reset to require explicit "Show Route" click
  };

  const handleShowRoute = () => {
    if (!selectedBus && !route) {
      alert("Please select a bus or plan a journey first.");
      return;
    }
    setShowRoute(true);
  };

  return (
    <div id="track" className="min-h-screen px-6 pt-20">
      <h2
        className="text-4xl font-bold text-center mb-20 mt-10 text-gray-900 dark:text-white"
        data-aos="zoom-out"
      >
        Track Your Bus 🚌
      </h2>
      <p
        className="text-2xl font-semibold text-center mb-20"
        data-aos="zoom-out"
      >
        Select your bus number or plan a journey to view and track locations on the map.
      </p>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div>
        <PlanJourney onRouteSelect={handleRouteSelect} />
      </div>
      <div className="flex flex-col items-center gap-7 mt-20 md:flex-row justify-around">
        <div
          className="flex flex-col items-center bg-gray-100 dark:bg-gray-950 p-6 rounded-lg w-10/12 md:w-[40vw]"
          style={{ border: "2px solid blue" }}
          data-aos="zoom-out"
        >
          <select
            onChange={(e) =>
              setSelectedBus(buses.find((b) => b.id === e.target.value) || null)
            }
            className="p-2 rounded mb-4 w-full text-black dark:text-white dark:bg-gray-800"
            style={{ border: "2px solid red" }}
            value={selectedBus?.id || ""}
            aria-label="Select a bus"
          >
            <option value="">Select Your Bus</option>
            {buses.map((bus) => (
              <option key={bus.id} value={bus.id}>
                {bus.id} - {bus.route}
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
                {selectedBus && (
                  <Marker
                    position={[selectedBus.lat, selectedBus.lng]}
                    icon={busIcon}
                  >
                    <Popup>
                      {selectedBus.id} - {selectedBus.route}
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
                  {selectedBus && showRoute && !route && (
                    <Routing
                      start={userLocation}
                      end={selectedBus}
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
              {selectedBus && (
                <>
                  <p><span className="font-semibold">Bus ID:</span> {selectedBus.id}</p>
                  <p><span className="font-semibold">Route:</span> {selectedBus.route}</p>
                  <p>
                    <span className="font-semibold">Coordinates:</span>{" "}
                    {selectedBus.lat.toFixed(4)}, {selectedBus.lng.toFixed(4)}
                  </p>
                  {userLocation && (
                    <p className="text-green-400 font-semibold">
                      Distance to Bus: {calculateDistance(userLocation, selectedBus)} km
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
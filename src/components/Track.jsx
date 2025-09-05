import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import "leaflet-routing-machine";
import { getDistance } from "geolib";
import PlanJourney from "./Planjourney";
import { realtimeDb } from "../lib/firebase";
import { ref, onValue } from "firebase/database";

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
    if (!start || !end || !start.lat || !start.lng || !end.lat || !end.lng) return;
    const routingControl = L.Routing.control({
      waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
      router: L.Routing.osrmv1({ serviceUrl: "https://router.project-osrm.org/route/v1" }),
      lineOptions: { styles: [{ color: "blue", weight: 5 }] },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
    }).addTo(map);
    return () => map.removeControl(routingControl);
  }, [map, start, end]);
  return null;
}

export default function Track() {
  const [userLocation, setUserLocation] = useState(null);
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [route, setRoute] = useState(null);
  const [showRoute, setShowRoute] = useState(false);
  const [avgDistance, setAvgDistance] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => alert("Failed to get location")
    );
  }, []);

  useEffect(() => {
    const busesRef = ref(realtimeDb, "/buses");
    onValue(busesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const busList = Object.keys(data).map((key) => ({
          busNumber: key,
          latitude: data[key].latitude,
          longitude: data[key].longitude,
          seats: data[key].seats || [],
        }));
        setBuses(busList);
        setSelectedBus(busList[0] || null);
      }
    });
  }, []);

  useEffect(() => {
    if (userLocation && buses.length) {
      const distances = buses.map((bus) =>
        getDistance(
          { latitude: userLocation.lat, longitude: userLocation.lng },
          { latitude: bus.latitude, longitude: bus.longitude }
        ) / 1000
      );
      setAvgDistance((distances.reduce((sum, d) => sum + d, 0) / distances.length).toFixed(2));
    }
  }, [userLocation, buses]);

  const handleShowRoute = () => setShowRoute(!showRoute);
  const handleRouteSelect = (r) => setRoute(r);
  const calcDistance = (a, b) => (getDistance({ latitude: a.lat, longitude: a.lng }, { latitude: b.lat, longitude: b.lng }) / 1000).toFixed(2);

  return (
    <div id="track" className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 pt-10">
      <h2 className="text-4xl font-bold text-center mt-16 mb-20 text-gray-900 dark:text-white" data-aos="zoom-out">
        Track Your Bus
      </h2>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="flex-1" data-aos="zoom-out">
          <PlanJourney onRouteSelect={handleRouteSelect} />
          {userLocation ? (
            <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={13} className="h-[60vh] w-full rounded-xl mt-8">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                <Popup>Your Location</Popup>
              </Marker>
              {selectedBus && selectedBus.latitude && selectedBus.longitude && (
                <Marker position={[selectedBus.latitude, selectedBus.longitude]} icon={busIcon}>
                  <Popup>
                    {selectedBus.busNumber} - {selectedBus.seats.filter((s) => !s).length} seats available
                  </Popup>
                </Marker>
              )}
              {route && showRoute && <Routing start={route.from} end={route.to} />}
              {selectedBus && showRoute && !route && selectedBus.latitude && selectedBus.longitude && (
                <Routing start={userLocation} end={{ lat: selectedBus.latitude, lng: selectedBus.longitude }} />
              )}
            </MapContainer>
          ) : (
            <p className="text-center text-gray-500">Fetching location...</p>
          )}
          {(selectedBus || route) && (
            <button
              type="button"
              onClick={handleShowRoute}
              className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg"
              aria-label="Show route"
            >
              Show Route
            </button>
          )}
        </div>
        <div className="flex-1 p-6 rounded-xl border border-gray-700 w-10/12 md:w-[40vw]" style={{ border: "2px solid blue" }} data-aos="zoom-out">
          <h3 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">Route Info</h3>
          {selectedBus || route ? (
            <>
              {selectedBus && (
                <>
                  <p>
                    <strong>Bus:</strong> {selectedBus.busNumber}
                  </p>
                  <p>
                    <strong>Coordinates:</strong> {selectedBus.latitude.toFixed(4)}, {selectedBus.longitude.toFixed(4)}
                  </p>
                  <p>
                    <strong>Available Seats:</strong> {selectedBus.seats.filter((s) => !s).length} / {selectedBus.seats.length}
                  </p>
                  {userLocation && (
                    <p className="text-green-400">
                      <strong>Distance:</strong> {calcDistance(userLocation, { lat: selectedBus.latitude, lng: selectedBus.longitude })} km
                    </p>
                  )}
                </>
              )}
              {route && (
                <>
                  <p>
                    <strong>Journey:</strong> {route.from.name} to {route.to.name}
                  </p>
                  <p className="text-green-400">
                    <strong>Distance:</strong> {calcDistance(route.from, route.to)} km
                  </p>
                </>
              )}
              {avgDistance && (
                <p className="text-blue-400">
                  <strong>Avg Distance to Buses:</strong> {avgDistance} km
                </p>
              )}
            </>
          ) : (
            <p className="text-gray-400 text-center">Select a bus or journey</p>
          )}
        </div>
      </div>
    </div>
  );
}
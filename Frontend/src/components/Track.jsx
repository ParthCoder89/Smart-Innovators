// // import React, { useState, useEffect, useCallback, useMemo } from "react";
// // import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// // import "leaflet/dist/leaflet.css";
// // import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// // import L from "leaflet";
// // import "leaflet-routing-machine"; // Ensure leaflet-routing-machine is loaded
// // import { getDistance } from "geolib";
// // import PlanJourney from "./PlanJourney";

// // // Error Boundary
// // class ErrorBoundary extends React.PureComponent {
// //   state = { hasError: false, error: null };

// //   static getDerivedStateFromError(error) {
// //     return { hasError: true, error };
// //   }

// //   render() {
// //     if (this.state.hasError) {
// //       return (
// //         <p className="text-red-500 text-center" role="alert">
// //           Error loading route: {this.state.error?.message || "Unknown error"}. Please try again.
// //         </p>
// //       );
// //     }
// //     return this.props.children;
// //   }
// // }

// // // Predefined bus data
// // const buses = [
// //   { id: "Bus 101", lat: 28.7041, lng: 77.1025, route: "Kashmere Gate" },
// //   { id: "Bus 102", lat: 28.4595, lng: 77.0266, route: "Gurgaon" },
// //   { id: "Bus 103", lat: 28.5355, lng: 77.391, route: "Noida" },
// // ];

// // // User Icon
// // const userIcon = new L.Icon({
// //   iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
// //   iconSize: [30, 30],
// //   iconAnchor: [15, 30],
// //   popupAnchor: [0, -30],
// // });

// // // Bus Icon
// // const busIcon = new L.Icon({
// //   iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61205.png",
// //   iconSize: [30, 30],
// //   iconAnchor: [15, 30],
// //   popupAnchor: [0, -30],
// // });

// // // Routing Component
// // const Routing = React.memo(function Routing({ start, end }) {
// //   const map = useMap();

// //   useEffect(() => {
// //     if (!map || !start || !end || !start.lat || !start.lng || !end.lat || !end.lng) {
// //       return;
// //     }

// //     if (typeof L.Routing === "undefined") {
// //       console.error("leaflet-routing-machine failed to load.");
// //       return;
// //     }

// //     const routingControl = L.Routing.control({
// //       waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
// //       router: L.Routing.osrmv1({
// //         serviceUrl: "https://router.project-osrm.org/route/v1",
// //       }),
// //       lineOptions: { styles: [{ color: "blue", weight: 5 }] },
// //       addWaypoints: false,
// //       draggableWaypoints: false,
// //       fitSelectedRoutes: true,
// //       show: false,
// //     })
// //       .on("routingerror", (err) => {
// //         console.error("Routing error:", err);
// //       })
// //       .addTo(map);

// //     return () => {
// //       try {
// //         map.removeControl(routingControl);
// //       } catch (err) {
// //         console.error("Error cleaning routing control:", err);
// //       }
// //     };
// //   }, [map, start, end]);

// //   return null;
// // });

// // // Track Component
// // export default function Track() {
// //   const [userLocation, setUserLocation] = useState(null);
// //   const [selectedBus, setSelectedBus] = useState(null);
// //   const [route, setRoute] = useState(null);
// //   const [showRoute, setShowRoute] = useState(false);
// //   const [error, setError] = useState(null);

// //   // Get user location
// //   useEffect(() => {
// //     navigator.geolocation.getCurrentPosition(
// //       (pos) => {
// //         const location = { lat: pos.coords.latitude, lng: pos.coords.longitude };
// //         setUserLocation(location);
// //       },
// //       (err) => {
// //         console.error("Geolocation error:", err.message);
// //         setError("Unable to fetch location. Using default location.");
// //         setUserLocation({ lat: 28.7041, lng: 77.1025 });
// //       },
// //       { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
// //     );
// //   }, []);

// //   // Calculate distance
// //   const calculateDistance = useCallback((start, end) => {
// //     if (!start || !end) return "N/A";
// //     try {
// //       return (getDistance(start, end) / 1000).toFixed(2);
// //     } catch {
// //       return "N/A";
// //     }
// //   }, []);

// //   // Handle route selection
// //   const handleRouteSelect = useCallback((selectedRoute) => {
// //     setRoute(selectedRoute);
// //     setShowRoute(false);
// //   }, []);

// //   // Show route
// //   const handleShowRoute = useCallback(() => {
// //     if (!selectedBus && !route) {
// //       alert("Please select a bus or plan a journey first.");
// //       return;
// //     }
// //     setShowRoute(true);
// //   }, [selectedBus, route]);

// //   const distanceToBus = useMemo(
// //     () => (userLocation && selectedBus ? calculateDistance(userLocation, selectedBus) : null),
// //     [userLocation, selectedBus, calculateDistance]
// //   );

// //   const journeyDistance = useMemo(
// //     () => (route ? calculateDistance(route.from, route.to) : null),
// //     [route, calculateDistance]
// //   );

// //   return (
// //     <div id="track" className="min-h-screen px-6 pt-20">
// //       <h2
// //         className="text-4xl font-bold text-center mb-20 mt-10 text-gray-900 dark:text-white"
// //         data-aos="zoom-out"
// //       >
// //         Track Your Bus 🚌
// //       </h2>
// //       <p className="text-2xl font-semibold text-center mb-20" data-aos="zoom-out">
// //         Select your bus number or plan a journey to view and track locations on the map.
// //       </p>
// //       {error && <p className="text-red-500 text-center mb-4" role="alert">{error}</p>}

// //       <div>
// //         <PlanJourney onRouteSelect={handleRouteSelect} />
// //       </div>

// //       <div className="flex flex-col items-center gap-7 mt-20 md:flex-row justify-around">
// //         {/* Map Section */}
// //         <div
// //           className="flex flex-col items-center bg-gray-100 dark:bg-gray-950 p-6 rounded-lg w-10/12 md:w-[40vw]"
// //           style={{ border: "2px solid blue" }}
// //           data-aos="zoom-out"
// //         >
// //           <label htmlFor="bus-select" className="sr-only">Select Bus</label>
// //           <select
// //             id="bus-select"
// //             onChange={(e) =>
// //               setSelectedBus(buses.find((b) => b.id === e.target.value) || null)
// //             }
// //             className="p-2 rounded mb-4 w-full text-black dark:text-white dark:bg-gray-800"
// //             style={{ border: "2px solid red" }}
// //             value={selectedBus?.id || ""}
// //             aria-label="Select a bus"
// //           >
// //             <option value="">Select Your Bus</option>
// //             {buses.map((bus) => (
// //               <option key={bus.id} value={bus.id}>
// //                 {bus.id} - {bus.route}
// //               </option>
// //             ))}
// //           </select>

// //           <div className="h-80 w-full" role="region" aria-label="Map showing bus routes">
// //             {userLocation ? (
// //               <MapContainer
// //                 center={[userLocation.lat, userLocation.lng]}
// //                 zoom={12}
// //                 style={{ height: "100%", width: "100%" }}
// //                 key={`${userLocation.lat}-${userLocation.lng}`}
// //               >
// //                 <TileLayer
// //                   url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
// //                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// //                 />
// //                 <Marker position={userLocation} icon={userIcon}>
// //                   <Popup role="tooltip">You are here 📍</Popup>
// //                 </Marker>
// //                 {selectedBus && (
// //                   <Marker position={[selectedBus.lat, selectedBus.lng]} icon={busIcon}>
// //                     <Popup role="tooltip">
// //                       {selectedBus.id} - {selectedBus.route}
// //                     </Popup>
// //                   </Marker>
// //                 )}
// //                 <ErrorBoundary>
// //                   {route && showRoute && <Routing start={route.from} end={route.to} />}
// //                   {selectedBus && showRoute && !route && (
// //                     <Routing start={userLocation} end={selectedBus} />
// //                   )}
// //                 </ErrorBoundary>
// //               </MapContainer>
// //             ) : (
// //               <p className="text-center text-gray-500">Fetching your location...</p>
// //             )}
// //           </div>

// //           {(selectedBus || route) && (
// //             <button
// //               type="button"
// //               onClick={handleShowRoute}
// //               className="mt-4 bg-yellow-600 text-center text-white text-sm md:text-base px-3 md:px-4 py-2 rounded-lg"
// //               aria-label="Show route and distance"
// //             >
// //               Show Route & Distance
// //             </button>
// //           )}
// //         </div>

// //         {/* Route Info Section */}
// //         <div
// //           className="flex-1 p-6 rounded-xl border border-gray-700 w-10/12 md:w-[40vw]"
// //           style={{ border: "2px solid blue" }}
// //           data-aos="zoom-out"
// //         >
// //           <h3 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
// //             Route Information
// //           </h3>
// //           {selectedBus || route ? (
// //             <>
// //               {selectedBus && (
// //                 <>
// //                   <p><span className="font-semibold">Bus ID:</span> {selectedBus.id}</p>
// //                   <p><span className="font-semibold">Route:</span> {selectedBus.route}</p>
// //                   <p>
// //                     <span className="font-semibold">Coordinates:</span>{" "}
// //                     {selectedBus.lat.toFixed(4)}, {selectedBus.lng.toFixed(4)}
// //                   </p>
// //                   {distanceToBus && (
// //                     <p className="text-green-400 font-semibold">
// //                       Distance to Bus: {distanceToBus} km
// //                     </p>
// //                   )}
// //                 </>
// //               )}
// //               {route && (
// //                 <>
// //                   <p><span className="font-semibold">Journey:</span> {route.from.name} to {route.to.name}</p>
// //                   {journeyDistance && (
// //                     <p className="text-green-400 font-semibold">
// //                       Distance: {journeyDistance} km
// //                     </p>
// //                   )}
// //                 </>
// //               )}
// //             </>
// //           ) : (
// //             <p className="text-gray-400 text-center">
// //               Select a bus or plan a journey to see details.
// //             </p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// // import React, { useState, useEffect, useCallback, useMemo } from "react";
// // import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// // import "leaflet/dist/leaflet.css";
// // import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// // import L from "leaflet";
// // import "leaflet-routing-machine";
// // import { getDistance } from "geolib";
// // import busStops from "./busStops.json"; // ✅ json file import

// // // Error Boundary
// // class ErrorBoundary extends React.PureComponent {
// //   state = { hasError: false, error: null };

// //   static getDerivedStateFromError(error) {
// //     return { hasError: true, error };
// //   }

// //   render() {
// //     if (this.state.hasError) {
// //       return (
// //         <p className="text-red-500 text-center" role="alert">
// //           Error loading route: {this.state.error?.message || "Unknown error"}. Please try again.
// //         </p>
// //       );
// //     }
// //     return this.props.children;
// //   }
// // }

// // // User Icon
// // const userIcon = new L.Icon({
// //   iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
// //   iconSize: [30, 30],
// //   iconAnchor: [15, 30],
// //   popupAnchor: [0, -30],
// // });

// // // Bus Stop Icon
// // const busIcon = new L.Icon({
// //   iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61205.png",
// //   iconSize: [30, 30],
// //   iconAnchor: [15, 30],
// //   popupAnchor: [0, -30],
// // });

// // // Routing Component
// // const Routing = React.memo(function Routing({ start, end }) {
// //   const map = useMap();

// //   useEffect(() => {
// //     if (!map || !start || !end || !start.lat || !start.lng || !end.lat || !end.lng) {
// //       return;
// //     }

// //     if (typeof L.Routing === "undefined") {
// //       console.error("leaflet-routing-machine failed to load.");
// //       return;
// //     }

// //     const routingControl = L.Routing.control({
// //       waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
// //       router: L.Routing.osrmv1({
// //         serviceUrl: "https://router.project-osrm.org/route/v1",
// //       }),
// //       lineOptions: { styles: [{ color: "blue", weight: 5 }] },
// //       addWaypoints: false,
// //       draggableWaypoints: false,
// //       fitSelectedRoutes: true,
// //       show: false,
// //     })
// //       .on("routingerror", (err) => {
// //         console.error("Routing error:", err);
// //       })
// //       .addTo(map);

// //     return () => {
// //       try {
// //         map.removeControl(routingControl);
// //       } catch (err) {
// //         console.error("Error cleaning routing control:", err);
// //       }
// //     };
// //   }, [map, start, end]);

// //   return null;
// // });

// // export default function Track() {
// //   const [userLocation, setUserLocation] = useState(null);
// //   const [selectedStop, setSelectedStop] = useState(null);
// //   const [showRoute, setShowRoute] = useState(false);
// //   const [error, setError] = useState(null);

// //   // Get user location
// //   useEffect(() => {
// //     navigator.geolocation.getCurrentPosition(
// //       (pos) => {
// //         const location = { lat: pos.coords.latitude, lng: pos.coords.longitude };
// //         setUserLocation(location);
// //       },
// //       (err) => {
// //         console.error("Geolocation error:", err.message);
// //         setError("Unable to fetch location. Using default location.");
// //         setUserLocation({ lat: 28.7041, lng: 77.1025 });
// //       },
// //       { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
// //     );
// //   }, []);

// //   // Distance calculation
// //   const distanceToStop = useMemo(() => {
// //     if (!userLocation || !selectedStop) return null;
// //     return (getDistance(userLocation, { lat: selectedStop.latitude, lng: selectedStop.longitude }) / 1000).toFixed(2);
// //   }, [userLocation, selectedStop]);

// //   return (
// //     <div id="track" className="min-h-screen px-6 pt-20">
// //       <h2 className="text-4xl font-bold text-center mb-20 mt-10 text-gray-900 dark:text-white">
// //         Track Your Bus Stop 🚌
// //       </h2>
// //       <p className="text-2xl font-semibold text-center mb-20">
// //         Select your bus stop to view and track location on the map.
// //       </p>
// //       {error && <p className="text-red-500 text-center mb-4">{error}</p>}

// //       <div className="flex flex-col items-center gap-7 mt-20 md:flex-row justify-around">
// //         {/* Map Section */}
// //         <div
// //           className="flex flex-col items-center bg-gray-100 dark:bg-gray-950 p-6 rounded-lg w-10/12 md:w-[40vw]"
// //           style={{ border: "2px solid blue" }}
// //         >
// //           <select
// //             id="bus-select"
// //             onChange={(e) =>
// //               setSelectedStop(busStops.find((stop) => stop.bus_stop === e.target.value) || null)
// //             }
// //             className="p-2 rounded mb-4 w-full text-black dark:text-white dark:bg-gray-800"
// //             value={selectedStop?.bus_stop || ""}
// //           >
// //             <option value="">Select Your Bus Stop</option>
// //             {busStops.map((stop, index) => (
// //               <option key={index} value={stop.bus_stop}>
// //                 {stop.bus_stop}
// //               </option>
// //             ))}
// //           </select>

// //           <div className="h-80 w-full">
// //             {userLocation ? (
// //               <MapContainer
// //                 center={[userLocation.lat, userLocation.lng]}
// //                 zoom={12}
// //                 style={{ height: "100%", width: "100%" }}
// //               >
// //                 <TileLayer
// //                   url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
// //                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// //                 />
// //                 <Marker position={userLocation} icon={userIcon}>
// //                   <Popup>You are here 📍</Popup>
// //                 </Marker>
// //                 {selectedStop && (
// //                   <Marker
// //                     position={[selectedStop.latitude, selectedStop.longitude]}
// //                     icon={busIcon}
// //                   >
// //                     <Popup>{selectedStop.bus_stop}</Popup>
// //                   </Marker>
// //                 )}
// //                 <ErrorBoundary>
// //                   {selectedStop && showRoute && (
// //                     <Routing
// //                       start={userLocation}
// //                       end={{ lat: selectedStop.latitude, lng: selectedStop.longitude }}
// //                     />
// //                   )}
// //                 </ErrorBoundary>
// //               </MapContainer>
// //             ) : (
// //               <p className="text-center text-gray-500">Fetching your location...</p>
// //             )}
// //           </div>

// //           {selectedStop && (
// //             <button
// //               type="button"
// //               onClick={() => setShowRoute(true)}
// //               className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg"
// //             >
// //               Show Route & Distance
// //             </button>
// //           )}
// //         </div>

// //         {/* Info Section */}
// //         <div
// //           className="flex-1 p-6 rounded-xl border border-gray-700 w-10/12 md:w-[40vw]"
// //           style={{ border: "2px solid blue" }}
// //         >
// //           <h3 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
// //             Bus Stop Information
// //           </h3>
// //           {selectedStop ? (
// //             <>
// //               <p><span className="font-semibold">Stop Name:</span> {selectedStop.bus_stop}</p>
// //               <p>
// //                 <span className="font-semibold">Coordinates:</span>{" "}
// //                 {selectedStop.latitude.toFixed(4)}, {selectedStop.longitude.toFixed(4)}
// //               </p>
// //               {distanceToStop && (
// //                 <p className="text-green-400 font-semibold">
// //                   Distance from you: {distanceToStop} km
// //                 </p>
// //               )}
// //             </>
// //           ) : (
// //             <p className="text-gray-400 text-center">Select a bus stop to see details.</p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }






// // import React, { useState, useEffect, useMemo } from "react";
// // import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// // import "leaflet/dist/leaflet.css";
// // import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// // import L from "leaflet";
// // import "leaflet-routing-machine";
// // import { getDistance } from "geolib";
// // import busStops from "./busStops.json"; // ✅ json file import

// // // ✅ Sample Bus List
// // const busList = [
// //   { bus_no: "UP 25 AX 2027", latitude: 28.7100, longitude: 77.1200 },
// //   { bus_no: "UP 32 BX 1456", latitude: 28.7055, longitude: 77.1105 },
// //   { bus_no: "UP 14 CX 9987", latitude: 28.7155, longitude: 77.1255 },
// // ];

// // // Error Boundary
// // class ErrorBoundary extends React.PureComponent {
// //   state = { hasError: false, error: null };

// //   static getDerivedStateFromError(error) {
// //     return { hasError: true, error };
// //   }

// //   render() {
// //     if (this.state.hasError) {
// //       return (
// //         <p className="text-red-500 text-center" role="alert">
// //           Error loading route: {this.state.error?.message || "Unknown error"}.
// //         </p>
// //       );
// //     }
// //     return this.props.children;
// //   }
// // }

// // // User Icon
// // const userIcon = new L.Icon({
// //   iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
// //   iconSize: [30, 30],
// //   iconAnchor: [15, 30],
// //   popupAnchor: [0, -30],
// // });

// // // Bus Stop Icon
// // const busStopIcon = new L.Icon({
// //   iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61205.png",
// //   iconSize: [30, 30],
// //   iconAnchor: [15, 30],
// //   popupAnchor: [0, -30],
// // });

// // // Bus Icon
// // const busIcon = new L.Icon({
// //   iconUrl: "https://cdn-icons-png.flaticon.com/512/862/862856.png",
// //   iconSize: [35, 35],
// //   iconAnchor: [17, 35],
// //   popupAnchor: [0, -30],
// // });

// // // Routing Component
// // const Routing = React.memo(function Routing({ start, end }) {
// //   const map = useMap();

// //   useEffect(() => {
// //     if (!map || !start || !end || !start.lat || !start.lng || !end.lat || !end.lng) {
// //       return;
// //     }

// //     if (typeof L.Routing === "undefined") {
// //       console.error("leaflet-routing-machine failed to load.");
// //       return;
// //     }

// //     const routingControl = L.Routing.control({
// //       waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
// //       router: L.Routing.osrmv1({
// //         serviceUrl: "https://router.project-osrm.org/route/v1",
// //       }),
// //       lineOptions: { styles: [{ color: "blue", weight: 5 }] },
// //       addWaypoints: false,
// //       draggableWaypoints: false,
// //       fitSelectedRoutes: true,
// //       show: false,
// //     })
// //       .on("routingerror", (err) => {
// //         console.error("Routing error:", err);
// //       })
// //       .addTo(map);

// //     return () => {
// //       try {
// //         map.removeControl(routingControl);
// //       } catch (err) {
// //         console.error("Error cleaning routing control:", err);
// //       }
// //     };
// //   }, [map, start, end]);

// //   return null;
// // });

// // export default function Track() {
// //   const [userLocation, setUserLocation] = useState(null);
// //   const [selectedStop, setSelectedStop] = useState(null);
// //   const [selectedBus, setSelectedBus] = useState(null);
// //   const [showRoute, setShowRoute] = useState(false);
// //   const [error, setError] = useState(null);

// //   // Get user location
// //   useEffect(() => {
// //     navigator.geolocation.getCurrentPosition(
// //       (pos) => {
// //         const location = { lat: pos.coords.latitude, lng: pos.coords.longitude };
// //         setUserLocation(location);
// //       },
// //       (err) => {
// //         console.error("Geolocation error:", err.message);
// //         setError("Unable to fetch location. Using default location.");
// //         setUserLocation({ lat: 28.7041, lng: 77.1025 });
// //       },
// //       { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
// //     );
// //   }, []);

// //   // Distance calculation (Stop)
// //   const distanceToStop = useMemo(() => {
// //     if (!userLocation || !selectedStop) return null;
// //     return (getDistance(userLocation, { lat: selectedStop.latitude, lng: selectedStop.longitude }) / 1000).toFixed(2);
// //   }, [userLocation, selectedStop]);

// //   // Distance calculation (Bus)
// //   const distanceToBus = useMemo(() => {
// //     if (!userLocation || !selectedBus) return null;
// //     return (getDistance(userLocation, { lat: selectedBus.latitude, lng: selectedBus.longitude }) / 1000).toFixed(2);
// //   }, [userLocation, selectedBus]);

// //   return (
// //     <div id="track" className="min-h-screen px-6 pt-20">
// //       <h2 className="text-4xl font-bold text-center mb-20 mt-10 text-gray-900 dark:text-white">
// //         Track Your Bus 🚌
// //       </h2>
// //       <p className="text-2xl font-semibold text-center mb-20">
// //         Select your bus stop and bus to view location on the map.
// //       </p>
// //       {error && <p className="text-red-500 text-center mb-4">{error}</p>}

// //       <div className="flex flex-col items-center gap-7 mt-20 md:flex-row justify-around">
// //         {/* Map Section */}
// //         <div
// //           className="flex flex-col items-center bg-gray-100 dark:bg-gray-950 p-6 rounded-lg w-10/12 md:w-[40vw]"
// //           style={{ border: "2px solid blue" }}
// //         >
// //           {/* Stop Select */}
// //           <select
// //             id="bus-stop-select"
// //             onChange={(e) =>
// //               setSelectedStop(busStops.find((stop) => stop.bus_stop === e.target.value) || null)
// //             }
// //             className="p-2 rounded mb-4 w-full text-black dark:text-white dark:bg-gray-800"
// //             value={selectedStop?.bus_stop || ""}
// //           >
// //             <option value="">Select Your Bus Stop</option>
// //             {busStops.map((stop, index) => (
// //               <option key={index} value={stop.bus_stop}>
// //                 {stop.bus_stop}
// //               </option>
// //             ))}
// //           </select>

// //           {/* Bus Select */}
// //           <select
// //             id="bus-select"
// //             onChange={(e) =>
// //               setSelectedBus(busList.find((bus) => bus.bus_no === e.target.value) || null)
// //             }
// //             className="p-2 rounded mb-4 w-full text-black dark:text-white dark:bg-gray-800"
// //             value={selectedBus?.bus_no || ""}
// //           >
// //             <option value="">Select Bus</option>
// //             {busList.map((bus, index) => (
// //               <option key={index} value={bus.bus_no}>
// //                 {bus.bus_no}
// //               </option>
// //             ))}
// //           </select>

// //           <div className="h-80 w-full">
// //             {userLocation ? (
// //               <MapContainer
// //                 center={[userLocation.lat, userLocation.lng]}
// //                 zoom={12}
// //                 style={{ height: "100%", width: "100%" }}
// //               >
// //                 <TileLayer
// //                   url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
// //                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// //                 />
// //                 {/* User Marker */}
// //                 <Marker position={userLocation} icon={userIcon}>
// //                   <Popup>You are here 📍</Popup>
// //                 </Marker>
// //                 {/* Stop Marker */}
// //                 {selectedStop && (
// //                   <Marker
// //                     position={[selectedStop.latitude, selectedStop.longitude]}
// //                     icon={busStopIcon}
// //                   >
// //                     <Popup>{selectedStop.bus_stop}</Popup>
// //                   </Marker>
// //                 )}
// //                 {/* Bus Marker */}
// //                 {selectedBus && (
// //                   <Marker
// //                     position={[selectedBus.latitude, selectedBus.longitude]}
// //                     icon={busIcon}
// //                   >
// //                     <Popup>{selectedBus.bus_no}</Popup>
// //                   </Marker>
// //                 )}
// //                 {/* Routing */}
// //                 <ErrorBoundary>
// //                   {selectedBus && showRoute && (
// //                     <Routing
// //                       start={userLocation}
// //                       end={{ lat: selectedBus.latitude, lng: selectedBus.longitude }}
// //                     />
// //                   )}
// //                 </ErrorBoundary>
// //               </MapContainer>
// //             ) : (
// //               <p className="text-center text-gray-500">Fetching your location...</p>
// //             )}
// //           </div>

// //           {selectedBus && (
// //             <button
// //               type="button"
// //               onClick={() => setShowRoute(true)}
// //               className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg"
// //             >
// //               Show Route & Distance
// //             </button>
// //           )}
// //         </div>

// //         {/* Info Section */}
// //         <div
// //           className="flex-1 p-6 rounded-xl border border-gray-700 w-10/12 md:w-[40vw]"
// //           style={{ border: "2px solid blue" }}
// //         >
// //           <h3 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
// //             Information
// //           </h3>
// //           {selectedStop && (
// //             <>
// //               <p><span className="font-semibold">Stop Name:</span> {selectedStop.bus_stop}</p>
// //               <p>
// //                 <span className="font-semibold">Stop Coordinates:</span>{" "}
// //                 {selectedStop.latitude.toFixed(4)}, {selectedStop.longitude.toFixed(4)}
// //               </p>
// //               {distanceToStop && (
// //                 <p className="text-green-400 font-semibold">
// //                   Distance (Stop): {distanceToStop} km
// //                 </p>
// //               )}
// //               <hr className="my-3" />
// //             </>
// //           )}
// //           {selectedBus ? (
// //             <>
// //               <p><span className="font-semibold">Bus No:</span> {selectedBus.bus_no}</p>
// //               <p>
// //                 <span className="font-semibold">Bus Coordinates:</span>{" "}
// //                 {selectedBus.latitude.toFixed(4)}, {selectedBus.longitude.toFixed(4)}
// //               </p>
// //               {distanceToBus && (
// //                 <p className="text-green-400 font-semibold">
// //                   Distance (Bus): {distanceToBus} km
// //                 </p>
// //               )}
// //             </>
// //           ) : (
// //             <p className="text-gray-400 text-center">Select a bus to see details.</p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// // import React, { useState, useEffect, useMemo } from "react";
// // import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// // import "leaflet/dist/leaflet.css";
// // import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// // import L from "leaflet";
// // import "leaflet-routing-machine";
// // import { getDistance } from "geolib";
// // import axios from "axios"; // IoT API fetch ke liye
// // import busStops from "./busStops.json"; // ✅ json file import

// // // ✅ IoT API (apna ThingsBoard ya custom endpoint yaha daalna)
// // const IOT_API_URL = "https://example.com/api/buses";

// // // ✅ Sample Bus List (fallback data)
// // const busList = [
// //   { bus_no: "UP 25 AX 2027", latitude: 28.7100, longitude: 77.1200 },
// //   { bus_no: "UP 32 BX 1456", latitude: 28.7055, longitude: 77.1105 },
// //   { bus_no: "UP 14 CX 9987", latitude: 28.7155, longitude: 77.1255 },
// // ];

// // // Error Boundary
// // class ErrorBoundary extends React.PureComponent {
// //   state = { hasError: false, error: null };

// //   static getDerivedStateFromError(error) {
// //     return { hasError: true, error };
// //   }

// //   render() {
// //     if (this.state.hasError) {
// //       return (
// //         <p className="text-red-500 text-center" role="alert">
// //           Error loading route: {this.state.error?.message || "Unknown error"}.
// //         </p>
// //       );
// //     }
// //     return this.props.children;
// //   }
// // }

// // // User Icon
// // const userIcon = new L.Icon({
// //   iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
// //   iconSize: [30, 30],
// //   iconAnchor: [15, 30],
// //   popupAnchor: [0, -30],
// // });

// // // Bus Stop Icon
// // const busStopIcon = new L.Icon({
// //   iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61205.png",
// //   iconSize: [30, 30],
// //   iconAnchor: [15, 30],
// //   popupAnchor: [0, -30],
// // });

// // // Bus Icon
// // const busIcon = new L.Icon({
// //   iconUrl: "https://cdn-icons-png.flaticon.com/512/862/862856.png",
// //   iconSize: [35, 35],
// //   iconAnchor: [17, 35],
// //   popupAnchor: [0, -30],
// // });

// // // Routing Component
// // const Routing = React.memo(function Routing({ start, end }) {
// //   const map = useMap();

// //   useEffect(() => {
// //     if (!map || !start || !end || !start.lat || !start.lng || !end.lat || !end.lng) {
// //       return;
// //     }

// //     if (typeof L.Routing === "undefined") {
// //       console.error("leaflet-routing-machine failed to load.");
// //       return;
// //     }

// //     const routingControl = L.Routing.control({
// //       waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
// //       router: L.Routing.osrmv1({
// //         serviceUrl: "https://router.project-osrm.org/route/v1",
// //       }),
// //       lineOptions: { styles: [{ color: "blue", weight: 5 }] },
// //       addWaypoints: false,
// //       draggableWaypoints: false,
// //       fitSelectedRoutes: true,
// //       show: false,
// //     })
// //       .on("routingerror", (err) => {
// //         console.error("Routing error:", err);
// //       })
// //       .addTo(map);

// //     return () => {
// //       try {
// //         map.removeControl(routingControl);
// //       } catch (err) {
// //         console.error("Error cleaning routing control:", err);
// //       }
// //     };
// //   }, [map, start, end]);

// //   return null;
// // });

// // export default function Track() {
// //   const [userLocation, setUserLocation] = useState(null);
// //   const [selectedStop, setSelectedStop] = useState(null);
// //   const [selectedBus, setSelectedBus] = useState(null);
// //   const [showRoute, setShowRoute] = useState(false);
// //   const [error, setError] = useState(null);

// //   // ✅ IoT Bus Data (dynamic)
// //   const [iotBusList, setIotBusList] = useState(busList); // pehle static data se start

// //   // Get user location
// //   useEffect(() => {
// //     navigator.geolocation.getCurrentPosition(
// //       (pos) => {
// //         const location = { lat: pos.coords.latitude, lng: pos.coords.longitude };
// //         setUserLocation(location);
// //       },
// //       (err) => {
// //         console.error("Geolocation error:", err.message);
// //         setError("Unable to fetch location. Using default location.");
// //         setUserLocation({ lat: 28.7041, lng: 77.1025 });
// //       },
// //       { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
// //     );
// //   }, []);

// //   // 🔹 IoT API se har 5 sec me bus data fetch
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const res = await axios.get(IOT_API_URL);
// //         if (res.data && Array.isArray(res.data)) {
// //           setIotBusList(res.data);
// //         }
// //       } catch (err) {
// //         console.error("IoT API fetch error:", err.message);
// //       }
// //     };

// //     fetchData(); // pehli baar call
// //     const interval = setInterval(fetchData, 5000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   // Distance calculation (Stop)
// //   const distanceToStop = useMemo(() => {
// //     if (!userLocation || !selectedStop) return null;
// //     return (
// //       getDistance(userLocation, { lat: selectedStop.latitude, lng: selectedStop.longitude }) /
// //       1000
// //     ).toFixed(2);
// //   }, [userLocation, selectedStop]);

// //   // Distance calculation (Bus)
// //   const distanceToBus = useMemo(() => {
// //     if (!userLocation || !selectedBus) return null;
// //     return (
// //       getDistance(userLocation, { lat: selectedBus.latitude, lng: selectedBus.longitude }) /
// //       1000
// //     ).toFixed(2);
// //   }, [userLocation, selectedBus]);

// //   return (
// //     <div id="track" className="min-h-screen px-6 pt-20">
// //       <h2 className="text-4xl font-bold text-center mb-20 mt-10 text-gray-900 dark:text-white">
// //         Track Your Bus 🚌
// //       </h2>
// //       <p className="text-2xl font-semibold text-center mb-20">
// //         Select your bus stop and bus to view location on the map.
// //       </p>
// //       {error && <p className="text-red-500 text-center mb-4">{error}</p>}

// //       <div className="flex flex-col items-center gap-7 mt-20 md:flex-row justify-around">
// //         {/* Map Section */}
// //         <div
// //           className="flex flex-col items-center bg-gray-100 dark:bg-gray-950 p-6 rounded-lg w-10/12 md:w-[40vw]"
// //           style={{ border: "2px solid blue" }}
// //         >
// //           {/* Stop Select */}
// //           <select
// //             id="bus-stop-select"
// //             onChange={(e) =>
// //               setSelectedStop(busStops.find((stop) => stop.bus_stop === e.target.value) || null)
// //             }
// //             className="p-2 rounded mb-4 w-full text-black dark:text-white dark:bg-gray-800"
// //             value={selectedStop?.bus_stop || ""}
// //           >
// //             <option value="">Select Your Bus Stop</option>
// //             {busStops.map((stop, index) => (
// //               <option key={index} value={stop.bus_stop}>
// //                 {stop.bus_stop}
// //               </option>
// //             ))}
// //           </select>

// //           {/* Bus Select (IoT list se) */}
// //           <select
// //             id="bus-select"
// //             onChange={(e) =>
// //               setSelectedBus(iotBusList.find((bus) => bus.bus_no === e.target.value) || null)
// //             }
// //             className="p-2 rounded mb-4 w-full text-black dark:text-white dark:bg-gray-800"
// //             value={selectedBus?.bus_no || ""}
// //           >
// //             <option value="">Select Bus</option>
// //             {iotBusList.map((bus, index) => (
// //               <option key={index} value={bus.bus_no}>
// //                 {bus.bus_no}
// //               </option>
// //             ))}
// //           </select>

// //           <div className="h-80 w-full">
// //             {userLocation ? (
// //               <MapContainer
// //                 center={[userLocation.lat, userLocation.lng]}
// //                 zoom={12}
// //                 style={{ height: "100%", width: "100%" }}
// //               >
// //                 <TileLayer
// //                   url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
// //                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// //                 />
// //                 {/* User Marker */}
// //                 <Marker position={userLocation} icon={userIcon}>
// //                   <Popup>You are here 📍</Popup>
// //                 </Marker>
// //                 {/* Stop Marker */}
// //                 {selectedStop && (
// //                   <Marker
// //                     position={[selectedStop.latitude, selectedStop.longitude]}
// //                     icon={busStopIcon}
// //                   >
// //                     <Popup>{selectedStop.bus_stop}</Popup>
// //                   </Marker>
// //                 )}
// //                 {/* Bus Marker */}
// //                 {selectedBus && (
// //                   <Marker
// //                     position={[selectedBus.latitude, selectedBus.longitude]}
// //                     icon={busIcon}
// //                   >
// //                     <Popup>{selectedBus.bus_no}</Popup>
// //                   </Marker>
// //                 )}
// //                 {/* Routing */}
// //                 <ErrorBoundary>
// //                   {selectedBus && showRoute && (
// //                     <Routing
// //                       start={userLocation}
// //                       end={{ lat: selectedBus.latitude, lng: selectedBus.longitude }}
// //                     />
// //                   )}
// //                 </ErrorBoundary>
// //               </MapContainer>
// //             ) : (
// //               <p className="text-center text-gray-500">Fetching your location...</p>
// //             )}
// //           </div>

// //           {selectedBus && (
// //             <button
// //               type="button"
// //               onClick={() => setShowRoute(true)}
// //               className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg"
// //             >
// //               Show Route & Distance
// //             </button>
// //           )}
// //         </div>

// //         {/* Info Section */}
// //         <div
// //           className="flex-1 p-6 rounded-xl border border-gray-700 w-10/12 md:w-[40vw]"
// //           style={{ border: "2px solid blue" }}
// //         >
// //           <h3 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
// //             Information
// //           </h3>
// //           {selectedStop && (
// //             <>
// //               <p><span className="font-semibold">Stop Name:</span> {selectedStop.bus_stop}</p>
// //               <p>
// //                 <span className="font-semibold">Stop Coordinates:</span>{" "}
// //                 {selectedStop.latitude.toFixed(4)}, {selectedStop.longitude.toFixed(4)}
// //               </p>
// //               {distanceToStop && (
// //                 <p className="text-green-400 font-semibold">
// //                   Distance (Stop): {distanceToStop} km
// //                 </p>
// //               )}
// //               <hr className="my-3" />
// //             </>
// //           )}
// //           {selectedBus ? (
// //             <>
// //               <p><span className="font-semibold">Bus No:</span> {selectedBus.bus_no}</p>
// //               <p>
// //                 <span className="font-semibold">Bus Coordinates:</span>{" "}
// //                 {selectedBus.latitude.toFixed(4)}, {selectedBus.longitude.toFixed(4)}
// //               </p>
// //               {distanceToBus && (
// //                 <p className="text-green-400 font-semibold">
// //                   Distance (Bus): {distanceToBus} km
// //                 </p>
// //               )}
// //             </>
// //           ) : (
// //             <p className="text-gray-400 text-center">Select a bus to see details.</p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }






// // import React, { useState, useEffect, useMemo } from "react";
// // import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// // import "leaflet/dist/leaflet.css";
// // import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// // import L from "leaflet";
// // import "leaflet-routing-machine";
// // import { getDistance } from "geolib";
// // import busStops from "./busStops.json";

// // // ✅ ESP32 WebSocket Server URL (apna ESP32 ka IP yaha daalo)
// // const WS_URL = "ws://192.168.1.50:81"; // <-- yaha apna ESP32 ka IP dalna

// // // Error Boundary
// // class ErrorBoundary extends React.PureComponent {
// //   state = { hasError: false, error: null };

// //   static getDerivedStateFromError(error) {
// //     return { hasError: true, error };
// //   }

// //   render() {
// //     if (this.state.hasError) {
// //       return (
// //         <p className="text-red-500 text-center" role="alert">
// //           Error loading route: {this.state.error?.message || "Unknown error"}.
// //         </p>
// //       );
// //     }
// //     return this.props.children;
// //   }
// // }

// // // Icons
// // const userIcon = new L.Icon({
// //   iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
// //   iconSize: [30, 30],
// //   iconAnchor: [15, 30],
// //   popupAnchor: [0, -30],
// // });

// // const busStopIcon = new L.Icon({
// //   iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61205.png",
// //   iconSize: [30, 30],
// //   iconAnchor: [15, 30],
// //   popupAnchor: [0, -30],
// // });

// // const busIcon = new L.Icon({
// //   iconUrl: "https://cdn-icons-png.flaticon.com/512/862/862856.png",
// //   iconSize: [35, 35],
// //   iconAnchor: [17, 35],
// //   popupAnchor: [0, -30],
// // });

// // // Routing Component
// // const Routing = React.memo(function Routing({ start, end }) {
// //   const map = useMap();

// //   useEffect(() => {
// //     if (!map || !start || !end) return;

// //     if (typeof L.Routing === "undefined") {
// //       console.error("leaflet-routing-machine failed to load.");
// //       return;
// //     }

// //     const routingControl = L.Routing.control({
// //       waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
// //       router: L.Routing.osrmv1({
// //         serviceUrl: "https://router.project-osrm.org/route/v1",
// //       }),
// //       lineOptions: { styles: [{ color: "blue", weight: 5 }] },
// //       addWaypoints: false,
// //       draggableWaypoints: false,
// //       fitSelectedRoutes: true,
// //       show: false,
// //     })
// //       .on("routingerror", (err) => {
// //         console.error("Routing error:", err);
// //       })
// //       .addTo(map);

// //     return () => {
// //       try {
// //         map.removeControl(routingControl);
// //       } catch (err) {
// //         console.error("Error cleaning routing control:", err);
// //       }
// //     };
// //   }, [map, start, end]);

// //   return null;
// // });

// // export default function Track() {
// //   const [userLocation, setUserLocation] = useState(null);
// //   const [selectedStop, setSelectedStop] = useState(null);
// //   const [selectedBus, setSelectedBus] = useState(null);
// //   const [showRoute, setShowRoute] = useState(false);
// //   const [error, setError] = useState(null);

// //   // ✅ IoT Bus Data (WebSocket se live update)
// //   const [iotBusList, setIotBusList] = useState([]);

// //   // Get user location
// //   useEffect(() => {
// //     navigator.geolocation.getCurrentPosition(
// //       (pos) => {
// //         setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
// //       },
// //       (err) => {
// //         console.error("Geolocation error:", err.message);
// //         setError("Unable to fetch location. Using default location.");
// //         setUserLocation({ lat: 28.7041, lng: 77.1025 });
// //       },
// //       { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
// //     );
// //   }, []);

// //   // 🔹 WebSocket Connect
// //   useEffect(() => {
// //     const ws = new WebSocket(WS_URL);

// //     ws.onopen = () => {
// //       console.log("✅ Connected to WebSocket");
// //     };

// //     ws.onmessage = (event) => {
// //       try {
// //         const data = JSON.parse(event.data);
// //         console.log("📡 Data received:", data);

// //         // Agar same bus ka data already list me hai to update karo
// //         setIotBusList((prev) => {
// //           const existing = prev.filter((bus) => bus.bus_no !== data.busName);
// //           return [
// //             ...existing,
// //             {
// //               bus_no: data.busName,
// //               latitude: data.latitude,
// //               longitude: data.longitude,
// //               seatStatus: data.seatStatus,
// //             },
// //           ];
// //         });
// //       } catch (err) {
// //         console.error("Invalid WebSocket data:", event.data);
// //       }
// //     };

// //     ws.onerror = (err) => {
// //       console.error("WebSocket error:", err);
// //     };

// //     ws.onclose = () => {
// //       console.warn("❌ WebSocket closed, retrying in 5s...");
// //       setTimeout(() => window.location.reload(), 5000);
// //     };

// //     return () => ws.close();
// //   }, []);

// //   // Distance calculation (Stop)
// //   const distanceToStop = useMemo(() => {
// //     if (!userLocation || !selectedStop) return null;
// //     return (
// //       getDistance(userLocation, { lat: selectedStop.latitude, lng: selectedStop.longitude }) /
// //       1000
// //     ).toFixed(2);
// //   }, [userLocation, selectedStop]);

// //   // Distance calculation (Bus)
// //   const distanceToBus = useMemo(() => {
// //     if (!userLocation || !selectedBus) return null;
// //     return (
// //       getDistance(userLocation, { lat: selectedBus.latitude, lng: selectedBus.longitude }) /
// //       1000
// //     ).toFixed(2);
// //   }, [userLocation, selectedBus]);

// //   return (
// //     <div id="track" className="min-h-screen px-6 pt-20">
// //       <h2 className="text-4xl font-bold text-center mb-20 mt-10 text-gray-900 dark:text-white">
// //         Track Your Bus 🚌
// //       </h2>
// //       <p className="text-2xl font-semibold text-center mb-20">
// //         Select your bus stop and bus to view location on the map.
// //       </p>
// //       {error && <p className="text-red-500 text-center mb-4">{error}</p>}

// //       <div className="flex flex-col items-center gap-7 mt-20 md:flex-row justify-around">
// //         {/* Map Section */}
// //         <div
// //           className="flex flex-col items-center bg-gray-100 dark:bg-gray-950 p-6 rounded-lg w-10/12 md:w-[40vw]"
// //           style={{ border: "2px solid blue" }}
// //         >
// //           {/* Stop Select */}
// //           <select
// //             id="bus-stop-select"
// //             onChange={(e) =>
// //               setSelectedStop(busStops.find((stop) => stop.bus_stop === e.target.value) || null)
// //             }
// //             className="p-2 rounded mb-4 w-full text-black dark:text-white dark:bg-gray-800"
// //             value={selectedStop?.bus_stop || ""}
// //           >
// //             <option value="">Select Your Bus Stop</option>
// //             {busStops.map((stop, index) => (
// //               <option key={index} value={stop.bus_stop}>
// //                 {stop.bus_stop}
// //               </option>
// //             ))}
// //           </select>

// //           {/* Bus Select */}
// //           <select
// //             id="bus-select"
// //             onChange={(e) =>
// //               setSelectedBus(iotBusList.find((bus) => bus.bus_no === e.target.value) || null)
// //             }
// //             className="p-2 rounded mb-4 w-full text-black dark:text-white dark:bg-gray-800"
// //             value={selectedBus?.bus_no || ""}
// //           >
// //             <option value="">Select Bus</option>
// //             {iotBusList.map((bus, index) => (
// //               <option key={index} value={bus.bus_no}>
// //                 {bus.bus_no} ({bus.seatStatus})
// //               </option>
// //             ))}
// //           </select>

// //           <div className="h-80 w-full">
// //             {userLocation ? (
// //               <MapContainer
// //                 center={[userLocation.lat, userLocation.lng]}
// //                 zoom={12}
// //                 style={{ height: "100%", width: "100%" }}
// //               >
// //                 <TileLayer
// //                   url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
// //                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// //                 />
// //                 {/* User Marker */}
// //                 <Marker position={userLocation} icon={userIcon}>
// //                   <Popup>You are here 📍</Popup>
// //                 </Marker>
// //                 {/* Stop Marker */}
// //                 {selectedStop && (
// //                   <Marker
// //                     position={[selectedStop.latitude, selectedStop.longitude]}
// //                     icon={busStopIcon}
// //                   >
// //                     <Popup>{selectedStop.bus_stop}</Popup>
// //                   </Marker>
// //                 )}
// //                 {/* Bus Marker */}
// //                 {selectedBus && (
// //                   <Marker
// //                     position={[selectedBus.latitude, selectedBus.longitude]}
// //                     icon={busIcon}
// //                   >
// //                     <Popup>
// //                       {selectedBus.bus_no} <br /> Seat: {selectedBus.seatStatus}
// //                     </Popup>
// //                   </Marker>
// //                 )}
// //                 {/* Routing */}
// //                 <ErrorBoundary>
// //                   {selectedBus && showRoute && (
// //                     <Routing
// //                       start={userLocation}
// //                       end={{ lat: selectedBus.latitude, lng: selectedBus.longitude }}
// //                     />
// //                   )}
// //                 </ErrorBoundary>
// //               </MapContainer>
// //             ) : (
// //               <p className="text-center text-gray-500">Fetching your location...</p>
// //             )}
// //           </div>

// //           {selectedBus && (
// //             <button
// //               type="button"
// //               onClick={() => setShowRoute(true)}
// //               className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg"
// //             >
// //               Show Route & Distance
// //             </button>
// //           )}
// //         </div>

// //         {/* Info Section */}
// //         <div
// //           className="flex-1 p-6 rounded-xl border border-gray-700 w-10/12 md:w-[40vw]"
// //           style={{ border: "2px solid blue" }}
// //         >
// //           <h3 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
// //             Information
// //           </h3>
// //           {selectedStop && (
// //             <>
// //               <p><span className="font-semibold">Stop Name:</span> {selectedStop.bus_stop}</p>
// //               <p>
// //                 <span className="font-semibold">Stop Coordinates:</span>{" "}
// //                 {selectedStop.latitude.toFixed(4)}, {selectedStop.longitude.toFixed(4)}
// //               </p>
// //               {distanceToStop && (
// //                 <p className="text-green-400 font-semibold">
// //                   Distance (Stop): {distanceToStop} km
// //                 </p>
// //               )}
// //               <hr className="my-3" />
// //             </>
// //           )}
// //           {selectedBus ? (
// //             <>
// //               <p><span className="font-semibold">Bus No:</span> {selectedBus.bus_no}</p>
// //               <p>
// //                 <span className="font-semibold">Bus Coordinates:</span>{" "}
// //                 {selectedBus.latitude.toFixed(4)}, {selectedBus.longitude.toFixed(4)}
// //               </p>
// //               {distanceToBus && (
// //                 <p className="text-green-400 font-semibold">
// //                   Distance (Bus): {distanceToBus} km
// //                 </p>
// //               )}
// //               <p><span className="font-semibold">Seat Status:</span> {selectedBus.seatStatus}</p>
// //             </>
// //           ) : (
// //             <p className="text-gray-400 text-center">Select a bus to see details.</p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }




// import React, { useState, useEffect, useMemo, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import L from "leaflet";
// import "leaflet-routing-machine";
// import { getDistance } from "geolib";
// import busStops from "./busStops.json";

// // ✅ ESP32 WebSocket Server URL
// const WS_URL = "ws://192.168.1.50:81"; // apna ESP32 IP yaha daalo

// // Error Boundary
// class ErrorBoundary extends React.PureComponent {
//   state = { hasError: false, error: null };
//   static getDerivedStateFromError(error) {
//     return { hasError: true, error };
//   }
//   render() {
//     if (this.state.hasError) {
//       return (
//         <p className="text-red-500 text-center" role="alert">
//           Error loading route: {this.state.error?.message || "Unknown error"}.
//         </p>
//       );
//     }
//     return this.props.children;
//   }
// }

// // Icons
// const userIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
//   iconSize: [30, 30],
//   iconAnchor: [15, 30],
//   popupAnchor: [0, -30],
// });
// const busStopIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61205.png",
//   iconSize: [30, 30],
//   iconAnchor: [15, 30],
//   popupAnchor: [0, -30],
// });
// const busIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/862/862856.png",
//   iconSize: [35, 35],
//   iconAnchor: [17, 35],
//   popupAnchor: [0, -30],
// });

// // Routing Component
// const Routing = React.memo(function Routing({ start, end }) {
//   const map = useMap();
//   useEffect(() => {
//     if (!map || !start || !end) return;
//     if (typeof L.Routing === "undefined") {
//       console.error("leaflet-routing-machine failed to load.");
//       return;
//     }
//     const routingControl = L.Routing.control({
//       waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
//       router: L.Routing.osrmv1({
//         serviceUrl: "https://router.project-osrm.org/route/v1",
//       }),
//       lineOptions: { styles: [{ color: "blue", weight: 5 }] },
//       addWaypoints: false,
//       draggableWaypoints: false,
//       fitSelectedRoutes: true,
//       show: false,
//     })
//       .on("routingerror", (err) => {
//         console.error("Routing error:", err);
//       })
//       .addTo(map);

//     return () => {
//       try {
//         map.removeControl(routingControl);
//       } catch (err) {
//         console.error("Error cleaning routing control:", err);
//       }
//     };
//   }, [map, start, end]);

//   return null;
// });

// export default function Track() {
//   const [userLocation, setUserLocation] = useState(null);
//   const [selectedStop, setSelectedStop] = useState(null);
//   const [selectedBus, setSelectedBus] = useState(null);
//   const [showRoute, setShowRoute] = useState(false);
//   const [error, setError] = useState(null);

//   // ✅ IoT Bus Data (WebSocket se live update)
//   const [iotBusList, setIotBusList] = useState([]);
//   const wsRef = useRef(null);

//   // Get user location
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
//       },
//       (err) => {
//         console.error("Geolocation error:", err.message);
//         setError("Unable to fetch location. Using default location.");
//         setUserLocation({ lat: 28.7041, lng: 77.1025 });
//       },
//       { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//     );
//   }, []);

//   // 🔹 WebSocket Connect (auto reconnect without reload)
//   useEffect(() => {
//     function connectWS() {
//       const ws = new WebSocket(WS_URL);
//       wsRef.current = ws;

//       ws.onopen = () => {
//         console.log("✅ Connected to WebSocket");
//       };

//       ws.onmessage = (event) => {
//         try {
//           const data = JSON.parse(event.data);
//           console.log("📡 Data received:", data);

//           setIotBusList((prev) => {
//             // check if bus already exists
//             const existing = prev.find((bus) => bus.bus_no === data.busName);
//             if (existing) {
//               return prev.map((bus) =>
//                 bus.bus_no === data.busName
//                   ? {
//                       ...bus,
//                       latitude: data.latitude,
//                       longitude: data.longitude,
//                       seatStatus: data.seatStatus,
//                     }
//                   : bus
//               );
//             } else {
//               return [
//                 ...prev,
//                 {
//                   bus_no: data.busName,
//                   latitude: data.latitude,
//                   longitude: data.longitude,
//                   seatStatus: data.seatStatus,
//                 },
//               ];
//             }
//           });
//         } catch (err) {
//           console.error("Invalid WebSocket data:", event.data);
//         }
//       };

//       ws.onerror = (err) => {
//         console.error("WebSocket error:", err);
//       };

//       ws.onclose = () => {
//         console.warn("❌ WebSocket closed, retrying in 5s...");
//         setTimeout(connectWS, 5000); // retry without reload
//       };
//     }

//     connectWS();
//     return () => wsRef.current?.close();
//   }, []);

//   // Distance calculation (Stop)
//   const distanceToStop = useMemo(() => {
//     if (!userLocation || !selectedStop) return null;
//     return (
//       getDistance(userLocation, { lat: selectedStop.latitude, lng: selectedStop.longitude }) / 1000
//     ).toFixed(2);
//   }, [userLocation, selectedStop]);

//   // Distance calculation (Bus)
//   const distanceToBus = useMemo(() => {
//     if (!userLocation || !selectedBus) return null;
//     return (
//       getDistance(userLocation, { lat: selectedBus.latitude, lng: selectedBus.longitude }) / 1000
//     ).toFixed(2);
//   }, [userLocation, selectedBus]);

//   return (
//     <div id="track" className="min-h-screen px-6 pt-20">
//       <h2 className="text-4xl font-bold text-center mb-20 mt-10 text-gray-900 dark:text-white">
//         Track Your Bus 🚌
//       </h2>
//       <p className="text-2xl font-semibold text-center mb-20">
//         Select your bus stop and bus to view location on the map.
//       </p>
//       {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//       <div className="flex flex-col items-center gap-7 mt-20 md:flex-row justify-around">
//         {/* Map Section */}
//         <div
//           className="flex flex-col items-center bg-gray-100 dark:bg-gray-950 p-6 rounded-lg w-10/12 md:w-[40vw]"
//           style={{ border: "2px solid blue" }}
//         >
//           {/* Stop Select */}
//           <select
//             id="bus-stop-select"
//             onChange={(e) =>
//               setSelectedStop(busStops.find((stop) => stop.bus_stop === e.target.value) || null)
//             }
//             className="p-2 rounded mb-4 w-full text-black dark:text-white dark:bg-gray-800"
//             value={selectedStop?.bus_stop || ""}
//           >
//             <option value="">Select Your Bus Stop</option>
//             {busStops.map((stop, index) => (
//               <option key={index} value={stop.bus_stop}>
//                 {stop.bus_stop}
//               </option>
//             ))}
//           </select>

//           {/* Bus Select */}
//           <select
//             id="bus-select"
//             onChange={(e) =>
//               setSelectedBus(iotBusList.find((bus) => bus.bus_no === e.target.value) || null)
//             }
//             className="p-2 rounded mb-4 w-full text-black dark:text-white dark:bg-gray-800"
//             value={selectedBus?.bus_no || ""}
//           >
//             <option value="">Select Bus</option>
//             {iotBusList.map((bus, index) => (
//               <option key={index} value={bus.bus_no}>
//                 {bus.bus_no} ({bus.seatStatus})
//               </option>
//             ))}
//           </select>

//           <div className="h-80 w-full">
//             {userLocation ? (
//               <MapContainer
//                 center={[userLocation.lat, userLocation.lng]}
//                 zoom={12}
//                 style={{ height: "100%", width: "100%" }}
//               >
//                 <TileLayer
//                   url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
//                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//                 />
//                 {/* User Marker */}
//                 <Marker position={userLocation} icon={userIcon}>
//                   <Popup>You are here 📍</Popup>
//                 </Marker>
//                 {/* Stop Marker */}
//                 {selectedStop && (
//                   <Marker
//                     position={[selectedStop.latitude, selectedStop.longitude]}
//                     icon={busStopIcon}
//                   >
//                     <Popup>{selectedStop.bus_stop}</Popup>
//                   </Marker>
//                 )}
//                 {/* Bus Marker */}
//                 {selectedBus && (
//                   <Marker
//                     position={[selectedBus.latitude, selectedBus.longitude]}
//                     icon={busIcon}
//                   >
//                     <Popup>
//                       {selectedBus.bus_no} <br /> Seat: {selectedBus.seatStatus}
//                     </Popup>
//                   </Marker>
//                 )}
//                 {/* Routing */}
//                 <ErrorBoundary>
//                   {selectedBus && showRoute && (
//                     <Routing
//                       start={userLocation}
//                       end={{ lat: selectedBus.latitude, lng: selectedBus.longitude }}
//                     />
//                   )}
//                 </ErrorBoundary>
//               </MapContainer>
//             ) : (
//               <p className="text-center text-gray-500">Fetching your location...</p>
//             )}
//           </div>

//           {selectedBus && (
//             <button
//               type="button"
//               onClick={() => setShowRoute(true)}
//               className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg"
//             >
//               Show Route & Distance
//             </button>
//           )}
//         </div>

//         {/* Info Section */}
//         <div
//           className="flex-1 p-6 rounded-xl border border-gray-700 w-10/12 md:w-[40vw]"
//           style={{ border: "2px solid blue" }}
//         >
//           <h3 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
//             Information
//           </h3>
//           {selectedStop && (
//             <>
//               <p>
//                 <span className="font-semibold">Stop Name:</span> {selectedStop.bus_stop}
//               </p>
//               <p>
//                 <span className="font-semibold">Stop Coordinates:</span>{" "}
//                 {selectedStop.latitude.toFixed(4)}, {selectedStop.longitude.toFixed(4)}
//               </p>
//               {distanceToStop && (
//                 <p className="text-green-400 font-semibold">
//                   Distance (Stop): {distanceToStop} km
//                 </p>
//               )}
//               <hr className="my-3" />
//             </>
//           )}
//           {selectedBus ? (
//             <>
//               <p>
//                 <span className="font-semibold">Bus No:</span> {selectedBus.bus_no}
//               </p>
//               <p>
//                 <span className="font-semibold">Bus Coordinates:</span>{" "}
//                 {selectedBus.latitude.toFixed(4)}, {selectedBus.longitude.toFixed(4)}
//               </p>
//               {distanceToBus && (
//                 <p className="text-green-400 font-semibold">
//                   Distance (Bus): {distanceToBus} km
//                 </p>
//               )}
//               <p>
//                 <span className="font-semibold">Seat Status:</span> {selectedBus.seatStatus}
//               </p>
//             </>
//           ) : (
//             <p className="text-gray-400 text-center">Select a bus to see details.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




// src/components/Track.jsx
// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import { getDistance } from "geolib";

// const busIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61231.png",
//   iconSize: [40, 40],
// });

// const userIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
//   iconSize: [35, 35],
// });

// export default function Track() {
//   const [userLocation, setUserLocation] = useState(null);
//   const [selectedBus, setSelectedBus] = useState("");
//   const [busData, setBusData] = useState({});
//   const [showPath, setShowPath] = useState(false);
//   const [distance, setDistance] = useState(null);

//   // List of buses
//   const buses = ["UP 23 AB 1243", "UP 25 AX 2027", "UP 32 XY 4455"];

//   // WebSocket connect
//   useEffect(() => {
//     const socket = new WebSocket("ws://10.143.232.209:81/");// apne ESP32 ka IP daalna hoga

//     ws.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         setBusData((prev) => ({
//           ...prev,
//           [data.busName]: data,
//         }));
//       } catch (e) {
//         console.error("Error parsing WS data:", e);
//       }
//     };

//     return () => ws.close();
//   }, []);

//   // User location fetch
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.watchPosition(
//         (pos) => {
//           setUserLocation({
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude,
//           });
//         },
//         (err) => console.error(err),
//         { enableHighAccuracy: true }
//       );
//     }
//   }, []);

//   // Distance calculate
//   useEffect(() => {
//     if (userLocation && selectedBus && busData[selectedBus]) {
//       const d = getDistance(userLocation, {
//         latitude: busData[selectedBus].latitude,
//         longitude: busData[selectedBus].longitude,
//       });
//       setDistance((d / 1000).toFixed(2)); // KM me
//     }
//   }, [userLocation, selectedBus, busData]);

//   return (
//     <div className="w-[90vw] mx-auto mt-10 grid grid-cols-2 gap-6">
//       {/* Left section */}
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
//         <h1 className="text-3xl font-bold text-center mb-2">🚌 Track Your Bus</h1>
//         <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
//           Select your bus stop and bus to view location on the map.
//         </p>

//         {/* Bus selection */}
//         <div className="mb-4">
//           <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-2">
//             Select Bus
//           </label>
//           <select
//             value={selectedBus}
//             onChange={(e) => setSelectedBus(e.target.value)}
//             className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
//           >
//             <option value="">-- Choose Bus --</option>
//             {buses.map((bus) => (
//               <option key={bus} value={bus}>
//                 {bus}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Map */}
//         <MapContainer
//           center={userLocation || [28.7041, 77.1025]}
//           zoom={13}
//           style={{ height: "400px", width: "100%" }}
//         >
//           <TileLayer
//             attribution='&copy; OpenStreetMap'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           {/* User marker */}
//           {userLocation && (
//             <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
//               <Popup>Your Location</Popup>
//             </Marker>
//           )}
//           {/* Bus marker */}
//           {selectedBus && busData[selectedBus] && (
//             <Marker
//               position={[busData[selectedBus].latitude, busData[selectedBus].longitude]}
//               icon={busIcon}
//             >
//               <Popup>{busData[selectedBus].busName}</Popup>
//             </Marker>
//           )}
//           {/* Path */}
//           {showPath && userLocation && selectedBus && busData[selectedBus] && (
//             <Polyline
//               positions={[
//                 [userLocation.lat, userLocation.lng],
//                 [busData[selectedBus].latitude, busData[selectedBus].longitude],
//               ]}
//               color="blue"
//             />
//           )}
//         </MapContainer>

//         <button
//           className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
//           onClick={() => setShowPath(!showPath)}
//         >
//           {showPath ? "Hide Path" : "Show Distance and Path"}
//         </button>
//       </div>

//       {/* Right section */}
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
//           Information
//         </h2>
//         {selectedBus && busData[selectedBus] ? (
//           <div>
//             <p className="mb-2">
//               <strong>Bus Name:</strong> {busData[selectedBus].busName}
//             </p>
//             <p className="mb-2">
//               <strong>Latitude:</strong> {busData[selectedBus].latitude.toFixed(6)}
//             </p>
//             <p className="mb-2">
//               <strong>Longitude:</strong> {busData[selectedBus].longitude.toFixed(6)}
//             </p>
//             <p className="mb-2">
//               <strong>Seat Status:</strong> {busData[selectedBus].seatStatus}
//             </p>
//             {distance && (
//               <p className="text-lg font-semibold text-green-600">
//                 Distance: {distance} km
//               </p>
//             )}
//           </div>
//         ) : (
//           <p className="text-gray-500">Please select a bus to view details.</p>
//         )}
//       </div>
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import { getDistance } from "geolib";
// import PlanJourney from "./PlanJourney";

// const busIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61231.png",
//   iconSize: [40, 40],
// });

// const userIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
//   iconSize: [35, 35],
// });

// export default function Track() {
//   const [userLocation, setUserLocation] = useState(null);
//   const [selectedBus, setSelectedBus] = useState("");
//   const [busData, setBusData] = useState({});
//   const [showPath, setShowPath] = useState(false);
//   const [distance, setDistance] = useState(null);

//   // List of buses
//   const buses = ["UP 23 AB 1243", "UP 25 AX 2027", "UP 32 XY 4455"];

//   // ✅ WebSocket connect
//   useEffect(() => {
//     const socket = new WebSocket("ws://10.143.232.209:81/"); // ESP32 ka IP

//     socket.onopen = () => {
//       console.log("✅ Connected to ESP32 WebSocket");
//     };

//     socket.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         setBusData((prev) => ({
//           ...prev,
//           [data.busName]: data,
//         }));
//       } catch (e) {
//         console.error("❌ Error parsing WS data:", e);
//       }
//     };

//     socket.onerror = (err) => {
//       console.error("WebSocket Error:", err);
//     };

//     socket.onclose = () => {
//       console.log("❌ WebSocket closed");
//     };

//     return () => socket.close();
//   }, []);

//   // ✅ User location fetch
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.watchPosition(
//         (pos) => {
//           setUserLocation({
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude,
//           });
//         },
//         (err) => console.error("Geolocation Error:", err),
//         { enableHighAccuracy: true }
//       );
//     }
//   }, []);

//   // ✅ Distance calculate
//   useEffect(() => {
//     if (userLocation && selectedBus && busData[selectedBus]) {
//       const d = getDistance(userLocation, {
//         latitude: busData[selectedBus].latitude,
//         longitude: busData[selectedBus].longitude,
//       });
//       setDistance((d / 1000).toFixed(2)); // KM me
//     }
//   }, [userLocation, selectedBus, busData]);

//   return (
//     <div className="w-full">
//       <h2 className="text-3xl font-bold text-center mb-2 mt-10">
//         Track Your Bus 🚌
//       </h2>
//       {/* <div>
//           <PlanJourney onRouteSelect={handleRouteSelect} />
//       </div> */}
//       <div className="w-[90vw] mx-auto mt-10 grid grid-cols-2 gap-6">
//         {/* Left section */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
//           <h1 className="text-3xl font-bold text-center mb-2">🚌 Track Your Bus</h1>
//           <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
//             Select your bus stop and bus to view location on the map.
//           </p>

//           {/* Bus selection */}
//           <div className="mb-4">
//             <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-2">
//               Select Bus
//             </label>
//             <select
//               value={selectedBus}
//               onChange={(e) => setSelectedBus(e.target.value)}
//               className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
//             >
//               <option value="">-- Choose Bus --</option>
//               {buses.map((bus) => (
//                 <option key={bus} value={bus}>
//                   {bus}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Map */}
//           <MapContainer
//             center={userLocation || [28.7041, 77.1025]}
//             zoom={13}
//             style={{ height: "400px", width: "100%" }}
//           >
//             <TileLayer
//               attribution='&copy; OpenStreetMap'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//             {/* User marker */}
//             {userLocation && (
//               <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
//                 <Popup>Your Location</Popup>
//               </Marker>
//             )}

//             {/* Bus marker */}
//             {selectedBus && busData[selectedBus] && (
//               <Marker
//                 position={[
//                   busData[selectedBus].latitude,
//                   busData[selectedBus].longitude,
//                 ]}
//                 icon={busIcon}
//               >
//                 <Popup>{busData[selectedBus].busName}</Popup>
//               </Marker>
//             )}

//             {/* Path */}
//             {showPath && userLocation && selectedBus && busData[selectedBus] && (
//               <Polyline
//                 positions={[
//                   [userLocation.lat, userLocation.lng],
//                   [busData[selectedBus].latitude, busData[selectedBus].longitude],
//                 ]}
//                 color="blue"
//               />
//             )}
//           </MapContainer>

//           <button
//             className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
//             onClick={() => setShowPath(!showPath)}
//           >
//             {showPath ? "Hide Path" : "Show Distance and Path"}
//           </button>
//         </div>

//         {/* Right section */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
//           <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
//             Information
//           </h2>
//           {selectedBus && busData[selectedBus] ? (
//             <div>
//               <p className="mb-2">
//                 <strong>Bus Name:</strong> {busData[selectedBus].busName}
//               </p>
//               <p className="mb-2">
//                 <strong>Latitude:</strong>{" "}
//                 {busData[selectedBus].latitude.toFixed(6)}
//               </p>
//               <p className="mb-2">
//                 <strong>Longitude:</strong>{" "}
//                 {busData[selectedBus].longitude.toFixed(6)}
//               </p>
//               <p className="mb-2">
//                 <strong>Seat Status:</strong> {busData[selectedBus].seatStatus}
//               </p>
//               {distance && (
//                 <p className="text-lg font-semibold text-green-600">
//                   Distance: {distance} km
//                 </p>
//               )}
//             </div>
//           ) : (
//             <p className="text-gray-500">Please select a bus to view details.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import { getDistance } from "geolib";

// const busIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61231.png",
//   iconSize: [40, 40],
// });

// const userIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
//   iconSize: [35, 35],
// });

// export default function Track() {
//   const [userLocation, setUserLocation] = useState(null);
//   const [selectedBus, setSelectedBus] = useState("");
//   const [busData, setBusData] = useState({});
//   const [showPath, setShowPath] = useState(false);
//   const [distance, setDistance] = useState(null);

//   const buses = ["UP 23 AB 1243", "UP 25 AX 2027", "UP 32 XY 4455"];

//   // ✅ WebSocket connect (ESP32 se bus data)
//   useEffect(() => {
//     const socket = new WebSocket("ws://10.143.232.209:81/");

//     socket.onopen = () => console.log("✅ Connected to ESP32 WebSocket");
//     socket.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         setBusData((prev) => ({
//           ...prev,
//           [data.busName]: data,
//         }));
//       } catch (e) {
//         console.error("❌ Error parsing WS data:", e);
//       }
//     };
//     socket.onerror = (err) => console.error("WebSocket Error:", err);
//     socket.onclose = () => console.log("❌ WebSocket closed");

//     return () => socket.close();
//   }, []);

//   // ✅ User location fetch (permission prompt aayega)
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           setUserLocation({
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude,
//           });
//         },
//         (err) => {
//           console.error("Geolocation Error:", err);
//           alert("⚠️ Location access is required to track bus properly.");
//         },
//         { enableHighAccuracy: true }
//       );
//     } else {
//       alert("❌ Your browser does not support location services.");
//     }
//   }, []);

//   // ✅ Distance calculate
//   useEffect(() => {
//     if (userLocation && selectedBus && busData[selectedBus]) {
//       const d = getDistance(userLocation, {
//         latitude: busData[selectedBus].latitude,
//         longitude: busData[selectedBus].longitude,
//       });
//       setDistance((d / 1000).toFixed(2));
//     }
//   }, [userLocation, selectedBus, busData]);

//   return (
//     <div className="w-full">
//       <h2 className="text-3xl font-bold text-center mb-2 mt-10">
//         Track Your Bus 🚌
//       </h2>

//       <div className="w-[90vw] mx-auto mt-10 grid grid-cols-2 gap-6">
//         {/* Left section */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
//           <h1 className="text-2xl font-bold text-center mb-4">🗺️ Live Map</h1>

//           {/* Bus selection */}
//           <div className="mb-4">
//             <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-2">
//               Select Bus
//             </label>
//             <select
//               value={selectedBus}
//               onChange={(e) => {
//                 setSelectedBus(e.target.value);
//                 setShowPath(false); // reset path jab dusri bus select ho
//               }}
//               className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
//             >
//               <option value="">-- Choose Bus --</option>
//               {buses.map((bus) => (
//                 <option key={bus} value={bus}>
//                   {bus}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Map */}
//           <MapContainer
//             center={userLocation || [28.7041, 77.1025]}
//             zoom={13}
//             style={{ height: "400px", width: "100%" }}
//           >
//             <TileLayer
//               attribution='&copy; OpenStreetMap'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//             {/* ✅ User marker */}
//             {userLocation && (
//               <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
//                 <Popup>📍 You are here</Popup>
//               </Marker>
//             )}

//             {/* ✅ Selected bus marker */}
//             {selectedBus && busData[selectedBus] && (
//               <Marker
//                 position={[
//                   busData[selectedBus].latitude,
//                   busData[selectedBus].longitude,
//                 ]}
//                 icon={busIcon}
//               >
//                 <Popup>🚌 {busData[selectedBus].busName}</Popup>
//               </Marker>
//             )}

//             {/* ✅ Path (toggle button se) */}
//             {showPath && userLocation && selectedBus && busData[selectedBus] && (
//               <Polyline
//                 positions={[
//                   [userLocation.lat, userLocation.lng],
//                   [busData[selectedBus].latitude, busData[selectedBus].longitude],
//                 ]}
//                 color="blue"
//               />
//             )}
//           </MapContainer>

//           {/* ✅ Button to toggle path */}
//           <button
//             className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
//             onClick={() => setShowPath(!showPath)}
//             disabled={!selectedBus}
//           >
//             {showPath ? "Hide Path" : "Show Distance and Path"}
//           </button>
//         </div>

//         {/* Right section */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
//           <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
//             Information
//           </h2>
//           {selectedBus && busData[selectedBus] ? (
//             <div>
//               <p className="mb-2">
//                 <strong>Bus Name:</strong> {busData[selectedBus].busName}
//               </p>
//               <p className="mb-2">
//                 <strong>Latitude:</strong>{" "}
//                 {busData[selectedBus].latitude.toFixed(6)}
//               </p>
//               <p className="mb-2">
//                 <strong>Longitude:</strong>{" "}
//                 {busData[selectedBus].longitude.toFixed(6)}
//               </p>
//               <p className="mb-2">
//                 <strong>Seat Status:</strong> {busData[selectedBus].seatStatus}
//               </p>
//               {distance && (
//                 <p className="text-lg font-semibold text-green-600">
//                   Distance: {distance} km
//                 </p>
//               )}
//             </div>
//           ) : (
//             <p className="text-gray-500">Please select a bus to view details.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import { getDistance } from "geolib";

// const busIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61231.png",
//   iconSize: [40, 40],
// });

// const userIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
//   iconSize: [35, 35],
// });

// export default function Track() {
//   const [userLocation, setUserLocation] = useState(null);
//   const [selectedBus, setSelectedBus] = useState("");
//   const [busData, setBusData] = useState({});
//   const [showPath, setShowPath] = useState(false);
//   const [distance, setDistance] = useState(null);

//   const buses = ["UP 23 AB 1243", "UP 25 AX 2027", "UP 32 XY 4455"];

//   // ✅ WebSocket connect (ESP32 se bus data)
//   useEffect(() => {
//     const socket = new WebSocket("ws://10.143.232.209:81/");

//     socket.onopen = () => console.log("✅ Connected to ESP32 WebSocket");
//     socket.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         setBusData((prev) => ({
//           ...prev,
//           [data.busName]: data,
//         }));
//       } catch (e) {
//         console.error("❌ Error parsing WS data:", e);
//       }
//     };
//     socket.onerror = (err) => console.error("WebSocket Error:", err);
//     socket.onclose = () => console.log("❌ WebSocket closed");

//     return () => socket.close();
//   }, []);

//   // ✅ User location fetch (permission prompt + live update)
//   useEffect(() => {
//     if (navigator.geolocation) {
//       const watchId = navigator.geolocation.watchPosition(
//         (pos) => {
//           setUserLocation({
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude,
//           });
//         },
//         (err) => {
//           console.error("Geolocation Error:", err);
//           alert("⚠️ Location access is required to track bus properly.");
//         },
//         { enableHighAccuracy: true }
//       );

//       return () => navigator.geolocation.clearWatch(watchId); // cleanup
//     } else {
//       alert("❌ Your browser does not support location services.");
//     }
//   }, []);

//   // ✅ Distance calculate
//   useEffect(() => {
//     if (userLocation && selectedBus && busData[selectedBus]) {
//       const d = getDistance(userLocation, {
//         latitude: busData[selectedBus].latitude,
//         longitude: busData[selectedBus].longitude,
//       });
//       setDistance((d / 1000).toFixed(2));
//     }
//   }, [userLocation, selectedBus, busData]);

//   return (
//     <div className="w-full">
//       <h2 className="text-3xl font-bold text-center mb-2 mt-10">
//         Track Your Bus 🚌
//       </h2>

//       <div className="w-[90vw] mx-auto mt-10 grid grid-cols-2 gap-6">
//         {/* Left section */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
//           <h1 className="text-2xl font-bold text-center mb-4">🗺️ Live Map</h1>

//           {/* Bus selection */}
//           <div className="mb-4">
//             <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-2">
//               Select Bus
//             </label>
//             <select
//               value={selectedBus}
//               onChange={(e) => {
//                 setSelectedBus(e.target.value);
//                 setShowPath(false);
//               }}
//               className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
//             >
//               <option value="">-- Choose Bus --</option>
//               {buses.map((bus) => (
//                 <option key={bus} value={bus}>
//                   {bus}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Map */}
//           <MapContainer
//             center={userLocation || [28.7041, 77.1025]}
//             zoom={13}
//             style={{ height: "400px", width: "100%" }}
//           >
//             <TileLayer
//               attribution='&copy; OpenStreetMap'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//             {/* ✅ User marker */}
//             {userLocation && (
//               <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
//                 <Popup>📍 You are here</Popup>
//               </Marker>
//             )}

//             {/* ✅ Selected bus marker */}
//             {selectedBus && busData[selectedBus] && (
//               <Marker
//                 position={[
//                   busData[selectedBus].latitude,
//                   busData[selectedBus].longitude,
//                 ]}
//                 icon={busIcon}
//               >
//                 <Popup>🚌 {busData[selectedBus].busName}</Popup>
//               </Marker>
//             )}

//             {/* ✅ Path (toggle button se) */}
//             {showPath && userLocation && selectedBus && busData[selectedBus] && (
//               <Polyline
//                 positions={[
//                   [userLocation.lat, userLocation.lng],
//                   [busData[selectedBus].latitude, busData[selectedBus].longitude],
//                 ]}
//                 color="blue"
//               />
//             )}
//           </MapContainer>

//           {/* ✅ Button to toggle path */}
//           <button
//             className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
//             onClick={() => setShowPath(!showPath)}
//             disabled={!selectedBus}
//           >
//             {showPath ? "Hide Path" : "Show Distance and Path"}
//           </button>
//         </div>

//         {/* Right section */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
//           <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
//             Information
//           </h2>
//           {selectedBus && busData[selectedBus] ? (
//             <div>
//               <p className="mb-2">
//                 <strong>Bus Name:</strong> {busData[selectedBus].busName}
//               </p>
//               <p className="mb-2">
//                 <strong>Latitude:</strong>{" "}
//                 {busData[selectedBus].latitude.toFixed(6)}
//               </p>
//               <p className="mb-2">
//                 <strong>Longitude:</strong>{" "}
//                 {busData[selectedBus].longitude.toFixed(6)}
//               </p>
//               <p className="mb-2">
//                 <strong>Seat Status:</strong> {busData[selectedBus].seatStatus}
//               </p>
//               {distance && (
//                 <p className="text-lg font-semibold text-green-600">
//                   Distance: {distance} km
//                 </p>
//               )}
//             </div>
//           ) : (
//             <p className="text-gray-500">Please select a bus to view details.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import { getDistance } from "geolib";

// const busIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61231.png",
//   iconSize: [40, 40],
// });

// const userIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
//   iconSize: [35, 35],
// });

// export default function Track() {
//   const [userLocation, setUserLocation] = useState(null);
//   const [selectedBus, setSelectedBus] = useState("");
//   const [busData, setBusData] = useState({});
//   const [showPath, setShowPath] = useState(false);
//   const [distance, setDistance] = useState(null);

//   const buses = ["UP 23 AB 1243", "UP 25 AX 2027", "UP 32 XY 4455"];

//   // ✅ WebSocket connect (ESP32 se bus data)
//   useEffect(() => {
//     const socket = new WebSocket("ws://10.143.232.209:81/");

//     socket.onopen = () => console.log("✅ Connected to ESP32 WebSocket");
//     socket.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         setBusData((prev) => ({
//           ...prev,
//           [data.busName]: data,
//         }));
//       } catch (e) {
//         console.error("❌ Error parsing WS data:", e);
//       }
//     };
//     socket.onerror = (err) => console.error("WebSocket Error:", err);
//     socket.onclose = () => console.log("❌ WebSocket closed");

//     return () => socket.close();
//   }, []);

//   // ✅ User location fetch (permission prompt + live update)
//   useEffect(() => {
//     if (navigator.geolocation) {
//       const watchId = navigator.geolocation.watchPosition(
//         (pos) => {
//           setUserLocation({
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude,
//           });
//         },
//         (err) => {
//           console.error("Geolocation Error:", err);
//           alert("⚠️ Location access is required to track bus properly.");
//         },
//         { enableHighAccuracy: true }
//       );

//       return () => navigator.geolocation.clearWatch(watchId); // cleanup
//     } else {
//       alert("❌ Your browser does not support location services.");
//     }
//   }, []);

//   // ✅ Distance calculate
//   useEffect(() => {
//     if (userLocation && selectedBus && busData[selectedBus]) {
//       const d = getDistance(userLocation, {
//         latitude: busData[selectedBus].latitude,
//         longitude: busData[selectedBus].longitude,
//       });
//       setDistance((d / 1000).toFixed(2));
//     }
//   }, [userLocation, selectedBus, busData]);

//   return (
//     <div className="w-full">
//       <h2 className="text-3xl font-bold text-center mb-2 mt-10">
//         Track Your Bus 🚌
//       </h2>

//       <div className="w-[90vw] mx-auto mt-10 grid grid-cols-2 gap-6">
//         {/* Left section */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
//           <h1 className="text-2xl font-bold text-center mb-4">🗺️ Live Map</h1>

//           {/* Bus selection */}
//           <div className="mb-4">
//             <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-2">
//               Select Bus
//             </label>
//             <select
//               value={selectedBus}
//               onChange={(e) => {
//                 setSelectedBus(e.target.value);
//                 setShowPath(false);
//               }}
//               className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
//             >
//               <option value="">-- Choose Bus --</option>
//               {buses.map((bus) => (
//                 <option key={bus} value={bus}>
//                   {bus}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Map */}
//           <MapContainer
//             center={userLocation || [28.7041, 77.1025]}
//             zoom={13}
//             style={{ height: "400px", width: "100%" }}
//           >
//             <TileLayer
//               attribution='&copy; OpenStreetMap'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//             {/* ✅ User marker */}
//             {userLocation && (
//               <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
//                 <Popup>📍 You are here</Popup>
//               </Marker>
//             )}

//             {/* ✅ Selected bus marker */}
//             {selectedBus && busData[selectedBus] && (
//               <Marker
//                 position={[
//                   busData[selectedBus].latitude,
//                   busData[selectedBus].longitude,
//                 ]}
//                 icon={busIcon}
//               >
//                 <Popup>🚌 {busData[selectedBus].busName}</Popup>
//               </Marker>
//             )}

//             {/* ✅ Path (toggle button se) */}
//             {showPath && userLocation && selectedBus && busData[selectedBus] && (
//               <Polyline
//                 positions={[
//                   [userLocation.lat, userLocation.lng],
//                   [busData[selectedBus].latitude, busData[selectedBus].longitude],
//                 ]}
//                 color="blue"
//               />
//             )}
//           </MapContainer>

//           {/* ✅ Button to toggle path */}
//           <button
//             className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
//             onClick={() => setShowPath(!showPath)}
//             disabled={!selectedBus}
//           >
//             {showPath ? "Hide Path" : "Show Distance and Path"}
//           </button>
//         </div>

//         {/* Right section */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
//           <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
//             Information
//           </h2>
//           {selectedBus && busData[selectedBus] ? (
//             <div>
//               <p className="mb-2">
//                 <strong>Bus Name:</strong> {busData[selectedBus].busName}
//               </p>
//               <p className="mb-2">
//                 <strong>Latitude:</strong>{" "}
//                 {busData[selectedBus].latitude.toFixed(6)}
//               </p>
//               <p className="mb-2">
//                 <strong>Longitude:</strong>{" "}
//                 {busData[selectedBus].longitude.toFixed(6)}
//               </p>
//               <p className="mb-2">
//                 <strong>Seat Status:</strong> {busData[selectedBus].seatStatus}
//               </p>
//               {distance && (
//                 <p className="text-lg font-semibold text-green-600">
//                   Distance: {distance} km
//                 </p>
//               )}
//             </div>
//           ) : (
//             <p className="text-gray-500">Please select a bus to view details.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import { getDistance } from "geolib";

// const busIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61231.png",
//   iconSize: [40, 40],
// });

// const userIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
//   iconSize: [35, 35],
// });

// export default function Track() {
//   const [userLocation, setUserLocation] = useState(null);
//   const [selectedBus, setSelectedBus] = useState("");
//   const [busData, setBusData] = useState({});
//   const [showPath, setShowPath] = useState(false);
//   const [distance, setDistance] = useState(null);

//   const buses = ["UP 23 AB 1243", "UP 25 AX 2027", "UP 32 XY 4455"];

//   // ✅ WebSocket connect (ESP32 se bus data)
//   useEffect(() => {
//     const socket = new WebSocket("ws://10.143.232.209:81/");

//     socket.onopen = () => console.log("✅ Connected to ESP32 WebSocket");
//     socket.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         setBusData((prev) => ({
//           ...prev,
//           [data.busName]: data,
//         }));
//       } catch (e) {
//         console.error("❌ Error parsing WS data:", e);
//       }
//     };
//     socket.onerror = (err) => console.error("WebSocket Error:", err);
//     socket.onclose = () => console.log("❌ WebSocket closed");

//     return () => socket.close();
//   }, []);

//   // ✅ User location fetch (permission prompt + live update)
//   useEffect(() => {
//     if (navigator.geolocation) {
//       const watchId = navigator.geolocation.watchPosition(
//         (pos) => {
//           setUserLocation({
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude,
//           });
//         },
//         (err) => {
//           console.error("Geolocation Error:", err);
//           alert("⚠️ Location access is required to track bus properly.");
//         },
//         { enableHighAccuracy: true }
//       );

//       return () => navigator.geolocation.clearWatch(watchId); // cleanup
//     } else {
//       alert("❌ Your browser does not support location services.");
//     }
//   }, []);

//   // ✅ Distance calculate
//   useEffect(() => {
//     if (userLocation && selectedBus && busData[selectedBus]) {
//       const d = getDistance(userLocation, {
//         latitude: busData[selectedBus].latitude,
//         longitude: busData[selectedBus].longitude,
//       });
//       setDistance((d / 1000).toFixed(2));
//     }
//   }, [userLocation, selectedBus, busData]);

//   return (
//     <div className="w-full">
//       <h2 className="text-3xl font-bold text-center mb-2 mt-10">
//         Track Your Bus 🚌
//       </h2>

//       <div className="w-[90vw] mx-auto mt-10 grid grid-cols-2 gap-6">
//         {/* Left section */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
//           <h1 className="text-2xl font-bold text-center mb-4">🗺️ Live Map</h1>

//           {/* Bus selection */}
//           <div className="mb-4">
//             <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-2">
//               Select Bus
//             </label>
//             <select
//               value={selectedBus}
//               onChange={(e) => {
//                 setSelectedBus(e.target.value);
//                 setShowPath(false);
//               }}
//               className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
//             >
//               <option value="">-- Choose Bus --</option>
//               {buses.map((bus) => (
//                 <option key={bus} value={bus}>
//                   {bus}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* ✅ Map show only when location mil jaye */}
//           {userLocation ? (
//             <MapContainer
//               center={[userLocation.lat, userLocation.lng]} // ✅ always user location
//               zoom={15}
//               style={{ height: "400px", width: "100%" }}
//             >
//               <TileLayer
//                 attribution='&copy; OpenStreetMap'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               />

//               {/* ✅ User marker */}
//               <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
//                 <Popup>📍 You are here</Popup>
//               </Marker>

//               {/* ✅ Selected bus marker */}
//               {selectedBus && busData[selectedBus] && (
//                 <Marker
//                   position={[
//                     busData[selectedBus].latitude,
//                     busData[selectedBus].longitude,
//                   ]}
//                   icon={busIcon}
//                 >
//                   <Popup>🚌 {busData[selectedBus].busName}</Popup>
//                 </Marker>
//               )}

//               {/* ✅ Path */}
//               {showPath && selectedBus && busData[selectedBus] && (
//                 <Polyline
//                   positions={[
//                     [userLocation.lat, userLocation.lng],
//                     [busData[selectedBus].latitude, busData[selectedBus].longitude],
//                   ]}
//                   color="blue"
//                 />
//               )}
//             </MapContainer>
//           ) : (
//             <p className="text-center text-gray-500">📍 Fetching your location...</p>
//           )}

//           {/* ✅ Button to toggle path */}
//           <button
//             className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
//             onClick={() => setShowPath(!showPath)}
//             disabled={!selectedBus}
//           >
//             {showPath ? "Hide Path" : "Show Distance and Path"}
//           </button>
//         </div>

//         {/* Right section */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
//           <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
//             Information
//           </h2>
//           {selectedBus && busData[selectedBus] ? (
//             <div>
//               <p className="mb-2">
//                 <strong>Bus Name:</strong> {busData[selectedBus].busName}
//               </p>
//               <p className="mb-2">
//                 <strong>Latitude:</strong>{" "}
//                 {busData[selectedBus].latitude.toFixed(6)}
//               </p>
//               <p className="mb-2">
//                 <strong>Longitude:</strong>{" "}
//                 {busData[selectedBus].longitude.toFixed(6)}
//               </p>
//               <p className="mb-2">
//                 <strong>Seat Status:</strong> {busData[selectedBus].seatStatus}
//               </p>
//               {distance && (
//                 <p className="text-lg font-semibold text-green-600">
//                   Distance: {distance} km
//                 </p>
//               )}
//             </div>
//           ) : (
//             <p className="text-gray-500">Please select a bus to view details.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import { getDistance } from "geolib";

// const busIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61231.png",
//   iconSize: [40, 40],
// });

// const userIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
//   iconSize: [35, 35],
// });

// export default function Track() {
//   const [userLocation, setUserLocation] = useState(null);
//   const [selectedBus, setSelectedBus] = useState("");
//   const [busData, setBusData] = useState({});
//   const [showPath, setShowPath] = useState(false);
//   const [distance, setDistance] = useState(null);

//   const buses = ["UP 23 AB 1243", "UP 25 AX 2027", "UP 32 XY 4455"];

//   // ✅ WebSocket connect (ESP32 se bus data)
//   useEffect(() => {
//     const socket = new WebSocket("ws://10.143.232.209:81/");

//     socket.onopen = () => console.log("✅ Connected to ESP32 WebSocket");

//     socket.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);

//         // ensure required fields exist
//         if (data.busName && data.latitude && data.longitude) {
//           setBusData((prev) => ({
//             ...prev,
//             [data.busName]: data,
//           }));
//         } else {
//           console.warn("⚠️ Invalid data from ESP32:", data);
//         }
//       } catch (e) {
//         console.error("❌ Error parsing WS data:", e, event.data);
//       }
//     };

//     socket.onerror = (err) => console.error("WebSocket Error:", err);
//     socket.onclose = () => console.log("❌ WebSocket closed");

//     return () => socket.close();
//   }, []);

//   // ✅ User location fetch
//   useEffect(() => {
//     if (navigator.geolocation) {
//       const watchId = navigator.geolocation.watchPosition(
//         (pos) => {
//           setUserLocation({
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude,
//           });
//         },
//         (err) => {
//           console.error("Geolocation Error:", err);
//           alert("⚠️ Location access is required to track bus properly.");
//         },
//         { enableHighAccuracy: true }
//       );

//       return () => navigator.geolocation.clearWatch(watchId);
//     } else {
//       alert("❌ Your browser does not support location services.");
//     }
//   }, []);

//   // ✅ Distance calculate
//   useEffect(() => {
//     if (userLocation && selectedBus && busData[selectedBus]) {
//       const d = getDistance(userLocation, {
//         latitude: busData[selectedBus].latitude,
//         longitude: busData[selectedBus].longitude,
//       });
//       setDistance((d / 1000).toFixed(2));
//     }
//   }, [userLocation, selectedBus, busData]);

//   return (
//     <div className="w-full">
//       <h2 className="text-3xl font-bold text-center mb-2 mt-10">
//         Track Your Bus 🚌
//       </h2>

//       <div className="w-[90vw] mx-auto mt-10 grid grid-cols-2 gap-6">
//         {/* Left section */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
//           <h1 className="text-2xl font-bold text-center mb-4">🗺️ Live Map</h1>

//           {/* Bus selection */}
//           <div className="mb-4">
//             <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-2">
//               Select Bus
//             </label>
//             <select
//               value={selectedBus}
//               onChange={(e) => {
//                 setSelectedBus(e.target.value);
//                 setShowPath(false);
//               }}
//               className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
//             >
//               <option value="">-- Choose Bus --</option>
//               {buses.map((bus) => (
//                 <option key={bus} value={bus}>
//                   {bus}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* ✅ Map show only when location mil jaye */}
//           {userLocation ? (
//             <MapContainer
//               center={[userLocation.lat, userLocation.lng]}
//               zoom={15}
//               style={{ height: "400px", width: "100%" }}
//             >
//               <TileLayer
//                 attribution='&copy; OpenStreetMap'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               />

//               {/* ✅ User marker */}
//               <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
//                 <Popup>📍 You are here</Popup>
//               </Marker>

//               {/* ✅ Selected bus marker */}
//               {selectedBus && busData[selectedBus] && (
//                 <Marker
//                   position={[
//                     busData[selectedBus].latitude,
//                     busData[selectedBus].longitude,
//                   ]}
//                   icon={busIcon}
//                 >
//                   <Popup>🚌 {busData[selectedBus].busName}</Popup>
//                 </Marker>
//               )}

//               {/* ✅ Path */}
//               {showPath && selectedBus && busData[selectedBus] && (
//                 <Polyline
//                   positions={[
//                     [userLocation.lat, userLocation.lng],
//                     [busData[selectedBus].latitude, busData[selectedBus].longitude],
//                   ]}
//                   color="blue"
//                 />
//               )}
//             </MapContainer>
//           ) : (
//             <p className="text-center text-gray-500">📍 Fetching your location...</p>
//           )}

//           {/* ✅ Button to toggle path */}
//           <button
//             className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
//             onClick={() => setShowPath(!showPath)}
//             disabled={!selectedBus}
//           >
//             {showPath ? "Hide Path" : "Show Distance and Path"}
//           </button>
//         </div>

//         {/* Right section */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
//           <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
//             Information
//           </h2>
//           {selectedBus && busData[selectedBus] ? (
//             <div>
//               <p className="mb-2">
//                 <strong>Bus Name:</strong> {busData[selectedBus].busName}
//               </p>
//               <p className="mb-2">
//                 <strong>Latitude:</strong>{" "}
//                 {busData[selectedBus].latitude.toFixed(6)}
//               </p>
//               <p className="mb-2">
//                 <strong>Longitude:</strong>{" "}
//                 {busData[selectedBus].longitude.toFixed(6)}
//               </p>
//               <p className="mb-2">
//                 <strong>Seat Status:</strong> {busData[selectedBus].seatStatus}
//               </p>
//               {distance && (
//                 <p className="text-lg font-semibold text-green-600">
//                   Distance: {distance} km
//                 </p>
//               )}
//             </div>
//           ) : (
//             <p className="text-gray-500">Please select a bus to view details.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import { getDistance } from "geolib";

// const userIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
//   iconSize: [30, 30],
//   iconAnchor: [15, 30],
//   popupAnchor: [0, -30],
// });

// const busIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61205.png",
//   iconSize: [30, 30],
//   iconAnchor: [15, 30],
//   popupAnchor: [0, -30],
// });

// export default function TrackBus() {
//   const [userLocation, setUserLocation] = useState(null);
//   const [buses, setBuses] = useState([]);
//   const [busData, setBusData] = useState({});
//   const [selectedBus, setSelectedBus] = useState("");
//   const [distance, setDistance] = useState(null);
//   const [showPath, setShowPath] = useState(false);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
//       (err) => console.error(err)
//     );
//   }, []);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/busdata")
//       .then((res) => res.json())
//       .then((data) => {
//         const latest = {};
//         const uniqueBuses = [...new Set(data.map((d) => d.busNumber))];
//         data.forEach((d) => {
//           if (!latest[d.busNumber] || d.timestamp > latest[d.busNumber].timestamp) {
//             latest[d.busNumber] = d;
//           }
//         });
//         setBuses(uniqueBuses);
//         setBusData(latest);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   useEffect(() => {
//     const ws = new WebSocket("ws://localhost:5000");
//     ws.onmessage = (event) => {
//       const newData = JSON.parse(event.data);
//       setBusData((prev) => ({
//         ...prev,
//         [newData.busNumber]: newData,
//       }));
//     };
//     return () => ws.close();
//   }, []);

//   useEffect(() => {
//     if (userLocation && selectedBus && busData[selectedBus]) {
//       const busLoc = busData[selectedBus];
//       const dist = getDistance(
//         { latitude: userLocation.lat, longitude: userLocation.lng },
//         { latitude: busLoc.latitude, longitude: busLoc.longitude }
//       ) / 1000;
//       setDistance(dist.toFixed(2));
//     }
//   }, [selectedBus, busData, userLocation]);

//   return (
//     <section
//       id="track"
//       className="min-h-screen bg-gray-100 dark:bg-gray-900 py-16 px-6"
//       aria-labelledby="track-section-title"
//     >
//       <h2
//         id="track-section-title"
//         className="text-4xl font-bold text-center mb-12"
//       >
//         Track Bus
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
//         <div>
//           <label className="block text-gray-700 dark:text-gray-200 mb-2">
//             Select Bus
//           </label>
//           <select
//             value={selectedBus}
//             onChange={(e) => setSelectedBus(e.target.value)}
//             className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
//             aria-label="Select a bus"
//           >
//             <option value="">-- Choose Bus --</option>
//             {buses.map((bus) => (
//               <option key={bus} value={bus}>
//                 {bus}
//               </option>
//             ))}
//           </select>
//           <MapContainer
//             center={userLocation || [28.7041, 77.1025]}
//             zoom={13}
//             style={{ height: "400px", width: "100%" }}
//           >
//             <TileLayer
//               attribution="&copy; OpenStreetMap"
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             {userLocation && (
//               <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
//                 <Popup>Your Location</Popup>
//               </Marker>
//             )}
//             {selectedBus && busData[selectedBus] && (
//               <Marker
//                 position={[
//                   busData[selectedBus].latitude,
//                   busData[selectedBus].longitude,
//                 ]}
//                 icon={busIcon}
//               >
//                 <Popup>{selectedBus}</Popup>
//               </Marker>
//             )}
//             {showPath && userLocation && selectedBus && busData[selectedBus] && (
//               <Polyline
//                 positions={[
//                   [userLocation.lat, userLocation.lng],
//                   [busData[selectedBus].latitude, busData[selectedBus].longitude],
//                 ]}
//                 color="blue"
//               />
//             )}
//           </MapContainer>
//           <button
//             className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
//             onClick={() => setShowPath(!showPath)}
//           >
//             {showPath ? "Hide Path" : "Show Distance and Path"}
//           </button>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
//           <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
//             Information
//           </h2>
//           {selectedBus && busData[selectedBus] ? (
//             <div>
//               <p className="mb-2">
//                 <strong>Bus Number:</strong> {selectedBus}
//               </p>
//               <p className="mb-2">
//                 <strong>Latitude:</strong> {busData[selectedBus].latitude.toFixed(6)}
//               </p>
//               <p className="mb-2">
//                 <strong>Longitude:</strong> {busData[selectedBus].longitude.toFixed(6)}
//               </p>
//               <p className="mb-2">
//                 <strong>Seat Status:</strong> {JSON.stringify(busData[selectedBus].seatStatus)}
//               </p>
//               {distance && (
//                 <p className="text-lg font-semibold text-green-600">
//                   Distance: {distance} km
//                 </p>
//               )}
//             </div>
//           ) : (
//             <p className="text-gray-500">Please select a bus to view details.</p>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }



// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import { getDistance } from "geolib";

// const userIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
//   iconSize: [30, 30],
//   iconAnchor: [15, 30],
//   popupAnchor: [0, -30],
// });

// const busIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61205.png",
//   iconSize: [30, 30],
//   iconAnchor: [15, 30],
//   popupAnchor: [0, -30],
// });

// // Helper component to update map center dynamically
// function RecenterMap({ center }) {
//   const map = useMap();
//   useEffect(() => {
//     if (center) {
//       map.setView(center, 15);
//     }
//   }, [center, map]);
//   return null;
// }

// export default function TrackBus() {
//   const [userLocation, setUserLocation] = useState(null);
//   const [userAddress, setUserAddress] = useState(""); // 👈 Place name
//   const [buses, setBuses] = useState([]);
//   const [busData, setBusData] = useState({});
//   const [selectedBus, setSelectedBus] = useState("");
//   const [distance, setDistance] = useState(null);
//   const [showPath, setShowPath] = useState(false);

//   // Fetch live location
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
//         setUserLocation(loc);

//         // 👇 Reverse Geocoding for place name
//         fetch(
//           `https://nominatim.openstreetmap.org/reverse?format=json&lat=${loc.lat}&lon=${loc.lng}`
//         )
//           .then((res) => res.json())
//           .then((data) => setUserAddress(data.display_name || "Unknown Place"))
//           .catch(() => setUserAddress("Unknown Place"));
//       },
//       (err) => console.error(err)
//     );
//   }, []);

//   // Fetch initial bus data
//   useEffect(() => {
//     fetch("http://localhost:5000/api/busdata")
//       .then((res) => res.json())
//       .then((data) => {
//         const latest = {};
//         const uniqueBuses = [...new Set(data.map((d) => d.busNumber))];
//         data.forEach((d) => {
//           if (!latest[d.busNumber] || d.timestamp > latest[d.busNumber].timestamp) {
//             latest[d.busNumber] = d;
//           }
//         });
//         setBuses(uniqueBuses);
//         setBusData(latest);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   // WebSocket live updates
//   useEffect(() => {
//     const ws = new WebSocket("ws://localhost:5000");
//     ws.onmessage = (event) => {
//       const newData = JSON.parse(event.data);
//       setBusData((prev) => ({
//         ...prev,
//         [newData.busNumber]: newData,
//       }));
//     };
//     return () => ws.close();
//   }, []);

//   // Distance calculation
//   useEffect(() => {
//     if (userLocation && selectedBus && busData[selectedBus]) {
//       const busLoc = busData[selectedBus];
//       const dist =
//         getDistance(
//           { latitude: userLocation.lat, longitude: userLocation.lng },
//           { latitude: busLoc.latitude, longitude: busLoc.longitude }
//         ) / 1000;
//       setDistance(dist.toFixed(2));
//     }
//   }, [selectedBus, busData, userLocation]);

//   return (
//     <section
//       id="track"
//       className="min-h-screen bg-gray-100 dark:bg-gray-900 py-16 px-6"
//       aria-labelledby="track-section-title"
//     >
//       <h2 id="track-section-title" className="text-4xl font-bold text-center mb-12">
//         Track Bus
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
//         <div>
//           <label className="block text-gray-700 dark:text-gray-200 mb-2">
//             Select Bus
//           </label>
//           <select
//             value={selectedBus}
//             onChange={(e) => setSelectedBus(e.target.value)}
//             className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
//             aria-label="Select a bus"
//           >
//             <option value="">-- Choose Bus --</option>
//             {buses.map((bus) => (
//               <option key={bus} value={bus}>
//                 {bus}
//               </option>
//             ))}
//           </select>

//           {/* Map */}
//           <MapContainer
//             center={userLocation || [20.5937, 78.9629]} // fallback: India center
//             zoom={13}
//             style={{ height: "400px", width: "100%" }}
//           >
//             <TileLayer
//               attribution="&copy; OpenStreetMap"
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             {userLocation && (
//               <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
//                 <Popup>
//                   <b>Your Location</b>
//                   <br />
//                   {userAddress}
//                 </Popup>
//               </Marker>
//             )}
//             {selectedBus && busData[selectedBus] && (
//               <Marker
//                 position={[
//                   busData[selectedBus].latitude,
//                   busData[selectedBus].longitude,
//                 ]}
//                 icon={busIcon}
//               >
//                 <Popup>{selectedBus}</Popup>
//               </Marker>
//             )}
//             {showPath && userLocation && selectedBus && busData[selectedBus] && (
//               <Polyline
//                 positions={[
//                   [userLocation.lat, userLocation.lng],
//                   [busData[selectedBus].latitude, busData[selectedBus].longitude],
//                 ]}
//                 color="blue"
//               />
//             )}
//             <RecenterMap
//               center={userLocation && [userLocation.lat, userLocation.lng]}
//             />
//           </MapContainer>

//           <button
//             className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
//             onClick={() => setShowPath(!showPath)}
//           >
//             {showPath ? "Hide Path" : "Show Distance and Path"}
//           </button>
//         </div>

//         {/* Info Panel */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
//           <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
//             Information
//           </h2>
//           {selectedBus && busData[selectedBus] ? (
//             <div>
//               <p className="mb-2">
//                 <strong>Bus Number:</strong> {selectedBus}
//               </p>
//               <p className="mb-2">
//                 <strong>Latitude:</strong>{" "}
//                 {busData[selectedBus].latitude.toFixed(6)}
//               </p>
//               <p className="mb-2">
//                 <strong>Longitude:</strong>{" "}
//                 {busData[selectedBus].longitude.toFixed(6)}
//               </p>
//               <p className="mb-2">
//                 <strong>Seat Status:</strong>{" "}
//                 {JSON.stringify(busData[selectedBus].seatStatus)}
//               </p>
//               {distance && (
//                 <p className="text-lg font-semibold text-green-600">
//                   Distance: {distance} km
//                 </p>
//               )}
//             </div>
//           ) : (
//             <p className="text-gray-500">Please select a bus to view details.</p>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }




import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getDistance } from "geolib";

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

// Helper component to update map center dynamically
function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 15);
    }
  }, [center, map]);
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

  // Function to request user location manually
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        setLocationEnabled(true);

        // Reverse Geocoding for place name
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${loc.lat}&lon=${loc.lng}`
        )
          .then((res) => res.json())
          .then((data) => setUserAddress(data.display_name || "Unknown Place"))
          .catch(() => setUserAddress("Unknown Place"));
      },
      (err) => {
        alert("Location access denied or unavailable!");
        console.error(err);
      }
    );
  };

  // Fetch initial bus data
  useEffect(() => {
    fetch("http://localhost:5000/api/busdata")
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
      .catch((err) => console.error(err));
  }, []);

  // WebSocket live updates
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");
    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setBusData((prev) => ({
        ...prev,
        [newData.busNumber]: newData,
      }));
    };
    return () => ws.close();
  }, []);

  // Distance calculation
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
    <section
      id="track"
      className="min-h-screen bg-gray-100 dark:bg-gray-900 py-16 px-6"
    >
      <h2 className="text-4xl font-bold text-center mb-12">Track Bus</h2>

      {/* Enable Location Button */}
      {!locationEnabled && (
        <div className="flex justify-center mb-6">
          <button
            onClick={getUserLocation}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Enable Location
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-2">
            Select Bus
          </label>
          <select
            value={selectedBus}
            onChange={(e) => setSelectedBus(e.target.value)}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
          >
            <option value="">-- Choose Bus --</option>
            {buses.map((bus) => (
              <option key={bus} value={bus}>
                {bus}
              </option>
            ))}
          </select>

          {/* Map */}
          <MapContainer
            center={userLocation || [20.5937, 78.9629]} // fallback: India
            zoom={13}
            style={{ height: "400px", width: "100%" }}
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
                position={[
                  busData[selectedBus].latitude,
                  busData[selectedBus].longitude,
                ]}
                icon={busIcon}
              >
                <Popup>{selectedBus}</Popup>
              </Marker>
            )}
            {showPath && userLocation && selectedBus && busData[selectedBus] && (
              <Polyline
                positions={[
                  [userLocation.lat, userLocation.lng],
                  [busData[selectedBus].latitude, busData[selectedBus].longitude],
                ]}
                color="blue"
              />
            )}
            <RecenterMap center={userLocation && [userLocation.lat, userLocation.lng]} />
          </MapContainer>

          <button
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
            onClick={() => setShowPath(!showPath)}
          >
            {showPath ? "Hide Path" : "Show Distance and Path"}
          </button>
        </div>

        {/* Info Panel */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            Information
          </h2>
          {selectedBus && busData[selectedBus] ? (
            <div>
              <p className="mb-2"><strong>Bus Number:</strong> {selectedBus}</p>
              <p className="mb-2"><strong>Latitude:</strong> {busData[selectedBus].latitude.toFixed(6)}</p>
              <p className="mb-2"><strong>Longitude:</strong> {busData[selectedBus].longitude.toFixed(6)}</p>
              <p className="mb-2"><strong>Seat Status:</strong> {JSON.stringify(busData[selectedBus].seatStatus)}</p>
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

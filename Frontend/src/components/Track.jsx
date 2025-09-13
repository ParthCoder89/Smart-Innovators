// import React, { useState, useEffect } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMap,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import { getDistance } from "geolib";
// import { BASE_URL } from "../config";

// // ✅ Import routing
// import "leaflet-routing-machine";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import PlanJourney from "./PlanJourney";

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

// // ✅ Custom routing component
// function Routing({ userLocation, busLocation, showPath }) {
//   const map = useMap();

//   useEffect(() => {
//     if (!userLocation || !busLocation || !showPath) return;

//     // Clear old routes
//     map.eachLayer((layer) => {
//       if (layer instanceof L.Routing.Control) {
//         map.removeControl(layer);
//       }
//     });

//     // Add new route
//     const routingControl = L.Routing.control({
//       waypoints: [
//         L.latLng(userLocation.lat, userLocation.lng),
//         L.latLng(busLocation.latitude, busLocation.longitude),
//       ],
//       lineOptions: {
//         styles: [{ color: "blue", weight: 4 }],
//       },
//       addWaypoints: false,
//       draggableWaypoints: false,
//       fitSelectedRoutes: true,
//       show: false,
//     }).addTo(map);

//     return () => map.removeControl(routingControl);
//   }, [userLocation, busLocation, showPath, map]);

//   return null;
// }

// // ✅ Custom map updater for focusing on user location
// function MapUpdater({ userLocation }) {
//   const map = useMap();

//   useEffect(() => {
//     if (userLocation) {
//       map.setView([userLocation.lat, userLocation.lng], 15, {
//         animate: true,
//       });
//     }
//   }, [userLocation, map]);

//   return null;
// }

// export default function TrackBus() {
//   const [userLocation, setUserLocation] = useState(null);
//   const [userAddress, setUserAddress] = useState("");
//   const [locationEnabled, setLocationEnabled] = useState(false);

//   const [buses, setBuses] = useState([]);
//   const [busData, setBusData] = useState({});
//   const [selectedBus, setSelectedBus] = useState("");
//   const [distance, setDistance] = useState(null);
//   const [showPath, setShowPath] = useState(false);

//   // User location
//   const getUserLocation = () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation not supported.");
//       return;
//     }
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
//         setUserLocation(loc);
//         setLocationEnabled(true);

//         // Reverse geocoding
//         fetch(
//           `https://nominatim.openstreetmap.org/reverse?format=json&lat=${loc.lat}&lon=${loc.lng}`
//         )
//           .then((res) => res.json())
//           .then((data) => setUserAddress(data.display_name || "Unknown Place"))
//           .catch(() => setUserAddress("Unknown Place"));
//       },
//       (err) => {
//         alert("Location access denied!");
//         console.error(err);
//       }
//     );
//   };

//   // Fetch buses from backend
//   useEffect(() => {
//     fetch(`${BASE_URL}/api/busdata`)
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
//       .catch((err) => console.error("❌ Fetch error:", err));
//   }, []);

//   // WebSocket live updates
//   useEffect(() => {
//     const ws = new WebSocket("wss://backendbus-1-9fdh.onrender.com");
//     ws.onmessage = (event) => {
//       const newData = JSON.parse(event.data);
//       setBusData((prev) => ({
//         ...prev,
//         [newData.busNumber]: newData,
//       }));
//     };
//     return () => ws.close();
//   }, []);

//   // Distance calc
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
//     <section id="track" className="min-h-screen bg-gray-100 dark:bg-gray-900 py-16 px-6">
//       <h2 className="text-5xl font-bold text-center mt-12 mb-2 ">Track Bus</h2>
//       <p className="text-center my-6">You can Track your bus and can find the distance from you and you can find the fair of your journey</p>
//       <PlanJourney />

//       {!locationEnabled && (
//         <div className="flex justify-center mb-6">
//           <button
//             onClick={getUserLocation}
//             className="bg-green-600 hover:bg-green-700 text-white mt-10 px-6 py-3 rounded-lg font-semibold"
//           >
//             Enable Location
//           </button>
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-6">
//         <div style={{ border: "3px solid grey" }} className="rounded-xl">
//           <label className="block text-gray-700 dark:text-gray-300 mb-1 pt-4 pl-[5%]">
//             Select Bus
//           </label>
//           <select
//             value={selectedBus}
//             onChange={(e) => setSelectedBus(e.target.value)}
//             className="w-[90%] p-2 border rounded-lg dark:bg-gray-700 dark:text-white mb-5 ml-[5%]"
//           >
//             <option value="" className="py-2">
//               -- Choose Bus --
//             </option>
//             {buses.map((bus) => (
//               <option key={bus} value={bus}>
//                 {bus}
//               </option>
//             ))}
//           </select>

//           {/* Map */}
//           <MapContainer
//             center={userLocation || [20.5937, 78.9629]}
//             zoom={5}
//             className="mx-auto"
//             style={{ height: "340px", width: "90%" }}
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
//                 position={[busData[selectedBus].latitude, busData[selectedBus].longitude]}
//                 icon={busIcon}
//               >
//                 <Popup>{selectedBus}</Popup>
//               </Marker>
//             )}

//             {/* ✅ Auto focus map on user location */}
//             <MapUpdater userLocation={userLocation} />

//             {/* ✅ Road-wise route */}
//             {showPath &&
//               userLocation &&
//               selectedBus &&
//               busData[selectedBus] && (
//                 <Routing
//                   userLocation={userLocation}
//                   busLocation={busData[selectedBus]}
//                   showPath={showPath}
//                 />
//               )}
//           </MapContainer>

//           <button
//             className="mt-8 ml-[5%] mb-6 w-[90%] bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
//             onClick={() => setShowPath(!showPath)}
//           >
//             {showPath ? "Hide Path" : "Show Distance and Path"}
//           </button>
//         </div>

//         {/* Info Panel */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg" style={{ border: "3px solid grey" }}>
//           <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white text-center">
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
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMap,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import { getDistance } from "geolib";
// import { BASE_URL } from "../config";
// import "leaflet-routing-machine";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// // ------------------ Stops & Paths ------------------
// const stopsData = [
//   { bus_stop: "Chowki Chauraha", latitude: 28.3486283, longitude: 79.4200996 },
//   { bus_stop: "Satellite Bus Station", latitude: 28.350626, longitude: 79.43909 },
//   { bus_stop: "Invertis University", latitude: 28.292112, longitude: 79.492715 },
//   { bus_stop: "Rajendra Nagar", latitude: 28.386917, longitude: 79.426248 },
//   { bus_stop: "Ayub Khan Chauraha", latitude: 28.355279, longitude: 79.417642 },
//   { bus_stop: "Bareilly Railway Junction", latitude: 28.337084, longitude: 79.410772 },
//   { bus_stop: "Vipin Hospital", latitude: 28.3894, longitude: 79.411212 },
//   { bus_stop: "Green Park Colony", latitude: 28.365282, longitude: 79.471673 },
//   { bus_stop: "Karamchari Nagar", latitude: 28.384432, longitude: 79.400033 },
//   { bus_stop: "Kargaina", latitude: 28.323756, longitude: 79.384363 },
//   { bus_stop: "Fun City", latitude: 28.40461, longitude: 79.459628 },
//   { bus_stop: "Cb Ganj", latitude: 28.399263, longitude: 79.379211 },
//   { bus_stop: "Phoenix mall", latitude: 28.395753, longitude: 79.456435 },
// ];

// const paths = {
//   "Chowki Chauraha": ["Satellite Bus Station", "Nariyawal", "Invertis University"],
//   "Satellite Bus Station": ["Nariyawal", "Invertis University"],
//   "Rajendra Nagar": ["Ekta Nagar", "Satellite Bus Station", "Nariyawal", "Invertis University"],
//   "Ayub Khan Chauraha": ["Aanchal colony", "Satellite Bus Station", "Nariyawal", "Invertis University"],
//   "Bareilly Railway Junction": ["Lal Phatak Buduan Road", "Kargil Chowk Park", "Akshar Vihar Park", "Satellite Bus Station", "Nariyawal", "Invertis University"],
//   "Vipin Hospital": ["Izzatnagar railway station road", "Pragati Nagar", "CI Park", "Bareilly shareef", "Satellite Bus Station", "Nariyawal", "Invertis University"],
//   "Green Park Colony": ["Bisalpur Chowraha", "Anand Vihar Colony", "Satellite Bus Station", "Nariyawal", "Invertis University"],
//   "Karamchari Nagar": ["Azam Nagar", "Chowki Chauraha", "Satellite Bus Station", "Nariyawal", "Invertis University"],
//   "Kargaina": ["Guru Nanak Petrol Pump", "84 Ghnata Temple West Bareilly", "Patel Chowk", "Chowki Chauraha", "Satellite Bus Station", "Nariyawal", "Invertis University"],
//   "Fun City": ["Phoenix United Mall", "Tulsi Nagar", "Anand Vihar Colony", "Satellite Bus Station", "Nariyawal", "Invertis University"],
// };

// // ------------------ Icons ------------------
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

// // ------------------ Routing Component ------------------
// function Routing({ start, end, color, zoomOnRoute }) {
//   const map = useMap();
//   useEffect(() => {
//     if (!start || !end) return;

//     const routingControl = L.Routing.control({
//       waypoints: [
//         L.latLng(start.latitude, start.longitude),
//         L.latLng(end.latitude, end.longitude),
//       ],
//       lineOptions: { styles: [{ color: color, weight: 5 }] },
//       addWaypoints: false,
//       draggableWaypoints: false,
//       fitSelectedRoutes: zoomOnRoute, // zoom if needed
//       show: false,
//     }).addTo(map);

//     return () => map.removeControl(routingControl);
//   }, [start, end, color, map, zoomOnRoute]);

//   return null;
// }

// // ------------------ Main Component ------------------
// export default function TrackBus() {
//   const [userLocation, setUserLocation] = useState(null);
//   const [userAddress, setUserAddress] = useState("");
//   const [locationEnabled, setLocationEnabled] = useState(false);

//   const [buses, setBuses] = useState([]);
//   const [busData, setBusData] = useState({});
//   const [selectedBus, setSelectedBus] = useState("");
//   const [distance, setDistance] = useState(null);

//   const [fromStop, setFromStop] = useState("");
//   const [pathStops, setPathStops] = useState([]);
//   const [selectedStop, setSelectedStop] = useState(null);

//   const [showBusPath, setShowBusPath] = useState(false);

//   const universityStop = stopsData.find((s) => s.bus_stop === "Invertis University");

//   const handleFromStop = (stopName) => {
//     setFromStop(stopName);
//     const path = paths[stopName] || [];
//     setPathStops(path);
//     const firstStopData = stopsData.find((s) => s.bus_stop === stopName);
//     setSelectedStop(firstStopData);
//   };

//   // ✅ User location
//   const getUserLocation = () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation not supported.");
//       return;
//     }
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
//         setUserLocation(loc);
//         setLocationEnabled(true);

//         fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${loc.lat}&lon=${loc.lng}`)
//           .then((res) => res.json())
//           .then((data) => setUserAddress(data.display_name || "Unknown Place"))
//           .catch(() => setUserAddress("Unknown Place"));
//       },
//       (err) => {
//         alert("Location access denied!");
//         console.error(err);
//       }
//     );
//   };

//   // ✅ Fetch buses
//   // useEffect(() => {
//   //   fetch(`${BASE_URL}/api/busdata`)
//   //     .then((res) => res.json())
//   //     .then((data) => {
//   //       const latest = {};
//   //       const uniqueBuses = [...new Set(data.map((d) => d.busNumber))];
//   //       data.forEach((d) => {
//   //         if (!latest[d.busNumber] || d.timestamp > latest[d.busNumber].timestamp) {
//   //           latest[d.busNumber] = d;
//   //         }
//   //       });
//   //       setBuses(uniqueBuses);
//   //       setBusData(latest);
//   //     })
//   //     .catch((err) => console.error("❌ Fetch error:", err));
//   // }, []);

//   useEffect(() => {
//     fetch(`${BASE_URL}/api/busdata`)
//       .then((res) => res.json())
//       .then((data) => {
//         const latest = {};
//         const uniqueBuses = [];

//         data.forEach((d) => {
//           // ✅ Check valid latitude & longitude
//           if (d.latitude && d.longitude && d.latitude !== 0 && d.longitude !== 0) {
//             if (!latest[d.busNumber] || d.timestamp > latest[d.busNumber].timestamp) {
//               latest[d.busNumber] = d;
//             }
//             if (!uniqueBuses.includes(d.busNumber)) {
//               uniqueBuses.push(d.busNumber);
//             }
//           }
//         });

//         setBuses(uniqueBuses);
//         setBusData(latest);
//       })
//       .catch((err) => console.error("❌ Fetch error:", err));
//   }, []);


//   // ✅ WebSocket live updates
//   // useEffect(() => {
//   //   const ws = new WebSocket("wss://backendbus-1-9fdh.onrender.com");
//   //   ws.onmessage = (event) => {
//   //     const newData = JSON.parse(event.data);
//   //     setBusData((prev) => ({
//   //       ...prev,
//   //       [newData.busNumber]: newData,
//   //     }));
//   //   };
//   //   return () => ws.close();
//   // }, []);
//   useEffect(() => {
//     const ws = new WebSocket("wss://backendbus-1-9fdh.onrender.com");
//     ws.onmessage = (event) => {
//       const newData = JSON.parse(event.data);

//       // ✅ Agar data invalid hai (sensor off) to ignore karo
//       if (
//         newData.latitude &&
//         newData.longitude &&
//         newData.latitude !== 0 &&
//         newData.longitude !== 0
//       ) {
//         setBusData((prev) => ({
//           ...prev,
//           [newData.busNumber]: newData,
//         }));

//         // Agar naya bus number hai to buses list me add karo
//         setBuses((prev) =>
//           prev.includes(newData.busNumber) ? prev : [...prev, newData.busNumber]
//         );
//       }
//     };
//     return () => ws.close();
//   }, []);


//   // ✅ Distance calc
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
//     <section id="track" className="min-h-screen bg-gray-100 dark:bg-gray-900 py-16 px-6">
//       <h2 className="text-5xl font-bold text-center mt-12 mb-2">🚌 Track Bus</h2>

//       {/* Enable Location Button */}
//       {!locationEnabled && (
//         <div className="flex justify-center mb-6">
//           <button
//             onClick={getUserLocation}
//             className="bg-green-600 hover:bg-green-700 text-white mt-10 px-6 py-3 rounded-lg font-semibold"
//           >
//             Enable Location
//           </button>
//         </div>
//       )}

//       {/* From Stop Selector */}
//       <div className="flex justify-center mb-6">
//         <select
//           className="p-2 rounded bg-gray-200 dark:bg-gray-800"
//           onChange={(e) => handleFromStop(e.target.value)}
//           value={fromStop}
//         >
//           <option value="">Select From Stop</option>
//           {stopsData.filter(s => s.bus_stop !== "Invertis University").map((stop, idx) => (
//             <option key={idx} value={stop.bus_stop}>{stop.bus_stop}</option>
//           ))}
//         </select>
//       </div>

//       {/* Path Stops List */}
//       {pathStops.length > 0 && (
//         <div className="flex flex-col items-center max-w-md mx-auto p-4 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg mb-4">
//           <h2 className="font-semibold mb-4 text-xl">Stops on your path:</h2>
//           <div className="flex flex-col items-center space-y-2">
//             {pathStops.map((stop, idx) => (
//               <React.Fragment key={idx}>
//                 <div
//                   className="w-60 text-center px-4 py-2 rounded-full text-white font-semibold bg-gray-500 cursor-pointer"
//                   onClick={() => setSelectedStop(stopsData.find(s => s.bus_stop === stop))}
//                 >
//                   {stop}
//                 </div>
//                 {idx < pathStops.length - 1 && <span className="text-gray-400 font-bold text-2xl">↓</span>}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Main Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-6">
//         {/* Map Panel */}
//         <div style={{ border: "3px solid grey" }} className="rounded-xl">
//           <label className="block text-gray-700 dark:text-gray-300 mb-1 pt-4 pl-[5%]">
//             Select Bus
//           </label>
//           <select
//             value={selectedBus}
//             onChange={(e) => setSelectedBus(e.target.value)}
//             className="w-[90%] p-2 border rounded-lg dark:bg-gray-700 dark:text-white mb-5 ml-[5%]"
//           >
//             <option value="">-- Choose Bus --</option>
//             {buses.map((bus) => (
//               <option key={bus} value={bus}>{bus}</option>
//             ))}
//           </select>

//           <MapContainer
//             center={userLocation || [20.5937, 78.9629]}
//             zoom={5}
//             className="mx-auto"
//             style={{ height: "340px", width: "90%" }}
//           >
//             <TileLayer
//               attribution="&copy; OpenStreetMap"
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//             {/* User Marker */}
//             {userLocation && (
//               <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
//                 <Popup><b>Your Location</b><br />{userAddress}</Popup>
//               </Marker>
//             )}

//             {/* Bus Marker */}
//             {selectedBus && busData[selectedBus] && (
//               <Marker
//                 position={[busData[selectedBus].latitude, busData[selectedBus].longitude]}
//                 icon={busIcon}
//               >
//                 <Popup>{selectedBus}</Popup>
//               </Marker>
//             )}

//             {/* ✅ Stop to Invertis path (auto on click) */}
//             {selectedStop && <Routing start={selectedStop} end={universityStop} color="blue" zoomOnRoute={true} />}

//             {/* ✅ User to Bus path (only when button pressed) */}
//             {showBusPath && userLocation && selectedBus && busData[selectedBus] && (
//               <Routing
//                 start={{ latitude: userLocation.lat, longitude: userLocation.lng }}
//                 end={busData[selectedBus]}
//                 color="gray"
//                 zoomOnRoute={true}
//               />
//             )}
//           </MapContainer>

//           <button
//             className="mt-8 ml-[5%] mb-6 w-[90%] bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
//             onClick={() => setShowBusPath(!showBusPath)}
//           >
//             {showBusPath ? "Hide Bus Path" : "Show Bus Path"}
//           </button>
//         </div>

//         {/* Info Panel */}
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg" style={{ border: "3px solid grey" }}>
//           <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white text-center">Information</h2>
//           {selectedBus && busData[selectedBus] ? (
//             <div>
//               <p className="mb-2"><strong>Bus Number:</strong> {selectedBus}</p>
//               <p className="mb-2"><strong>Latitude:</strong> {busData[selectedBus].latitude.toFixed(6)}</p>
//               <p className="mb-2"><strong>Longitude:</strong> {busData[selectedBus].longitude.toFixed(6)}</p>
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
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// ------------------ Stops & Paths ------------------
const stopsData = [
  { bus_stop: "Chowki Chauraha", latitude: 28.3486283, longitude: 79.4200996 },
  { bus_stop: "Satellite Bus Station", latitude: 28.350626, longitude: 79.43909 },
  { bus_stop: "Invertis University", latitude: 28.292112, longitude: 79.492715 },
  { bus_stop: "Rajendra Nagar", latitude: 28.386917, longitude: 79.426248 },
  { bus_stop: "Ayub Khan Chauraha", latitude: 28.355279, longitude: 79.417642 },
  { bus_stop: "Bareilly Railway Junction", latitude: 28.337084, longitude: 79.410772 },
  { bus_stop: "Vipin Hospital", latitude: 28.3894, longitude: 79.411212 },
  { bus_stop: "Green Park Colony", latitude: 28.365282, longitude: 79.471673 },
  { bus_stop: "Karamchari Nagar", latitude: 28.384432, longitude: 79.400033 },
  { bus_stop: "Kargaina", latitude: 28.323756, longitude: 79.384363 },
  { bus_stop: "Fun City", latitude: 28.40461, longitude: 79.459628 },
  { bus_stop: "Cb Ganj", latitude: 28.399263, longitude: 79.379211 },
  { bus_stop: "Phoenix mall", latitude: 28.395753, longitude: 79.456435 },
];

const paths = {
  "Chowki Chauraha": ["Satellite Bus Station", "Nariyawal", "Invertis University"],
  "Satellite Bus Station": ["Nariyawal", "Invertis University"],
  "Rajendra Nagar": ["Ekta Nagar", "Satellite Bus Station", "Nariyawal", "Invertis University"],
  "Ayub Khan Chauraha": ["Aanchal colony", "Satellite Bus Station", "Nariyawal", "Invertis University"],
  "Bareilly Railway Junction": ["Lal Phatak Buduan Road", "Kargil Chowk Park", "Akshar Vihar Park", "Satellite Bus Station", "Nariyawal", "Invertis University"],
  "Vipin Hospital": ["Izzatnagar railway station road", "Pragati Nagar", "CI Park", "Bareilly shareef", "Satellite Bus Station", "Nariyawal", "Invertis University"],
  "Green Park Colony": ["Bisalpur Chowraha", "Anand Vihar Colony", "Satellite Bus Station", "Nariyawal", "Invertis University"],
  "Karamchari Nagar": ["Azam Nagar", "Chowki Chauraha", "Satellite Bus Station", "Nariyawal", "Invertis University"],
  "Kargaina": ["Guru Nanak Petrol Pump", "84 Ghnata Temple West Bareilly", "Patel Chowk", "Chowki Chauraha", "Satellite Bus Station", "Nariyawal", "Invertis University"],
  "Fun City": ["Phoenix United Mall", "Tulsi Nagar", "Anand Vihar Colony", "Satellite Bus Station", "Nariyawal", "Invertis University"],
};

// ------------------ Icons ------------------
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

// ------------------ Routing Component ------------------
function Routing({ start, end, color, zoomOnRoute }) {
  const map = useMap();
  useEffect(() => {
    if (!start || !end) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(start.latitude, start.longitude),
        L.latLng(end.latitude, end.longitude),
      ],
      lineOptions: { styles: [{ color: color, weight: 5 }] },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: zoomOnRoute, // zoom if needed
      show: false,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [start, end, color, map, zoomOnRoute]);

  return null;
}

// ------------------ Main Component ------------------
export default function TrackBus() {
  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [locationEnabled, setLocationEnabled] = useState(false);

  const [buses, setBuses] = useState([]);
  const [busData, setBusData] = useState({});
  const [selectedBus, setSelectedBus] = useState("");
  const [distance, setDistance] = useState(null);

  const [fromStop, setFromStop] = useState("");
  const [pathStops, setPathStops] = useState([]);
  const [selectedStop, setSelectedStop] = useState(null);

  const [showBusPath, setShowBusPath] = useState(false);

  const universityStop = stopsData.find((s) => s.bus_stop === "Invertis University");

  const handleFromStop = (stopName) => {
    setFromStop(stopName);
    const path = paths[stopName] || [];
    setPathStops(path);
    const firstStopData = stopsData.find((s) => s.bus_stop === stopName);
    setSelectedStop(firstStopData);
  };

  // ✅ User location
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

        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${loc.lat}&lon=${loc.lng}`)
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

  useEffect(() => {
    const ws = new WebSocket("wss://backendbus-1-9fdh.onrender.com");

    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      const now = Date.now();
      const dataTime = new Date(newData.timestamp).getTime();

      // ✅ Agar data invalid hai ya purana hai to ignore karo
      if (
        newData.latitude &&
        newData.longitude &&
        newData.latitude !== 0 &&
        newData.longitude !== 0 &&
        !isNaN(dataTime) &&
        now - dataTime < 60000   // sirf last 1 min ka data allow
      ) {
        setBusData((prev) => ({
          ...prev,
          [newData.busNumber]: newData,
        }));

        setBuses((prev) =>
          prev.includes(newData.busNumber) ? prev : [...prev, newData.busNumber]
        );
      }
    };

    return () => ws.close();
  }, []);


  useEffect(() => {
    fetch(`${BASE_URL}/api/busdata`)
      .then((res) => res.json())
      .then((data) => {
        const latest = {};
        const uniqueBuses = [];
        const now = Date.now();

        data.forEach((d) => {
          const dataTime = new Date(d.timestamp).getTime();

          // ✅ latitude/longitude valid aur record fresh (last 1 min ke andar)
          if (
            d.latitude && d.longitude &&
            d.latitude !== 0 && d.longitude !== 0 &&
            !isNaN(dataTime) &&
            now - dataTime < 10000
          ) {
            if (!latest[d.busNumber] || d.timestamp > latest[d.busNumber].timestamp) {
              latest[d.busNumber] = d;
            }
            if (!uniqueBuses.includes(d.busNumber)) {
              uniqueBuses.push(d.busNumber);
            }
          }
        });

        setBuses(uniqueBuses);
        setBusData(latest);
      })
      .catch((err) => console.error("❌ Fetch error:", err));
  }, []);



  // ✅ WebSocket live updates
  // useEffect(() => {
  //   const ws = new WebSocket("wss://backendbus-1-9fdh.onrender.com");
  //   ws.onmessage = (event) => {
  //     const newData = JSON.parse(event.data);
  //     setBusData((prev) => ({
  //       ...prev,
  //       [newData.busNumber]: newData,
  //     }));
  //   };
  //   return () => ws.close();
  // }, []);
  useEffect(() => {
    const ws = new WebSocket("wss://backendbus-1-9fdh.onrender.com");
    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);

      // ✅ Agar data invalid hai (sensor off) to ignore karo
      if (
        newData.latitude &&
        newData.longitude &&
        newData.latitude !== 0 &&
        newData.longitude !== 0
      ) {
        setBusData((prev) => ({
          ...prev,
          [newData.busNumber]: newData,
        }));

        // Agar naya bus number hai to buses list me add karo
        setBuses((prev) =>
          prev.includes(newData.busNumber) ? prev : [...prev, newData.busNumber]
        );
      }
    };
    return () => ws.close();
  }, []);


  // ✅ Distance calc
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
      <h2 className="text-5xl font-bold text-center mt-12 mb-2">🚌 Track Bus</h2>

      {/* Enable Location Button */}
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

      {/* From Stop Selector */}
      <div className="flex justify-center mb-6">
        <select
          className="p-2 rounded bg-gray-200 dark:bg-gray-800"
          onChange={(e) => handleFromStop(e.target.value)}
          value={fromStop}
        >
          <option value="">Select From Stop</option>
          {stopsData.filter(s => s.bus_stop !== "Invertis University").map((stop, idx) => (
            <option key={idx} value={stop.bus_stop}>{stop.bus_stop}</option>
          ))}
        </select>
      </div>

      {/* Path Stops List */}
      {pathStops.length > 0 && (
        <div className="flex flex-col items-center max-w-md mx-auto p-4 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg mb-4">
          <h2 className="font-semibold mb-6 text-xl">Stops on your path:</h2>
          <div className="flex flex-col items-center space-y-2">
            {pathStops.map((stop, idx) => (
              <React.Fragment key={idx}>
                <div
                  className="w-60 text-center px-4 py-2 rounded-full text-white font-semibold bg-gray-500 cursor-pointer"
                  onClick={() => setSelectedStop(stopsData.find(s => s.bus_stop === stop))}
                >
                  {stop}
                </div>
                {idx < pathStops.length - 1 && <span className="text-gray-400 font-bold text-2xl">↓</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-6">
        {/* Map Panel */}
        <div style={{ border: "3px solid grey" }} className="rounded-xl">
          <label className="block text-gray-700 dark:text-gray-300 mb-1 pt-4 pl-[5%]">
            Select Bus
          </label>
          <select
            value={selectedBus}
            onChange={(e) => setSelectedBus(e.target.value)}
            className="w-[90%] p-2 border rounded-lg dark:bg-gray-700 dark:text-white mb-5 ml-[5%]"
          >
            <option value="">-- Choose Bus --</option>
            {buses.map((bus) => (
              <option key={bus} value={bus}>{bus}</option>
            ))}
          </select>

          <MapContainer
            center={userLocation || [20.5937, 78.9629]}
            zoom={5}
            className="mx-auto"
            style={{ height: "340px", width: "85%" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* User Marker */}
            {userLocation && (
              <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                <Popup><b>Your Location</b><br />{userAddress}</Popup>
              </Marker>
            )}

            {/* Bus Marker */}
            {selectedBus && busData[selectedBus] && (
              <Marker
                position={[busData[selectedBus].latitude, busData[selectedBus].longitude]}
                icon={busIcon}
              >
                <Popup>{selectedBus}</Popup>
              </Marker>
            )}

            {/* ✅ Stop to Invertis path (auto on click) */}
            {selectedStop && <Routing start={selectedStop} end={universityStop} color="blue" zoomOnRoute={true} />}

            {/* ✅ User to Bus path (only when button pressed) */}
            {showBusPath && userLocation && selectedBus && busData[selectedBus] && (
              <Routing
                start={{ latitude: userLocation.lat, longitude: userLocation.lng }}
                end={busData[selectedBus]}
                color="gray"
                zoomOnRoute={true}
              />
            )}
          </MapContainer>

          <button
            className="mt-8 ml-[5%] mb-6 w-[90%] bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
            onClick={() => setShowBusPath(!showBusPath)}
          >
            {showBusPath ? "Hide Bus Path" : "Show Bus Path"}
          </button>
        </div>

        {/* Info Panel */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg" style={{ border: "3px solid grey" }}>
          <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white text-center">Information</h2>
          {selectedBus && busData[selectedBus] ? (
            <div>
              <p className="mb-2"><strong>Bus Number:</strong> {selectedBus}</p>
              <p className="mb-2"><strong>Latitude:</strong> {busData[selectedBus].latitude.toFixed(6)}</p>
              <p className="mb-2"><strong>Longitude:</strong> {busData[selectedBus].longitude.toFixed(6)}</p>
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

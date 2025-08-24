// import React from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// // Example bus coordinates
// const busData = [
//     { id: "Bus 101", position: [28.6139, 77.209], route: "Delhi" },
//     { id: "Bus 102", position: [28.7041, 77.1025], route: "Kashmere Gate" },
//     { id: "Bus 103", position: [28.5355, 77.391], route: "Noida" },
//     { id: "Bus 104", position: [28.4595, 77.0266], route: "Gurgaon" },
// ];

// const TrackBus = () => {
//     return (
//         <section id="track" className="px-10 py-20 bg-gray-100 min-h-screen">
//             <h2 className="text-5xl text-black font-bold mb-2 text-center mt-6">Track Your Bus 🚌</h2> <p className="text-gray-700 mb-4 mt-10 text-2xl font-semibold text-center px-40"> Enter your Bus ID and click on the button below to see the real-time location of your bus on the map. </p>

//             {/* Grid layout */}
//             <div className="flex justify-center mt-24">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-28">
//                     {busData.map((bus, index) => (
//                         <div
//                             key={index}
//                             className="bg-white rounded-xl shadow-lg overflow-hidden w-[30vw]"
//                         >
//                             {/* Bus ID */}
//                             <h3 className="text-xl font-bold text-center bg-yellow-600 text-white py-2">
//                                 {bus.id} - {bus.route}
//                             </h3>

//                             {/* Map */}
//                             <div className="h-64 w-full">
//                                 <MapContainer
//                                     center={bus.position}
//                                     zoom={13}
//                                     scrollWheelZoom={true}
//                                     style={{ height: "100%", width: "100%" }}
//                                 >
//                                     <TileLayer
//                                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                                         attribution="&copy; OpenStreetMap contributors"
//                                     />
//                                     <Marker position={bus.position}>
//                                         <Popup>
//                                             {bus.id} is currently near {bus.route} 🚌
//                                         </Popup>
//                                     </Marker>
//                                 </MapContainer>
//                             </div>

//                             {/* Track Button */}
//                             <div className="flex justify-center py-4">
//                                 <button
//                                     onClick={() => alert(`${bus.id} tracking initiated`)}
//                                     className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
//                                 >
//                                     Track {bus.id}
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//         </section>
//     );
// };

// export default TrackBus;





// import React, { useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import L from "leaflet";
// import "leaflet-routing-machine";

// const Routing = ({ userLocation, busLocation }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (!map) return;

//     const routingControl = L.Routing.control({
//       waypoints: [
//         L.latLng(userLocation[0], userLocation[1]),
//         L.latLng(busLocation[0], busLocation[1]),
//       ],
//       routeWhileDragging: true,
//       show: false,
//     }).addTo(map);

//     return () => map.removeControl(routingControl);
//   }, [map, userLocation, busLocation]);

//   return null;
// };

// const TrackBus = () => {
//   // Example: user location (Delhi) and bus location (Noida)
//   const userLocation = [28.7041, 77.1025]; // User
//   const busLocation = [28.5355, 77.3910]; // Bus

//   return (
//     <MapContainer
//       center={userLocation}
//       zoom={10}
//       style={{ height: "500px", width: "100%" }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution="&copy; OpenStreetMap contributors"
//       />
//       <Marker position={userLocation}>
//         <Popup>Your Location</Popup>
//       </Marker>
//       <Marker position={busLocation}>
//         <Popup>Bus Location</Popup>
//       </Marker>
//       <Routing userLocation={userLocation} busLocation={busLocation} />
//     </MapContainer>
//   );
// };

// export default TrackBus;





// import React, { useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import L from "leaflet";
// import "leaflet-routing-machine";

// // Example bus coordinates
// const busData = [
//   { id: "Bus 101", position: [28.6139, 77.209], route: "Delhi" },
//   { id: "Bus 102", position: [28.7041, 77.1025], route: "Kashmere Gate" },
//   { id: "Bus 103", position: [28.5355, 77.391], route: "Noida" },
//   { id: "Bus 104", position: [28.4595, 77.0266], route: "Gurgaon" },
// ];

// // Dummy user location (मान लो user Delhi के पास है)
// const userLocation = [28.7041, 77.1025];

// // Routing Component
// const Routing = ({ userLocation, busLocation }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (!map) return;

//     const routingControl = L.Routing.control({
//       waypoints: [
//         L.latLng(userLocation[0], userLocation[1]),
//         L.latLng(busLocation[0], busLocation[1]),
//       ],
//       lineOptions: {
//         styles: [{ color: "blue", weight: 4 }], // सभी के लिए एक ही color
//       },
//       addWaypoints: false,
//       draggableWaypoints: false,
//       fitSelectedRoutes: true,
//       show: false,
//     }).addTo(map);

//     return () => map.removeControl(routingControl);
//   }, [map, userLocation, busLocation]);

//   return null;
// };

// const TrackBus = () => {
//   return (
//     <section id="track" className="px-10 py-20 bg-gray-100 min-h-screen">
//       <h2 className="text-5xl text-black font-bold mb-2 text-center mt-6">
//         Track Your Bus 🚌
//       </h2>
//       <p className="text-gray-700 mb-4 mt-10 text-2xl font-semibold text-center px-40">
//         Enter your Bus ID and see the route from your location to the bus in
//         real-time.
//       </p>

//       {/* Grid layout */}
//       <div className="flex justify-center mt-24">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-28">
//           {busData.map((bus, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow-lg overflow-hidden w-[30vw]"
//             >
//               {/* Bus ID */}
//               <h3 className="text-xl font-bold text-center bg-yellow-600 text-white py-2">
//                 {bus.id} - {bus.route}
//               </h3>

//               {/* Map */}
//               <div className="h-64 w-full">
//                 <MapContainer
//                   center={bus.position}
//                   zoom={12}
//                   scrollWheelZoom={true}
//                   style={{ height: "100%", width: "100%" }}
//                 >
//                   <TileLayer
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     attribution="&copy; OpenStreetMap contributors"
//                   />
//                   <Marker position={userLocation}>
//                     <Popup>Your Location 📍</Popup>
//                   </Marker>
//                   <Marker position={bus.position}>
//                     <Popup>
//                       {bus.id} is currently near {bus.route} 🚌
//                     </Popup>
//                   </Marker>

//                   {/* Route from User → Bus */}
//                   <Routing
//                     userLocation={userLocation}
//                     busLocation={bus.position}
//                   />
//                 </MapContainer>
//               </div>

//               {/* Track Button */}
//               <div className="flex justify-center py-4">
//                 <button
//                   onClick={() => alert(`${bus.id} tracking initiated`)}
//                   className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
//                 >
//                   Track {bus.id}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TrackBus;


// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import L from "leaflet";
// import "leaflet-routing-machine";

// // Example bus coordinates
// const busData = [
//   { id: "Bus 101", position: [28.6139, 77.209], route: "Delhi" },
//   { id: "Bus 102", position: [28.7041, 77.1025], route: "Kashmere Gate" },
//   { id: "Bus 103", position: [28.5355, 77.391], route: "Noida" },
//   { id: "Bus 104", position: [28.4595, 77.0266], route: "Gurgaon" },
// ];

// // Routing Component
// const Routing = ({ userLocation, busLocation }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (!map || !userLocation) return;

//     const routingControl = L.Routing.control({
//       waypoints: [
//         L.latLng(userLocation[0], userLocation[1]),
//         L.latLng(busLocation[0], busLocation[1]),
//       ],
//       lineOptions: {
//         styles: [{ color: "blue", weight: 4 }], // Same color for all buses
//       },
//       addWaypoints: false,
//       draggableWaypoints: false,
//       fitSelectedRoutes: true,
//       show: false,
//     }).addTo(map);

//     return () => map.removeControl(routingControl);
//   }, [map, userLocation, busLocation]);

//   return null;
// };

// const TrackBus = () => {
//   const [userLocation, setUserLocation] = useState([28.7041, 77.1025]); // Default Delhi

//   // Detect user location (if allowed)
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           setUserLocation([pos.coords.latitude, pos.coords.longitude]);
//         },
//         (err) => {
//           console.error("Location access denied, using default:", err);
//         }
//       );
//     }
//   }, []);

//   return (
//     <section id="track" className="px-10 py-20 bg-gray-100 min-h-screen">
//       <h2 className="text-5xl text-black font-bold mb-2 text-center mt-6">
//         Track Your Bus 🚌
//       </h2>
//       <p className="text-gray-700 mb-4 mt-10 text-2xl font-semibold text-center px-40">
//         Enter your Bus ID and see the route from your location to the bus in
//         real-time.
//       </p>

//       {/* Grid layout */}
//       <div className="flex justify-center mt-24">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-28">
//           {busData.map((bus, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow-lg overflow-hidden w-[30vw]"
//             >
//               {/* Bus ID */}
//               <h3 className="text-xl font-bold text-center bg-yellow-600 text-white py-2">
//                 {bus.id} - {bus.route}
//               </h3>

//               {/* Map */}
//               <div className="h-64 w-full">
//                 <MapContainer
//                   center={bus.position}
//                   zoom={12}
//                   scrollWheelZoom={true}
//                   style={{ height: "100%", width: "100%" }}
//                 >
//                   <TileLayer
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     attribution="&copy; OpenStreetMap contributors"
//                   />
//                   <Marker position={userLocation}>
//                     <Popup>Your Location 📍</Popup>
//                   </Marker>
//                   <Marker position={bus.position}>
//                     <Popup>
//                       {bus.id} is currently near {bus.route} 🚌
//                     </Popup>
//                   </Marker>

//                   {/* Route from User → Bus */}
//                   <Routing
//                     userLocation={userLocation}
//                     busLocation={bus.position}
//                   />
//                 </MapContainer>
//               </div>

//               {/* Track Button */}
//               <div className="flex justify-center py-4">
//                 <button
//                   onClick={() => alert(`${bus.id} tracking initiated`)}
//                   className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
//                 >
//                   Track {bus.id}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TrackBus;



// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// // Bus ke fake coordinates
// const busLocations = [
//   { id: 1, lat: 28.7041, lng: 77.1025, name: "Bus 1 (Delhi)" },
//   { id: 2, lat: 27.1767, lng: 78.0081, name: "Bus 2 (Agra)" },
//   { id: 3, lat: 26.9124, lng: 75.7873, name: "Bus 3 (Jaipur)" },
//   { id: 4, lat: 29.9457, lng: 78.1642, name: "Bus 4 (Haridwar)" },
// ];

// export default function TrackBus() {
//   const [userLocation, setUserLocation] = useState(null);

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
//           console.error("Location access denied:", err);
//         }
//       );
//     }
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-center mb-6">Track Buses from Your Location</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {busLocations.map((bus) => (
//           <div key={bus.id} className="shadow-lg rounded-2xl overflow-hidden border">
//             <MapContainer
//               center={[bus.lat, bus.lng]}
//               zoom={6}
//               style={{ height: "300px", width: "100%" }}
//             >
//               <TileLayer
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 attribution="&copy; OpenStreetMap contributors"
//               />

//               {/* User Location */}
//               {userLocation && (
//                 <Marker position={[userLocation.lat, userLocation.lng]}>
//                   <Popup>You are here</Popup>
//                 </Marker>
//               )}

//               {/* Bus Location */}
//               <Marker position={[bus.lat, bus.lng]}>
//                 <Popup>{bus.name}</Popup>
//               </Marker>

//               {/* Path between user & bus */}
//               {userLocation && (
//                 <Polyline
//                   positions={[
//                     [userLocation.lat, userLocation.lng],
//                     [bus.lat, bus.lng],
//                   ]}
//                   color="blue"
//                 />
//               )}
//             </MapContainer>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import L from "leaflet";
// import "leaflet-routing-machine";

// // Bus ke fake coordinates
// const busLocations = [
//   { id: 1, lat: 28.7041, lng: 77.1025, name: "Bus 1 (Delhi)" },
//   { id: 2, lat: 27.1767, lng: 78.0081, name: "Bus 2 (Agra)" },
//   { id: 3, lat: 26.9124, lng: 75.7873, name: "Bus 3 (Jaipur)" },
//   { id: 4, lat: 29.9457, lng: 78.1642, name: "Bus 4 (Haridwar)" },
// ];

// // Routing component
// function Routing({ userLocation, busLocation }) {
//   const map = useMap();

//   useEffect(() => {
//     if (!map || !userLocation) return;

//     // Routing Control
//     const routingControl = L.Routing.control({
//       waypoints: [
//         L.latLng(userLocation.lat, userLocation.lng),
//         L.latLng(busLocation.lat, busLocation.lng),
//       ],
//       lineOptions: {
//         styles: [{ color: "blue", weight: 5 }],
//       },
//       addWaypoints: false,
//       draggableWaypoints: false,
//       fitSelectedRoutes: true,
//       show: false,
//     }).addTo(map);

//     return () => map.removeControl(routingControl);
//   }, [map, userLocation, busLocation]);

//   return null;
// }

// export default function TrackBus() {
//   const [userLocation, setUserLocation] = useState(null);

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
//           console.error("Location access denied:", err);
//         }
//       );
//     }
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-center mb-6">
//         Track Buses from Your Location
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {busLocations.map((bus) => (
//           <div
//             key={bus.id}
//             className="shadow-lg rounded-2xl overflow-hidden border"
//           >
//             <MapContainer
//               center={[bus.lat, bus.lng]}
//               zoom={6}
//               style={{ height: "300px", width: "100%" }}
//             >
//               <TileLayer
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 attribution="&copy; OpenStreetMap contributors"
//               />

//               {/* User Location */}
//               {userLocation && (
//                 <Marker position={[userLocation.lat, userLocation.lng]}>
//                   <Popup>You are here</Popup>
//                 </Marker>
//               )}

//               {/* Bus Location */}
//               <Marker position={[bus.lat, bus.lng]}>
//                 <Popup>{bus.name}</Popup>
//               </Marker>

//               {/* Real Road Path */}
//               {userLocation && (
//                 <Routing
//                   userLocation={userLocation}
//                   busLocation={{ lat: bus.lat, lng: bus.lng }}
//                 />
//               )}
//             </MapContainer>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import L from "leaflet";
// import "leaflet-routing-machine";

// // Bus ke fake coordinates
// const busLocations = [
//   { id: "Bus 101", lat: 28.6139, lng: 77.209, route: "Delhi" },
//   { id: "Bus 102", lat: 28.7041, lng: 77.1025, route: "Kashmere Gate" },
//   { id: "Bus 103", lat: 28.5355, lng: 77.391, route: "Noida" },
//   { id: "Bus 104", lat: 28.4595, lng: 77.0266, route: "Gurgaon" },
// ];

// // Routing component
// function Routing({ userLocation, busLocation }) {
//   const map = useMap();

//   useEffect(() => {
//     if (!map || !userLocation) return;

//     const routingControl = L.Routing.control({
//       waypoints: [
//         L.latLng(userLocation.lat, userLocation.lng),
//         L.latLng(busLocation.lat, busLocation.lng),
//       ],
//       lineOptions: {
//         styles: [{ color: "blue", weight: 5 }],
//       },
//       addWaypoints: false,
//       draggableWaypoints: false,
//       fitSelectedRoutes: true,
//       show: false,
//     }).addTo(map);

//     return () => map.removeControl(routingControl);
//   }, [map, userLocation, busLocation]);

//   return null;
// }

// export default function TrackBus() {
//   const [userLocation, setUserLocation] = useState(null);

//   // Detect user location
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
//           console.error("Location access denied:", err);
//         }
//       );
//     }
//   }, []);

//   return (
//     <section id="track" className="px-10 py-20 bg-gray-100 min-h-screen">
//       <h2 className="text-5xl text-black font-bold mb-2 text-center mt-6">
//         Track Your Bus 🚌
//       </h2>
//       <p className="text-gray-700 mb-4 mt-10 text-2xl font-semibold text-center px-40">
//         Enter your Bus ID and click on the button below to see the real-time
//         route from your location to the bus.
//       </p>

//       {/* Grid layout */}
//       <div className="flex justify-center mt-24">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-28">
//           {busLocations.map((bus, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow-lg overflow-hidden w-[30vw]"
//             >
//               {/* Bus ID */}
//               <h3 className="text-xl font-bold text-center bg-yellow-600 text-white py-2">
//                 {bus.id} - {bus.route}
//               </h3>

//               {/* Map */}
//               <div className="h-64 w-full">
//                 <MapContainer
//                   center={[bus.lat, bus.lng]}
//                   zoom={12}
//                   scrollWheelZoom={true}
//                   style={{ height: "100%", width: "100%" }}
//                 >
//                   <TileLayer
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     attribution="&copy; OpenStreetMap contributors"
//                   />

//                   {/* User Location */}
//                   {userLocation && (
//                     <Marker position={[userLocation.lat, userLocation.lng]}>
//                       <Popup>You are here 📍</Popup>
//                     </Marker>
//                   )}

//                   {/* Bus Location */}
//                   <Marker position={[bus.lat, bus.lng]}>
//                     <Popup>
//                       {bus.id} is currently near {bus.route} 🚌
//                     </Popup>
//                   </Marker>

//                   {/* Real Road Path */}
//                   {userLocation && (
//                     <Routing
//                       userLocation={userLocation}
//                       busLocation={{ lat: bus.lat, lng: bus.lng }}
//                     />
//                   )}
//                 </MapContainer>
//               </div>

//               {/* Track Button */}
//               <div className="flex justify-center py-4">
//                 <button
//                   onClick={() =>
//                     alert(`Tracking started for ${bus.id} - ${bus.route}`)
//                   }
//                   className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
//                 >
//                   Track {bus.id}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import "leaflet-routing-machine";
import { getDistance } from "geolib";
// import BlackBG from "../assets/black bg.jpg";
// import BlackRed from '../assets/blackred.jpg'

// Bus ke fake coordinates
const busLocations = [
  { id: "Bus 101", lat: 28.02335, lng: 79.1967, route: "Nawada" },
  { id: "Bus 102", lat: 28.7041, lng: 77.1025, route: "Kashmere Gate" },
  { id: "Bus 103", lat: 28.5355, lng: 77.391, route: "Noida" },
  { id: "Bus 104", lat: 28.4595, lng: 77.0266, route: "Gurgaon" },
];

// Routing component
function Routing({ userLocation, busLocation }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !userLocation) return;

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

export default function TrackBus() {
  const [userLocation, setUserLocation] = useState(null);

  // Detect user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          console.error("Location access denied:", err);
        }
      );
    }
  }, []);

  // Distance calculator
  const calculateDistance = (bus) => {
    if (!userLocation) return null;
    const dist = getDistance(
      { latitude: userLocation.lat, longitude: userLocation.lng },
      { latitude: bus.lat, longitude: bus.lng }
    );
    return (dist / 1000).toFixed(2); // km me convert
  };

  return (
    <section
      id="track"
      className="relative px-10 py-20 min-h-screen text-white"
    //   style={{
    //     backgroundImage: `url(${BlackRed})`,
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //   }}
    >
      {/* Overlay (thoda dark tint for readability) */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content upar dikhane ke liye relative z-10 */}
      <div className="relative z-10">
        <h2 className="text-5xl font-bold mb-2 text-center mt-6">
          Track Your Bus 🚌
        </h2>
        <p className="mb-4 mt-10 text-2xl font-semibold text-center px-40 text-gray-200">
          Enter your Bus ID to see the real-time route from your location to the bus
          and the distance.
        </p>

        {/* Grid layout */}
        <div className="flex justify-center mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-28">
            {busLocations.map((bus, index) => (
              <div
                key={index}
                className="bg-[#1e1e1e] rounded-xl shadow-lg overflow-hidden w-[30vw] border border-gray-700"
              >
                {/* Bus ID */}
                <h3 className="text-xl font-bold text-center bg-yellow-600 text-white py-2">
                  {bus.id} - {bus.route}
                </h3>

                {/* Map */}
                <div className="h-64 w-full">
                  <MapContainer
                    center={[bus.lat, bus.lng]}
                    zoom={12}
                    scrollWheelZoom={true}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="&copy; OpenStreetMap contributors"
                    />

                    {/* User Location */}
                    {userLocation && (
                      <Marker position={[userLocation.lat, userLocation.lng]}>
                        <Popup>You are here 📍</Popup>
                      </Marker>
                    )}

                    {/* Bus Location */}
                    <Marker position={[bus.lat, bus.lng]}>
                      <Popup>
                        {bus.id} is currently near {bus.route} 🚌
                      </Popup>
                    </Marker>

                    {/* Real Road Path */}
                    {userLocation && (
                      <Routing
                        userLocation={userLocation}
                        busLocation={{ lat: bus.lat, lng: bus.lng }}
                      />
                    )}
                  </MapContainer>
                </div>

                {/* Distance (Track Div) */}
                <div className="flex justify-center py-4 bg-black bg-opacity-50">
                  {userLocation ? (
                    <p className="text-lg font-semibold text-green-400">
                      Distance: {calculateDistance(bus)} km
                    </p>
                  ) : (
                    <p className="text-gray-300">Detecting location...</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

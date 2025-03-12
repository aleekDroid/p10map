import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const MapComponent = () => {
  const [locations, setLocations] = useState([]); // Estado para almacenar las ubicaciones
  const [newLocation, setNewLocation] = useState({ name: "", lat: "", lng: "" }); // Estado del formulario

  // Escucha en tiempo real los cambios en la colección 'locations'
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "locations"), (snapshot) => {
      const updatedLocations = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLocations(updatedLocations);
    });

    return () => unsubscribe();
  }, []);

  // Maneja el envío del formulario para registrar una nueva ubicación
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convertir lat y lng a números
      const lat = parseFloat(newLocation.lat);
      const lng = parseFloat(newLocation.lng);

      // Validar que lat y lng sean números válidos
      if (isNaN(lat) || isNaN(lng)) {
        alert("Por favor, introduce valores numéricos válidos para la latitud y longitud.");
        return;
      }

      // Agregar ubicación a Firebase
      await addDoc(collection(db, "locations"), { name: newLocation.name, lat, lng });

      // Limpiar el formulario
      setNewLocation({ name: "", lat: "", lng: "" });
    } catch (error) {
      console.error("Error al agregar la ubicación: ", error);
    }
  };

  // Maneja la eliminación de una ubicación
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "locations", id));
    } catch (error) {
      console.error("Error al eliminar la ubicación: ", error);
    }
  };

  return (
    <div style={{ height: "1000px", width: "100%" }}>
      <h2 style={{ textAlign: "center" }}>Agregar Nueva Ubicación</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "20px auto",
          maxWidth: "800px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <input
          type="text"
          placeholder="Nombre del lugar"
          value={newLocation.name}
          onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
          required
          style={{ margin: "10px 0", padding: "10px", width: "100%", border: "1px solid #ccc", borderRadius: "5px" }}
        />
        <input
          type="number"
          placeholder="Latitud"
          value={newLocation.lat}
          onChange={(e) => setNewLocation({ ...newLocation, lat: e.target.value })}
          required
          step="any"
          style={{ margin: "10px 0", padding: "10px", width: "100%", border: "1px solid #ccc", borderRadius: "5px" }}
        />
        <input
          type="number"
          placeholder="Longitud"
          value={newLocation.lng}
          onChange={(e) => setNewLocation({ ...newLocation, lng: e.target.value })}
          required
          step="any"
          style={{ margin: "10px 0", padding: "10px", width: "100%", border: "1px solid #ccc", borderRadius: "5px" }}
        />
        <button
          type="submit"
          style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Registrar Lugar
        </button>
      </form>

      {/* Mapa con las ubicaciones registradas */}
      <MapContainer center={[20.5937, -100.3922]} zoom={10} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]}>
            <Popup>
              <strong>{loc.name}</strong>
              <br />
              Lat: {loc.lat}, Lng: {loc.lng}
              <br />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(loc.id);
                }}
                style={{ padding: "5px 10px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
              >
                Eliminar
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;

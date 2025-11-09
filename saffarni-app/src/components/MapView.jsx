import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in react-leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = new Icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Component to handle map view changes when destination is selected
function MapController({ selectedDestination, destinations }) {
  const map = useMap();

  useEffect(() => {
    if (selectedDestination) {
      map.setView(
        [
          selectedDestination.coordinates.lat,
          selectedDestination.coordinates.lng,
        ],
        12,
        { animate: true, duration: 1 }
      );
    } else if (destinations && destinations.length > 0) {
      // Center on average of all destinations if no selection
      const avgLat =
        destinations.reduce((sum, d) => sum + d.coordinates.lat, 0) /
        destinations.length;
      const avgLng =
        destinations.reduce((sum, d) => sum + d.coordinates.lng, 0) /
        destinations.length;
      map.setView([avgLat, avgLng], destinations.length > 1 ? 4 : 6);
    }
  }, [selectedDestination, destinations, map]);

  return null;
}

const MapView = ({
  destinations,
  selectedDestination,
  onSelectDestination,
}) => {
  // Calculate center of map based on destinations
  const getMapCenter = () => {
    if (selectedDestination) {
      return [
        selectedDestination.coordinates.lat,
        selectedDestination.coordinates.lng,
      ];
    }
    if (destinations.length > 0) {
      const avgLat =
        destinations.reduce((sum, d) => sum + d.coordinates.lat, 0) /
        destinations.length;
      const avgLng =
        destinations.reduce((sum, d) => sum + d.coordinates.lng, 0) /
        destinations.length;
      return [avgLat, avgLng];
    }
    return [36.8794, 10.33]; // Default to Tunis, Tunisia
  };

  const getMapZoom = () => {
    if (selectedDestination) return 12;
    if (destinations.length > 1) return 4;
    return 6;
  };

  return (
    <div className="sticky top-8 h-fit max-h-[calc(100vh-4rem)]">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md h-[600px]">
        <MapContainer
          center={getMapCenter()}
          zoom={getMapZoom()}
          scrollWheelZoom={true}
          className="w-full h-full rounded-2xl z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <MapController
            selectedDestination={selectedDestination}
            destinations={destinations}
          />
          {destinations.map((dest) => (
            <Marker
              key={dest.id}
              position={[dest.coordinates.lat, dest.coordinates.lng]}
              icon={DefaultIcon}
              eventHandlers={{
                click: () => onSelectDestination(dest),
              }}
            >
              <Popup>
                <div className="map-popup">
                  <h4>{dest.title}</h4>
                  <p>{dest.location}</p>
                  <p className="popup-price">
                    {dest.price} {dest.currency} / person
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;

import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

const RoutingControl = ({ startPosition, targetPosition }) => {
  const map = useMap();
  const [routingControl, setRoutingControl] = useState(null);

  useEffect(() => {
    if (!map) return;

    const control = L.Routing.control({
      waypoints: [],
      routeWhileDragging: false,
      lineOptions: {
        styles: [{ color: "#b22222", weight: 6, opacity: 0.8 }] 
      },
      show: true,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,

      createMarker: function() { return null; } 
    }).addTo(map);

    if (control.getContainer()) {
      control.getContainer().style.display = 'none';
    }

    setRoutingControl(control);

    return () => {
      if (control && map) {
        map.removeControl(control);
      }
    };
  }, [map]);

  useEffect(() => {
    if (routingControl) {
      if (startPosition && targetPosition) {
        routingControl.setWaypoints([
          L.latLng(startPosition.lat, startPosition.lng),
          L.latLng(targetPosition.lat, targetPosition.lng)
        ]);
        if (routingControl.getContainer()) {
          routingControl.getContainer().style.display = 'block';
        }
      } else {

        routingControl.setWaypoints([]);
        if (routingControl.getContainer()) {
          routingControl.getContainer().style.display = 'none';
        }
      }
    }
  }, [routingControl, startPosition, targetPosition]);

  return null;
};

export default RoutingControl;

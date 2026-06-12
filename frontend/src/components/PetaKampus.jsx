import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, ZoomControl, useMap, LayersControl, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import RoutingControl from './RoutingControl';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;
import 'leaflet/dist/leaflet.css';

const sampleGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        BANGUNAN: "Rektorat Universitas Hasanuddin",
        KODE: "REK-01",
        UNIT: "Rektorat",
        LOKASI: "Zona Pusat",
        TAHUN: "1956",
        Skala: "1:500",
        Luas_m2: "2400",
        FOTO: ""
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [119.4880, -5.1320],
          [119.4890, -5.1320],
          [119.4890, -5.1330],
          [119.4880, -5.1330],
          [119.4880, -5.1320]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        BANGUNAN: "Fakultas Teknik",
        KODE: "FT-01",
        UNIT: "Fakultas Teknik",
        LOKASI: "Zona Selatan",
        TAHUN: "1972",
        Skala: "1:500",
        Luas_m2: "3200",
        FOTO: ""
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [119.4870, -5.1360],
          [119.4882, -5.1360],
          [119.4882, -5.1372],
          [119.4870, -5.1372],
          [119.4870, -5.1360]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        BANGUNAN: "Fakultas Kedokteran",
        KODE: "FK-01",
        UNIT: "Fakultas Kedokteran",
        LOKASI: "Zona Utara",
        TAHUN: "1968",
        Skala: "1:500",
        Luas_m2: "2800",
        FOTO: ""
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [119.4895, -5.1295],
          [119.4908, -5.1295],
          [119.4908, -5.1308],
          [119.4895, -5.1308],
          [119.4895, -5.1295]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        BANGUNAN: "Perpustakaan Pusat",
        KODE: "PUS-01",
        UNIT: "UPT Perpustakaan",
        LOKASI: "Zona Pusat",
        TAHUN: "1985",
        Skala: "1:500",
        Luas_m2: "1800",
        FOTO: ""
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [119.4862, -5.1335],
          [119.4872, -5.1335],
          [119.4872, -5.1345],
          [119.4862, -5.1345],
          [119.4862, -5.1335]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        BANGUNAN: "Fakultas Hukum",
        KODE: "FH-01",
        UNIT: "Fakultas Hukum",
        LOKASI: "Zona Barat",
        TAHUN: "1970",
        Skala: "1:500",
        Luas_m2: "2200",
        FOTO: ""
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [119.4850, -5.1340],
          [119.4862, -5.1340],
          [119.4862, -5.1352],
          [119.4850, -5.1352],
          [119.4850, -5.1340]
        ]]
      }
    }
  ]
};

const MapSearchHandler = ({ searchTerm, geojson, featureLayersRef }) => {
  const map = useMap();

  useEffect(() => {
    if (searchTerm && geojson && map) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
      const foundLayer = featureLayersRef.current[lowerCaseSearchTerm];

      if (foundLayer) {
        const center = foundLayer.getBounds().getCenter();
        map.flyTo(center, 18);
        foundLayer.openPopup();
      } else {
        alert(`Bangunan dengan nama "${searchTerm}" tidak ditemukan.`);
      }
    }
  }, [searchTerm, geojson, map, featureLayersRef]);

  return null;
};

const LocateControl = ({ position, setPosition }) => {
  const map = useMap();
  const [isTracking, setIsTracking] = useState(false);
  const isFirstLocationRef = useRef(true);

  useEffect(() => {
    const onLocationFound = (e) => {
      setPosition(e.latlng);

      if (isFirstLocationRef.current) {
        map.flyTo(e.latlng, 17); 
        isFirstLocationRef.current = false;
      }
    };

    const onLocationError = (e) => {
      alert("Tidak dapat menemukan/melacak lokasi Anda. Pastikan GPS aktif dan Anda memberikan izin lokasi di browser.");
      setIsTracking(false);
    };

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    return () => {
      map.off('locationfound', onLocationFound);
      map.off('locationerror', onLocationError);
    };
  }, [map]);

  const toggleLocate = () => {
    if (isTracking) {
      map.stopLocate();
      setIsTracking(false);
      setPosition(null); 
    } else {
      isFirstLocationRef.current = true;
      map.locate({ watch: true, enableHighAccuracy: true, maximumAge: 2000 });
      setIsTracking(true);
    }
  };

  return (
    <>
      <div style={{ position: 'absolute', bottom: '110px', right: '12px', zIndex: 1000 }}>
        <button 
          onClick={(e) => { e.preventDefault(); toggleLocate(); }} 
          title={isTracking ? "Berhenti Lacak Lokasi" : "Mulai Lacak Lokasi (Real-time)"}
          style={{ 
            width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
            backgroundColor: '#1e2035', 
            color: isTracking ? '#f0d060' : '#e0e0e0',
            border: isTracking ? '2px solid #d4af37' : '1px solid rgba(212, 175, 55, 0.4)',
            borderRadius: '50%',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            padding: 0
          }}
        >
          <i className="bi bi-crosshair" style={{ fontSize: '20px' }}></i>
        </button>
      </div>
      {position && (
        <Marker position={position}>
          <Popup>Anda berada di sini! (Real-time)</Popup>
        </Marker>
      )}
    </>
  );
};

const MapComponent = ({ searchTerm }) => {
  const featureLayersRef = useRef({});
  const defaultImageUrl = '/default_icon.png';
  const [geoData, setGeoData] = useState(null);

  const [userPosition, setUserPosition] = useState(null);
  const [routingDestination, setRoutingDestination] = useState(null);

  useEffect(() => {
    window.handleRouteTo = (lat, lng) => {
      if (!userPosition) {
        alert("Silakan aktifkan fitur 'Lokasi Saya' (ikon target biru di pojok kanan bawah) terlebih dahulu untuk mencari rute.");
        return;
      }
      setRoutingDestination({ lat, lng });
    };
    return () => {
      delete window.handleRouteTo;
    };
  }, [userPosition]);

  useEffect(() => {
    fetch('http://localhost:5000/api/geojson')
      .then(res => res.json())
      .then(data => {
        if(data && data.type === 'FeatureCollection') {
          setGeoData(data);
        } else {
          setGeoData(sampleGeoJSON);
        }
      })
      .catch(err => {
        console.error("Failed to fetch geojson from backend:", err);
        setGeoData(sampleGeoJSON);
      });
  }, []);

  const geojson = geoData || sampleGeoJSON;

  const featureStyle = {
    color: '#d4af37',
    weight: 2,
    opacity: 0.9,
    fillColor: '#b22222',
    fillOpacity: 0.35,
  };

  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      const { FOTO, BANGUNAN, KODE, UNIT, LOKASI, TAHUN, Skala, Luas_m2 } = feature.properties;

      if (BANGUNAN) {
        const normalizedName = BANGUNAN.toLowerCase().trim();
        featureLayersRef.current[normalizedName] = layer;
      }

      let imageHtml = '';
      if (FOTO && FOTO.trim() !== '') {
        const imageUrl = `http://localhost:5000/images/${FOTO.trim()}`;
        imageHtml = `<img src="${imageUrl}" alt="${BANGUNAN || 'Gambar Bangunan'}" style="max-width:200px; height:auto; margin-top:10px; border-radius:8px;" />`;
      }

      const center = layer.getBounds().getCenter();

      layer.bindPopup(`
        <div style="font-family: 'Poppins', sans-serif;">
          <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 5px;">${BANGUNAN || 'Nama Bangunan Tidak Tersedia'}${(KODE && KODE.trim() !== '') ? ` (${KODE.trim()})` : ''}</h3>
          <p style="margin: 2px 0; font-size: 13px;"><strong>Unit:</strong> ${UNIT || 'N/A'}</p>
          <p style="margin: 2px 0; font-size: 13px;"><strong>Lokasi:</strong> ${LOKASI || 'N/A'}</p>
          <p style="margin: 2px 0; font-size: 13px;"><strong>Tahun:</strong> ${TAHUN || 'N/A'}</p>
          <p style="margin: 2px 0; font-size: 13px;"><strong>Luas (m²):</strong> ${Luas_m2 || 'N/A'}</p>
          ${imageHtml}
          <button onclick="window.handleRouteTo(${center.lat}, ${center.lng})" style="margin-top:10px; width:100%; padding:8px; background:#b22222; color:white; border:none; border-radius:4px; font-weight:600; font-family:'Poppins',sans-serif; cursor:pointer; font-size:13px; display:flex; align-items:center; justify-content:center; gap:6px;">
            📍 Rute ke Sini
          </button>
        </div>
      `);

      layer.on('mouseover', function () {
        layer.setStyle({ fillOpacity: 0.65, weight: 3 });
      });
      layer.on('mouseout', function () {
        layer.setStyle({ fillOpacity: 0.35, weight: 2 });
      });
    }
  };

  const position = [-5.138, 119.489];

  return (
    <MapContainer center={position} zoom={16} className="leaflet-container" zoomControl={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <ZoomControl position="bottomright" />
      <LocateControl position={userPosition} setPosition={setUserPosition} />
      <RoutingControl startPosition={userPosition} targetPosition={routingDestination} />
      <GeoJSON key={geojson.features.length} data={geojson} style={featureStyle} onEachFeature={onEachFeature} />
      <MapSearchHandler
        searchTerm={searchTerm}
        geojson={geojson}
        featureLayersRef={featureLayersRef}
        defaultImageUrl={defaultImageUrl}
      />
      {routingDestination && (
        <div style={{ position: 'absolute', bottom: '85px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
          <button 
            onClick={() => setRoutingDestination(null)}
            style={{
              backgroundColor: '#b22222',
              color: '#f0d060',
              border: '2px solid rgba(212, 175, 55, 0.6)',
              padding: '8px 20px',
              borderRadius: '25px',
              fontWeight: '600',
              fontFamily: "'Poppins', sans-serif",
              cursor: 'pointer',
              boxShadow: '0 6px 16px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.9rem'
            }}
          >
            <i className="bi bi-x-octagon-fill"></i> Tutup Rute
          </button>
        </div>
      )}
    </MapContainer>
  );
};

export default MapComponent;
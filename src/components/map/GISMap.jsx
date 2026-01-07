import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import ActionButton from '../common/ActionButton'
import { Shield } from 'lucide-react'

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Custom icons
const dangerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

const warningIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

function GISMap({ markers, onMarkerStatusChange }) {
  const center = markers.length > 0 
    ? [markers[0].lat, markers[0].lng]
    : [35.6892, 51.3890] // Default to Tehran

  const getMarkerIcon = (marker) => {
    // If status is 'investigating', use warning icon
    if (marker.status === 'investigating') {
      return warningIcon
    }
    return marker.type === 'danger' ? dangerIcon : warningIcon
  }

  return (
    <div className="glass-card rounded-2xl p-8 animate-fade-in">
      <h3 className="text-xl font-bold text-white mb-6">منطقه GIS</h3>
      <div className="h-96 rounded-lg overflow-hidden">
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={[marker.lat, marker.lng]}
              icon={getMarkerIcon(marker)}
            >
              <Popup className="custom-popup">
                <div className="text-sm min-w-[200px]">
                  <h4 className="font-bold mb-2 text-gray-800">{marker.title}</h4>
                  <p className="text-gray-600 mb-3">{marker.description}</p>
                  <div className="mb-3">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      marker.status === 'investigating'
                        ? 'bg-yellow-100 text-yellow-800'
                        : marker.severity === 'high' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {marker.status === 'investigating' 
                        ? 'در حال بررسی' 
                        : marker.severity === 'high' 
                        ? 'پرخطر' 
                        : 'هشدار'}
                    </span>
                  </div>
                  {marker.type === 'danger' && marker.status !== 'investigating' && (
                    <ActionButton
                      variant="warning"
                      icon={Shield}
                      onClick={() => onMarkerStatusChange?.(marker.id, 'investigating')}
                      className="w-full text-xs"
                    >
                      اعزام تیم ایمنی
                    </ActionButton>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}

export default GISMap


import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Card, CardContent } from '@/components/ui/card';
import { Doctor } from '@/types';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { StarIcon, MapPin, Phone, Mail, Calendar } from 'lucide-react';
import { extractInitials } from '@/lib/utils';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Fix for marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface DoctorMapProps {
  doctors: Doctor[];
  selectedDoctor?: Doctor | null;
  onSelectDoctor: (doctor: Doctor) => void;
  mapRef?: React.MutableRefObject<L.Map | null>;
}

export function DoctorMap({ doctors, selectedDoctor, onSelectDoctor, mapRef }: DoctorMapProps) {
  const [map, setMap] = useState<L.Map | null>(null);
  const defaultPosition: [number, number] = [41.881, -87.623]; // Chicago
  
  useEffect(() => {
    if (mapRef && map) {
      mapRef.current = map;
    }
  }, [map, mapRef]);
  
  // Move map to selected doctor's position
  useEffect(() => {
    if (map && selectedDoctor) {
      map.flyTo([selectedDoctor.position.lat, selectedDoctor.position.lng], 14);
    }
  }, [map, selectedDoctor]);
  
  return (
    <Card className="w-full h-full">
      <CardContent className="p-0 relative">
        <MapContainer
          center={defaultPosition}
          zoom={13}
          style={{ height: '100%', width: '100%', minHeight: '500px' }}
          whenReady={({ target }) => setMap(target)}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {doctors.map((doctor) => (
            <Marker
              key={doctor.id}
              position={[doctor.position.lat, doctor.position.lng]}
              eventHandlers={{
                click: () => onSelectDoctor(doctor),
              }}
            >
              <Popup>
                <div className="space-y-2 p-1 max-w-xs">
                  <div className="flex items-center gap-2">
                    {doctor.image ? (
                      <Avatar className="h-10 w-10">
                        <img src={doctor.image} alt={doctor.name} />
                      </Avatar>
                    ) : (
                      <Avatar className="h-10 w-10">
                        <span>{extractInitials(doctor.name)}</span>
                      </Avatar>
                    )}
                    <div>
                      <h3 className="font-medium text-sm">{doctor.name}</h3>
                      <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-xs">
                    <StarIcon className="h-3 w-3 text-yellow-500 mr-1" />
                    <span>{doctor.rating.toFixed(1)}</span>
                    <span className="mx-1">•</span>
                    <span>{doctor.distance} miles away</span>
                  </div>
                  
                  <Button
                    size="sm"
                    className="w-full text-xs"
                    variant="outline"
                    onClick={() => onSelectDoctor(doctor)}
                  >
                    View Details
                  </Button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </CardContent>
    </Card>
  );
}
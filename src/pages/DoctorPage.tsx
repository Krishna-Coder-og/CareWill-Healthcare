import { useState, useEffect, useRef } from 'react';
import { DoctorMap } from '@/components/doctor/DoctorMap';
import { DoctorCard } from '@/components/doctor/DoctorCard';
import { DoctorFilter } from '@/components/doctor/DoctorFilter';
import { useDoctorStore } from '@/store';
import { Doctor } from '@/types';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export function DoctorPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalDoctor, setModalDoctor] = useState<any | null>(null);
  // Filter state
  const [location, setLocation] = useState('Delhi');
  const [specialty, setSpecialty] = useState<string | null>(null);
  const [distance, setDistance] = useState<number>(5); // miles
  const [coords, setCoords] = useState<{lat: number, lon: number} | null>(null);
  const [applyTrigger, setApplyTrigger] = useState(0);
  const mapRef = useRef<any>(null);

  // Geocode location to coordinates
  async function geocodeLocation(loc: string): Promise<{lat: number, lon: number} | null> {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(loc)}&limit=1`);
      const data = await res.json();
      if (data && data.length > 0) {
        return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
      }
      return null;
    } catch {
      return null;
    }
  }

  // Fetch facilities when filters are applied
  useEffect(() => {
    async function fetchNearbyFacilities() {
      setLoading(true);
      setError(null);
      let center = coords;
      if (!center) {
        center = await geocodeLocation(location);
        setCoords(center);
      }
      if (!center) {
        setError('Could not find location.');
        setLoading(false);
        return;
      }
      // Center map on new location
      if (mapRef.current && center) {
        mapRef.current.setView([center.lat, center.lon], 13);
      }
      // Convert miles to degrees (approx)
      const radius = distance * 0.0161; // 1 mile ≈ 0.0161 degrees
      const bbox = `${center.lon - radius},${center.lat - radius},${center.lon + radius},${center.lat + radius}`;
      const searchQueries = [
        'hospital',
        'clinic',
        'medical_center',
        'doctors',
        'healthcare'
      ];
      Promise.all(
        searchQueries.map(query =>
          fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&viewbox=${bbox}&bounded=1`)
            .then(res => res.json())
            .catch(() => [])
        )
      ).then(results => {
        const facilities: any = {};
        results.flat().forEach((place: any) => {
          if (!facilities[place.place_id]) {
            facilities[place.place_id] = place;
          }
        });
        let filtered = Object.values(facilities);
        // Specialty filter (simple keyword match)
        if (specialty && specialty !== 'all') {
          filtered = filtered.filter((f: any) =>
            f.display_name.toLowerCase().includes(specialty.toLowerCase())
          );
        }
        setDoctors(filtered);
        setLoading(false);
      }).catch(() => {
        setError('Failed to fetch nearby doctors.');
        setLoading(false);
      });
    }
    fetchNearbyFacilities();
    // eslint-disable-next-line
  }, [applyTrigger]);

  // Initial geolocation (only once)
  useEffect(() => {
    if (coords) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
          setLocation(`${pos.coords.latitude},${pos.coords.longitude}`);
        },
        () => {
          // Default to Delhi
          setCoords({ lat: 28.6139, lon: 77.2090 });
        }
      );
    } else {
      setCoords({ lat: 28.6139, lon: 77.2090 });
    }
    // eslint-disable-next-line
  }, []);

  const handleSchedule = (doctor: any) => {
    setModalDoctor(doctor);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalDoctor(null);
  };

  // Filter handler
  const handleFilterChange = (spec: string | null, dist: number | null) => {
    setSpecialty(spec);
    if (dist) setDistance(dist);
  };

  // Location input handler
  const handleLocationChange = (e: any) => {
    setLocation(e.target.value);
  };

  // Apply filters
  const handleApplyFilters = () => {
    setCoords(null); // force geocode
    setApplyTrigger(x => x + 1);
  };

  // Contact overrides for known hospitals/doctors
  const contactOverrides: Record<string, { phone: string; email: string }> = {
    "Bhagat Hospital": {
      phone: "+91 11 1234 5678",
      email: "info@bhagathospital.com"
    },
    "Dr. Yashodhara Sharma": {
      phone: "+91 11 8765 4321",
      email: "yashodhara.sharma@delhidoctors.com"
    },
    // Add more known hospitals/doctors here
  };

  function generateFakeContact(name: string) {
    const base = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return {
      phone: `+91 11 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
      email: `${base}@example.com`
    };
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-4">Find Doctors Near You</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Locate healthcare professionals in your area based on specialty, distance, and availability.
          </p>
        </div>
      </section>
      
      {/* Map and Filters Section */}
      <section className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    value={location}
                    onChange={handleLocationChange}
                    placeholder="Enter your location"
                    className="pl-10 pr-10 w-full border rounded p-2"
                    aria-label="Enter location"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="specialty">Specialty</label>
                  <select
                    id="specialty"
                    value={specialty || 'all'}
                    onChange={e => setSpecialty(e.target.value)}
                    className="w-full border rounded p-2"
                  >
                    <option value="all">All Specialties</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label htmlFor="distance">Distance (miles)</label>
                    <span className="text-sm text-muted-foreground">{distance} miles</span>
                  </div>
                  <input
                    type="range"
                    id="distance"
                    min={1}
                    max={50}
                    step={1}
                    value={distance}
                    onChange={e => setDistance(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 mile</span>
                    <span>50 miles</span>
                  </div>
                </div>
                <Button className="w-full" variant="outline" onClick={handleApplyFilters}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Map and Doctor Cards */}
          <div className="lg:col-span-3 space-y-6">
            {/* Map */}
            <div className="h-[500px] rounded-lg overflow-hidden border">
              <DoctorMap 
                doctors={doctors.map((d) => ({
                  id: d.place_id,
                  name: d.display_name.split(',')[0],
                  specialty: 'General',
                  address: d.display_name,
                  phone: '',
                  email: '',
                  rating: 4.5,
                  availability: [],
                  position: { lat: parseFloat(d.lat), lng: parseFloat(d.lon) },
                  distance: undefined,
                  image: undefined
                }))}
                selectedDoctor={selectedDoctor}
                onSelectDoctor={setSelectedDoctor}
                mapRef={mapRef}
              />
            </div>
            
            {/* Selected Doctor */}
            {selectedDoctor && (
              <div className="relative bg-card rounded-lg border p-5">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => setSelectedDoctor(null)}
                  aria-label="Close doctor details"
                >
                  <X className="h-4 w-4" />
                </Button>
                <DoctorCard doctor={selectedDoctor} />
              </div>
            )}
            
            {/* Doctor List */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Doctors ({doctors.length})
                </h2>
                <div className="text-sm text-muted-foreground">
                  Showing {doctors.length} doctors
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {doctors.map((d) => {
                  const name = d.display_name.split(',')[0];
                  const contact = contactOverrides[name] || generateFakeContact(name);
                  return (
                    <div key={d.place_id}>
                      <DoctorCard doctor={{
                        id: d.place_id,
                        name,
                        specialty: 'General',
                        address: d.display_name,
                        phone: contact.phone,
                        email: contact.email,
                        rating: 4.5,
                        availability: [],
                        position: { lat: parseFloat(d.lat), lng: parseFloat(d.lon) },
                        distance: undefined,
                        image: undefined
                      }} />
                      <Button className="mt-2 w-full" onClick={() => handleSchedule(d)}>
                        Schedule Appointment
                      </Button>
                    </div>
                  );
                })}
              </div>
              
              {doctors.length === 0 && !loading && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No doctors found nearby.</p>
                </div>
              )}
              {loading && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading nearby doctors...</p>
                </div>
              )}
              {error && (
                <div className="text-center py-12">
                  <p className="text-destructive">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Schedule Modal */}
      {showModal && modalDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closeModal}><X /></button>
            <h2 className="text-xl font-bold mb-4">Schedule Appointment</h2>
            <p className="mb-2 font-semibold">{modalDoctor.display_name.split(',')[0]}</p>
            <form onSubmit={e => { e.preventDefault(); closeModal(); alert('Appointment request sent!'); }}>
              <input className="w-full border rounded p-2 mb-2" placeholder="Your Name" required />
              <input className="w-full border rounded p-2 mb-2" placeholder="Your Email" type="email" required />
              <input className="w-full border rounded p-2 mb-2" placeholder="Your Phone" required />
              <textarea className="w-full border rounded p-2 mb-2" placeholder="Reason for Appointment" required />
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
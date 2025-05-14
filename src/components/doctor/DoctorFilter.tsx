import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Search, MapPin, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface DoctorFilterProps {
  onFilterChange: (specialty: string | null, distance: number | null) => void;
}

const specialties = [
  { value: 'all', label: 'All Specialties' },
  { value: 'Cardiology', label: 'Cardiology' },
  { value: 'Dermatology', label: 'Dermatology' },
  { value: 'Neurology', label: 'Neurology' },
  { value: 'Orthopedics', label: 'Orthopedics' },
  { value: 'Pediatrics', label: 'Pediatrics' },
];

export function DoctorFilter({ onFilterChange }: DoctorFilterProps) {
  const [specialty, setSpecialty] = useState<string | null>(null);
  const [distance, setDistance] = useState<number>(5);
  const [location, setLocation] = useState<string>('Chicago, IL');
  
  const handleSpecialtyChange = (value: string) => {
    const newSpecialty = value === 'all' ? null : value;
    setSpecialty(newSpecialty);
    onFilterChange(newSpecialty, distance);
  };
  
  const handleDistanceChange = (value: number[]) => {
    const newDistance = value[0];
    setDistance(newDistance);
    onFilterChange(specialty, newDistance);
  };
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, specialty, or keyword"
          className="pl-10 pr-10"
          aria-label="Search doctors"
        />
      </div>
      
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter your location"
          className="pl-10"
          aria-label="Enter location"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="specialty">Specialty</Label>
        <Select
          onValueChange={handleSpecialtyChange}
          defaultValue="all"
        >
          <SelectTrigger id="specialty">
            <SelectValue placeholder="All Specialties" />
          </SelectTrigger>
          <SelectContent>
            {specialties.map((specialty) => (
              <SelectItem key={specialty.value} value={specialty.value}>
                {specialty.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="distance">Distance (miles)</Label>
          <span className="text-sm text-muted-foreground">{distance} miles</span>
        </div>
        <Slider
          id="distance"
          min={1}
          max={50}
          step={1}
          value={[distance]}
          onValueChange={handleDistanceChange}
          aria-label="Distance filter"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>1 mile</span>
          <span>50 miles</span>
        </div>
      </div>
      
      <Button className="w-full" variant="outline">
        <Filter className="h-4 w-4 mr-2" />
        Apply Filters
      </Button>
    </div>
  );
}
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { Doctor } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { extractInitials } from '@/lib/utils';

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="w-full hover-lift transition-all">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <Avatar className="h-16 w-16 border border-border">
            {doctor.image ? (
              <img 
                src={doctor.image} 
                alt={doctor.name}
                className="object-cover"
              />
            ) : (
              <span className="text-xl">{extractInitials(doctor.name)}</span>
            )}
          </Avatar>
          
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">{doctor.name}</h3>
            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
            
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(doctor.rating)
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-muted'
                  }`}
                />
              ))}
              <span className="text-sm ml-1">{doctor.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <MapPin className="h-4 w-4 text-medical-green mt-1" />
            <span className="text-sm">{doctor.address}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-medical-green" />
            <a 
              href={`tel:${doctor.phone}`} 
              className="text-sm hover:text-primary transition-colors"
            >
              {doctor.phone}
            </a>
          </div>
          
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-medical-green" />
            <a 
              href={`mailto:${doctor.email}`}
              className="text-sm hover:text-primary transition-colors"
            >
              {doctor.email}
            </a>
          </div>
          
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-medical-green" />
            <div className="flex flex-wrap gap-1">
              {doctor.availability.map((day) => (
                <Badge key={day} variant="outline" className="text-xs">
                  {day}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          <Phone className="h-4 w-4 mr-2" /> Call
        </Button>
        <Button size="sm">
          <Calendar className="h-4 w-4 mr-2" /> Schedule
        </Button>
      </CardFooter>
    </Card>
  );
}
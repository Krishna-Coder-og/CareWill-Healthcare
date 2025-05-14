import React from 'react';
import { Phone, AlertTriangle, MapPin } from 'lucide-react';

export default function EmergencyPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/50 px-4 py-16">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="flex flex-col items-center mb-6">
          <AlertTriangle className="h-12 w-12 text-destructive mb-2" />
          <h1 className="text-3xl font-bold mb-2 text-destructive">Emergency Help</h1>
          <p className="text-muted-foreground mb-4">
            If you are experiencing a medical emergency, please call the emergency number below or visit the nearest hospital immediately.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 mb-6">
          <a href="tel:112" className="bg-destructive text-white px-6 py-3 rounded-lg text-lg font-semibold flex items-center gap-2 hover:bg-destructive/90 transition-colors">
            <Phone className="h-5 w-5" /> Call 112 (India Emergency)
          </a>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5" />
            <span>Nearest Hospital: 101 Connaught Place, New Delhi</span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>If you need urgent medical attention, do not wait for an online response. Contact emergency services immediately.</p>
        </div>
      </div>
    </div>
  );
} 
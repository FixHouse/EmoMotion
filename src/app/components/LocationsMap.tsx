import React, { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { motion } from 'motion/react';

export const LocationsMap: React.FC = () => {
  const [activeLocation, setActiveLocation] = useState<number>(0);

  const locations = [
    {
      id: 1,
      name: 'Žitná',
      fullAddress: 'Žitná 570/26, Praha 2',
      color: '#FF69B4',
      mapUrl: 'https://www.google.com/maps?q=%C5%BDitn%C3%A1+570%2F26%2C+Praha+2&hl=cs&z=17&output=embed',
      navigateUrl: 'https://www.google.com/maps/search/?api=1&query=%C5%BDitn%C3%A1+570%2F26%2C+Praha+2',
    }
  ];

  return (
    <div className="relative h-full bg-gray-100">
      {/* Toggle buttons */}
      <div className="absolute top-4 left-4 right-4 z-30 flex gap-2">
        {locations.map((location, index) => (
          <motion.button
            key={location.id}
            onClick={() => setActiveLocation(index)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all flex-1 ${
              activeLocation === index
                ? 'bg-white text-gray-800'
                : 'bg-white/70 text-gray-600 hover:bg-white/90'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              borderLeft: activeLocation === index ? `4px solid ${location.color}` : 'none',
            }}
          >
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: location.color }}
            />
            <span className="truncate">{location.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Map iframes with smooth transition */}
      <div className="relative w-full h-full">
        {locations.map((location, index) => (
          <div
            key={location.id}
            className={`absolute inset-0 transition-all duration-500 ${
              activeLocation === index
                ? 'opacity-100 z-10'
                : 'opacity-0 z-0'
            }`}
          >
            <iframe
              src={location.mapUrl}
              className="w-full h-full"
              loading="lazy"
              title={`${location.name} location map`}
              allowFullScreen
            />
          </div>
        ))}
      </div>

      {/* Legend with active location info */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl z-20 border border-gray-200">
        <motion.div
          key={activeLocation}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-start gap-3"
        >
          <div
            className="w-8 h-8 rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm shadow-md"
            style={{ backgroundColor: locations[activeLocation].color }}
          >
            {locations[activeLocation].id}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-base text-gray-800 mb-1">
              {locations[activeLocation].name}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              {locations[activeLocation].fullAddress}
            </div>
          </div>
          <a
            href={locations[activeLocation].navigateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
          >
            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black rounded-lg text-sm font-bold text-white transition-all shadow-md flex items-center gap-2"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Navigation className="w-4 h-4" />
              <span>Navigate</span>
            </motion.button>
          </a>
        </motion.div>
      </div>
    </div>
  );
};
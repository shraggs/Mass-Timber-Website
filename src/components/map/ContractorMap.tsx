'use client';

import { useState, useMemo, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { contractorMarkerIcon, userLocationIcon } from './marker-icon';
import { MapSearchBar } from './MapSearchBar';
import { ContractorListItem } from './ContractorListItem';
import { haversineDistance } from '@/lib/geo-utils';
import { Button } from '@/components/ui/Button';
import contractorsData from '@/data/contractors.json';
import type { Contractor } from '@/types';

const contractors = contractorsData as Contractor[];

// Center of continental US
const DEFAULT_CENTER: [number, number] = [39.5, -98.35];
const DEFAULT_ZOOM = 4;

function FlyToLocation({ position, zoom }: { position: [number, number]; zoom: number }) {
  const map = useMap();
  map.flyTo(position, zoom, { duration: 1.5 });
  return null;
}

export function ContractorMap() {
  const [activeContractor, setActiveContractor] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; name: string } | null>(null);
  const [flyTarget, setFlyTarget] = useState<{ position: [number, number]; zoom: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showList, setShowList] = useState(true);
  const mapRef = useRef<LeafletMap | null>(null);

  // Filter contractors with valid coordinates
  const mappableContractors = useMemo(() => {
    return contractors.filter((c) => c.lat != null && c.lng != null);
  }, []);

  // Sort by distance to user location if available
  const sortedContractors = useMemo(() => {
    if (!userLocation) return mappableContractors;
    return [...mappableContractors].sort((a, b) => {
      const distA = haversineDistance(userLocation.lat, userLocation.lng, a.lat!, a.lng!);
      const distB = haversineDistance(userLocation.lat, userLocation.lng, b.lat!, b.lng!);
      return distA - distB;
    });
  }, [mappableContractors, userLocation]);

  const getDistance = useCallback(
    (contractor: Contractor) => {
      if (!userLocation || contractor.lat == null || contractor.lng == null) return null;
      return haversineDistance(userLocation.lat, userLocation.lng, contractor.lat, contractor.lng);
    },
    [userLocation]
  );

  const handleSearch = useCallback((lat: number, lng: number, displayName: string) => {
    setUserLocation({ lat, lng, name: displayName });
    setFlyTarget({ position: [lat, lng], zoom: 8 });
    // Clear fly target after animation
    setTimeout(() => setFlyTarget(null), 2000);
  }, []);

  const handleUseMyLocation = useCallback(() => {
    if (!navigator.geolocation) return;
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lng: longitude, name: 'Your Location' });
        setFlyTarget({ position: [latitude, longitude], zoom: 8 });
        setTimeout(() => setFlyTarget(null), 2000);
        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
      }
    );
  }, []);

  const handleContractorClick = useCallback((contractor: Contractor) => {
    if (contractor.lat == null || contractor.lng == null) return;
    setActiveContractor(contractor.id);
    setFlyTarget({ position: [contractor.lat, contractor.lng], zoom: 12 });
    setTimeout(() => setFlyTarget(null), 2000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
      {/* Sidebar */}
      <div className={`${showList ? 'flex' : 'hidden'} lg:flex flex-col w-full lg:w-[380px] border-r border-charcoal-900/10 bg-cream overflow-hidden`}>
        <div className="p-4 border-b border-charcoal-900/10 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-charcoal-950 font-[family-name:var(--font-jakarta)]">
              Contractor Map
            </h2>
            <p className="text-xs text-charcoal-950/50">
              {sortedContractors.length} contractors
              {userLocation && ` near ${userLocation.name.split(',').slice(0, 2).join(',')}`}
            </p>
          </div>
          <Button variant="outline" size="sm" href="/contractors">
            List View
          </Button>
        </div>

        <MapSearchBar
          onSearch={handleSearch}
          onUseMyLocation={handleUseMyLocation}
          isLoading={isLoading}
        />

        <div className="flex-1 overflow-y-auto">
          {sortedContractors.map((contractor) => (
            <ContractorListItem
              key={contractor.id}
              contractor={contractor}
              distance={getDistance(contractor)}
              isActive={activeContractor === contractor.id}
              onClick={() => handleContractorClick(contractor)}
            />
          ))}
        </div>
      </div>

      {/* Mobile toggle */}
      <button
        onClick={() => setShowList(!showList)}
        className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] px-4 py-2 bg-charcoal-950 text-cream rounded-full text-sm font-semibold shadow-lg"
      >
        {showList ? 'Show Map' : 'Show List'}
      </button>

      {/* Map */}
      <div className={`${showList ? 'hidden' : 'flex'} lg:flex flex-1`}>
        <MapContainer
          center={DEFAULT_CENTER}
          zoom={DEFAULT_ZOOM}
          className="w-full h-full"
          ref={mapRef}
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {flyTarget && (
            <FlyToLocation position={flyTarget.position} zoom={flyTarget.zoom} />
          )}

          {mappableContractors.map((contractor) => (
            <Marker
              key={contractor.id}
              position={[contractor.lat!, contractor.lng!]}
              icon={contractorMarkerIcon}
              eventHandlers={{
                click: () => setActiveContractor(contractor.id),
              }}
            >
              <Popup>
                <div className="min-w-[200px]">
                  <h3 className="font-bold text-sm mb-1">{contractor.name}</h3>
                  {contractor.address && (
                    <p className="text-xs text-gray-600 mb-1">{contractor.address}</p>
                  )}
                  {contractor.phone && (
                    <p className="text-xs text-gray-600 mb-2">
                      <a href={`tel:${contractor.phone.replace(/[^+\d]/g, '')}`} className="text-blue-600 hover:underline">
                        {contractor.phone}
                      </a>
                    </p>
                  )}
                  <a
                    href={`/contractors/${contractor.slug}`}
                    className="inline-block text-xs px-3 py-1 bg-amber-500 text-white rounded font-semibold hover:bg-amber-600 transition-colors"
                  >
                    View Details
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}

          {userLocation && (
            <Marker
              position={[userLocation.lat, userLocation.lng]}
              icon={userLocationIcon}
            >
              <Popup>
                <p className="text-sm font-semibold">{userLocation.name.split(',').slice(0, 2).join(',')}</p>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}

import L from 'leaflet';

export const contractorMarkerIcon = L.divIcon({
  className: 'custom-marker',
  html: `<svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 0C7.163 0 0 7.163 0 16c0 10.512 14.112 24.396 15.027 25.313a1.371 1.371 0 001.946 0C17.888 40.396 32 26.512 32 16 32 7.163 24.837 0 16 0z" fill="#C98A0C"/>
    <circle cx="16" cy="16" r="8" fill="white"/>
    <circle cx="16" cy="16" r="5" fill="#C98A0C"/>
  </svg>`,
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -42],
});

export const userLocationIcon = L.divIcon({
  className: 'custom-marker',
  html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#2D7A3C" opacity="0.3"/>
    <circle cx="12" cy="12" r="6" fill="#2D7A3C"/>
    <circle cx="12" cy="12" r="3" fill="white"/>
  </svg>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

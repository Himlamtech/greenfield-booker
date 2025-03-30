
/// <reference types="vite/client" />

// Declare Google Maps types
interface Window {
  google: {
    maps: {
      Map: new (container: HTMLElement, options: any) => any;
      Marker: new (options: any) => any;
      InfoWindow: new (options: any) => any;
      LatLng: new (lat: number, lng: number) => any;
      marker?: {
        AdvancedMarkerElement: new (options: any) => any;
      };
    };
  };
}

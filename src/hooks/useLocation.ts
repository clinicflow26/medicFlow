import { useState, useEffect } from "react";

export interface LocationData {
  area: string;
  city: string;
  fullAddress: string;
  loading: boolean;
  error: string | null;
}

export const useLocation = () => {
  const [location, setLocation] = useState<LocationData>({
    area: "Detecting...",
    city: "",
    fullAddress: "",
    loading: true,
    error: null,
  });

  const fetchLocationDetails = async (lat: number, lon: number) => {
    try {
      // Using OpenStreetMap's Nominatim for free reverse geocoding
      // In production, you might want to use Google Maps Geocoding API
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
      );
      const data = await response.json();

      const address = data.address;
      const area =
        address.suburb ||
        address.neighbourhood ||
        address.residential ||
        address.city_district ||
        address.town ||
        "Unknown Area";
      const city =
        address.city || address.town || address.village || "Unknown City";

      setLocation({
        area,
        city,
        fullAddress: data.display_name,
        loading: false,
        error: null,
      });
    } catch (err) {
      console.error("Reverse geocoding error:", err);
      setLocation((prev) => ({
        ...prev,
        area: "Mumbai",
        city: "India",
        loading: false,
        error: "Failed to get location details",
      }));
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        area: "Location not supported",
        loading: false,
        error: "Geolocation is not supported by your browser",
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchLocationDetails(
          position.coords.latitude,
          position.coords.longitude,
        );
      },
      (error) => {
        console.error("Geolocation error:", error);
        let errorMsg = "Permission denied";
        if (error.code === error.TIMEOUT) errorMsg = "Timeout";
        if (error.code === error.POSITION_UNAVAILABLE) errorMsg = "Unavailable";

        setLocation({
          area: "Andheri West", // Default fallback
          city: "Mumbai",
          fullAddress: "Andheri West, Mumbai, Maharashtra",
          loading: false,
          error: errorMsg,
        });
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  return location;
};

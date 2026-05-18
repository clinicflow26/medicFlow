import React from "react";
import { useLocation } from "../hooks/useLocation";

const UseCurrentLocationButton: React.FC = () => {
  const { location, detectLocation } = useLocation();

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={detectLocation}
        disabled={location.loading}
        className="px-4 py-2 rounded-xl bg-primary-600 text-white text-sm font-bold disabled:opacity-60"
      >
        {location.loading ? "Detecting..." : "Use Current Location"}
      </button>

      <p className="text-xs text-slate-500">
        {location.error
          ? location.error
          : `${location.area}${location.city ? `, ${location.city}` : ""}`}
      </p>
    </div>
  );
};

export default UseCurrentLocationButton;

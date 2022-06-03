import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import React, { useMemo, useState, useEffect } from "react";

window.google = window.google ? window.google : {};
const google = window.google;

const containerStyle = {
  width: "40vw",
  height: "100%",
};

function MyComponent({
  origin,
  destination,
  calculate,
  setCalculate,
  setDistance,
}) {
  const [libraries] = useState(["places"]);
  const [directions, setDirections] = useState();

  const center = useMemo(
    () => ({
      lat: 28.7041,
      lng: 77.1025,
    }),
    []
  );

  if (calculate) {
    setCalculate(false);
    calculateDistance();
  }

  useEffect(() => {
    if (directions) {
      setDistance(directions.routes[0].legs[0].distance.text);
    }
  }, [directions, setDistance]);

  async function calculateDistance() {
    console.log(origin, destination);
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          // console.error(`error fetching directions ${result}`);
        }
      }
    );
  }
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAolXVBph__8LXk-JukgnxDUI4LPDQAsxQ",
    libraries,
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      options={{
        disableDefaultUI: true,
        clickableIcons: false,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        zoomControl: false,
        gestureHandling: "none",
      }}
    >
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: {
              zIndex: 50,
              strokeOpacity: 1,
              strokeWeight: 5,
              strokeColor: "#00a8fc",
            },
          }}
        ></DirectionsRenderer>
      )}
    </GoogleMap>
  ) : (
    <div>Loading</div>
  );
}

export default MyComponent;

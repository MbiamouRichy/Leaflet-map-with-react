import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import img from "./icons/icon.gif";
import "./styles.css";

import { Icon, divIcon, point } from "leaflet";
import { useEffect, useRef, useState } from "react";

// create custom icon
const customIcon = new Icon({
  // iconUrl: "https://i.stack.imgur.com/p5kVN.gif",
  iconUrl: img,
  iconSize: [40, 40], // size of the icon
});

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};
export default function App() {
  const [refReady, setRefReady] = useState(false);
  let MarkerRef = useRef();

  useEffect(() => {
    if (refReady == true) {
      MarkerRef.current?.openPopup();
    }
  }, [refReady]);

  return (
    <MapContainer
      whenReady={() => {
        setRefReady(true);
      }}
      center={[0.4141754, 9.4655989]}
      zoom={15}
    >
      {/* OPEN STREEN MAPS TILES */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {/* Hard coded markers */}
        <Marker
          ref={MarkerRef}
          position={[0.4141754, 9.4655989]}
          icon={customIcon}
        >
          <Popup className="visible" closeButton={false}>
            This is popup 1
          </Popup>
        </Marker>
      </MarkerClusterGroup>
    </MapContainer>
  );
}

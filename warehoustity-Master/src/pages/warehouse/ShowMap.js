import React from "react";

import FMap from "./ShowMaps";
const Warehouse = (props) => {
  return (
    <div className="App">
      <FMap
        google={props.google}
        center={{ lat: props.lat, lng: props.lng }}
        latlng={[props]}
        height="80px"
        zoom={12}
        latName={props.latName}
        lngName={props.lngName}
      />
    </div>
  );
};

export default Warehouse;

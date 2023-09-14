import React from "react";

import Map from "./Map1";
const Warehouse = (props) => {
  return (
    <div className="App">
      <Map
        google={props.google}
        center={{ lat: props.lat, lng: props.lng }}
        latlng={[props]}
        height="150px"
        zoom={12}
      />
    </div>
  );
};

export default Warehouse;

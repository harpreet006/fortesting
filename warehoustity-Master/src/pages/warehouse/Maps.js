import React from 'react'
import {useSelector} from 'react-redux';

import Map from './Map'
const Warehouse  = (props) => {
 
  const items = useSelector((state)=>state.WAREHOUSEINFO);

    return (
      <div  className="App">
    
      <Map
          google={props.google}
          center={{lat: items && items.latlng&&items.latlng.length>0?items.latlng[0].lat:17.3850, lng:items && items.latlng&&items.latlng.length>0?items.latlng[0].lng: 78.4867
                }}
                latlng={items.latlng}
          height='300px'
          zoom={4}
        />
      </div>
    )
}

export default Warehouse

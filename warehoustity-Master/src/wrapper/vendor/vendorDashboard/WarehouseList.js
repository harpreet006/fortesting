import React from 'react';
import {Link} from 'react-router-dom';

const WarehouseList = () => {
  return (
    <tr> 
        <td className="font-weight-bold">ACDHEFRJ</td>
        <td>22/08/2020</td>
        <td className="col">Registered</td>
        <td><Link to="/vendor" className="btn text-nowrap text-deep-blue font-weight-bold px-1">View Details</Link></td> 
    </tr> 
  );
}

export default WarehouseList;

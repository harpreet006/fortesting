import React from 'react';
import {Link} from 'react-router-dom';

const ServicesList = ({service}) => {
    const { id } = service;
    return (
        <table className="table mb-3"> 
            <tbody> 
            <tr>
                <td className="w-150px">
                Services ID:
                </td>
                <td><span className="font-heading">{id}</span></td>
                <td className="w-160px">
                <Link to={`/services/${id}`}>
                <button className="btn btn-line-blue rounded-0 p-0 toggle-class"><span className="h6 text-blue">View Certificate</span></button>
                </Link>
                </td>
            </tr>   
            </tbody>
        </table> 
    )
}

export default ServicesList

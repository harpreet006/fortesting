import React from 'react';
import {Link} from 'react-router-dom';

const MisList = ({item, index}) => {

    return (
        <tr>
            <td> {index+1} </td>
            <td>BK{item?.id}</td>  
            <td>WH{item?.warehouse?.id}</td>  
            <td>
                <div className="text-center text-nowrap">
                <Link to={`/mis-list/${item?.id}/${item?.warehouse?.id}`} className="btn px-3 toggle-class text-blue" >Manage</Link>  
                </div>
            </td>
        </tr>
    )
}

export default MisList

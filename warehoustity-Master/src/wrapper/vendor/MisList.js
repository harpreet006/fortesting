import React from 'react';
import {Link} from 'react-router-dom';

const MisList = () => {
    return (
        <tr> 
            <td>1.</td>
            <td>12-02-2020</td>
            <td className="text-center"><Link to="#" className="btn py-0 px-5"><img className="size-20px" src={"/assets/images/icons/upload-icon.png"} alt="mis"/></Link></td>
            <td className="text-center"><Link to={`/vendor/managemis/${'misId'}`} className="py-2 mb-0"><i className="fas fa-eye"></i></Link></td>
        </tr> 
    )
}

export default MisList

import React from 'react';
import {readableDate} from '../validation';

const MisReportList = ({item, index, warehouseId}) => {
    return (
        <tr>
            <td> {index+1} </td>
            <td>RI{item?.id}</td>
            <td>{readableDate(item?.created_at)}</td>
            <td>WH{warehouseId}</td>  
            <td>
                <div className="text-center text-nowrap">
                    {/*  eslint-disable-next-line */}
                   <a href={item?.report} target="_blank" download className="btn px-3 toggle-class text-blue" ><i className="fas fa-eye"></i></a>
                </div>
            </td>
        </tr>
    )
}

export default MisReportList

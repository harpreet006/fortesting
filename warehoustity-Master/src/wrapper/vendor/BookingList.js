import React from 'react';
import {Link} from 'react-router-dom';
import {readableDate} from '../../components/validation';

const BookingList = ({item, index, status}) => {
    
    return (
        <tr> 
            <td>{index}.</td>
            <td className="text-nowrap">BK{item.id}</td>
            <td className="text-nowrap">{readableDate(item.created_at)}</td>
            <td>{item.warehouse?.warehouseId}</td>
            <td className="text-nowrap">{item.warehouse?.category?.categoryName}</td>
            <td><button className={`btn py-1 px-0 ${item?.vendorStatus === "CONFIRMED" ? "text-deep-primary" : ""} ${item?.vendorStatus === "CANCELLED" ? "text-red" : ""}`}>{item.vendorStatus}</button></td>
            <td><Link to={`/vendor/booking/${item.id}?status=${status}`} className="text-nowrap alert py-1 alert-primary text-white mb-0">View Details</Link></td>
        </tr> 
    )
}

export default BookingList

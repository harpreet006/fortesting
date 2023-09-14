import React from 'react';
import {Link} from 'react-router-dom';

const MyWarehouseList = ({house, index}) => {
    const {id} = house;
    return (
        <tr className={`${index % 2 !== 0 ? "firstRow" : "secondRow"}`}>
            <td>
            <img className="size-60px img-fluid rounded"
            src={house?.warehouse?.warehouseImagesInfo?.coverImage.url}
            alt="mywarehouse"/>
            </td>
            <td>{house?.warehouse?.warehouseId}</td>
            <td>{house?.warehouse?.warehouseName}</td>
            <td>{house?.warehouse?.category?.categoryName}</td>
            <td>{house?.warehouse?.type?.type}</td>
            <td>
            <Link to={`/mywarehouse/${id}`}>
            <button className="btn p-0 btn-line-blue mb-2 toggle-class">View Details</button>
            </Link>
            </td>
            {/* <td>
            {adminStatus  === "CONFIRMED" && vendorStatus === "CONFIRMED" ? 
            <button className="alert btn-sm py-1 alert-success">CONFIRMED</button>
            :null}

            {(adminStatus  === "PENDING" && vendorStatus === "PENDING") || (adminStatus === "PENDING" && vendorStatus === "CONFIRMED") || (adminStatus === "CONFIRMED" && vendorStatus === "PENDING") ? 
            <button className="alert btn-sm py-1 alert-warning">PENDING</button>
            :null}

            {(adminStatus  === "CANCELLED" && vendorStatus === "CANCELLED") || (adminStatus  === "CONFIRMED" && vendorStatus === "CANCELLED") || (adminStatus === "CANCELLED" && vendorStatus === "CONFIRMED") ? 
            <button className="alert btn-sm py-1 alert-danger">CANCELLED</button>
            :null}
            </td> */}
        </tr> 
    )
}

export default MyWarehouseList

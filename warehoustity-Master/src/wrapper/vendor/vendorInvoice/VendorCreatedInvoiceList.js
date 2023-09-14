import React from 'react';
import {Link} from 'react-router-dom';
import {readableDate} from '../../../components/validation';

const VendorCreatedInvoiceList = ({item, index}) => {
    return (
        <tr> 
        <td>{index}</td>
        <td>{item?.name}</td>
        <td>{item?.email}</td>
        <td  className="text-nowrap">{readableDate(item.invoiceDate)}</td>
        <td className="text-center">WH{item?.warehouse?.id}</td>
        <td className="text-center">
            {/* <Link to="/edit-vendor-invoice" className="btn font-weight-bold px-1 py-0 text-danger"><i className="fas fa-edit"></i></Link> */}
            <Link to={`/vendor/vendor-invoice/${item.id}`} className="btn font-weight-bold px-1 py-0"><i className="fas fa-eye"></i></Link>
        </td> 
    </tr>
    )
}

export default VendorCreatedInvoiceList

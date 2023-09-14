import React from 'react';
import { Link } from 'react-router-dom';
import {readableDate} from '../validation';

const EnquiryListVendor = ({enquiry, index}) => {
    const {id, created_at} = enquiry;
    return (
        <tr>
            <td className="text-center">
            {index}
            </td>
            <td>{readableDate(created_at)}</td>
            <td>
            <button className="alert btn-sm py-1 mb-0 alert-success">{enquiry.vendorEnquiry?enquiry.vendorEnquiry.status:""}</button>
            </td>
            <td>
            <Link to={`/vendor/manageenquiry/${id}`}>
            <button className="btn p-0 btn-line-black mb-2"><i className="fas fa-eye"></i></button>
            </Link>
            </td>
        </tr> 
    )
}

export default EnquiryListVendor

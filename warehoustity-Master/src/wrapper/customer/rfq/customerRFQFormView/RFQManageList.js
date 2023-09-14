import React from 'react';
import {Link} from 'react-router-dom';
import {readableDate} from '../../../components/validation'

const RFQManageList = ({item, index}) => {
  return (
    <tr>
        <td>
            {index + 1}.
        </td>
        <td>RI {item.id}</td>
        <td>{readableDate(item.created_at)}</td>
        <td>
            <Link to={`/managerfq/${item.id}`} className="btn btn-block px-1">
            <i className="fas fa-file-alt"></i>
            </Link>
        </td>
    </tr>
  );
}

export default RFQManageList;

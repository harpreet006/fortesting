import React from 'react';
import {Link} from 'react-router-dom';
import {readableDate} from '../../../components/validation'

const RfqManageRow = ({item, index, rfqId, isOpen}) => {
  return (  
    <tr>
    <td>
        {index + 1}.
    </td>
    <td>{isOpen ? item?.warehouse?.warehouseId : item?.warehouseId}</td>
    <td>{readableDate(item.created_at)}</td>

    <td>
        <Link to={`/managerfq/${rfqId}/${isOpen ? item?.warehouse?.id : item.id}`} className="btn btn-block px-1">
        <i className="fas fa-file-alt"></i>
        </Link>
    </td>
</tr>
  );
}

export default RfqManageRow;

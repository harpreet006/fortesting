import React from "react";
import { Link } from "react-router-dom";
const WarehouseList = ({ data, index }) => {
  const { id, vendorStatus, warehouseName, category } = data;

  return (
    <tr>
      {/* <td>763247AH</td> */}
      <td className="text-center">{index}</td>
      <td className="text-capitalize">{warehouseName}</td>
      <td className="text-capitalize"></td>
      {/* {category.categoryName} */}
      <td>{vendorStatus}</td>
      <td>
        {vendorStatus === "Draft" || vendorStatus === "Rejected By WHS" ? (
          <Link
            to={`/vendor/update-warehouse-rejected/${id}`}
            className="btn px-0 text-deep-blue font-weight-bold text-uppercase"
          >
            <i className="fa fa-edit"></i>
          </Link>
        ) : (
          <span className="btn px-0 text-deep-blue font-weight-bold text-uppercase">
            <i className="fa fa-edit"></i>
          </span>
        )}
      </td>
      <td className="text-center">
        <Link
          to={`/vendor/warehouse-details/${id}`}
          className="btn font-weight-bold px-1"
        >
          <i className="fas fa-eye"></i>
        </Link>
      </td>
    </tr>
  );
};

export default WarehouseList;

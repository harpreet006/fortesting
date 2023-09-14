import React from "react";
import { readableDate } from "../../../components/validation";

const VendorInvoiceList = ({ item, index }) => {
  return (
    <tr>
      <td className="text-center py-2">{index}</td>
      <td>{item?.warehouse?.warehouseId}</td>
      <td>{item?.booking?.id}</td>
      <td>{item?.warehouse?.warehouseName}</td>
      <td></td>
      <td>{item?.billDescription}</td>
      <td>{item?.invoiceNumber}</td>
      <td>{item?.price}</td>
      <td>{item?.gst}</td>
      <td>{item?.gstCalculation}</td>
      <td>{item?.price}</td>
      <td>{item?.creditDays}</td>
      <td>{readableDate(item.dueDate)}</td>
      <td>{item?.paymentTerms}</td>
      <td className="text-nowrap">{readableDate(item.invoiceDate)}</td>

      <td className="text-center">
        
        <a href={item.documentFile} target="_blank" rel="noopener noreferrer" className="btn font-weight-bold px-1 py-0">
          <i className="fas fa-eye"></i>
        </a>
      </td>
    </tr>
  );
};

export default VendorInvoiceList;

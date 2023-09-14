import React from "react";
import { readableDate } from "../../../components/validation";

const InvoiceList = ({ invoice, index }) => {
  function getNetPrice(){
    let gstAmount = ( invoice.price * invoice.gstCalculation ) / 100
    return invoice.price + gstAmount
   
  }

  return (
    <tr className={`${index % 2 !== 0 ? "firstRow" : "secondRow"}`}>
      <td className="text-center py-2">{index}</td>
      <td>{invoice?.warehouse?.warehouseId}</td>
      <td>{invoice?.booking?.id}</td>
      <td>{invoice?.warehouse?.warehouseName}</td>
      <td></td>
      <td>{invoice?.billDescription}</td>
      <td>{invoice?.invoiceNumber}</td>
      <td>{invoice?.price}</td>
      <td>{invoice?.isGst ? "Yes" : "No"}</td>
      <td>{invoice?.gstCalculation}</td>
      <td>{getNetPrice()}</td>
      <td className="text-nowrap">Brijesh</td>
      <td>{invoice?.creditDays}</td>
      <td className="text-nowrap">{readableDate(invoice.dueDate)}</td>
      <td>{invoice?.paymentTerms}</td>
      <td className="text-nowrap">{readableDate(invoice.invoiceDate)}</td>

      {/* <td>
      {id}
    </td>
    <td>{readableDate(invoiceDate)}</td>
    <td>{invoice?.warehouse?.warehouseId}</td>  
    <td>{invoice?.warehouse?.warehouseName}</td>  */}
      <td>{invoice?.remarks}</td> 
      <td className="text-nowrap">{`Invoice Send`}</td> 
      <td>
        <div className="text-center text-nowrap">

        <a href={invoice.documentFile} target="_blank" rel="noopener noreferrer" className="btn px-2 toggle-class">
            <i className="fas fa-eye"></i>
          </a>

          {/* <Link to={`/invoice/${id}`} className="btn px-2 toggle-class">
            <i className="fas fa-eye"></i>
          </Link> */}
        </div>
      </td>
    </tr>
  );
};

export default InvoiceList;

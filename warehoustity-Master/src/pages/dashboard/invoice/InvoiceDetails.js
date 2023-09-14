import React from "react";
import { readableDate } from "../../../components/validation";

const InvoiceDetails = ({ data }) => {
  return (
    <div className="row">
      <div className="col-xl-10 col-lg-11 col-12">
        <div className="space-certficate-holder">
          <div className="space-certificate warning shadow">
            <div className="space-certificate-design top-left"></div>
            <div className="space-certificate-design top-right"></div>
            <div className="space-certificate-design bottom-right"></div>
            <div className="space-certificate-design bottom-left"></div>
            <div className="px-2 space-certificate-inner py-5 px-4">
              <div className="inner-border top-left"></div>
              <div className="inner-border top-right"></div>
              <div className="inner-border bottom-right"></div>
              <div className="inner-border bottom-left"></div>
              <div className="img-holder w-200px mx-auto my-2">
                <img src="/assets/images/logo.png" alt="" />
              </div>
              <div className="px-sm-4">
                <h2 className="text-center text-uppercase">Invoice</h2>
                <div className="heading-design">
                  <span className="line left">
                    <span className="dots"></span>
                    <span className="dots"></span>
                    <span className="dots"></span>
                    <span className="dots"></span>
                  </span>
                  <span className="line right">
                    <span className="dots"></span>
                    <span className="dots"></span>
                    <span className="dots"></span>
                    <span className="dots"></span>
                  </span>
                </div>
                <div className="px-md-4">
                  <h5 className="text-center mt-2">
                    This is system Generated invoice.
                  </h5>
                  <table className="table table-borderless mt-2">
                    {/* <thead>
                        <tr>
                        <th className="left">Headers</th>
                        <th>Warehousity</th>
                        </tr>
                    </thead> */}
                    <tbody>
                      <tr>
                        <td className="left">Warehouse ID</td>
                        <td>{data?.warehouse?.id}</td>
                      </tr>

                      <tr>
                        <td className="left">Invoice Number</td>
                        <td>{data?.invoiceNumber}</td>
                      </tr>

                      <tr>
                        <td className="left">Bill Description</td>
                        <td>{data?.billDescription}</td>
                      </tr>

                      <tr>
                        <td className="left">Credit Days</td>
                        <td>{data?.creditDays}</td>
                      </tr>

                      <tr>
                        <td className="left">Payments Terms</td>
                        <td>{data?.paymentTerms}</td>
                      </tr>

                      <tr>
                        <td className="left">Warehouse Location</td>
                        <td>{data?.area}</td>
                      </tr>

                      <tr>
                        <td className="left">Invoice Date</td>
                        <td>{readableDate(data?.invoiceDate)}</td>
                      </tr>
                      <tr>
                        <td className="left">Due Date</td>
                        <td>{readableDate(data?.dueDate)}</td>
                      </tr>
                      <tr>
                        <td className="left">Mobile No.</td>
                        <td>{`+91 ${data?.contactNumber}`}</td>
                      </tr>
                      <tr>
                        <td className="left">Email</td>
                        <td>{data?.email}</td>
                      </tr>
                     
                      <tr>
                        <td className="left">Price</td>
                        <td>{data?.price} Rupees</td>
                      </tr>
                      <tr>
                        <td className="left">GST Calculation</td>
                        <td>{data?.gstCalculation}</td>
                      </tr>
                      <tr>
                        <td className="left">GST</td>
                        <td>{data?.gst} Rupees</td>
                      </tr>
                      <tr>
                        <td className="left">Total Price</td>
                        <td>{data?.price + data?.gst} Rupees</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;

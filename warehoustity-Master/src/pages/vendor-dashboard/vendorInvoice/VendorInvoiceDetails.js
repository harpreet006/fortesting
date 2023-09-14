import VendorLayout from "../../../layout/VendorLayout";
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { invoiceById } from "../../../store/actions/customer/invoiceAction";
import { useSelector, useDispatch } from "react-redux";
// import {readableDate} from '../../../components/validation'
import { CardLoader } from "../../../components/helper/CustomLoader";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import InvoiceDetails from "../../dashboard/invoice/InvoiceDetails";

const VendorInvoiceDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.INVOICEINFO);
  const { invoiceId } = useParams();

  useEffect(() => {
    dispatch(invoiceById(invoiceId));
  }, [dispatch, invoiceId]);

  const convertPdf = () => {
    html2canvas(document.getElementById("pdf-element")).then(function (canvas) {
      var wid;
      var hgt;
      var img = canvas.toDataURL(
        "image/png",
        (wid = canvas.width),
        (hgt = canvas.height)
      );
      var hratio = hgt / wid;
      var doc = new jsPDF("p", "pt", "a4");
      var width = doc.internal.pageSize.width;
      var height = width * hratio;
      doc.addImage(img, "JPEG", 20, 20, width, height);
      doc.save("invoice.pdf");
    });
  };

  return (
    <VendorLayout>
      <div className="content-admin px-1">
     
        <div className="row align-items-center pb-3 px-3 mx-0">
        <div className="col-12 py-3">
            <h5 className="text-dark">
              <i
                onClick={() => history.goBack()}
                className="fas fa-chevron-left mr-3 cursorPointer"
              ></i>{" "}
              Invoice Detail
            </h5>
          </div>

          <div className="col-12">
            {data.isLoading ? (
              <CardLoader />
            ) : (
              <div className="row mx-0">
                <div className="col-12">
                  {data.invoiceDetail ? (
                    <div id="pdf-element">
                      <InvoiceDetails data={data.invoiceDetail} />

                      {/* <div className="d-flex">
                      <div className="mw-200px px-3 font-weight-bold py-2">City</div>
                      <div className="mw-300px px-3 py-2 text-gray">{data.invoiceDetail?.city}</div>
                    </div> */}
                      {/* <div className="d-flex">
                      <div className="mw-200px px-3 font-weight-bold py-2">Address</div>
                      <div className="mw-300px px-3 py-2 text-gray">{data.invoiceDetail?.area}</div>
                    </div>
                    <div className="d-flex">
                      <div className="mw-200px px-3 font-weight-bold py-2">Warehouse ID</div>
                      <div className="mw-300px px-3 py-2 text-gray">WH{data.invoiceDetail?.warehouse?.id}</div>
                    </div>
                    <div className="d-flex">
                      <div className="mw-200px px-3 font-weight-bold py-2">Email ID</div>
                      <div className="mw-300px px-3 py-2 text-gray">{data.invoiceDetail?.email}</div>
                    </div>
                    <div className="d-flex">
                      <div className="mw-200px px-3 font-weight-bold py-2">Company Name</div>
                      <div className="mw-300px px-3 py-2 text-gray">{data.invoiceDetail?.name}</div>
                    </div>
                    <div className="d-flex">
                      <div className="mw-200px px-3 font-weight-bold py-2">Invoice Date </div>
                      <div className="mw-300px px-3 py-2 text-gray">{readableDate(data.invoiceDetail?.invoiceDate)}</div>
                    </div>
                    <div className="d-flex">
                      <div className="mw-200px px-3 font-weight-bold py-2">Due Date </div>
                      <div className="mw-300px px-3 py-2 text-gray">{readableDate(data.invoiceDetail?.dueDate)}</div>
                    </div>
                    <div className="d-flex">
                      <div className="mw-200px px-3 font-weight-bold py-2">Contact No.</div>
                      <div className="mw-300px px-3 py-2 text-gray">{data.invoiceDetail?.contactNumber}</div>
                    </div>
                    <div className="d-flex">
                      <div className="mw-200px px-3 font-weight-bold py-2">Price</div>
                      <div className="mw-300px px-3 py-2 text-gray">{data.invoiceDetail?.price} rupees</div>
                    </div>
                    <div className="d-flex">
                      <div className="mw-200px px-3 font-weight-bold py-2">Gst</div>
                      <div className="mw-300px px-3 py-2 text-gray">{data.invoiceDetail?.gst} rupees</div>
                    </div> 
                    <div className="d-flex">
                      <div className="mw-200px px-3 font-weight-bold py-2">Total Price</div>
                      <div className="mw-300px px-3 py-2 text-gray">{data.invoiceDetail?.price+data.invoiceDetail?.gst} rupees</div>
                    </div> */}
                    </div>
                  ) : null}
                </div>
              </div>
            )}
            <div className="row my-4">
              <div className="col-auto">
                <button
                  onClick={() => history.goBack()}
                  className="btn btn-outline-deep-blue"
                >
                  Back
                </button>
              </div>
              <div className="col-auto">
                <button
                  onClick={convertPdf}
                  className="btn btn-outline-deep-blue"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default VendorInvoiceDetails;

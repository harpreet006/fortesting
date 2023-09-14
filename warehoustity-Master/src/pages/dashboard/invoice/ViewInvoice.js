import React, {useEffect} from 'react';
import Layout from '../../../layout/Layout';
import {useHistory, useParams} from 'react-router-dom';
import CustomerLayout from '../../../layout/CustomerLayout';
import {invoiceById} from '../../../store/actions/customer/invoiceAction'
import {useSelector, useDispatch} from 'react-redux';
// import {readableDate} from '../../../components/validation'
import { CardLoader } from '../../../components/helper/CustomLoader';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import InvoiceDetails from './InvoiceDetails';


const ViewInvoice = () => {
    const  history = useHistory();
    const dispatch = useDispatch();
    const data = useSelector((state)=>state.INVOICEINFO);
    const {invoiceId} = useParams()
  
  useEffect(() => {
    dispatch(invoiceById(invoiceId))
  }, [dispatch, invoiceId]);


  const convertPdf = () =>{
    html2canvas(document.getElementById('pdf-element')).then(function(canvas){
      var wid;
      var hgt;
      var img = canvas.toDataURL("image/png", wid = canvas.width, hgt = canvas.height);
      var hratio = hgt/wid
      var doc = new jsPDF('p','pt','a4');
      var width = doc.internal.pageSize.width;    
      var height = width * hratio
      doc.addImage(img,'JPEG',20,20, width, height);
      doc.save('invoice.pdf');
  });
  }

  return (
    <Layout>
      
      <CustomerLayout title="Invoice View">
        <div className="row">
            <div className="content col-12 view-invoice"> 
             
              <div className="row p-3"> 

              <div className="border-bottom mb-3 d-sm-flex justify-content-between">
                <div>
                  <span className="btn name-breadcrumb px-0 text-dark font-heading mr-3 mb-2 text-uppercase toggle-className"><i onClick={()=>history.goBack()} className="fas fa-chevron-left pr-3"></i> View Invoice</span>
                </div> 
              </div>

                <div className="col-12">

                {data.isLoading ? 
                  <CardLoader />
                :
                <>
                {data.invoiceDetail ?

            
                    <div className="row" id="pdf-element" >
                      <InvoiceDetails data={data.invoiceDetail} />
                      {/* <div className="form-group col-lg-4 col-md-6 mb-4">
                        <label htmlFor="staticEmail" className="mb-2">Address</label>
                        <input type="text" className="form-control form-control-md" id="staticEmail" value={data.invoiceDetail?.area} readOnly />
                      </div>
                      <div className="form-group col-lg-4 col-md-6 mb-4">
                        <label htmlFor="staticEmail" className="mb-2">Warehouse ID</label>
                        <input type="text" className="form-control form-control-md" id="staticEmail" value={"WH"+data.invoiceDetail?.warehouse?.id} readOnly />
                      </div>
                      <div className="form-group col-lg-4 col-md-6 mb-4">
                        <label htmlFor="staticEmail" className="mb-2">Invoice Date</label>
                        <input type="text" className="form-control form-control-md" id="staticEmail" value={readableDate(data.invoiceDetail?.invoiceDate)} readOnly />
                      </div>
                      <div className="form-group col-lg-4 col-md-6 mb-4">
                        <label htmlFor="staticEmail" className="mb-2">Due Date</label>
                        <input type="text" className="form-control form-control-md" id="staticEmail" value={readableDate(data.invoiceDetail?.dueDate)} readOnly />
                      </div>
                      <div className="form-group col-lg-4 col-md-6 mb-4">
                        <label htmlFor="staticEmail" className="mb-2">Mobile No.</label>
                        <input type="tel" className="form-control form-control-md" id="staticEmail" value={`+91 ${data.invoiceDetail?.contactNumber}`} readOnly />
                      </div>
                      <div className="form-group col-lg-4 col-md-6 mb-4">
                        <label htmlFor="staticEmail" className="mb-2">Email Id</label>
                        <input type="email" className="form-control form-control-md" id="staticEmail" value={data.invoiceDetail?.email} readOnly />
                      </div>
                      <div className="form-group col-lg-4 col-md-6 mb-4">
                        <label htmlFor="staticEmail" className="mb-2">Price</label>
                        <input type="text" className="form-control form-control-md" id="staticEmail" value={data.invoiceDetail?.price} readOnly />
                      </div>
                      <div className="form-group col-lg-4 col-md-6 mb-4">
                        <label htmlFor="staticEmail" className="mb-2">GST</label>
                        <input type="text" className="form-control form-control-md" id="staticEmail" value={data.invoiceDetail?.gst} readOnly />
                      </div> 
                      <div className="form-group col-lg-4 col-md-6 mb-4">
                        <label htmlFor="staticEmail" className="mb-2">Total Price</label>
                        <input type="text" className="form-control form-control-md" id="staticEmail" value={data.invoiceDetail?.price + data.invoiceDetail?.gst} readOnly />
                      </div>  */}
                    </div>
                  :null}
                  </>

                }

                </div> 
              </div> 
              <div className="row">
              
                <div className="col-auto toggle-className">
                  <button onClick={()=>history.goBack()} className="btn btn-outline-deep-primary m-3 py-1">Back</button>
                </div>

                <div className="col-auto toggle-className">
                  <button onClick={convertPdf} className="btn btn-outline-deep-primary m-3 py-1">Download PDF</button>
                </div>

                <div className="col-auto toggle-className">
                  <a href={data.invoiceDetail?.documentFile ? data.invoiceDetail?.documentFile : "#invoice"} target="_blank" rel="noopener noreferrer" className="btn btn-deep-primary m-3 py-1">View Attachment</a>
                </div>
              </div>
            </div>
          </div>
    </CustomerLayout>
   </Layout>
  );
}

export default ViewInvoice;

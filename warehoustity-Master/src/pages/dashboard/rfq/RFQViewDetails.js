import React, { useEffect } from "react";
import Layout from "../../../layout/Layout";
import { Link, useHistory, useParams } from "react-router-dom";
import CustomerLayout from "../../../layout/CustomerLayout";
import BrowserTitle from "../../../components/helper/BrowserTitle";
import { statusRfqByIdWarehouseId } from "../../../store/actions/customer/rfqAction";
import { useSelector, useDispatch } from "react-redux";
import { readableDate } from "../../../components/validation";
import { CardLoader } from "../../../components/helper/CustomLoader";

const RFQViewDetails = () => {
  const history = useHistory();
  const { rfqId, warehouseId } = useParams();

  const dispatch = useDispatch();
  const data = useSelector((state) => state.CUSTOMER_RFQ_INFO);

  useEffect(() => {
    if (rfqId !== "") {
      dispatch(statusRfqByIdWarehouseId(rfqId, warehouseId));
    }
  }, [dispatch, rfqId, warehouseId]);
  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });
  return (
    <Layout>
      <BrowserTitle title="RFQ" />
      <CustomerLayout title={`RFQ`}>
        {data.isLoading ? (
          <CardLoader />
        ) : (
          <div className="row">
            <div className="content col-12">
              <div className="border-bottom d-sm-flex justify-content-between">
                <div>
                  <span className="btn name-breadcrumb px-0 text-dark font-heading mr-3 mb-2 text-uppercase">
                    <i
                      onClick={() => history.goBack()}
                      className="fas fa-chevron-left pr-3"
                    ></i>
                    View Your RFQ Details (RFQ ID : {rfqId})
                  </span>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-12 border table-responsive table-dashboard">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="text-nowrap">Document Name</th>
                        <th>Shared By</th>
                        <th>Shared To</th>
                        <th>On Date</th>
                        <th>Purpose</th>
                        <th className="text-center"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.rfqDetail &&
                      data.rfqDetail.customerRequestResponses &&
                      data.rfqDetail.customerRequestResponses.length > 0
                        ? data.rfqDetail.customerRequestResponses.map(
                            (item, index) => {
                              return (
                                <tr>
                                  <td>{item.documentName}</td>
                                  <td>{item.sharedBy}</td>
                                  <td>{item.sharedTo}</td>
                                  <td>{readableDate(item.onDate)}</td>
                                  <td>
                                    {item.purpose ===
                                    "customer to warehousity" ? (
                                      <div>Request For Warehouse</div>
                                    ) : null}
                                    <div>{item.purpose}</div>
                                  </td>
                                  <td>
                                    <Link
                                      to={
                                        item.purpose ===
                                        "customer to warehousity"
                                          ? `/customer-rfq-details/${rfqId}/${warehouseId}`
                                          : `/whs-rfq-details/${item.customerResponseId}`
                                      }
                                      className="btn btn-block btn-line btn-line-deep-primary px-0 rounded-0 py-1"
                                    >
                                      View Document
                                    </Link>
                                  </td>
                                </tr>
                              );
                            }
                          )
                        : null}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* <div className="border-bottom mb-3 d-sm-flex justify-content-between">
                    <div>
                      <span className="btn name-breadcrumb px-0 text-dark font-heading mr-3 mb-2 text-uppercase">Other RFQ Responses</span>
                    </div> 
                  </div> */}
              {/* <div className="row p-3 mb-4">
                    <div className="col-12 border table-responsive table-dashboard">
                      <table className="table">
                        <tbody>

                        {data.rfqDetail && data.rfqDetail.customerRequestResponses && data.rfqDetail.customerRequestResponses.length>0 ?
                        
                          data.rfqDetail.customerRequestResponses.map((item, index)=>{
                              return (
                              <>
                              {item.isOther === true ?
                                <tr>
                                      <td>
                                        {item.documentName}
                                      </td>
                                      <td>{item.sharedBy}</td>
                                      <td>{item.sharedTo}</td>
                                      <td>{readableDate(item.onDate)}</td>
                                      <td>
                                      {item.purpose === "customer to warehousity" ?   <div>Request For Warehouse</div> : null}
                                        <div>{item.purpose}</div>
                                      </td>
                                      <td>
                                        <Link to={`/whs-rfq-details/${rfqId ? rfqId : null}`} className="btn btn-block btn-line btn-line-deep-primary px-0 rounded-0 py-1">
                                          View Document
                                        </Link>
                                      </td>
                                    </tr> 
                                    :null}
                                    </>
                                )
                          })
                        :null}
                        </tbody>
                      </table>
                    </div>
                  </div> */}
            </div>
          </div>
        )}
      </CustomerLayout>
    </Layout>
  );
};

export default RFQViewDetails;

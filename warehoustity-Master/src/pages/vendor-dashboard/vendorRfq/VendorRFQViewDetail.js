import React, { useEffect } from "react";
import VendorLayout from "../../../layout/VendorLayout";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  vendorRequestRfqById,
  rfq_By_Id,
} from "../../../store/actions/vendor/rfqAction";
import { useSelector, useDispatch } from "react-redux";
import { readableDate } from "../../../components/validation";
import {
  CardLoader,
  ItemNotFlund,
} from "../../../components/helper/CustomLoader";

const VendorRFQViewDetail = () => {
  const { rfqResponseId, customerRfqId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector((state) => state.VENDOR_RFQ_INFO);

  useEffect(() => {
    dispatch(vendorRequestRfqById(parseInt(rfqResponseId)));
    return () => dispatch(rfq_By_Id([]));
  }, [dispatch, rfqResponseId]);

  return (
    <VendorLayout>
      <div className="content-admin px-1">
        <div className="row align-items-center py-3 px-3 mx-0">
          <div className="col-12 pb-3 ps-0">
            <h5 class="text-dark backButton ">
              <i
                onClick={() => history.goBack()}
                class="fas fa-chevron-left mr-3 cursorPointer"
              ></i>
              Manage RFQ Detail (RFQ ID : {customerRfqId})
            </h5>
          </div>

          {data.isLoading ? (
            <CardLoader />
          ) : (
            <>
              <div className="col-12 table-responsive bg-white py-3">
                {data.rfqDetail.data?.vendorRequestResponse &&
                data.rfqDetail.data.vendorRequestResponse.length > 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="text-nowrap bg-dark text-white">Document Name</th>
                        <th className="bg-dark text-white">Shared By</th>
                        <th className="bg-dark text-white">Shared To</th>
                        <th className="bg-dark text-white">On Date</th>
                        <th className="bg-dark text-white">Purpose</th>
                        <th className="text-center bg-dark text-white">View</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.rfqDetail.data.vendorRequestResponse.map(
                        (item, index) => {
                          return (
                            <tr key={index}>
                              <td className="pb-0">{item.documentName}</td>
                              <td className="pb-0">{item.sharedBy}</td>
                              <td className="pb-0">{item.sharedTo}</td>
                              <td className="pb-0">{readableDate(item.onDate)}</td>
                              <td className="pb-0">
                                <div>{item.purpose}</div>
                              </td>
                              <td className="pb-0">
                                {item.purpose === "Warehousity to Vendor" ? (
                                  <Link
                                    to={`/vendor/rfq-detail/${rfqResponseId}`}
                                    className="btn btn-block btn-line btn-line-deep-primary px-0 rounded-0 py-1"
                                  >
                                    View Document
                                  </Link>
                                ) : (
                                  <Link
                                    to={`/vendor/vendor-response-detail/${item.vendorResponseId}`}
                                    className="btn btn-block btn-line btn-line-deep-primary px-0 rounded-0 py-1"
                                  >
                                    View Document
                                  </Link>
                                )}
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                ) : (
                  <ItemNotFlund message={`No Data Available`} />
                )}
              </div>

              {data.rfqDetail.data?.vendorRequestResponse &&
              data.rfqDetail.data.vendorRequestResponse.length === 1 &&
                <div className={`col-12 mt-1`}>
                  <div className="row justify-content-end">
                    <div className="col-auto">
                      <Link
                        to={`/vendor/manage-rfq/${rfqResponseId}/${customerRfqId}`}
                        type="button"
                        className="btn btn-deep-primary mb-3 add-className remove-className"
                      >
                        Response to Warehousity
                      </Link>
                    </div>
                  </div>
                </div>}
            </>
          )}
        </div>
      </div>
    </VendorLayout>
  );
};

export default VendorRFQViewDetail;

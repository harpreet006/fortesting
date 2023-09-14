import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import BrowserTitle from "../../../components/helper/BrowserTitle";
import { enquiryById } from "../../../store/actions/customer/enquiryAction";
import { useSelector, useDispatch } from "react-redux";
import { CardLoader } from "../../../components/helper/CustomLoader";
import VendorLayout from "../../../layout/VendorLayout";

const EnquiryDetails = () => {
  const history = useHistory();
  const { enquiryId } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.ENQUIRYINFO);
  useEffect(() => {
    dispatch(enquiryById(enquiryId));
  }, [dispatch, enquiryId]);

  return (
    <VendorLayout>
      <div className="content-admin px-5 mt-2">
        <BrowserTitle title={`Enquiry Details`} />
        <div className="row">
          <div className="content col-12 view-enquiry-details">
            <div className="border-bottom mb-3">
              <button className="btn font-weight-bold">
                <i
                  onClick={() => history.goBack()}
                  className="fas fa-chevron-left pr-3"
                ></i>{" "}
                View Response
              </button>
            </div>

            {data.isLoading ? (
              <CardLoader />
            ) : (
              <div className="row">
                <div className="col-12">
                  <form className="mb-2 bg-white p-4">
                    <div className="form-group">
                      <input
                        value={
                          data.enquiryDetail.vendorEnquiry
                            ? data.enquiryDetail.vendorEnquiry.serviceType
                            : ""
                        }
                        type="text"
                        className="form-control form-control-md"
                        id="formGroupExampleInput"
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <input
                        value={
                          data.enquiryDetail.vendorEnquiry
                            ? data.enquiryDetail.vendorEnquiry.name
                            : ""
                        }
                        type="text"
                        className="form-control form-control-md"
                        id="formGroupExampleInput"
                        placeholder="Ravish Kumar"
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <input
                        value={
                          data.enquiryDetail.vendorEnquiry
                            ? data.enquiryDetail.vendorEnquiry.email
                            : ""
                        }
                        type="email"
                        className="form-control form-control-md"
                        id="formGroupExampleInput"
                        placeholder="ravishkumar@gmail.com"
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <input
                        value={
                          data.enquiryDetail.vendorEnquiry
                            ? data.enquiryDetail.vendorEnquiry.companyName
                            : ""
                        }
                        type="text"
                        className="form-control form-control-md"
                        id="formGroupExampleInput"
                        placeholder="Abc Corporation"
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <input
                        value={
                          data.enquiryDetail.vendorEnquiry
                            ? data.enquiryDetail.vendorEnquiry.phone
                            : ""
                        }
                        type="tel"
                        className="form-control form-control-md"
                        id="formGroupExampleInput"
                        placeholder="+91 876 542 758 8"
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        value={
                          data.enquiryDetail.vendorEnquiry
                            ? data.enquiryDetail.vendorEnquiry.message
                            : ""
                        }
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="4"
                        readOnly
                      >
                        I am looking for warehouse space in Delhi, Kindly help
                        me out.
                      </textarea>
                    </div>
                  </form>
                  <form className="bg-white w-100 p-3 pb-0">
                    <h5 className="mb-3">Response from warehousity.</h5>
                    <div className="form-group mb-0">
                      <textarea
                        value={
                          data.enquiryDetail.vendorEnquiry
                            ? data.enquiryDetail.vendorEnquiry.adminMessage
                            : ""
                        }
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="4"
                        readOnly
                      >
                        Lorem ipsum, or lipsum as it is sometimes known, is
                        dummy text used in laying out print, graphic or web
                        designs.{" "}
                      </textarea>
                    </div>
                  </form>
                </div>
              </div>
            )}
            <div className="row">
              <div className="col-12 my-1">
                <button
                  onClick={() => history.goBack()}
                  className="btn btn-deep-primary toggle-class px-5"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default EnquiryDetails;

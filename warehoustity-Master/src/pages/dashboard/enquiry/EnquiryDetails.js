import React, { useEffect } from "react";
import Layout from "../../../layout/Layout";
import { useHistory, useParams } from "react-router-dom";
import BrowserTitle from "../../../components/helper/BrowserTitle";
import CustomerLayout from "../../../layout/CustomerLayout";
import { enquiryById } from "../../../store/actions/customer/enquiryAction";
import { useSelector, useDispatch } from "react-redux";
import { CardLoader } from "../../../components/helper/CustomLoader";
import { readableDate, readableTime } from "../../../components/validation";

const EnquiryDetails = () => {
  const history = useHistory();
  const { enquiryId } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.ENQUIRYINFO);

  useEffect(() => {
    dispatch(enquiryById(enquiryId, "customer"));
  }, [dispatch, enquiryId]);
  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });
  return (
    <Layout>
      <BrowserTitle title={`Enquiry Details`} />
      <CustomerLayout title="Enquiry Details">
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
              <div className="row bg-white">
                <div className="col-12 bg-white p-3">
                  <form className="mb-4">
                    <div className="form-group">
                      <input
                        value={
                          data.enquiryDetail.customerEnquiry
                            ? data.enquiryDetail.customerEnquiry.serviceType
                            : ""
                        }
                        type="text"
                        className="form-control form-control-md"
                        id="formGroupExampleInput"
                        readOnly
                      />
                    </div>
                    {/* <div className="form-group">
                                            <input value={data.enquiryDetail.customerEnquiry ? data.enquiryDetail.customerEnquiry.name : ""} type="text" className="form-control form-control-md" id="formGroupExampleInput" placeholder="Ravish Kumar" readOnly />
                                        </div>
                                        <div className="form-group">
                                            <input value={data.enquiryDetail.customerEnquiry ? data.enquiryDetail.customerEnquiry.email : ""} type="email" className="form-control form-control-md" id="formGroupExampleInput" placeholder="ravishkumar@gmail.com" readOnly />
                                        </div>
                                        <div className="form-group">
                                            <input value={data.enquiryDetail.customerEnquiry ? data.enquiryDetail.customerEnquiry.companyName : ""} type="text" className="form-control form-control-md" id="formGroupExampleInput" placeholder="Abc Corporation" readOnly />
                                        </div> */}
                    {/* <div className="form-group">
                                            <input value={data.enquiryDetail.customerEnquiry ? data.enquiryDetail.customerEnquiry.phone : ""} type="tel" className="form-control form-control-md" id="formGroupExampleInput" placeholder="+91 876 542 758 8" readOnly />
                                        </div> */}
                    <div className="form-group">
                      <textarea
                        value={
                          data.enquiryDetail.customerEnquiry
                            ? data.enquiryDetail.customerEnquiry.message
                            : ""
                        }
                        className="form-control fieldAreaHeight"
                        id="exampleFormControlTextarea1"
                        rows="4"
                        style={{ height: "150px !important" }}
                        readOnly
                      ></textarea>
                    </div>
                  </form>
                  <form>
                    <h5 className="mb-2">Response from warehousity.</h5>
                    <div className="form-group">
                      <textarea
                        value={
                          data.enquiryDetail.customerEnquiry
                            ? data.enquiryDetail.customerEnquiry.adminMessage
                            : ""
                        }
                        className="form-control fieldAreaHeight messageFields"
                        id="exampleFormControlTextarea1"
                        rows="4"
                        readOnly
                      ></textarea>
                    </div>
                  </form>
                </div>
                {data.enquiryDetail.customerEnquiry?.adminMessage !== "" && (
                  <span className="text-right">
                    <b>Replay</b> : Warehousity on{" "}
                    {readableDate(
                      data.enquiryDetail.customerEnquiry?.updated_at
                    ) +
                      " " +
                      readableTime(
                        data.enquiryDetail.customerEnquiry?.updated_at
                      )}{" "}
                  </span>
                )}
              </div>
            )}
            <div className="row">
              <div className="col-12 my-2">
                <button
                  onClick={() => history.goBack()}
                  className="btn btn-deep-primary py-1 px-5"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default EnquiryDetails;

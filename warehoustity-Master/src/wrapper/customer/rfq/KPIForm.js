import React, { useState } from "react";
import { documentUpload } from "../../../components/utils";
import {
  updateKpiRFQ,
  responseRfq,
} from "../../../store/actions/customer/rfqAction";

import { useSelector, useDispatch } from "react-redux";
import FormSuccess from "../../../components/helper/FormSuccess";
import Spinner from "react-bootstrap/Spinner";

const KPIForm = ({ isView, rfqid }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.CUSTOMER_RFQ_INFO);
  const [fileName, setFileName] = useState(null);
  const [error, setError] = useState(null);
  const [kpiUrl, setKpiUrl] = useState(null);
  var urlData;

  // console.log(data);
  const fileUpload = async (e) => {
    setFileName(e.target.files[0].name);
    let formData = new FormData();

    formData.append("file", e.target.files[0]);
    formData.append("documentName", "kpi_document");
    urlData = await documentUpload(formData);
    setKpiUrl(urlData);
    // console.log("urlData", urlData);
    setError(null);
  };

  const kpiSubmit = (e) => {
    e.preventDefault();
    // console.log("rfqInitialDetail", rfqid);
    // console.log("urlData", kpiUrl);

    if (rfqid && kpiUrl && kpiUrl.success !== false) {
      let fields = {
        kpi: kpiUrl.url,
        customerRfq: rfqid,
      };
      dispatch(updateKpiRFQ(fields, data?.rfqFirstForm?.warehouses));
    } else {
      setError("Please Choose File");
      return 0;
    }
  };

  return (
    <>
      {data.rfqResponse.statusCode === 201 ||
      data.rfqResponse.statusCode === 200 ? (
        <FormSuccess
          onClick={() => dispatch(responseRfq([]))}
          message={data.rfqResponse.message}
        />
      ) : null}

      <form onSubmit={kpiSubmit}>
        <div className="row pt-2">
          <div className="row col-12 ml-0">
            <div className="col-12 mb-md-4 mb-5 pt-md-1 px-0">
              <div className="custom-file form-group form-inline">
                <input
                  onChange={fileUpload}
                  type="file"
                  id="custom-file-upload-input1"
                  className="custom-file-input"
                  hidden
                  readOnly={isView}
                />
                <span
                  id="custom-file-name"
                  className="d-block custom-file-name px-0 mr-3 mb-2"
                >
                  Do you have specific KPI requirements? If yes, pls clarify the
                  definition and targets.
                </span>
                <div>
                  <label
                    className="custom-file-upload-label btn-deep-primary btn text-nowrap w-250px"
                    htmlFor="custom-file-upload-input1"
                  >
                    Attach File
                  </label>
                </div>
                <span>{fileName}</span>
                <span className="errorMsg">{error}</span>
              </div>
            </div>
          </div>
          <div className={`col-12 mt-5 ${isView ? "d-none" : ""}`}>
            <div className="row justify-content-end">
              {/* <div className="col-auto">
            <button type="button" className="btn btn-outline-deep-primary mb-3 add-className remove-className" data-add-target=".steps10" data-add-target-className="d-none" data-remove-target=".steps9" data-remove-target-className="d-none">Back</button>
          </div> */}
              <div className="col-auto">
                <button
                  disabled={data.isLoading}
                  type="submit"
                  className="btn btn-deep-primary mb-3 add-className remove-className"
                >
                  Save
                  {data.isLoading ? <Spinner animation="border" /> : null}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default KPIForm;

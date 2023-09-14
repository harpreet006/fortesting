import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import VendorLayout from "../../layout/VendorLayout";
import {
  misBookingByBookingId,
  createMis,
  misResponse,
} from "../../store/actions/misAction";
import { useDispatch, useSelector } from "react-redux";
import { readableDate } from "../../components/validation";
import { documentUpload } from "../../components/utils";
import FormSuccess from "../../components/helper/FormSuccess";
import Spinner from "react-bootstrap/Spinner";
import { ItemNotFlund } from "../../components/helper/CustomLoader";

const ManageMis = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { misId } = useParams();
  const warehouseId = new URLSearchParams(window.location.search).get(
    "warehouseId"
  );
  const customer = new URLSearchParams(window.location.search).get("customer");
  const items = useSelector((state) => state.MIS_INFO);

  const uploadDocs = async (e) => {
    let formData = new FormData();

    formData.append("file", e.target.files[0]);
    let urlData = await documentUpload(formData);
    if (
      urlData &&
      urlData?.url !== "" &&
      urlData?.success === true &&
      warehouseId &&
      customer &&
      misId
    ) {
      let misData = {
        user: parseInt(customer),
        booking: parseInt(misId),
        warehouse: parseInt(warehouseId),
        report: urlData?.url,
      };
      dispatch(createMis(misData));
    }
  };

  useEffect(() => {
    dispatch(misBookingByBookingId(misId));
  }, [dispatch, misId]);

  return (
    <VendorLayout>
      {items.misResponse !== null && items.misResponse.statusCode === 200 ? (
        <FormSuccess
          onClick={() => {
            dispatch(misResponse(null));
            dispatch(misBookingByBookingId(misId));
          }}
          message={items.misResponse.message}
        />
      ) : null}

      <div className="content-admin  py-2">
        <div className="row align-items-center mx-0">
          <div className="col-12 col-sm-6 col-md-6 col-lg-6 pb-1 px-0 d-flex justify-content-between">
            <h5 className="backButton text-dark ">
              <i
                onClick={() => history.goBack()}
                className="fas fa-chevron-left mr-2 ml-2 cursorPointer"
              ></i>{" "}
              List of MIS - WH{warehouseId}
            </h5>
          </div>

          <div className="px-4">
          <div className="col-12 text-nowrap table-responsive table-gray-admin bg-white p-3 ">
            {items?.misBookingDetail?.reports &&
            items?.misBookingDetail?.reports?.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-center">S.No</th>
                    <th>Date of report</th>
                    <th className="text-nowrap">View Report</th>
                  </tr>
                </thead>
                <tbody>
                  {items?.misBookingDetail?.reports.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-center py-2">{index + 1}.</td>
                        <td>{readableDate(item?.created_at)}</td>
                        <td>
                          {/*  eslint-disable-next-line */}
                          <a
                            href={item?.report}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="py-2 mb-0 text-dark"
                          >
                            <i className="fas fa-eye"></i>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <ItemNotFlund message="No Data Available" />
            )}
          </div>
          <div className="col-12 my-1">
            <input
              onChange={uploadDocs}
              type="file"
              id="upload-report"
              hidden
            />
            <label
              disabled={items.isPending}
              className="btn btn-deep-primary px-5"
              htmlFor="upload-report"
            >
              Upload Report
              {items.isPending ? <Spinner animation="border" /> : null}
            </label>
          </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default ManageMis;

import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import { Link, useHistory } from "react-router-dom";
import CustomerLayout from "../../layout/CustomerLayout";
// import BreadcrumbLayout from "../../layout/BreadcrumbLayout";
import { useDispatch, useSelector } from "react-redux";
import { documentUploadV2 } from "../../components/utils";
import FormSuccess from "../../components/helper/FormSuccess";
import axiosauth from "../../api/axios-auth";
import { serviceNewById } from "../../store/actions/serviceAction";
import axios from "axios";

const ServiceRfqForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector((state) => state.SERVICEINFO);
  const warehouseId = new URLSearchParams(window.location.search).get(
    "warehouseId"
  );
  const serviceId = new URLSearchParams(window.location.search).get(
    "serviceId"
  );

  const [file, setFile] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const sendServiceRfq = async () => {
    setIsLoad(true);
    if (file) {
      let formData = new FormData();
      formData.append("file", file);
      let urlData = await documentUploadV2(formData);
      if (urlData.success === true) {
        let data = {
          warehouse: parseInt(warehouseId),
          file: urlData.url,
          service: parseInt(serviceId),
        };
        axiosauth
          .post(`/api/v1/servicerfq`, data)
          .then((response) => {
            let res = JSON.parse(response.data);

            // console.log("resp",res)

            if(res.statusCode === 401){

              alert("please login first")
            }
            console.log("rfq ressss===>", res);
            setSuccess(true);
          })

          
          .catch((error) => {
            setError("Please Login first");
            console.log("error==>", error);
          })
          .then(() => {
            setIsLoad(false);
          });
      }
    } else {
      setIsLoad(false);
    }
  };

  const redirect = () => {
    setSuccess(false);
    history.replace(`/services?page=1`);
  };

  useEffect(() => {
    dispatch(serviceNewById(serviceId));
  }, [dispatch, serviceId]);

  // Download file with change name
  const downloadAs = (url, name) => {
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/octet-stream",
        },
        responseType: "blob",
      })
      .then((response) => {
        const a = document.createElement("a");
        const url = window.URL.createObjectURL(response.data);
        a.href = url;
        a.download = name;
        a.click();
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });

  return (
    <Layout>
      {/* <BreadcrumbLayout title={`My Services`} /> */}

      {success && (
        <FormSuccess onClick={redirect} message="RFQ Successfully Created" />
      )}

      <CustomerLayout title={`My Services`}>
        <div className="row">
          <div className="content col-12 service-details">
            <div className="border-bottom d-sm-flex justify-content-between">
              <div>
                <Link
                  to="#"
                  className="btn name-breadcrumb px-0 text-dark font-heading mr-3"
                >
                  {/* <i className="fas fa-chevron-left pr-3"></i> */}
                  Service RFQ
                </Link>
              </div>
            </div>
           <div className="bg-white shadow-sm my-3 rounded-3">
           <div className="row p-3">
              <div className="form-group col-lg-6">
                <label htmlFor="Download">Download Sample RFQ</label>
                <button
                  onClick={() =>
                    downloadAs(
                      data?.serviceDetail?.sampleRfq,
                      `service_${data?.serviceDetail?.id}`
                    )
                  }
                  className="form-control btn btn-deep-primary d-block"
                  id="Download"
                  // style={{ width: "200px" }}
                >
                  Download
                </button>
              </div>
              <div className="form-group col-lg-6">
                <label htmlFor="uploadfile">Upload RFQ Excel</label>
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  className="form-control"
                  accept=".xlsx, .xls, .csv"
                  id="uploadfile"
                  placeholder="Password"
                />
              </div>

              <span className="errorMsg">{error}</span>

             <div className="text-end col-12">
             <button
                onClick={sendServiceRfq}
                disabled={file === null}
                type="submit"
                className="btn btn-deep-primary"
                style={{ width: "200px" }}
              >
                {isLoad ? "Waiting..." : "Submit"}
              </button>
             </div>
            </div>
           </div>
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default ServiceRfqForm;

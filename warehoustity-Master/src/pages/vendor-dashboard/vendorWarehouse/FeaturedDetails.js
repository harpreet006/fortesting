import React, { useEffect, useState } from "react";
import VendorLayout from "../../../layout/VendorLayout";
import { useParams, useHistory } from "react-router-dom";
import axiosauth from "../../../api/axios-auth";
import { readableDate } from "../../../components/validation";

const FeaturedDetails = () => {
  const { featuredId } = useParams();
  const history = useHistory();
  const [data, setData] = useState(null);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState(null);
  console.log(message);
  function fetureCallApi() {
    try {
      axiosauth
        .get(`/api/v1/featuredwarehouse/${featuredId}`)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.data && res.data.length > 0) {
            setData(res.data[0]);
            setComment(res.data[0].commentByCustomer);
          }
        })
        .catch((error) => {
          console.log("rerr-->", error);
        })
        .then(() => {
          console.log("-----always executes");
        });
    } catch (e) {}
  }

  useEffect(() => {
    function fetureCall() {
      try {
        axiosauth
          .get(`/api/v1/featuredwarehouse/${featuredId}`)
          .then((response) => {
            let res = JSON.parse(response.data);
            if (res.data && res.data.length > 0) {
              setData(res.data[0]);
              setComment(res.data[0].commentByCustomer);
            }
          })
          .catch((error) => {})
          .then(() => {});
      } catch (e) {}
    }
    fetureCall();
  }, [featuredId]);

  const updateFeatured = () => {
    let data = {
      commentByCustomer: comment,
    };

    try {
      axiosauth
        .put(`/api/v1/featuredwarehouse/${featuredId}`, data)
        .then((response) => {
          let res = JSON.parse(response.data);
          console.log("res==>", res);
          setMessage("Comment Updated");
          fetureCallApi();
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        })
        .catch((error) => {})
        .then(() => {});
    } catch (e) {}
  };

  return (
    <VendorLayout>
      {/* {data.bookingResponse && data.bookingResponse.statusCode === 200 ?
        <FormSuccess onClick={redirect} message = {data.bookingResponse.message} />
      : null} */}

      <div className="content-admin px-3">
        <div className="row justify-content-end align-items-center py-3 px-3 mx-0">
          <div className="col-12 px-0">
            <h5 className="backButton">
              <i
                onClick={() => history.goBack()}
                className="fas fa-chevron-left mr-3 cursorPointer"
              ></i>
              FEATURED DETAILS
            </h5>
          </div>

          {/* {data.isLoading ? <CardLoader /> : */}
          <div className="col-12 px-0">
            <div className="row">
              <div className="col-md-6 d-flex py-1">
                <div className="card py-2 px-4 mb-0">
                  <p className="mb-2">Warehouse Name</p>
                  <p className="text-gray mb-0">
                    {data?.warehouse?.warehouseName}{" "}
                  </p>
                </div>
              </div>

              <div className="col-md-6 d-flex py-1">
                <div className="card py-2 px-4 mb-0">
                  <p className="mb-2">Start Date</p>
                  <p className="text-gray mb-0">
                    {readableDate(data?.startDate)}{" "}
                  </p>
                </div>
              </div>

              <div className="col-md-6 d-flex py-1">
                <div className="card py-2 px-4 mb-0">
                  <p className="mb-2">End Date</p>
                  <p className="text-gray mb-0">
                    {readableDate(data?.endDate)}{" "}
                  </p>
                </div>
              </div>

              <div className="col-md-6 d-flex py-1">
                <div className="card py-2 px-4 mb-0">
                  <p className="mb-2">Status</p>
                  <p className="text-gray mb-0">
                    {readableDate(data?.endDate)}{" "}
                  </p>
                </div>
              </div>

              <div className="col-md-12 d-flex py-1">
                <div className="card py-2 px-4 mb-0">
                  <p className="mb-2">Warehousity Comment</p>
                  <p className="text-gray mb-0">{data?.commentByAdmin} </p>
                </div>
              </div>

              <div className="col-12 d-flex py-1">
                <div className="card py-2 px-4 mb-0">
                  <p className="mb-2">Vendor Comment</p>
                  <p className="text-gray mb-0">
                    <p className="text-gray mb-0">{comment} </p>
                    {/* <textarea
                                            style={{ width: "400px" }}
                                            col="4"
                                            onChange={(e) => setComment(e.target.value)} type="text" value={comment} /> */}
                  </p>
                </div>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-12 px-0 text-sm-right">
                <button
                  onClick={() => history.goBack()}
                  className="btn btn-outline-deep-blue m-3"
                >
                  Back
                </button>

                <button
                  onClick={updateFeatured}
                  type="button"
                  class={`btn btn-deep-blue m-3 d-none`}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
          {/* } */}
        </div>
      </div>
    </VendorLayout>
  );
};

export default FeaturedDetails;

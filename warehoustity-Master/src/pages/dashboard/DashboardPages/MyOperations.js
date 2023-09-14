import React, { useState, useEffect } from "react";
import Layout from "../../../layout/Layout";
import CustomerLayout from "../../../layout/CustomerLayout";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axiosauth from "../../../api/axios-auth";
import {
  customerBookingAuth,
  bookingList,
} from "../../../store/actions/customer/bookingAction";
import { CardLoader, ItemNotFlund } from "../../../components/helper/CustomLoader";
import BackButton from "../../../components/helper/BackButton";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [wmsList, setWMSList] = useState([]);
  const bookingData = useSelector((state) => state.BOOKINGINFO);

  const [customLoding, setCustomLoading] = useState(true);

  useEffect(() => {
    dispatch(customerBookingAuth(1));
    return () => {
      dispatch(bookingList([]));
    };
  }, [dispatch]);

  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });


  useEffect(() => {
    if (bookingData?.bookingList && bookingData?.bookingList.length > 0) {
      let wmsLocation = [];
      let clientId = new Set();
      // eslint-disable-next-line
      const liveWarehouses = bookingData?.bookingList?.map((warehouse) => {
        if (
          warehouse.warehouse.wmsLocationId &&
          warehouse.warehouse.wmsLocationId !== ""
        ) {
          wmsLocation.push(warehouse.warehouse.wmsLocationId);
        }
        if (
          warehouse?.warehouse.users?.length > 0 &&
          warehouse?.warehouse.users[0].wmsId &&
          warehouse?.warehouse.users[0].wmsId !== ""
        ) {
          clientId.add(warehouse?.warehouse.users[0].wmsId);
        }
      });

      const wmsLocationIds = wmsLocation.join();
      const wmsClientIds = Array.from(clientId).join();

      try {
        axiosauth
          .get(
            `/api/v1/user/wms?client=${wmsClientIds}&location=${wmsLocationIds}`
          )
          .then((response) => {
            let res = JSON.parse(response.data);
            if (res.statusCode === 200) {
              console.log("res-->", res.data);
              var list = [];
              var obj = res.data;
              Object.keys(obj).map((dat) => {
                if (Array.isArray(obj[dat]))
                  list.push({
                    key: dat,
                    val: obj[dat],
                  });
                return dat;
              });
              setWMSList(list);
              setCustomLoading(false);
              
            }
          })
          .catch((error) => {})
          .then(() => {
            console.log("-----always executes");
          });
      } catch (e) {}
    }
  }, [bookingData]);

  // useEffect (() =>{

  // });

  function returnIcon(val) {
    switch (val) {
      case 1:
        return "fa fa-file-text";
      case 2:
        return "fa fa-file";
      case 3:
        return "fa fa-arrow-left";
      case 4:
        return "fa fa-hourglass-end";
      case 5:
        return "fa fa-arrow-right";
      case 6:
        return "fa fa-hourglass-end";
      case 7:
        return "fa fa-hourglass-end";
      case 8:
        return "fa fa-hourglass";
      default:
        return "fa fa-circle-o-notch";
    }
  }
  const FontSize = {
    fontSize: "16px"
  };
  return (
    <Layout>
      <CustomerLayout title={`Dashboard`} subtitle={"My Operations"}>
        <div className="row">
          <div className="content col-12 shadow-sm">
            <div className="dashboard-btns pb-1 border-bottom mb-2 d-flex justify-content-between">
             
              <nav className="pt-3" aria-label="breadcrumb">
                <ol class="breadcrumb bg-transparent py-0 pl-0 pb-0 mb-0">
                  <li class="breadcrumb-item ">
                    <Link to="/dashboard" className="text-dark">
                      My Dashboard
                    </Link>
                  </li>
                  <li
                    class="breadcrumb-item active text-warning"
                    aria-current="page"
                  >
                     My Operations
                  </li>
                </ol>
              </nav>
              <BackButton />
            </div>
            <div className="tab-content" id="pills-tabContent">
              <div className="dashboard-cards row">
                {/* {console.log(wmsList.length > 0)} */}
              {customLoding  ? (
                  <CardLoader />
                 
                ) : (
                  <>
                  {wmsList && wmsList?.length > 0 ? (
                    <div className="row">
                      {wmsList?.map((key, index) => {
                        return (
                          <div
                            key={index}
                            className="col-xxl-3 col-xl-4 col-md-6 mb-4"
                          >
                            <div className="dashboard-card bg-white custom-shadow w-100 rounded text-gray">
                              <div className="card-body py-xxl-5 p-2">
                                <p className="mb-2 font-heading text-center">
                                  {key.key}
                                </p>
  
                                <div className="row">
                                  <div className="col">
                                    <p className="mb-2 font-heading text-center">
                                      Order
                                    </p>
                                    <h4 className="h4 mb-0 text-center">
                                      {key.val[0].orders}
                                    </h4>
                                  </div>
  
                                  <div className="col">
                                    <p className="mb-2 font-heading text-center">
                                      Quantity
                                    </p>
                                    <h4 className="h4 mb-0 text-center">
                                      {isNaN(parseFloat(key.val[0].quantity))
                                        ? 0
                                        : parseFloat(key.val[0].quantity).toFixed(
                                            2
                                          )}
                                    </h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    // <ItemNotFlund message="No Data Available" />
                    <></>
                  )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default Dashboard;

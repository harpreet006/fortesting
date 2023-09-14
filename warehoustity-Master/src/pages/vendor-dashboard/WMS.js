import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VendorLayout from "../../layout/VendorLayout";
import MenuDrawer from "../../components/vendor/MenuDrawer";
import axiosauth from "../../api/axios-auth";
import { fetchWarehouseByPage } from "../../store/actions/vendor/warehouseList";
import { useDispatch, useSelector } from "react-redux";

const WMS = () => {
  const dispatch = useDispatch();
  const [wmsList, setWMSList] = useState([]);
  const data = useSelector((state) => state.WAREHOUSELIST);

  useEffect(() => {
    dispatch(fetchWarehouseByPage(1, 50, { status: "approved" }));
  }, [dispatch]);

  useEffect(() => {
    if (data.listOfWarehouse?.data && data.listOfWarehouse?.data.length > 0) {
      let wmsLocation = [];
      let clientId = new Set();
      // eslint-disable-next-line
      const liveWarehouses = data.listOfWarehouse?.data.map((warehouse) => {
        if (warehouse.wmsLocationId && warehouse.wmsLocationId !== "") {
          wmsLocation.push(warehouse.wmsLocationId);
        }
        if (
          warehouse.users?.length > 0 &&
          warehouse.users[0].wmsId &&
          warehouse.users[0].wmsId !== ""
        ) {
          clientId.add(warehouse.users[0].wmsId);
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
            }
          })
          .catch((error) => {})
          .then(() => {
            console.log("-----always executes");
          });
      } catch (e) {}
    }
  }, [data]);

  return (
    <VendorLayout>
      <div className="content-admin px-1">
        <MenuDrawer />

        <div className="row justify-content-end align-items-center py-3 px-3 ml-3 mr-0">
          <div className="col-12 custom-shadow p-1 mb-1  tabs-scroll">
            <ul
              className="nav nav-pills admin-tabs-blue"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item">
                <Link to="/vendor" className="nav-link text-uppercase">
                  My Dashboard
                </Link>
              </li>
              {/* <li className="nav-item">
                  <Link to="/vendor/space-summary" className="nav-link text-uppercase">space summary</Link>
                </li> */}
              <li className="nav-item">
                <Link
                  to="/vendor/demograpgy-summary"
                  className="nav-link text-uppercase"
                >
                  Demographics summary
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/vendor/wms"
                  className="nav-link text-uppercase vendorActive"
                >
                  wms
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-12 px-0 pt-1">
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-warehouse-summary"
                role="tabpanel"
                aria-labelledby="pills-warehouse-summary-tab"
              >
                <div className="dashboard-cards">
                  <div className="row">
                    {wmsList?.map((key) => {
                      return (
                        <div className="col-xxl-3 col-xl-4 col-md-6 mb-4">
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
                                  {console.log()}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default WMS;

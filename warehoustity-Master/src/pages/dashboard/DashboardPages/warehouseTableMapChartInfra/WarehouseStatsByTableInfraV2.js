import React, { useState, useEffect } from "react";
import Layout from "../../../../layout/Layout";
import CustomerLayout from "../../../../layout/CustomerLayout";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { Link } from "react-router-dom";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import {
  customerBookingAuth,
  bookingList,
} from "../../../../store/actions/customer/bookingAction";
import { useSelector, useDispatch } from "react-redux";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const WarehouseStatsByTableInfraV2 = () => {
  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });
  const dispatch = useDispatch();
  const data = useSelector((state) => state.BOOKINGINFO);

  const [infraData, setInfraData] = useState([]);
  const [columns, setColumns] = useState([]);



  // const populateTable=function(data){
  // }

  const options = {
    filterType: "checkbox",
    download: false,
    filter: false,
    print: false,
    search: false,
    viewColumns: false,
    selectableRowsHideCheckboxes: true,
    pagination: false,
  };

  useEffect(() => {

    const populatedData = {
      batteryOperatedPalletTruck: {
        type: "Mh Infra",
        val: [],
      },
      electricStacker: {
        type: "Mh Infra",
        val: [],
      },
      handPalletTruck: {
        type: "Mh Infra",
        val: [],
      },
      hydraulicDockLevler: {
        type: "Mh Infra",
        val: [],
      },
      pickingTrolley: {
        type: "Mh Infra",
        val: [],
      },
      shrinkAndStretchWrapMachine: {
        type: "Mh Infra",
        val: [],
      },
    };

    let col = [
      {
        name: "Infra",
        label: "Infra",
        options: {
          filter: false,
          sort: false,
        },
      },
      {
        name: "Infra Type",
        label: "Infra Type",
        options: {
          filter: false,
          sort: false,
        },
      },
    ];

    if (data.bookingList?.length > 0) {
      data.bookingList.map((item) => {
        col.push({
          name: item.warehouse.warehouseName,
          label: item.warehouse.warehouseName,
          options: {
            filter: false,
            sort: false,
          },
        });
        Object.keys(populatedData).map((key) => {
          const value = item.warehouse.mhInfraInfo[key];
          populatedData[key].val.push(value);
          return value;
        });
        return col;
      });
    }

    const dataToPopulate = Object.keys(populatedData).map((key) => {
      const returnObj = [];
      returnObj.push(key);
      returnObj.push(populatedData[key].type);
      populatedData[key].val.map((val) => {
        returnObj.push(val);
        return returnObj;
      });
      return returnObj;
    });

    setColumns(col);
    setInfraData(dataToPopulate);
  }, [data]);

  useEffect(() => {
    dispatch(customerBookingAuth(parseInt(1)));

    return () => {
      dispatch(bookingList([]));
    };
  }, [dispatch]);

  return (
    <Layout>
      <CustomerLayout title="Warehouse By Infra">
        <div className="row">
          <div className="content col-12">
            <div className="dashboard-btns pb-1 border-bottom mb-2">
              {/* <ul
                className="nav nav-pills common-tabs3 mb-1"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link btn-md btn py-2 ">
                    My Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/customer-stats-by-table-infra"
                    className="nav-link btn-md btn py-2 active"
                  >
                    Infra
                  </Link>
                </li>
              </ul> */}
              <nav className="pt-3" aria-label="breadcrumb">
                <ol class="breadcrumb bg-transparent py-0">
                  <li class="breadcrumb-item ">
                    <Link to="/dashboard" className="text-dark">My Dashboard</Link>
                  </li>
                  <li class="breadcrumb-item active text-warning" aria-current="page">
                  Infra
                  </li>
                </ol>
              </nav>
            </div>
            <ThemeProvider theme={theme}>
              <MUIDataTable
                // title={"waresheet"}
                data={infraData}
                columns={columns}
                options={options}
              />
            </ThemeProvider>
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default WarehouseStatsByTableInfraV2;

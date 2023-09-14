import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import VendorLayout from "../../../layout/VendorLayout";
import {
  responseRfq,
  vendorResponseRfqById1,
  rfq_By_Id,
} from "../../../store/actions/vendor/rfqAction";
import { useSelector, useDispatch } from "react-redux";
import FormSuccess from "../../../components/helper/FormSuccess";
import { useParams, useHistory } from "react-router-dom";
import { CardLoader } from "../../../components/helper/CustomLoader";

const VendorResponseDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.VENDOR_RFQ_INFO);
  const { vRequestId } = useParams();

  const [jsonData, setJsonData] = useState({
    manPowers: [
      {
        manpowerType: "WH Manager",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        manpowerType: "Asst Manager",
        type: {
          name: "DEDICATED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        manpowerType: "OB Executive+DEO",
        type: {
          name: "DEDICATED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        manpowerType: "Dispatch Incharge",
        type: {
          name: "DEDICATED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        manpowerType: "Inventory Incharge",
        type: {
          name: "DEDICATED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        manpowerType: "Inventory Supervisor",
        type: {
          name: "DEDICATED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        manpowerType: "Activity Supervisors",
        type: {
          name: "DEDICATED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        manpowerType: "Labours",
        type: {
          name: "DEDICATED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        manpowerType: "Security",
        type: {
          name: "DEDICATED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        manpowerType: "House Keeping",
        type: {
          name: "DEDICATED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
    ],
    infrastructures: [
      {
        infrastructureType: "MFD",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Fire Extinguiser",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Office Setup",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "HPT Electric Voltas",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Hand Pallet Truck",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Picking Trolley",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Desktop Computer",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Office Printer",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Printer With Xerox, Fax and Scan facility",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Barcode printer",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "UPS",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Inverter",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Electric Stacker",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "AC",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "ForkLift Battery Operated",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Projector",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Weighting Machine",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Wooden Pallets",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Generator 20KVA",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Message Boards (Notice)",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "HD Selves For File and Record",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Lock and Key Almira",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Water Cooler",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Labels & Signage",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Office and Security Fan",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Emergency Light with Battery",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "WMS Software",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Wire Mesh Cage",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "First Aid Kit",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Security Alarm",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Dock Levler",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Shelve Racks",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "CCTV",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Internal Painting",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Security & Safety Audit",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Security & Safety Displays",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Shelved Rack",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Broadband Connection setup",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Vaccumm Cleaner",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Start Up",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
      {
        infrastructureType: "Scanners",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        totalMonth: "",
        remark: "",
      },
    ],
    runningCosts: [
      {
        runningCostType: "Rent",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        amount: "",
        totalMonth: "",
        remark: "",
      },
      {
        runningCostType: "Infrastructure",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        amount: "",
        totalMonth: "",
        remark: "",
      },
      {
        runningCostType: "Manpower",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        amount: "",
        totalMonth: "",
        remark: "",
      },
      {
        runningCostType: "Communication",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        amount: "",
        totalMonth: "",
        remark: "",
      },
      {
        runningCostType: "Utilities",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        amount: "",
        totalMonth: "",
        remark: "",
      },
      {
        runningCostType: "Staff Welfare",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        amount: "",
        totalMonth: "",
        remark: "",
      },
      {
        runningCostType: "Power",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        amount: "",
        totalMonth: "",
        remark: "",
      },
      {
        runningCostType: "Licenses",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        amount: "",
        totalMonth: "",
        remark: "",
      },
      {
        runningCostType: "House Keeping Consumables",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        amount: "",
        totalMonth: "",
        remark: "",
      },
      {
        runningCostType: "WMS ID",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        amount: "",
        totalMonth: "",
        remark: "",
      },
      {
        runningCostType: "Packaging Consumable",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        amount: "",
        totalMonth: "",
        remark: "",
      },
      {
        runningCostType: "Genset",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        amount: "",
        totalMonth: "",
        remark: "",
      },
      {
        runningCostType: "Genset",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        amount: "",
        totalMonth: "",
        remark: "",
      },
      {
        runningCostType: "Consumable(printing material)",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        amount: "",
        totalMonth: "",
        remark: "",
      },
      {
        runningCostType: "Broadband Connection",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        amount: "",
        totalMonth: "",
        remark: "",
      },
      {
        runningCostType: "Pallets",
        type: {
          name: "SHARED",
        },
        quantity: 0,
        costUnit: "",
        amount: "",
        totalMonth: "",
        remark: "",
      },
    ],
    vendorTotalPerUnitCost: "",
    remark: "",
  });

  useEffect(() => {
    // if(data.rfqDetail.data !==undefined){
    //   setRfqId(data.rfqDetail.data.customerRfq.id)
    // }

    // if(data.rfqDetail && data.rfqDetail.data){
    //   setWarehouseId(data.rfqDetail.data.warehouse.id)
    // }

    if (data.rfqDetail && data.rfqDetail.data) {
      setJsonData({ ...data.rfqDetail.data });
    }

    //   if(data.rfqDetail && data.rfqDetail.data){
    //     setJsonData({...data.rfqDetail.data,vendorTotalPerUnitCost:"", remark:"" })
    // }
  }, [data.rfqDetail]);

  useEffect(() => {
    dispatch(vendorResponseRfqById1(vRequestId));
    return () => dispatch(rfq_By_Id([]));
  }, [dispatch, vRequestId]);

  const receiveSchema = Yup.object().shape({
    vendorTotalPerUnitCost: Yup.string().required("Required"),
    remark: Yup.string().required("Required"),
  });

  const redirect = () => {
    dispatch(responseRfq([]));
    history.push(`/vendor/rfq-status/${vRequestId}`);
  };

  return (
    <VendorLayout>
      {data.rfqResponse.statusCode === 201 ||
      data.rfqResponse.statusCode === 200 ? (
        <FormSuccess
          onClick={() => redirect()}
          message={data.rfqResponse.message}
        />
      ) : null}

      {data.isLoading ? (
        <CardLoader />
      ) : (
        <Formik
          enableReinitialize={true}
          validationSchema={receiveSchema}
          initialValues={jsonData}
          onSubmit={(fields) => {
            // console.log("fields---->", fields)
            // delete fields['created_at'];
            // delete fields['id'];
            // delete fields['customerRfq'];
            // delete fields['updated_at'];
            // delete fields['isOpenRfq'];
            // delete fields['locationDetails'];
            // delete fields['vendorRequestResponse'];
            // delete fields['monthlyCosts'];

            if (vRequestId) {
              fields["vendorRequestRfq"] = parseInt(vRequestId);
            }
          }}
          render={({ values, errors, status, onChange, touched }) => {
            return (
              <div className="w-100 d-block">
                <Form>
                  <div className="content-admin px-1">
                    <div className="row align-items-center py-3 px-3 mx-0">
                      <div className="col-auto d-lg-none">
                        <button
                          className="btn btn-deep-blue px-0 size-40px toggle-className btn-sidebar-admin sidebar-admin-toggle align-items-center justify-content-center"
                          type="button"
                          data-target=".sidebar-admin-toggle"
                          data-toggle-class="open"
                        >
                          <span></span>
                        </button>
                      </div>

                      <div className="col-12 py-3 px-0">
                        <h5 class="text-dark">
                          <i
                            onClick={() => history.goBack()}
                            class="fas fa-chevron-left mr-3 cursorPointer"
                          ></i>
                          RFQ Response to Warehousity
                        </h5>
                      </div>

                      <div className="col-12 bg-white py-3">
                        <div className="row pt-3">
                          <div className="col-12 px-0">
                            <div className="form-group form-inline mb-3 px-0">
                              <label
                                htmlFor="inputPassword6"
                                className="w-250px justify-content-start px-3"
                              >
                                RFQ ID
                              </label>
                              <div className="row mx-md-0 mx-sm-3 mx-0">
                                <div className="col-12 px-sm-3 px-0">
                                  <input
                                    value={
                                      data.rfqDetail.data
                                        ? data.rfqDetail.data.customerRfq?.id
                                        : ""
                                    }
                                    type="text"
                                    id="inputPassword6"
                                    className="form-control form-control-sm d-inline-block form-control form-control-sm-sm w-160px mx-3"
                                    placeholder="DL-01379"
                                    readOnly
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 px-0">
                            <div className="row">
                              <div className="col-12">
                                <div className="row mx-0">
                                  <div className="col-md-auto pl-0">
                                    <label
                                      htmlFor="staticEmail"
                                      className="mb-2 mt-2 w-250px justify-content-start px-3"
                                    >
                                      City
                                    </label>
                                    <div className="form-group col-auto px-3 mb-3">
                                      <input
                                        value={
                                          data.rfqDetail.data &&
                                          data.rfqDetail.data.customerRfq
                                            ?.location
                                            ? data.rfqDetail.data.customerRfq
                                                ?.location.city.name
                                            : ""
                                        }
                                        className="form-control form-control-sm form-control form-control-sm-sm w-160px"
                                        disabled
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-auto pl-0">
                                    <label
                                      htmlFor="staticEmail"
                                      className="mb-2 mt-2 w-250px justify-content-start px-3"
                                    >
                                      Area
                                    </label>
                                    <div className="form-group col-auto px-3 mb-3">
                                      <input
                                        value={
                                          data.rfqDetail.data &&
                                          data.rfqDetail.data.customerRfq
                                            ?.location
                                            ? data.rfqDetail.data.customerRfq
                                                ?.location.area.name
                                            : ""
                                        }
                                        className="form-control form-control-sm form-control form-control-sm-sm w-160px"
                                        disabled
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 px-0">
                            <div className="form-group form-inline mb-4 px-0">
                              <label
                                htmlFor="inputPassword6"
                                className="w-250px justify-content-start px-3"
                              >
                                WH Space Required
                              </label>
                              <div className="row mx-md-0 mx-sm-3 mx-0">
                                <div className="col-12 px-sm-3 px-0">
                                  <input
                                    value={
                                      data.rfqDetail.data
                                        ? data.rfqDetail.data.customerRfq
                                            ?.warehouseSpaceRequired
                                        : ""
                                    }
                                    type="text"
                                    id="inputPassword6"
                                    className="form-control form-control-sm d-inline-block form-control form-control-sm-sm w-160px mx-3"
                                    placeholder="Sqft"
                                    readOnly
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-12 px-0">
                            <div className="form-group form-inline mb-4 px-0">
                              <label
                                htmlFor="inputPassword6"
                                className="w-250px justify-content-start px-3"
                              >
                                Warehouse
                              </label>
                              <div className="row mx-md-0 mx-sm-3 mx-0">
                                <div className="col-12 px-sm-3 px-0">
                                  <input
                                    value={
                                      data.rfqDetail.data
                                        ? data.rfqDetail.data.warehouse
                                            ?.warehouseName
                                        : ""
                                    }
                                    type="text"
                                    id="inputPassword6"
                                    className="form-control form-control-sm d-inline-block form-control form-control-sm-sm w-160px mx-3"
                                    placeholder="Sqft"
                                    readOnly
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 py-3 px-0">
                        <h4 className="text-dark">RFQ Reply to Warehousity</h4>
                      </div>

                      <div className="col-12 bg-white mb-2">
                        <div className="row">
                          <div className="col-12 table-responsive p-4">
                            <table className="table w-100">
                              <thead>
                                <tr>
                                  <td className="w-170px font-weight-bold bg-dark text-white py-2 px-3 text-nowrap">
                                    Infrastructure :
                                  </td>
                                  <td className="w-160px font-weight-bold bg-dark text-white py-2">
                                    Type
                                  </td>
                                  <td className="w-160px font-weight-bold bg-dark text-white py-2">
                                    Qty
                                  </td>
                                  <td className="w-70px font-weight-bold bg-dark text-white py-2 text-nowrap">
                                    Cost /Unit
                                  </td>
                                  <td className="w-70px font-weight-bold bg-dark text-white py-2">
                                    Total/Month
                                  </td>
                                  <td className="w-250px font-weight-bold bg-dark text-white py-2">
                                    Remarks
                                  </td>
                                  <td className="w-160px font-weight-bold bg-dark text-white py-2 text-nowrap">
                                    Considered / Not Considered
                                  </td>
                                </tr>
                              </thead>
                              <tbody>
                                {values.manPowers &&
                                  values.manPowers.length > 0 &&
                                  values.manPowers.map((man, index) => {
                                    return (
                                      <tr key={index}>
                                        <td className="text-nowrap">
                                          <p className="m-0 pb-1">
                                            {man.manpowerType}
                                          </p>
                                        </td>
                                        <td className="text-nowrap">
                                          <Field
                                            name={`manPowers.${index}.type.name`}
                                            as="select"
                                            className="form-control form-control-sm custom-select bg-white px-1 common-select-deep-blue d-inline-block w-130px"
                                            id="manpower-type1"
                                            disabled
                                          >
                                            <option value="">Select</option>
                                            <option value="SHARED">
                                              {" "}
                                              SHARED
                                            </option>
                                            <option value="DEDICATED">
                                              DEDICATED
                                            </option>
                                          </Field>
                                        </td>
                                        <td className="text-nowrap">
                                          <Field
                                            name={`manPowers.${index}.quantity`}
                                            type="number"
                                            id="manpower-qty-input1"
                                            className="form-control form-control-sm bg-white px-1"
                                            disabled
                                          />
                                        </td>
                                        <td className="text-nowrap">
                                          <Field
                                            name={`manPowers.${index}.costUnit`}
                                            type="number"
                                            id="manpower-cost-input1"
                                            className="form-control form-control-sm bg-white px-1"
                                            disabled
                                          />
                                        </td>
                                        <td className="text-nowrap">
                                          <Field
                                            name={`manPowers.${index}.totalMonth`}
                                            type="number"
                                            id="manpower-months-input1"
                                            className="form-control form-control-sm bg-white px-1"
                                            disabled
                                          />
                                        </td>
                                        <td className="text-nowrap">
                                          <Field
                                            name={`manPowers.${index}.remark`}
                                            type="text"
                                            className="form-control form-control-sm text-center bg-white my-1 px-1"
                                            id="manpower-remarks1"
                                            disabled
                                          />
                                        </td>
                                        <td className="text-nowrap">
                                          <Field
                                            name={`manPowers.${index}.considerOrNotConsider`}
                                            as="select"
                                            className={`form-control form-control-sm custom-select bg-white px-1 common-select-deep-blue d-inline-block`}
                                            id="manpower-type1"
                                            disabled
                                          >
                                            <option value="">Select</option>
                                            <option value="CONSIDERED">
                                              Considered
                                            </option>
                                            <option value="NOTCONSIDERED">
                                              Not Considered
                                            </option>
                                          </Field>
                                        </td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 bg-white mb-3">
                        <div className="row">
                          <div className="col-12 table-responsive bg-white p-4">
                            <table className="table">
                              <thead>
                                <tr>
                                  <td className="w-170px font-weight-bold bg-dark text-white py-2 px-3 text-nowrap">
                                    Infrastructure :
                                  </td>
                                  <td className="w-160px font-weight-bold bg-dark text-white py-2 px-3 text-nowrap">
                                    Type
                                  </td>
                                  <td className="w-160px font-weight-bold bg-dark text-white py-2 px-3 text-nowrap">
                                    Qty
                                  </td>
                                  <td className="w-70px font-weight-bold bg-dark text-white py-2 px-3 text-nowrap">
                                    Cost /Unit
                                  </td>
                                  <td className="w-70px font-weight-bold bg-dark text-white py-2 px-3 text-nowrap">
                                    Total/Month
                                  </td>
                                  <td className="w-250px font-weight-bold bg-dark text-white py-2 px-3 text-nowrap">
                                    Remarks
                                  </td>
                                  <td className="w-160px font-weight-bold bg-dark text-white py-2 px-3 text-nowrap">
                                    Considered / Not Considered
                                  </td>
                                </tr>
                              </thead>
                              <tbody>
                                {values.infrastructures &&
                                  values.infrastructures.length > 0 &&
                                  values.infrastructures.map((man, index) => {
                                    return (
                                      <tr key={index}>
                                        <td >
                                          <p className="m-0 pb-1">
                                            {" "}
                                            {man.infrastructureType}{" "}
                                          </p>
                                        </td>
                                        <td>
                                          <Field
                                            name={`infrastructures.${index}.type.name`}
                                            as="select"
                                            id="infrastructure-type1"
                                            className="form-control form-control-sm custom-select bg-white px-1 common-select-deep-blue d-inline-block w-130px"
                                            disabled
                                          >
                                            <option value="">Select</option>
                                            <option value="SHARED">
                                              SHARED
                                            </option>
                                            <option value="DEDICATED">
                                              DEDICATED
                                            </option>
                                          </Field>
                                        </td>
                                        <td>
                                          <Field
                                            name={`infrastructures.${index}.quantity`}
                                            type="number"
                                            id="infrastructure-qty-input1"
                                            className="form-control form-control-sm bg-white px-1"
                                            disabled
                                          />
                                        </td>
                                        <td>
                                          <Field
                                            name={`infrastructures.${index}.costUnit`}
                                            type="number"
                                            id="infrastructure-cost-input1"
                                            className="form-control form-control-sm bg-white px-1"
                                            disabled
                                          />
                                        </td>
                                        <td>
                                          <Field
                                            name={`infrastructures.${index}.totalMonth`}
                                            type="number"
                                            id="infrastructure-months-input1"
                                            className="form-control form-control-sm bg-white px-1"
                                            disabled
                                          />
                                        </td>
                                        <td>
                                          <Field
                                            name={`infrastructures.${index}.remark`}
                                            type="text"
                                            className="form-control form-control-sm text-center bg-white my-1 px-4"
                                            id="infrastructure-remarks1"
                                            disabled
                                          />
                                        </td>
                                        <td>
                                          <Field
                                            name={`infrastructures.${index}.considerOrNotConsider`}
                                            as="select"
                                            className={`form-control form-control-sm custom-select bg-white px-1 common-select-deep-blue d-inline-block`}
                                            id="manpower-type1"
                                            disabled
                                          >
                                            <option value="">Select</option>
                                            <option value="CONSIDERED">
                                              Considered
                                            </option>
                                            <option value="NOTCONSIDERED">
                                              Not Considered
                                            </option>
                                          </Field>
                                        </td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 bg-white mb-2">
                        <div className="row">
                          <div className="col-12 table-responsive bg-white p-4">
                            <table className="table w-100">
                              <thead>
                                <tr>
                                  <td className="w-170px font-weight-bold bg-dark text-white py-2 px-3 text-nowrap">
                                    Infrastructure :
                                  </td>
                                  <td className="w-160px font-weight-bold bg-dark text-white py-2 px-3 text-nowrap">
                                    Type
                                  </td>
                                  <td className="w-160px font-weight-bold bg-dark text-white py-2 px-3 text-nowrap">
                                    Qty
                                  </td>
                                  <td className="w-70px font-weight-bold bg-dark text-white py-2 px-3 text-nowrap">
                                    Cost /Unit
                                  </td>
                                  <td className="w-70px font-weight-bold bg-dark text-white py-2 px-3 text-nowrap">
                                    Total/Month
                                  </td>
                                  <td className="w-250px font-weight-bold bg-dark text-white py-2 px-3 text-nowrap">
                                    Remarks
                                  </td>
                                  <td className="w-160px font-weight-bold bg-dark text-white py-2 px-3 text-nowrap">
                                    Considered / Not Considered
                                  </td>
                                </tr>
                              </thead>
                              <tbody>
                                {values.runningCosts &&
                                  values.runningCosts.length > 0 &&
                                  values.runningCosts.map((man, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>
                                          <p className="m-0 pb-1">
                                            {" "}
                                            {man.runningCostType}{" "}
                                          </p>
                                        </td>
                                        <td>
                                          <Field
                                            name={`runningCosts.${index}.type.name`}
                                            as="select"
                                            id="runningcost-type1"
                                            className="form-control form-control-sm custom-select bg-white px-1 common-select-deep-blue d-inline-block w-130px"
                                            disabled
                                          >
                                            <option value="">Select</option>
                                            <option value="SHARED">
                                              SHARED
                                            </option>
                                            <option value="DEDICATED">
                                              DEDICATED
                                            </option>
                                          </Field>
                                        </td>

                                        <td>
                                          <Field
                                            name={`runningCosts.${index}.quantity`}
                                            type="number"
                                            id="runningcost-qty-input1"
                                            className="form-control form-control-sm bg-white px-1"
                                            disabled
                                          />
                                        </td>
                                        <td>
                                          <Field
                                            name={`runningCosts.${index}.costUnit`}
                                            type="number"
                                            id="runningcost-cost-input1"
                                            className="form-control form-control-sm bg-white px-1"
                                            disabled
                                          />
                                        </td>
                                        {/* <td><Field name={`runningCosts.${index}.amount`} type="number" id="runningcost-months-input1" className="form-control form-control-sm bg-white px-1" disabled /></td> */}
                                        <td>
                                          <Field
                                            name={`runningCosts.${index}.totalMonth`}
                                            type="text"
                                            className="form-control form-control-sm text-center bg-white my-1 px-4"
                                            id="runningcost-remarks1"
                                            disabled
                                          />
                                        </td>
                                        <td>
                                          <Field
                                            name={`runningCosts.${index}.remark`}
                                            type="text"
                                            className="form-control form-control-sm text-center bg-white my-1 px-4"
                                            id="runningcost-consider1"
                                            disabled
                                          />
                                        </td>

                                        <td>
                                          <Field
                                            name={`runningCosts.${index}.considerOrNotConsider`}
                                            as="select"
                                            className={`form-control form-control-sm custom-select bg-white px-1 common-select-deep-blue d-inline-block`}
                                            id="manpower-type1"
                                            disabled
                                          >
                                            <option value="">Select</option>
                                            <option value="CONSIDERED">
                                              Considered
                                            </option>
                                            <option value="NOTCONSIDERED">
                                              Not Considered
                                            </option>
                                          </Field>
                                        </td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 bg-white">
                        <div className="row py-3">
                          <div className="col-sm-6 mb-2">
                            <label className="h6 py-3">
                              Total Per unit Cost in INR
                            </label>
                          </div>
                          <div className="col-sm-6 ml-0">
                            <div className="input-group">
                              <Field
                                name={`vendorTotalPerUnitCost`}
                                id=""
                                type="number"
                                className={
                                  `w-100 form-control form-control-sm form-control form-control-sm-sm` +
                                  (errors.vendorTotalPerUnitCost &&
                                  touched.vendorTotalPerUnitCost
                                    ? " is-invalid"
                                    : "")
                                }
                                disabled
                              />
                              <ErrorMessage
                                name={`vendorTotalPerUnitCost`}
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>
                          <div className="col-lg-12 mb-2">
                            <h6>Remarks</h6>
                          </div>
                          <div className="row col-12 ml-0">
                            <div className="input-group">
                              <Field
                                name={`remark`}
                                id=""
                                className={
                                  `w-100 form-control form-control-sm form-control form-control-sm-lg` +
                                  (errors.remark && touched.remark
                                    ? " is-invalid"
                                    : "")
                                }
                                rows="3"
                                disabled
                              ></Field>
                              <ErrorMessage
                                name={`vendorTotalPerUnitCost`}
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="row justify-content-start">
                          <div className="col-auto">
                            <button
                              onClick={() => history.goBack()}
                              type="button"
                              className="btn btn-outline-deep-primary mr-3 my-2 toggle-class px-4 px-5"
                            >
                              Back
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            );
          }}
        />
      )}
    </VendorLayout>
  );
};

export default VendorResponseDetails;

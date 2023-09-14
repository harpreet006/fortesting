import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import VendorLayout from '../../../layout/VendorLayout';
import { responseRfq, vendorRequestRfqByIdAndType, rfq_By_Id, createVendorRFQ } from '../../../store/actions/vendor/rfqAction'
import { useSelector, useDispatch } from 'react-redux';
import FormSuccess from '../../../components/helper/FormSuccess';
import { useParams, useHistory } from 'react-router-dom';
import { CardLoader } from '../../../components/helper/CustomLoader';
import Spinner from 'react-bootstrap/Spinner';
import { onlyNumberAllow, onlyAlphaNumericSpaceAllow } from '../../../components/validation';

const ReceiveRFQ = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.VENDOR_RFQ_INFO);
  const { vRequestId, customerRfqId } = useParams();

  const jsonData = {
    "manPowers": [
      {
        "manpowerType": "WH Manager",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }, {
        "manpowerType": "Asst Manager",
        "type": {
          "name": "DEDICATED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      },
      {
        "manpowerType": "OB Executive+DEO",
        "type": {
          "name": "DEDICATED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      , {
        "manpowerType": "Dispatch Incharge",
        "type": {
          "name": "DEDICATED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      , {
        "manpowerType": "Inventory Incharge",
        "type": {
          "name": "DEDICATED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      , {
        "manpowerType": "Inventory Supervisor",
        "type": {
          "name": "DEDICATED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      , {
        "manpowerType": "Activity Supervisors",
        "type": {
          "name": "DEDICATED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      , {
        "manpowerType": "Labours",
        "type": {
          "name": "DEDICATED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      , {
        "manpowerType": "Security",
        "type": {
          "name": "DEDICATED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      , {
        "manpowerType": "House Keeping",
        "type": {
          "name": "DEDICATED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }

    ],
    "infrastructures": [
      {
        "infrastructureType": "MFD",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      },
      {
        "infrastructureType": "Fire Extinguiser",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "Office Setup",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "HPT Electric Voltas",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "Hand Pallet Truck",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "Picking Trolley",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "Desktop Computer",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "Office Printer",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "Printer With Xerox, Fax and Scan facility",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "Barcode printer",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "UPS",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "Inverter",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "Electric Stacker",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "AC",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "ForkLift Battery Operated",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "Projector",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "Weighting Machine",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "Wooden Pallets",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "Generator 20KVA",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "Message Boards (Notice)",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "HD Selves For File and Record",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "Lock and Key Almira",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "Water Cooler",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "Labels & Signage",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      },
      {
        "infrastructureType": "Office and Security Fan",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "Emergency Light with Battery",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "WMS Software",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "Wire Mesh Cage",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "First Aid Kit",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "Security Alarm",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "Dock Levler",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "Shelve Racks",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "CCTV",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      },
      {
        "infrastructureType": "Internal Painting",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      },
      {
        "infrastructureType": "Security & Safety Audit",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      },
      {
        "infrastructureType": "Security & Safety Displays",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      },
      {
        "infrastructureType": "Shelved Rack",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      },
      {
        "infrastructureType": "Broadband Connection setup",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "Vaccumm Cleaner",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "Start Up",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
      ,
      {
        "infrastructureType": "Scanners",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }
    ],
    "runningCosts": [
      {
        "runningCostType": "Rent",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      },
      {
        "runningCostType": "Infrastructure",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      },
      {
        "runningCostType": "Manpower",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      },
      {
        "runningCostType": "Communication",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      },
      {
        "runningCostType": "Utilities",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      },
      {
        "runningCostType": "Staff Welfare",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      },
      {
        "runningCostType": "Power",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      },
      {
        "runningCostType": "Licenses",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      },
      {
        "runningCostType": "House Keeping Consumables",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      },
      {
        "runningCostType": "WMS ID",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      },
      {
        "runningCostType": "Packaging Consumable",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      },
      {
        "runningCostType": "Genset",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      },
      {
        "runningCostType": "Genset",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      },
      {
        "runningCostType": "Consumable(printing material)",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      },
      {
        "runningCostType": "Broadband Connection",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      },
      {
        "runningCostType": "Pallets",
        "type": {
          "name": "SHARED"
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": "",
        "considerOrNotConsider": ""
      }

    ],
    "vendorTotalPerUnitCost": "",
    "remark": "",
  }


  useEffect(() => {
    dispatch(vendorRequestRfqByIdAndType(vRequestId, "manpowers"))
    return (() =>
      dispatch(rfq_By_Id([]))
    )
  }, [dispatch, vRequestId]);

  const redirect = () => {
    dispatch(responseRfq([]))
    history.replace(`/vendor/rfq-status/${vRequestId}/${customerRfqId}`)
  }

  const receiveSchema = Yup.object().shape({
    vendorTotalPerUnitCost: Yup.string().required('Required').max(9, 'Must be 9 digits'),
    remark: Yup.string().required('Required'),

    manPowers: Yup.array().of(
      Yup.object().shape({
        quantity: Yup.string().required('Required').max(9, 'Must be 9 digits'),
        costUnit: Yup.string().required('Required').max(9, 'Must be 9 digits'),
        totalMonth: Yup.string().required('Required').max(3, 'Must be 3 digits'),
        remark: Yup.string().required('Required'),
        considerOrNotConsider: Yup.string().required('Required')
      })
    ),

    infrastructures: Yup.array().of(
      Yup.object().shape({
        quantity: Yup.string().required('Required').max(9, 'Must be 9 digits'),
        costUnit: Yup.string().required('Required').max(9, 'Must be 9 digits'),
        totalMonth: Yup.string().required('Required').max(3, 'Must be 3 digits'),
        remark: Yup.string().required('Required'),
        considerOrNotConsider: Yup.string().required('Required')
      })
    ),

    runningCosts: Yup.array().of(
      Yup.object().shape({
        quantity: Yup.string().required('Required').max(9, 'Must be 9 digits'),
        costUnit: Yup.string().required('Required').max(9, 'Must be 9 digits'),
        totalMonth: Yup.string().required('Required').max(3, 'Must be 3 digits'),
        remark: Yup.string().required('Required'),
        considerOrNotConsider: Yup.string().required('Required')

      })
    ),

  });



  return (
    <VendorLayout>
      {
        (data.rfqResponse.statusCode === 201 || data.rfqResponse.statusCode === 200) ?
          <FormSuccess onClick={() => redirect()} message={data.rfqResponse.message} />
          : null
      }

      {data.isLoading ?
        <CardLoader />
        :

        <Formik
          enableReinitialize={true}
          validationSchema={receiveSchema}
          initialValues={jsonData}
          onSubmit={fields => {

            if (data.rfqDetail.data.warehouse.id && customerRfqId && vRequestId) {
              fields["vendorRequestRfq"] = parseInt(vRequestId)
              fields["warehouse"] = data.rfqDetail.data.warehouse.id

              dispatch(createVendorRFQ(fields, customerRfqId))
            }
          }}

          render={({ values, errors, status, onChange, touched }) => {
            return (
              <div className="w-100 d-block">
                <Form >
                  <div className="content-admin px-5">
                    <div className="row justify-content-end align-items-center sticky-top py-3 px-3 bg-lighter-blue">
                      <div className="col-auto d-lg-none">
                        <button className="btn btn-deep-blue px-0 size-40px toggle-className btn-sidebar-admin sidebar-admin-toggle align-items-center justify-content-center" type="button" data-target=".sidebar-admin-toggle" data-toggle-class="open">
                          <span></span>
                        </button>
                      </div>

                    </div>
                    <div className="row align-items-center py-3 px-3 mx-0">
                      <div className="col-12 py-3 px-0">
                        <h5 className="text-dark"><i onClick={() => history.goBack()} className="fas fa-chevron-left mr-3 cursorPointer"></i>RFQ Response to Warehousity</h5>
                      </div>

                      <div className="col-12 bg-deep-gray py-3 mb-5">

                        <div className="row pt-3">
                          <div className="col-12 px-0">
                            <div className="form-group form-inline mb-3 px-0">
                              <label htmlFor="inputPassword6" className="w-250px justify-content-start px-3">RFQ ID</label>
                              <div className="row mx-md-0 mx-sm-3 mx-0">
                                <div className="col-12 px-sm-3 px-0">
                                  <input value={data.rfqDetail.data ? data.rfqDetail.data.customerRfq?.id : ""} type="text" id="inputPassword6" className="form-control d-inline-block form-control-md w-160px mx-3" placeholder="DL-01379" readOnly />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 px-0">
                            <div className="row">
                              <div className="col-12">
                                <div className="row mx-0">
                                  <div className="col-md-auto pl-0">
                                    <label htmlFor="staticEmail" className="mb-2 mt-2 w-250px justify-content-start px-3">City</label>
                                    <div className="form-group col-auto px-3 mb-3">
                                      <input value={data.rfqDetail.data && data.rfqDetail.data.customerRfq?.location ? data.rfqDetail.data.customerRfq?.location.city.name : ""} className="form-control form-control-md w-160px" disabled />
                                    </div>
                                  </div>
                                  <div className="col-md-auto pl-0">
                                    <label htmlFor="staticEmail" className="mb-2 mt-2 w-250px justify-content-start px-3">Area</label>
                                    <div className="form-group col-auto px-3 mb-3">
                                      <input value={data.rfqDetail.data && data.rfqDetail.data.customerRfq?.location ? data.rfqDetail.data.customerRfq?.location.area.name : ""} className="form-control form-control-md w-160px" disabled />
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>

                          {/* <div className="col-12 px-0">
                            <div className="form-group form-inline mb-4 px-0">
                              <label htmlFor="inputPassword6" className="w-250px justify-content-start px-3">WH Space Required</label>
                              <div className="row mx-md-0 mx-sm-3 mx-0">
                                <div className="col-12 px-sm-3 px-0">
                                  <input value={data.rfqDetail.data ? data.rfqDetail.data.customerRfq?.warehouseSpaceRequired : ""} type="text" id="inputPassword6" className="form-control d-inline-block form-control-md w-160px mx-3" placeholder="Sqft" readOnly />
                                </div>
                              </div>
                            </div>
                          </div> */}

                          <div className="col-12 px-0">
                            <div className="form-group form-inline mb-4 px-0">
                              <label htmlFor="inputPassword6" className="w-250px justify-content-start px-3">Warehouse</label>
                              <div className="row mx-md-0 mx-sm-3 mx-0">
                                <div className="col-12 px-sm-3 px-0">
                                  <input value={data.rfqDetail?.data?.warehouse?.warehouseName} type="text" id="inputPassword6" className="form-control d-inline-block form-control-md w-160px mx-3" placeholder="Sqft" readOnly />
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>

                      </div>


                      <div className="col-12 py-3 px-0">
                        <h4 className="text-dark-blue">RFQ Reply to Warehousity</h4>
                      </div>

                      <div className="col-12 bg-deep-gray mb-5">

                        <div className="row">
                          <div className="col-12 px-0 table-gray-admin table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <td className="col font-weight-bold">
                                    Manpower :
                                  </td>
                                  <td className="col font-weight-bold">
                                    Type
                                  </td>
                                  <td className="w-200px mw-200px font-weight-bold">
                                    Qty
                                  </td>
                                  <td className="mw-250px font-weight-bold">
                                    Cost /Unit
                                  </td>
                                  <td className="mw-250px font-weight-bold">
                                    Total/Month
                                  </td>
                                  <td className="mw-250px font-weight-bold">
                                    Remarks
                                  </td>
                                  <td className="mw-250px font-weight-bold">
                                    Considered / Not Considered
                                  </td>
                                </tr>
                              </thead>
                              <tbody>


                                {values.manPowers && values.manPowers.length > 0 &&
                                  values.manPowers.map((man, index) => {
                                    const manErrors = (errors.manPowers?.length && errors.manPowers[index]) || {};
                                    const manTouched = (touched.manPowers?.length && touched.manPowers[index]) || {};
                                    return (
                                      <tr key={index}>
                                        <td>
                                          <p className="m-0 pb-1">{man.manpowerType}</p>
                                        </td>
                                        <td>
                                          <Field name={`manPowers.${index}.type.name`} as="select" className="form-control custom-select bg-white px-4 common-select-deep-blue d-inline-block w-130px" id="manpower-type1">
                                            <option value="">Select</option>
                                            <option value="SHARED"> SHARED</option>
                                            <option value="DEDICATED">DEDICATED</option>
                                          </Field>
                                        </td>
                                        <td>
                                          <Field name={`manPowers.${index}.quantity`} min="0" onKeyPress={(e) => onlyNumberAllow(e)} type="number" id="manpower-qty-input1" className={`form-control bg-white px-4` + (manErrors.quantity && manTouched.quantity ? ' is-invalid' : '')} />
                                          <ErrorMessage name={`manPowers.${index}.quantity`} component="div" className="invalid-feedback" />
                                        </td>
                                        <td>
                                          <Field name={`manPowers.${index}.costUnit`} min="0" onKeyPress={(e) => onlyNumberAllow(e)} type="number" id="manpower-cost-input1" className={`form-control bg-white px-4` + (manErrors.costUnit && manTouched.costUnit ? ' is-invalid' : '')} />
                                          <ErrorMessage name={`manPowers.${index}.costUnit`} component="div" className="invalid-feedback" />
                                        </td>
                                        <td>
                                          <Field name={`manPowers.${index}.totalMonth`} min="0" onKeyPress={(e) => onlyNumberAllow(e)} type="number" id="manpower-months-input1"
                                            className={`form-control bg-white px-4` + (manErrors.totalMonth && manTouched.totalMonth ? ' is-invalid' : '')} />
                                          <ErrorMessage name={`manPowers.${index}.totalMonth`} component="div" className="invalid-feedback" />
                                        </td>

                                        <td>
                                          <Field name={`manPowers.${index}.remark`} onKeyPress={(e) => onlyAlphaNumericSpaceAllow(e)} type="text" className={`form-control text-center bg-white my-1 px-4` + (manErrors.remark && manTouched.remark ? ' is-invalid' : '')} id="manpower-remarks1" />
                                          <ErrorMessage name={`manPowers.${index}.remark`} component="div" className="invalid-feedback" />
                                        </td>
                                        <td>
                                          {/* <Field name={`manPowers.${index}.remark`} type="text" onKeyPress={(e) => onlyAlphaNumericAllow(e)} className={`form-control text-center bg-white my-1 px-4` + (manErrors.remark && manTouched.remark ? ' is-invalid' : '')} id="manpower-consider1" />
                            <ErrorMessage name={`manPowers.${index}.remark`} component="div" className="invalid-feedback" /> */}

                                          <Field name={`manPowers.${index}.considerOrNotConsider`} as="select"
                                            className={`form-control custom-select bg-white px-4 common-select-deep-blue d-inline-block w-100` + (manErrors.considerOrNotConsider && manTouched.considerOrNotConsider ? ' is-invalid' : '')} id="manpower-type1">
                                            <option value="">Select</option>
                                            <option value="CONSIDERED">Considered</option>
                                            <option value="NOTCONSIDERED">Not Considered</option>
                                          </Field>
                                          <ErrorMessage name={`manPowers.${index}.considerOrNotConsider`} component="div" className="invalid-feedback" />
                                        </td>
                                      </tr>

                                    )
                                  })}

                              </tbody>

                            </table>
                          </div>
                        </div>

                      </div>

                      <div className="col-12 bg-deep-gray mb-5">
                        <div className="row">
                          <div className="col-12 px-0 table-gray-admin table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <td className="col mw-150px font-weight-bold">
                                    Infrastructure :
                                  </td>
                                  <td className="col font-weight-bold">
                                    Type
                                  </td>
                                  <td className="w-200px mw-200px font-weight-bold">
                                    Qty
                                  </td>
                                  <td className="mw-250px font-weight-bold">
                                    Cost /Unit
                                  </td>
                                  <td className="mw-250px font-weight-bold">
                                    Total/Month
                                  </td>
                                  <td className="mw-250px font-weight-bold">
                                    Remarks
                                  </td>
                                  <td className="mw-250px font-weight-bold">
                                    Considered / Not Considered
                                  </td>
                                </tr>
                              </thead>
                              <tbody>


                                {values.infrastructures && values.infrastructures.length > 0 &&
                                  values.infrastructures.map((man, index) => {
                                    const infraErrors = (errors.infrastructures?.length && errors.infrastructures[index]) || {};
                                    const infraTouched = (touched.infrastructures?.length && touched.infrastructures[index]) || {};
                                    return (

                                      <tr key={index}>
                                        <td>
                                          <p className="m-0 pb-1"> {man.infrastructureType} </p>
                                        </td>
                                        <td>
                                          <Field name={`infrastructures.${index}.type.name`} as="select" id="infrastructure-type1" className="form-control custom-select bg-white px-4 common-select-deep-blue d-inline-block w-130px"  >
                                            <option value="">Select</option>
                                            <option value="SHARED">SHARED</option>
                                            <option value="DEDICATED">DEDICATED</option>
                                          </Field>
                                        </td>
                                        <td>
                                          <Field name={`infrastructures.${index}.quantity`} min="0" onKeyPress={(e) => onlyNumberAllow(e)} type="number" id="infrastructure-qty-input1" className={`form-control bg-white px-4` + (infraErrors.quantity && infraTouched.quantity ? ' is-invalid' : '')} />
                                          <ErrorMessage name={`infrastructures.${index}.quantity`} component="div" className="invalid-feedback" />
                                        </td>
                                        <td>
                                          <Field name={`infrastructures.${index}.costUnit`} min="0" onKeyPress={(e) => onlyNumberAllow(e)} type="number" id="infrastructure-cost-input1" className={`form-control bg-white px-4` + (infraErrors.costUnit && infraTouched.costUnit ? ' is-invalid' : '')} />
                                          <ErrorMessage name={`infrastructures.${index}.costUnit`} component="div" className="invalid-feedback" />
                                        </td>
                                        <td>
                                          <Field name={`infrastructures.${index}.totalMonth`} min="0" onKeyPress={(e) => onlyNumberAllow(e)} type="number" id="infrastructure-months-input1" className={`form-control bg-white px-4` + (infraErrors.totalMonth && infraTouched.totalMonth ? ' is-invalid' : '')} />
                                          <ErrorMessage name={`infrastructures.${index}.totalMonth`} component="div" className="invalid-feedback" />
                                        </td>
                                        <td>
                                          <Field name={`infrastructures.${index}.remark`} onKeyPress={(e) => onlyAlphaNumericSpaceAllow(e)} type="text" className={`form-control text-center bg-white my-1 px-4` + (infraErrors.remark && infraTouched.remark ? ' is-invalid' : '')} id="infrastructure-remarks1" />
                                          <ErrorMessage name={`infrastructures.${index}.remark`} component="div" className="invalid-feedback" />
                                        </td>
                                        <td>
                                          {/* <Field name={`infrastructures.${index}.remark`} onKeyPress={(e) => onlyAlphaNumericAllow(e)} type="text" className={`form-control text-center bg-white my-1 px-4`+ (infraErrors.remark && infraTouched.remark ? ' is-invalid' : '')} id="infrastructure-consider1"  />
                            <ErrorMessage name={`infrastructures.${index}.remark`}component="div" className="invalid-feedback" /> */}
                                          <Field name={`infrastructures.${index}.considerOrNotConsider`} as="select"
                                            className={`form-control custom-select bg-white px-4 common-select-deep-blue d-inline-block w-100` + (infraErrors.considerOrNotConsider && infraErrors.considerOrNotConsider ? ' is-invalid' : '')} id="manpower-type1">
                                            <option value="">Select</option>
                                            <option value="CONSIDERED">Considered</option>
                                            <option value="NOTCONSIDERED">Not Considered</option>
                                          </Field>
                                          <ErrorMessage name={`infrastructures.${index}.considerOrNotConsider`} component="div" className="invalid-feedback" />
                                        </td>
                                      </tr>

                                    )
                                  })}


                              </tbody>

                            </table>
                          </div>
                        </div>

                      </div>

                      <div className="col-12 bg-deep-gray mb-5">

                        <div className="row">
                          <div className="col-12 px-0 table-gray-admin table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <td className="col mw-150px font-weight-bold">
                                    Running Cost :
                                  </td>
                                  <td className="col font-weight-bold">
                                    Type
                                  </td>
                                  <td className="w-200px mw-200px font-weight-bold">
                                    Qty
                                  </td>
                                  <td className="mw-250px font-weight-bold">
                                    Cost /Unit
                                  </td>
                                  <td className="mw-250px font-weight-bold">
                                    Total/Month
                                  </td>
                                  <td className="mw-250px font-weight-bold">
                                    Remarks
                                  </td>
                                  <td className="mw-250px font-weight-bold">
                                    Considered / Not Considered
                                  </td>
                                </tr>
                              </thead>
                              <tbody>


                                {values.runningCosts && values.runningCosts.length > 0 &&
                                  values.runningCosts.map((man, index) => {
                                    const runningErrors = (errors.runningCosts?.length && errors.runningCosts[index]) || {};
                                    const runningTouched = (touched.runningCosts?.length && touched.runningCosts[index]) || {};
                                    return (
                                      <tr key={index}>
                                        <td>
                                          <p className="m-0 pb-1"> {man.runningCostType} </p>
                                        </td>
                                        <td>
                                          <Field name={`runningCosts.${index}.type.name`} as="select" id="runningcost-type1" className="form-control custom-select bg-white px-4 common-select-deep-blue d-inline-block w-130px" >
                                            <option value="">Select</option>
                                            <option value="SHARED">SHARED</option>
                                            <option value="DEDICATED">DEDICATED</option>
                                          </Field>
                                        </td>
                                        <td>
                                          <Field name={`runningCosts.${index}.quantity`} min="0" onKeyPress={(e) => onlyNumberAllow(e)} type="number" id="runningcost-qty-input1" className={`form-control bg-white px-4` + (runningErrors.quantity && runningTouched.quantity ? ' is-invalid' : '')} />
                                          <ErrorMessage name={`runningCosts.${index}.quantity`} component="div" className="invalid-feedback" />
                                        </td>
                                        <td>
                                          <Field name={`runningCosts.${index}.costUnit`} min="0" onKeyPress={(e) => onlyNumberAllow(e)} type="number" id="runningcost-cost-input1" className={`form-control bg-white px-4` + (runningErrors.costUnit && runningTouched.costUnit ? ' is-invalid' : '')} />
                                          <ErrorMessage name={`runningCosts.${index}.costUnit`} component="div" className="invalid-feedback" />
                                        </td>

                                        <td>
                                          <Field name={`runningCosts.${index}.totalMonth`} min="0" onKeyPress={(e) => onlyNumberAllow(e)} type="number" id="runningcost-cost-input1" className={`form-control bg-white px-4` + (runningErrors.totalMonth && runningTouched.totalMonth ? ' is-invalid' : '')} />
                                          <ErrorMessage name={`runningCosts.${index}.totalMonth`} component="div" className="invalid-feedback" />
                                        </td>

                                        <td>
                                          <Field name={`runningCosts.${index}.remark`} onKeyPress={(e) => onlyAlphaNumericSpaceAllow(e)} type="text" className={`form-control text-center bg-white my-1 px-4` + (runningErrors.remark && runningTouched.remark ? ' is-invalid' : '')} id="runningcost-remarks1" />
                                          <ErrorMessage name={`runningCosts.${index}.remark`} component="div" className="invalid-feedback" />
                                        </td>

                                        <td>
                                          {/* <Field name={`runningCosts.${index}.remark`} onKeyPress={(e) => onlyAlphaNumericAllow(e)} type="text" className={`form-control text-center bg-white my-1 px-4`+ (runningErrors.remark && runningTouched.remark ? ' is-invalid' : '')} id="runningcost-consider1" />
                            <ErrorMessage name={`runningCosts.${index}.remark`} component="div" className="invalid-feedback" /> */}
                                          <Field name={`runningCosts.${index}.considerOrNotConsider`} as="select"
                                            className={`form-control custom-select bg-white px-4 common-select-deep-blue d-inline-block w-100` + (runningErrors.considerOrNotConsider && runningErrors.considerOrNotConsider ? ' is-invalid' : '')} id="manpower-type1">
                                            <option value="">Select</option>
                                            <option value="CONSIDERED">Considered</option>
                                            <option value="NOTCONSIDERED">Not Considered</option>
                                          </Field>
                                          <ErrorMessage name={`runningCosts.${index}.considerOrNotConsider`} component="div" className="invalid-feedback" />
                                        </td>
                                      </tr>

                                    )
                                  })}

                              </tbody>

                            </table>
                          </div>
                        </div>

                      </div>


                      <div className="col-12 bg-deep-gray mb-5">

                        <div className="row pt-4">
                          <div className="col-sm-6 mb-2">
                            <label className="h6 py-3">Total Per unit Cost in INR</label>
                          </div>
                          <div className="col-sm-6 ml-0">
                            <div className="input-group">
                              <Field name={`vendorTotalPerUnitCost`} min="0" onKeyPress={(e) => onlyNumberAllow(e)} type="number" className={`w-100 form-control form-control-md` + (errors.vendorTotalPerUnitCost && touched.vendorTotalPerUnitCost ? ' is-invalid' : '')} />
                              <ErrorMessage name={`vendorTotalPerUnitCost`} component="div" className="invalid-feedback" />
                            </div>
                          </div>
                          <div className="col-lg-12 mb-2">
                            <h6>Remarks</h6>
                          </div>
                          <div className="row col-12 ml-0">
                            <div className="input-group">
                              <Field name={`remark`} onKeyPress={(e) => onlyAlphaNumericSpaceAllow(e)} className={`w-100 form-control form-control-md` + (errors.remark && touched.remark ? ' is-invalid' : '')} rows="3"></Field>
                              <ErrorMessage name={`remark`} component="div" className="invalid-feedback" />
                            </div>
                          </div>
                          {/* data.isLoading */}
                          <div className="col-12 mt-5">
                            <div className="row justify-content-end">
                              <div className="col-auto">
                                <button type="submit" disabled={data.isPending} className="btn btn-deep-primary mb-3 add-className remove-className">
                                  Submit
                                  {data.isPending ? <Spinner animation="border" /> : null}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                </Form>
              </div>
            )
          }}
        />
      }
    </VendorLayout>
  );
}

export default ReceiveRFQ;

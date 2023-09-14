import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import Layout from '../../../layout/Layout';
import { useHistory, useParams } from 'react-router-dom';
import CustomerLayout from '../../../layout/CustomerLayout';
import { whsToCustomerRfqById } from '../../../store/actions/customer/rfqAction';
import { responseBooking, addNewBooking } from '../../../store/actions/customer/bookingAction';
import { useSelector, useDispatch } from 'react-redux';
import FormSuccess from '../../../components/helper/FormSuccess';
import { CardLoader } from '../../../components/helper/CustomLoader'
import BrowserTitle from '../../../components/helper/BrowserTitle';

const WhsRFQDetails = () => {
  const { wResponseId } = useParams()
  const history = useHistory()
  const dispatch = useDispatch();
  const data = useSelector((state) => state.CUSTOMER_RFQ_INFO);
  const bookData = useSelector((state) => state.BOOKINGINFO);

  useEffect(() => {
    dispatch(whsToCustomerRfqById(wResponseId))
  }, [dispatch, wResponseId]);



  const [jsonData, setJsonData] = useState({
    "manPowers": [
      {
        "manpowerType": "WH Manager",
        "type": {
          "name": "Shared"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }, {
        "manpowerType": "Asst Manager",
        "type": {
          "name": "Dedicated"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }, {
        "manpowerType": "OB Executive+DEO",
        "type": {
          "name": "Dedicated"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      , {
        "manpowerType": "Dispatch Incharge",
        "type": {
          "name": "Dedicated"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      , {
        "manpowerType": "Inventory Incharge",
        "type": {
          "name": "Dedicated"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      , {
        "manpowerType": "Inventory Supervisor",
        "type": {
          "name": "Dedicated"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      , {
        "manpowerType": "Activity Supervisors",
        "type": {
          "name": "Dedicated"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      , {
        "manpowerType": "Labours",
        "type": {
          "name": "Dedicated"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      , {
        "manpowerType": "Security",
        "type": {
          "name": "Dedicated"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      , {
        "manpowerType": "House Keeping",
        "type": {
          "name": "Dedicated"
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }

    ],
    "infrastructures": [
      {
        "infrastructureType": "MFD",
        "type": {
          "name": "Shared"
        },
        "quantity": 10,
        "costUnit": 10,
        "totalMonth": 20,
        "remark": "infra remark"
      },
      {
        "infrastructureType": "Fire Extinguiser",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Office Setup",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "HPT Electric Voltas",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Hand Pallet Truck",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Picking Trolley",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Desktop Computer",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Office Printer",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Printer With Xerox, Fax and Scan facility",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Barcode printer",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "UPS",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Inverter",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Electric Stacker",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "AC",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "ForkLift Battery Operated",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Projector",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Weighting Machine",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Wooden Pallets",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Generator 20KVA",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Message Boards (Notice)",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "HD Selves For File and Record",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Lock and Key Almira",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Water Cooler",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Labels & Signage",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "infrastructureType": "Office and Security Fan",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Emergency Light with Battery",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "WMS Software",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Wire Mesh Cage",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "First Aid Kit",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Security Alarm",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Dock Levler",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Shelve Racks",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "CCTV",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "infrastructureType": "Internal Painting",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "infrastructureType": "Security & Safety Audit",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "infrastructureType": "Security & Safety Displays",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "infrastructureType": "Shelved Rack",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "infrastructureType": "Broadband Connection setup",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Vaccumm Cleaner",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Start Up",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Scanners",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
    ],
    "runningCosts": [
      {
        "runningCostType": "Rent",
        "type": {
          "name": "Shared"
        },
        "quantity": 20,
        "costUnit": 3,
        "amount": 40,
        "totalMonth": 20,
        "remark": "run remark"
      },
      {
        "runningCostType": "Infrastructure",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "runningCostType": "Manpower",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "runningCostType": "Communication",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "runningCostType": "Utilities",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "runningCostType": "Staff Welfare",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "runningCostType": "Power",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "runningCostType": "Licenses",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "runningCostType": "House Keeping Consumables",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "runningCostType": "WMS ID",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "runningCostType": "Packaging Consumable",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "runningCostType": "Genset",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "runningCostType": "Genset",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "runningCostType": "Consumable(printing material)",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "runningCostType": "Broadband Connection",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "runningCostType": "Pallets",
        "type": {
          "name": ""
        },
        "quantity": "",
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      }

    ],
    "adminTotalPerUnitCost": "",
    "remark": "",
    "vendorRequestRfq": 1
  })

  useEffect(() => {
    if (data.rfqDetail.data && data.rfqDetail.data.length > 0) {
      setJsonData(data.rfqDetail.data[0])
    }
  }, [data.rfqDetail.data])

  const bookingConfirmation = () => {
    if (data.rfqDetail.data && data.rfqDetail.data.length > 0 && data.rfqDetail.data[0].warehouse.id && data.rfqDetail.data[0].customerRfq.id && data.rfqDetail.data[0].customerRfq.user.id) {
      dispatch(addNewBooking({
        "customerRfq": data.rfqDetail.data[0].customerRfq.id,
        "customer": data.rfqDetail.data[0].customerRfq.user.id,
        "warehouse": data.rfqDetail.data[0].warehouse.id
      }))
      // console.log("warehouseId",data.rfqDetail.data[0].warehouse.id)
      // console.log("RFQ ID",data.rfqDetail.data[0].customerRfq.id)
      // console.log("RFQ ID",data.rfqDetail.data[0].customerRfq.user.id)
    }
  }

  const redirect = () => {
    dispatch(responseBooking({}))
    history.replace('/bookings?page=1')
  }


  return (
    <Layout>
      <BrowserTitle title="RFQ" />
      <CustomerLayout title={`RFQ`}>
        {
          bookData.bookingResponse?.statusCode === 200 ?
            <FormSuccess onClick={redirect} message={bookData.bookingResponse.message} />
            : null
        }
        {data.isLoading ? <CardLoader /> :



          <Formik
            enableReinitialize={true}
            // validationSchema={inboundSchema}
            initialValues={jsonData}
            onSubmit={fields => {

              console.log("fields---->", fields)

              //     if(data.rfqDetail.id){
              //     fields["vendorRequestRfq"]= data.rfqDetail.id

              //   dispatch(createVendorRFQ(fields))
              //   }
            }}

            render={({ values, errors, status, onChange, touched }) => {


              return (
                <div className="w-100 d-block">
                  <Form >

                    <div className="row align-items-center py-3 px-3 mx-0">
                      <div className="col-12 py-3 px-0">
                        <h5 className="text-dark"><i onClick={() => history.goBack()} className="fas fa-chevron-left mr-3 cursorPointer"></i>RFQ Details</h5>

                      </div>

                      <div className="col-12 bg-deep-gray py-3 mb-5">
                        <div className="row pt-3">
                          <div className="col-12 px-0">
                            <div className="form-group form-inline mb-3 px-0">
                              <label htmlFor="inputPassword6" className="w-250px justify-content-start px-3">RFQ ID</label>
                              <div className="row mx-md-0 mx-sm-3 mx-0">
                                <div className="col-12 px-sm-3 px-0">
                                  <input value={data.rfqDetail.data && data.rfqDetail.data.length > 0 && data.rfqDetail.data[0].customerRfq ? data.rfqDetail.data[0].customerRfq.id : ""} type="text" id="inputPassword6" className="form-control d-inline-block form-control-md w-160px mx-3" placeholder="DL-01379" readOnly />
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
                                      <input value={data.rfqDetail.data && data.rfqDetail.data.length > 0 && data.rfqDetail.data[0].customerRfq?.location ? data.rfqDetail.data[0].customerRfq?.location.city.name : ""} className="form-control form-control-md w-160px" disabled />
                                    </div>
                                  </div>
                                  <div className="col-md-auto pl-0">
                                    <label htmlFor="staticEmail" className="mb-2 mt-2 w-250px justify-content-start px-3">Area</label>
                                    <div className="form-group col-auto px-3 mb-3">
                                      <input value={data.rfqDetail.data && data.rfqDetail.data.length > 0 && data.rfqDetail.data[0].customerRfq?.location ? data.rfqDetail.data[0].customerRfq?.location.area.name : ""} className="form-control form-control-md w-160px" disabled />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>


                          <div className="col-12 px-0">
                            <div className="form-group form-inline mb-4 px-0">
                              <label htmlFor="inputPassword6" className="w-250px justify-content-start px-3">WH Space Required</label>
                              <div className="row mx-md-0 mx-sm-3 mx-0">
                                <div className="col-12 px-sm-3 px-0">
                                  <input value={data.rfqDetail.data && data.rfqDetail.data.length > 0 && data.rfqDetail.data[0].customerRfq ? data.rfqDetail.data[0].customerRfq.warehouseSpaceRequired : ""} type="text" id="inputPassword6" className="form-control d-inline-block form-control-md w-160px mx-3" placeholder="Sqft" readOnly />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-12 px-0">
                            <div className="form-group form-inline mb-4 px-0">
                              <label htmlFor="inputPassword6" className="w-250px justify-content-start px-3">Warehouse</label>
                              <div className="row mx-md-0 mx-sm-3 mx-0">
                                <div className="col-12 px-sm-3 px-0">
                                  <input value={data.rfqDetail.data && data.rfqDetail.data.length > 0 && data.rfqDetail.data[0].warehouse ? data.rfqDetail.data[0].warehouse.warehouseName : ""} type="text" id="inputPassword6" className="form-control d-inline-block form-control-md w-160px mx-3" placeholder="Sqft" readOnly />
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>

                      <div className="col-12 py-3 px-0">
                        <h4 className="text-dark-blue">Contact Information</h4>
                      </div>

                      <div className="col-12 bg-deep-gray py-3 mb-5">
                        <div className="row pt-2">
                          <div className="form-group col-sm-6 mb-4">
                            <label htmlFor="company-name" className="mb-2">Company Name</label>
                            <input value={data.rfqDetail.data && data.rfqDetail.data.length > 0 && data.rfqDetail.data[0].customerRfq ? data.rfqDetail.data[0].customerRfq?.contactInformation?.companyName : ""} type="text" className="form-control form-control-md" id="company-name" readOnly />
                          </div>
                          <div className="form-group col-sm-6 mb-4">
                            <label htmlFor="company-type" className="mb-2">Type of Company</label>
                            <select className="form-control form-control-md" id="company-type" disabled>
                              <option selected="">{data.rfqDetail.data && data.rfqDetail.data.length > 0 && data.rfqDetail.data[0].customerRfq ? data.rfqDetail.data[0].customerRfq?.contactInformation?.companyType.type : ""}</option>

                            </select>
                          </div>
                          <div className="form-group col-sm-6 mb-4">
                            <label htmlFor="vendor-address" className="mb-2">Address</label>
                            <input value={data.rfqDetail.data && data.rfqDetail.data.length > 0 && data.rfqDetail.data[0].customerRfq ? data.rfqDetail.data[0].customerRfq?.contactInformation?.address : ""} type="text" className="form-control form-control-" id="vendor-address" readOnly />
                          </div>
                          <div className="form-group col-sm-6 mb-4">
                            <label htmlFor="vendor-register-address" className="mb-2">Registered Office Address</label>
                            <input value={data.rfqDetail.data && data.rfqDetail.data.length > 0 && data.rfqDetail.data[0].customerRfq ? data.rfqDetail.data[0].customerRfq?.contactInformation?.registerOfficeAddress : ""} type="text" className="form-control form-control-ms" id="vendor-register-address" readOnly />
                          </div>
                          <div className="form-group col-sm-6 mb-4">
                            <label htmlFor="vendor-website" className="mb-2">Website</label>
                            <input value={data.rfqDetail.data && data.rfqDetail.data.length > 0 && data.rfqDetail.data[0].customerRfq ? data.rfqDetail.data[0].customerRfq?.contactInformation?.website : ""} type="url" className="form-control form-control-md" id="vendor-website" readOnly />
                          </div>
                          <div className="form-group col-sm-6 mb-4">
                            <label htmlFor="vendor-group-company" className="mb-2">Group Company</label>
                            <input value={data.rfqDetail.data && data.rfqDetail.data.length > 0 && data.rfqDetail.data[0].customerRfq ? data.rfqDetail.data[0].customerRfq?.contactInformation?.groupCompany : ""} type="text" className="form-control form-control-md" id="vendor-group-company" readOnly />
                          </div>
                          <div className="form-group col-sm-6 mb-4">
                            <label htmlFor="vendor-authorised-signatory" className="mb-2">Authorised Signatory</label>
                            <input value={data.rfqDetail.data && data.rfqDetail.data.length > 0 && data.rfqDetail.data[0].customerRfq ? data.rfqDetail.data[0].customerRfq?.contactInformation?.authorisedSignatory : ""} type="text" className="form-control form-control-md" id="vendor-authorised-signatory" readOnly />
                          </div>
                          <div className="form-group col-sm-6 mb-4">
                            <label htmlFor="vendor-annual-turnover" className="mb-2">Annual Turnover (in Cr INR)</label>
                            <input value={data.rfqDetail.data && data.rfqDetail.data.length > 0 && data.rfqDetail.data[0].customerRfq ? data.rfqDetail.data[0].customerRfq?.contactInformation?.annualTurnover : ""} type="number" className="form-control form-control-md" id="vendor-annual-turnover" readOnly />
                          </div>
                          <div className="form-group col-sm-6 mb-4">
                            <label htmlFor="vendor-employees-number" className="mb-2">No of Employees</label>
                            <input value={data.rfqDetail.data && data.rfqDetail.data.length > 0 && data.rfqDetail.data[0].customerRfq ? data.rfqDetail.data[0].customerRfq?.contactInformation?.noOfEmployees : ""} type="number" className="form-control form-control-md" id="vendor-employees-number" readOnly />
                          </div>
                          <div className="form-group col-sm-6 mb-4">
                            <label htmlFor="vendor-core-business" className="mb-2">Core Business</label>
                            <input value={data.rfqDetail.data && data.rfqDetail.data.length > 0 && data.rfqDetail.data[0].customerRfq ? data.rfqDetail.data[0].customerRfq?.contactInformation?.coreBusiness : ""} type="text" className="form-control form-control-md" id="vendor-core-business" readOnly />
                          </div>
                          <div className="form-group col-sm-6 mb-4">
                            <label htmlFor="vendor-certifications" className="mb-2">Certifications - </label>
                            <select className="form-control form-control-md" id="vendor-certifications" disabled>
                              <option selected="">{data.rfqDetail.data && data.rfqDetail.data.length > 0 && data.rfqDetail.data[0].customerRfq ? data.rfqDetail.data[0].customerRfq?.contactInformation?.certification.name : ""}</option>
                            </select>
                          </div>
                          <div className="form-group col-sm-6 mb-4">
                            <label htmlFor="vendor-registration" className="mb-2">Registrations - </label>
                            <select className="form-control form-control-md" id="vendor-registration" disabled>
                              <option selected="">{data.rfqDetail.data && data.rfqDetail.data.length > 0 && data.rfqDetail.data[0].customerRfq ? data.rfqDetail.data[0].customerRfq?.contactInformation?.registration.name : ""}</option>
                            </select>
                          </div>
                          <div className="form-group col-sm-6 mb-4">
                            <label htmlFor="vendor-contact-person" className="mb-2">Contact Person</label>
                            <input value={data.rfqDetail.data && data.rfqDetail.data.length > 0 && data.rfqDetail.data[0].customerRfq ? data.rfqDetail.data[0].customerRfq?.contactInformation?.contactPerson : ""} type="text" className="form-control form-control-md" id="vendor-contact-person" readOnly />
                          </div>
                          {/* <div className="form-group col-sm-6 mb-4">
                    <label htmlFor="vendor-title" className="mb-2">Title</label>
                    <input value={data.rfqDetail.data && data.rfqDetail.data.length>0 && data.rfqDetail.data[0].customerRfq ? data.rfqDetail.data[0].customerRfq?.contactInformation?.title : ""} type="text" className="form-control form-control-md" id="vendor-title" readOnly />
                  </div> */}
                          <div className="form-group col-sm-6 mb-4">
                            <label htmlFor="vendor-email-address" className="mb-2">Email Address</label>
                            <input value={data.rfqDetail.data && data.rfqDetail.data.length > 0 && data.rfqDetail.data[0].customerRfq ? data.rfqDetail.data[0].customerRfq?.contactInformation?.email : ""} type="email" className="form-control form-control-md" id="vendor-email-address" readOnly />
                          </div>
                          <div className="form-group col-sm-6 mb-4">
                            <label htmlFor="vendor-phone" className="mb-2">Phone</label>
                            <input value={data.rfqDetail.data && data.rfqDetail.data.length > 0 && data.rfqDetail.data[0].customerRfq ? data.rfqDetail.data[0].customerRfq?.contactInformation?.phone : ""} type="tel" className="form-control form-control-md" id="vendor-phone" readOnly />
                          </div>
                        </div>
                      </div>

                      <div className="col-12 py-3 px-0">
                        <h4 className="text-dark-blue">RFQ Reply to Warehousity</h4>
                      </div>

                      <div className="col-12 bg-deep-gray mb-5">
                        {/* <form className=""> */}
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
                                  {/* <td className="mw-250px font-weight-bold">
                            Considered / Not Considered
                          </td> */}
                                </tr>
                              </thead>
                              <tbody>

                                {values.manPowers && values.manPowers.length > 0 &&
                                  values.manPowers.map((man, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>
                                          <p className="m-0 pb-1">{man.manpowerType}</p>
                                        </td>
                                        <td>
                                          <Field readOnly name={`manPowers.${index}.type.name`} as="select" className="form-control custom-select bg-white px-4 common-select-deep-blue d-inline-block w-130px" id="manpower-type1" disabled>
                                            <option value="">Select</option>
                                            <option value="SHARED"> Shared</option>
                                            <option value="DEDICATED">Dedicated</option>
                                          </Field>
                                        </td>
                                        <td><Field readOnly name={`manPowers.${index}.quantity`} type="number" id="manpower-qty-input1" className="form-control bg-white px-4" /></td>
                                        <td><Field readOnly name={`manPowers.${index}.costUnit`} type="number" id="manpower-cost-input1" className="form-control bg-white px-4" /></td>
                                        <td><Field readOnly name={`manPowers.${index}.totalMonth`} type="number" id="manpower-months-input1" className="form-control bg-white px-4" /></td>
                                        <td>
                                          <Field readOnly name={`manPowers.${index}.remark`} type="text" className="form-control text-center bg-white my-1 px-4" id="manpower-remarks1" />
                                        </td>
                                        {/* <td>
                            <Field readOnly name={`manPowers.${index}.remark`} type="text" className="form-control text-center bg-white my-1 px-4" id="manpower-consider1"/>
                          </td> */}
                                      </tr>

                                    )
                                  })}

                              </tbody>

                            </table>
                          </div>
                        </div>
                        {/* </form> */}
                      </div>

                      <div className="col-12 bg-deep-gray mb-5">
                        {/* <form className=""> */}
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
                                  {/* <td className="mw-250px font-weight-bold">
                            Considered / Not Considered
                          </td> */}
                                </tr>
                              </thead>
                              <tbody>


                                {values.infrastructures && values.infrastructures.length > 0 &&
                                  values.infrastructures.map((man, index) => {
                                    return (

                                      <tr key={index}>
                                        <td>
                                          <p className="m-0 pb-1"> {man.infrastructureType} </p>
                                        </td>
                                        <td>
                                          <Field readOnly name={`infrastructures.${index}.type.name`} as="select" id="infrastructure-type1" className="form-control custom-select bg-white px-4 common-select-deep-blue d-inline-block w-130px" disabled>
                                            <option value="">Select</option>
                                            <option value="SHARED">Shared</option>
                                            <option value="DEDICATED">Dedicated</option>
                                          </Field>
                                        </td>
                                        <td><Field readOnly name={`infrastructures.${index}.quantity`} type="text" id="infrastructure-qty-input1" className="form-control bg-white px-4" /></td>
                                        <td><Field readOnly name={`infrastructures.${index}.costUnit`} type="text" id="infrastructure-cost-input1" className="form-control bg-white px-4" /></td>
                                        <td><Field readOnly name={`infrastructures.${index}.totalMonth`} type="text" id="infrastructure-months-input1" className="form-control bg-white px-4" /></td>
                                        <td><Field readOnly name={`infrastructures.${index}.remark`} type="text" className="form-control text-center bg-white my-1 px-4" id="infrastructure-remarks1" /></td>
                                        {/* <td><Field readOnly name={`infrastructures.${index}.remark`} type="text" className="form-control text-center bg-white my-1 px-4" id="infrastructure-consider1"/></td> */}
                                      </tr>

                                    )
                                  })}

                              </tbody>

                            </table>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 bg-deep-gray mb-5">
                        {/* <form className=""> */}
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
                                  {/* <td className="mw-250px font-weight-bold">
                            Considered / Not Considered
                          </td> */}
                                </tr>
                              </thead>
                              <tbody>


                                {values.runningCosts && values.runningCosts.length > 0 &&
                                  values.runningCosts.map((man, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>
                                          <p className="m-0 pb-1"> {man.runningCostType} </p>
                                        </td>
                                        <td>
                                          <Field readOnly name={`runningCosts.${index}.type.name`} as="select" id="runningcost-type1" className="form-control custom-select bg-white px-4 common-select-deep-blue d-inline-block w-130px" disabled>
                                            <option value="">Select</option>
                                            <option value="SHARED">Shared</option>
                                            <option value="DEDICATED">Dedicated</option>
                                          </Field>
                                        </td>
                                        <td><Field readOnly name={`runningCosts.${index}.quantity`} type="text" id="runningcost-qty-input1" className="form-control bg-white px-4" /></td>
                                        <td><Field readOnly name={`runningCosts.${index}.costUnit`} type="text" id="runningcost-cost-input1" className="form-control bg-white px-4" /></td>
                                        {/* <td><Field readOnly name={`runningCosts.${index}.amount`} type="text" id="runningcost-months-input1" className="form-control bg-white px-4"/></td> */}
                                        <td><Field readOnly name={`runningCosts.${index}.totalMonth`} type="text" className="form-control text-center bg-white my-1 px-4" id="runningcost-remarks1" /></td>
                                        <td><Field readOnly name={`runningCosts.${index}.remark`} type="text" className="form-control text-center bg-white my-1 px-4" id="runningcost-consider1" /></td>
                                      </tr>
                                    )
                                  })}


                              </tbody>

                            </table>
                          </div>
                        </div>
                        {/* </form> */}
                      </div>


                      <div className="col-12 bg-deep-gray mb-5">
                        <div className="row py-4">
                          <div className="col-sm-6 mb-2">
                            <label className="h6 py-3">Total Per unit Cost in INR</label>
                          </div>
                          <div className="col-sm-6 ml-0">
                            <div className="input-group">
                              <Field readOnly name={`adminTotalPerUnitCost`} id="" type="number" className="w-100 form-control form-control-md" />
                            </div>
                          </div>
                          <div className="col-lg-12 mb-2">
                            <h6>Remarks</h6>
                          </div>
                          <div className="row col-12 ml-0">
                            <div className="input-group">
                              <Field readOnly name={`remark`} id="" className="w-100 form-control form-control-lg" rows="3"></Field>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="row justify-content-start">
                          <div className="col-auto">
                            <button onClick={() => history.goBack()} type="button" className="btn btn-outline-secondary mr-3 my-2 toggle-class">Back</button>
                          </div>
                          {/* {data.rfqDetail.data && data.rfqDetail.data.length > 0 && data.rfqDetail.data[0].bookingRequest === false && */}
                            <div className="col-auto">
                              <button onClick={bookingConfirmation} type="button" className="btn btn-outline-secondary mr-3 my-2">Booking Request</button>
                            </div>
                          {/* } */}
                        </div>

                      </div>
                    </div>

                  </Form>
                </div>
              )
            }}
          />
        }

      </CustomerLayout>
    </Layout>
  );
}

export default WhsRFQDetails;

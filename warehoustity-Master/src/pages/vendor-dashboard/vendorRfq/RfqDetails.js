import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import VendorLayout from '../../../layout/VendorLayout';
import { responseRfq, vendorRequestRfqByIdAndType, rfq_By_Id, createVendorRFQ } from '../../../store/actions/vendor/rfqAction'
import { useSelector, useDispatch } from 'react-redux';
import FormSuccess from '../../../components/helper/FormSuccess';
import { useParams, useHistory } from 'react-router-dom';
import { CardLoader } from '../../../components/helper/CustomLoader';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    marginBottom: '5px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    padding: '15px'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));



const RfqDetails = () => {
  const history = useHistory()
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [rfqId, setRfqId] = useState(null);

  const data = useSelector((state) => state.VENDOR_RFQ_INFO);
  const { vRequestId } = useParams();

  useEffect(() => {

    if (data && data.rfqDetail.data && data.rfqDetail.data.customerRfq) {
      setRfqId(data.rfqDetail.data.customerRfq.id)
    }


  }, [data])

  useEffect(() => {
    dispatch(vendorRequestRfqByIdAndType(vRequestId, "manpowers"))
    return (() =>
      dispatch(rfq_By_Id([]))
    )
  }, [dispatch, vRequestId]);


  const [jsonData, setJsonData] = useState({
    "manPowers": [
      {
        "manpowerType": "WH Manager",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }, {
        "manpowerType": "Asst Manager",
        "type": {
          "name": "DEDICATED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }, {
        "manpowerType": "OB Executive+DEO",
        "type": {
          "name": "DEDICATED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      , {
        "manpowerType": "Dispatch Incharge",
        "type": {
          "name": "DEDICATED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      , {
        "manpowerType": "Inventory Incharge",
        "type": {
          "name": "DEDICATED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      , {
        "manpowerType": "Inventory Supervisor",
        "type": {
          "name": "DEDICATED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      , {
        "manpowerType": "Activity Supervisors",
        "type": {
          "name": "DEDICATED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      , {
        "manpowerType": "Labours",
        "type": {
          "name": "DEDICATED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      , {
        "manpowerType": "Security",
        "type": {
          "name": "DEDICATED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      , {
        "manpowerType": "House Keeping",
        "type": {
          "name": "DEDICATED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }

    ],
    "infrastructures": [
      {
        "infrastructureType": "MFD",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "infrastructureType": "Fire Extinguiser",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Office Setup",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "HPT Electric Voltas",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Hand Pallet Truck",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Picking Trolley",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Desktop Computer",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Office Printer",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Printer With Xerox, Fax and Scan facility",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Barcode printer",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "UPS",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Inverter",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Electric Stacker",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "AC",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "ForkLift Battery Operated",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Projector",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Weighting Machine",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Wooden Pallets",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Generator 20KVA",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Message Boards (Notice)",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "HD Selves For File and Record",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Lock and Key Almira",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Water Cooler",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Labels & Signage",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "infrastructureType": "Office and Security Fan",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Emergency Light with Battery",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "WMS Software",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Wire Mesh Cage",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "First Aid Kit",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Security Alarm",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Dock Levler",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Shelve Racks",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "CCTV",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "infrastructureType": "Internal Painting",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "infrastructureType": "Security & Safety Audit",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "infrastructureType": "Security & Safety Displays",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "infrastructureType": "Shelved Rack",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "infrastructureType": "Broadband Connection setup",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Vaccumm Cleaner",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Start Up",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
      ,
      {
        "infrastructureType": "Scanners",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "totalMonth": "",
        "remark": ""
      }
    ],
    "runningCosts": [
      {
        "runningCostType": "Rent",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "runningCostType": "Infrastructure",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "runningCostType": "Manpower",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "runningCostType": "Communication",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "runningCostType": "Utilities",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "runningCostType": "Staff Welfare",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "runningCostType": "Power",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "runningCostType": "Licenses",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "runningCostType": "House Keeping Consumables",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "runningCostType": "WMS ID",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "runningCostType": "Packaging Consumable",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "runningCostType": "Genset",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "runningCostType": "Genset",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "runningCostType": "Consumable(printing material)",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "runningCostType": "Broadband Connection",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      },
      {
        "runningCostType": "Pallets",
        "type": {
          "name": "SHARED"
        },
        "quantity": 0,
        "costUnit": "",
        "amount": "",
        "totalMonth": "",
        "remark": ""
      }

    ],
    "vendorTotalPerUnitCost": "",
    "remark": "",
  })


  useEffect(() => {
    if (data.rfqDetail && data.rfqDetail.data) {
      setJsonData(data.rfqDetail.data)
    }

  }, [data.rfqDetail])




  const handleChange = (panel, type) => (event, isExpanded) => {
    if (isExpanded) {

      dispatch(vendorRequestRfqByIdAndType(vRequestId, type))

    }

    setExpanded(isExpanded ? panel : false);

  };


  return (
    <VendorLayout>
      {
        data.rfqResponse.statusCode === 201 ?
          <FormSuccess onClick={() => dispatch(responseRfq([]))} message={data.rfqResponse.message} />
          : null
      }


      <Formik
        enableReinitialize={true}
        initialValues={jsonData}
        onSubmit={fields => {

          if (rfqId !== null && vRequestId) {
            fields["vendorRequestRfq"] = parseInt(vRequestId)

            dispatch(createVendorRFQ(fields, rfqId))
          }
        }}

        render={({ values, errors, status, onChange, touched }) => {

          return (
            <div className="w-100 d-block">
              <Form >
                <div className="content-admin px-1">

                  <div className="row align-items-center px-3 mx-0 bg-white">

                    <div className="col-12 py-3 px-0">
                      <h5 className="text-dark"><i onClick={() => history.goBack()} className="fas fa-chevron-left mr-3 cursorPointer"></i>RFQ Details</h5>
                    </div>

                    <div className="col-12 bg-deep-gray py-1 mb-1">

                      <div className="row pt-3">
                        <div className="col-12 px-0">
                          <div className="form-group form-inline mb-1 px-0">
                            <label htmlFor="inputPassword6" className="w-250px justify-content-start px-3">RFQ ID</label>
                            <div className="row mx-md-0 mx-sm-3 mx-0">
                              <div className="col-12 px-sm-3 px-0">
                                <input value={data.rfqDetail.data ? data.rfqDetail.data.customerRfq?.id : ""} type="text" id="inputPassword6" className="form-control form-control-sm d-inline-block form-control form-control-sm-sm w-160px mx-3" placeholder="DL-01379" readOnly />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 px-0">
                          <div className="row">
                            <div className="col-12">
                              <div className="row mx-0">
                                <div className="col-md-auto pl-0">
                                  <label htmlFor="staticEmail" className="mb-1 mt-2 w-250px justify-content-start px-3">City</label>
                                  <div className="form-group col-auto px-3 mb-3">
                                    <input
                                      value={data.rfqDetail.data && data.rfqDetail.data.customerRfq?.location !== null ? data.rfqDetail.data.customerRfq?.location.city.name : ""}
                                      className="form-control form-control-sm form-control form-control-sm-sm w-160px" disabled />
                                  </div>
                                </div>
                                <div className="col-md-auto pl-0">
                                  <label htmlFor="staticEmail" className="mb-1 mt-2 w-250px justify-content-start px-3">Area</label>
                                  <div className="form-group col-auto px-3 mb-3">
                                    <input
                                      value={data.rfqDetail.data && data.rfqDetail.data.customerRfq?.location !== null ? data.rfqDetail.data.customerRfq?.location.area.name : ""}
                                      className="form-control form-control-sm form-control form-control-sm-sm w-160px" disabled
                                    />
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 px-0">
                          <div className="form-group form-inline mb-2 px-0">
                            <label htmlFor="inputPassword6" className="w-250px justify-content-start px-3">WH Space Required</label>
                            <div className="row mx-md-0 mx-sm-3 mx-0">
                              <div className="col-12 px-sm-3 px-0">
                                <input value={data.rfqDetail.data ? data.rfqDetail.data.customerRfq?.warehouseSpaceRequired : ""} type="text" id="inputPassword6" className="form-control form-control-sm d-inline-block form-control form-control-sm-sm w-160px mx-3" placeholder="Sqft" readOnly />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 px-0">
                          <div className="form-group form-inline mb-4 px-0">
                            <label htmlFor="inputPassword6" className="w-250px justify-content-start px-3">WH Space Required</label>
                            <div className="row mx-md-0 mx-sm-3 mx-0">
                              <div className="col-12 px-sm-3 px-0">
                                <input value={data.rfqDetail.data ? data.rfqDetail.data?.warehouse?.warehouseName : ""} type="text" id="inputPassword6" className="form-control form-control-sm d-inline-block form-control form-control-sm-sm w-160px mx-3" placeholder="Sqft" readOnly />
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>


                    <div className="col-12 px-0">
                      <h4 className="text-dark-blue">RFQ From Warehousity</h4>
                    </div>

                    <div className={`${classes.root} vendorAccordianStyle`}>

                      <Accordion expanded={expanded === 'panel'}
                        onChange={handleChange('panel', 'manpowers')}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography className={classes.heading}>  <span className="accord-heading">Man Powers</span></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {data.isLoading ? <CardLoader loaderCard="loaderCard" /> :

                            <div className="col-12 bg-deep-gray">

                              <div className="row">
                                <div className="col-12 px-0 table-gray-admin table-responsive">
                                  <table className="table">
                                    <thead>
                                      <tr>
                                        <td className="col font-weight-bold">
                                          Manpower :
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
                                              {/* <td>
                              <Field name={`manPowers.${index}.type.name`} as="select" className="form-control form-control-sm custom-select bg-white px-4 common-select-deep-blue d-inline-block w-130px" id="manpower-type1" disabled>
                                <option value="">Select</option>
                                <option value="SHARED"> SHARED</option>
                                <option value="DEDICATED">DEDICATED</option>
                              </Field>
                            </td> */}
                                              <td><Field name={`manPowers.${index}.quantity`} type="number" id="manpower-qty-input1" className="form-control form-control-sm bg-white px-4" disabled /></td>
                                              <td><Field name={`manPowers.${index}.costUnit`} type="number" id="manpower-cost-input1" className="form-control form-control-sm bg-white px-4" disabled /></td>
                                              <td><Field name={`manPowers.${index}.totalMonth`} type="number" id="manpower-months-input1" className="form-control form-control-sm bg-white px-4" disabled /></td>
                                              {/* <td>
                              <Field name={`manPowers.${index}.remark`} type="text" className="form-control form-control-sm text-center bg-white my-1 px-4" id="manpower-remarks1" disabled />
                            </td> */}
                                              {/* <td>
                              <Field name={`manPowers.${index}.remark`} type="text" className="form-control form-control-sm text-center bg-white my-1 px-4" id="manpower-consider1" disabled />
                            </td> */}
                                            </tr>

                                          )
                                        })}

                                    </tbody>

                                  </table>
                                </div>
                              </div>

                            </div>
                          }

                        </AccordionDetails>
                      </Accordion>



                      <Accordion expanded={expanded === 'panel2'}
                        onChange={handleChange('panel2', 'infrastructures')}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography className={classes.heading}>  <span className="accord-heading">Infrastructures</span></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {data.isLoading ? <CardLoader loaderCard="loaderCard" /> :
                            <div className="col-12 bg-deep-gray">
                              <div className="row">
                                <div className="col-12 px-0 table-gray-admin table-responsive">
                                  <table className="table">
                                    <thead>
                                      <tr>
                                        <td className="col mw-150px font-weight-bold">
                                          Infrastructure :
                                        </td>
                                        {/* <td className="col font-weight-bold">
                            Type
                          </td>  */}
                                        <td className="w-200px mw-200px font-weight-bold">
                                          Qty
                                        </td>
                                        <td className="mw-250px font-weight-bold">
                                          Cost /Unit
                                        </td>
                                        <td className="mw-250px font-weight-bold">
                                          Total/Month
                                        </td>
                                        {/* <td className="mw-250px font-weight-bold">
                            Remarks
                          </td> */}
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
                                              {/* <td>
                            <Field name={`infrastructures.${index}.type.name`} as="select" id="infrastructure-type1" className="form-control form-control-sm custom-select bg-white px-4 common-select-deep-blue d-inline-block w-130px" disabled >
                              <option value="">Select</option>
                              <option value="SHARED">SHARED</option>
                              <option value="DEDICATED">DEDICATED</option>
                            </Field>
                          </td> */}
                                              <td><Field name={`infrastructures.${index}.quantity`} type="text" id="infrastructure-qty-input1" className="form-control form-control-sm bg-white px-4" disabled /></td>
                                              <td><Field name={`infrastructures.${index}.costUnit`} type="text" id="infrastructure-cost-input1" className="form-control form-control-sm bg-white px-4" disabled /></td>
                                              <td><Field name={`infrastructures.${index}.totalMonth`} type="text" id="infrastructure-months-input1" className="form-control form-control-sm bg-white px-4" disabled /></td>
                                              {/* <td><Field name={`infrastructures.${index}.remark`} type="text" className="form-control form-control-sm text-center bg-white my-1 px-4" id="infrastructure-remarks1" disabled /></td> */}
                                              {/* <td><Field name={`infrastructures.${index}.remark`} type="text" className="form-control form-control-sm text-center bg-white my-1 px-4" id="infrastructure-consider1" disabled /></td> */}
                                            </tr>

                                          )
                                        })}


                                    </tbody>

                                  </table>
                                </div>
                              </div>

                            </div>
                          }
                        </AccordionDetails>
                      </Accordion>


                      <Accordion expanded={expanded === 'panel3'}
                        onChange={handleChange('panel3', 'runningcosts')}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography className={classes.heading}>  <span className="accord-heading">Running Cost</span></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {data.isLoading ? <CardLoader loaderCard="loaderCard" /> :
                            <div className="col-12 bg-deep-gray">

                              <div className="row">
                                <div className="col-12 px-0 table-gray-admin table-responsive">
                                  <table className="table">
                                    <thead>
                                      <tr>
                                        <td className="col mw-150px font-weight-bold">
                                          Running Cost :
                                        </td>
                                        {/* <td className="col font-weight-bold">
                            Type
                          </td>  */}
                                        <td className="w-200px mw-200px font-weight-bold">
                                          Qty
                                        </td>
                                        <td className="mw-250px font-weight-bold">
                                          Cost /Unit
                                        </td>
                                        <td className="mw-250px font-weight-bold">
                                          Total/Month
                                        </td>
                                        {/* <td className="mw-250px font-weight-bold">
                            Remarks
                          </td> */}
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
                                              {/* <td>
                            <Field name={`runningCosts.${index}.type.name`} as="select" id="runningcost-type1" className="form-control form-control-sm custom-select bg-white px-4 common-select-deep-blue d-inline-block w-130px" disabled>
                              <option value="">Select</option>
                              <option value="SHARED">SHARED</option>
                              <option value="DEDICATED">DEDICATED</option>
                            </Field>
                          </td> */}
                                              <td><Field name={`runningCosts.${index}.quantity`} type="text" id="runningcost-qty-input1" className="form-control form-control-sm bg-white px-4" disabled /></td>
                                              <td><Field name={`runningCosts.${index}.costUnit`} type="text" id="runningcost-cost-input1" className="form-control form-control-sm bg-white px-4" disabled /></td>
                                              <td><Field name={`runningCosts.${index}.amount`} type="text" id="runningcost-months-input1" className="form-control form-control-sm bg-white px-4" disabled /></td>
                                              {/* <td><Field name={`runningCosts.${index}.totalMonth`} type="text" className="form-control form-control-sm text-center bg-white my-1 px-4" id="runningcost-remarks1" disabled /></td> */}
                                              {/* <td><Field name={`runningCosts.${index}.remark`} type="text" className="form-control form-control-sm text-center bg-white my-1 px-4" id="runningcost-consider1" disabled /></td> */}
                                            </tr>

                                          )
                                        })}

                                    </tbody>

                                  </table>
                                </div>
                              </div>

                            </div>
                          }
                        </AccordionDetails>
                      </Accordion>


                      <Accordion expanded={expanded === 'panel4'}
                        onChange={handleChange('panel4', 'monthlycosts')}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography className={classes.heading}>  <span className="accord-heading">Monthly Cost</span></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {data.isLoading ? <CardLoader loaderCard="loaderCard" /> :
                            <div className="col-12 table-gray-admin table-responsive">
                              <table className="table">
                                {/* <thead> 
                        <tr>
                          <th colSpan="2"></th>
                          <th></th>
                        </tr>
                      </thead> */}
                                <tbody>
                                  <tr>
                                    <td className="col mw-150px font-weight-bold">
                                      Monthly Cost
                                    </td>
                                    <td className="w-200px mw-200px font-weight-bold">
                                      Year I
                                    </td>
                                    {/* <td className="mw-250px font-weight-bold">
                            Remarks
                          </td> */}
                                  </tr>





                                  {values.monthlyCosts && values.monthlyCosts.length > 0 &&
                                    values.monthlyCosts.map((r, index) => {

                                      return (

                                        <tr key={index}>
                                          <td>
                                            <p className="m-0 pb-1">{r.monthlyCostType} </p>
                                          </td>
                                          <td>
                                            <Field name={`monthlyCosts.${index}.year`} type="text" id="monthlycost-year-input1" className={`form-control form-control-sm bg-white px-4`} disabled />

                                          </td>
                                          {/* <td>
                                      <input type="text" className="form-control form-control-sm text-center bg-white my-1 px-4" id="monthlycost-year-remarks1" disabled/>
                                    </td> */}
                                        </tr>

                                      )
                                    })}

                                </tbody>

                              </table>
                            </div>
                          }
                        </AccordionDetails>
                      </Accordion>

                    </div>
                  </div>

                  <div className="col-12 mt-2">
                    <div className="row justify-content-start">
                      <div className="col-auto">
                        <button onClick={() => history.goBack()} type="button" className="btn btn-deep-primary mb-3 px-4 add-className remove-className" >Back</button>
                      </div>
                    </div>
                  </div>


                </div>

              </Form>
            </div>
          )
        }}
      />

    </VendorLayout>
  );
}

export default RfqDetails;

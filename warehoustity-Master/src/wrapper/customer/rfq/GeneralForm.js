import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, getIn } from "formik";
import * as Yup from "yup";
import {
  updateGeneralRFQ,
  responseRfq,
} from "../../../store/actions/customer/rfqAction";
import { useSelector, useDispatch } from "react-redux";
import FormSuccess from "../../../components/helper/FormSuccess";
import { readableDate } from "../../../components/validation";
import { documentUpload } from "../../../components/utils";
import Spinner from "react-bootstrap/Spinner";
import { forDescriptionAlphaNumericAllow } from "../../../components/validation";
import StateList from "../../../json/pincode.json";

const GeneralForm = ({ isView, rfqid }) => {
  const [fileName, setFileName] = useState(null);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.CUSTOMER_RFQ_INFO);
  const [imgUrl, setImgUrl] = useState(null);

  const fileUpload = async (e) => {
    setFileName(e.target.files[0].name);
    let formData = new FormData();

    formData.append("file", e.target.files[0]);
    formData.append("documentName", "dangerous_goods");
    let urlData = await documentUpload(formData);
    // console.log("urlData", urlData);
    setImgUrl(urlData);
  };
    
     
   
     
  const [generalForm, setGeneralForm] = useState({
    industrySector: {
      name: "",
    },
    productType: {
      name: "",
    },
    warehouseusesType:{
      name :''
    },
    warehouseCategory: {
      category: {
        name: "",
      },
      bounded: {
        name: "",
      },
      other: "",
    },

    dangerousGoods: "",
    "availabilityRfq": "",
    "unitStore": "",
    "handleUnit":"",
    "invoiceOUT": "",
    "remark":"",
    warehouseLocation: {
      cityAndArea: {
        name: "",
      },
      other: "",
    },
    workingHour: {
      startTime: 14,
      endTime: 15,
      week: "FRIDAY",
      other: "",
    },
    contractPeriod: {
      contract: {
        name: "", 
      },
      startDate : "",
      endDate : "",
      others: "other",
    },
    plannedGoLiveDate: "",
  });

  // console.log("generalForm=======>>>" , generalForm)

  useEffect(() => {
    if (data.rfqInitialDetail?.general) { 
      setGeneralForm({
        ...data.rfqInitialDetail.general,
        plannedGoLiveDate: readableDate(
          data.rfqInitialDetail.general.plannedGoLiveDate
        ),
      });
    }

    if (data.rfqFirstForm?.general) { 
      setGeneralForm({
        ...data.rfqFirstForm.general,
        plannedGoLiveDate: readableDate(
          data.rfqFirstForm.general.plannedGoLiveDate
        ),
      });
    }

    if (data.rfqFirstForm?.general) { 
      setGeneralForm({
        ...data.rfqFirstForm.general,
        plannedGoLiveDate: readableDate(
          data.rfqFirstForm.general.plannedGoLiveDate
        ),
        contractPeriod : {
          contract: {
            name: "", 
          },
          others: "other",
          startDate : readableDate( data.rfqFirstForm.general.contractPeriod?.startDate),
          endDate : readableDate( data.rfqFirstForm.general.contractPeriod?.endDate)
        },
        
      });
    }
  }, [data]);

  let generalSchema = Yup.object().shape({
    industrySector: Yup.lazy(() => {
      return Yup.object().shape({
        name: Yup.string().required("Required"),
      });
    }),

    productType: Yup.lazy(() => {
      return Yup.object().shape({
        name: Yup.string().required("Required"),
      });
    }),

    // warehouseusesType :Yup.lazy(() => {
    //   return Yup.object().shape({
    //     name: Yup.string().required("Required"),
    //   });
    // }),

    warehouseCategory: Yup.lazy(() => {
      return Yup.object().shape({
        category: Yup.lazy(() => {
          return Yup.object().shape({
            name: Yup.string().required("Required"),
          });
        }),
        // bounded: Yup.lazy(() => {
        //   return Yup.object().shape({
        //     name: Yup.string().required("Required"),
        //   });
        // }),
      });
    }),

    contractPeriod: Yup.lazy(() => {
      return Yup.object().shape({
        // others: Yup.string().required('Required').max(100, 'Must be 100 character'),
        contract: Yup.lazy(() => {
          return Yup.object().shape({
            // name: Yup.string().required("Required"),
            // startDate: Yup.string().required("Required"),
            // endDate: Yup.string().required("Required"),
          });
        }),
      });
    }),

    // warehouseLocation: Yup.lazy(() => {
    //   return Yup.object().shape({
    //     other: Yup.string()
    //       .required("Required")
    //       .max(100, "Must be 100 character"),
    //     cityAndArea: Yup.lazy(() => {
    //       return Yup.object().shape({
    //         name: Yup.string().required("Required"),
    //       });
    //     }),
    //   });
    // }),

    // workingHour: Yup.lazy(() => {
    //   return Yup.object().shape({
    //     startTime: Yup.number().required("Required"),
    //     endTime: Yup.number()
    //       .required("Required")
    //       .moreThan(Yup.ref("startTime"), `End Time should be > Start Time`),
    //   });
    // }),

    plannedGoLiveDate: Yup.lazy(() => {
      return Yup.string().required("Required");
    }),
  });

  // Location

  var stateArr = new Set();
  StateList.map((state) => {
    stateArr.add(state.stateName);
    return state;
  });

  const options = Array.from(stateArr).map((stateObj, index) => {
    return { value: index, label: stateObj };
  });

  const [optioncity, setoptioncity] = useState([]);

  const handleChange5550 = (event) => {
    setoptioncity([]);
    let stateObject = StateList.filter(
      (val) => val.stateName === event.target.value
    );

    var districtArr = new Set();
    stateObject.map((district) => {
      districtArr.add(district.districtName);
      return district;
    });

    let options = Array.from(districtArr).map((stateObj, index) => {
      return { value: index, label: stateObj };
    });

    setoptioncity(options);
  };

  return (
    <>
      {data.rfqResponse.statusCode === 200 ||
        data.rfqResponse.statusCode === 201 ? (
        <FormSuccess
          onClick={() => dispatch(responseRfq([]))}
          message={data.rfqResponse.message}
        />
      ) : null}
   
      <Formik
        enableReinitialize={true}
        initialValues={generalForm}
        validationSchema={generalSchema}
        // debugger
        onSubmit={(fields) => { 
          console.log("mmmmm",fields)
          if (rfqid) {
            if (imgUrl && imgUrl.url) {
              fields["dangerousGoods"] = fileName;
            }

            fields["customerRfq"] = parseInt(rfqid);
            // console.log("submit---->>>" , fields)

            dispatch(updateGeneralRFQ(fields, data?.rfqFirstForm?.warehouses));
            // dispatch(updateGeneralRFQ(fields));
          }
          console.log("submit");
        }}
        render={({ values, errors, status, onChange, touched }) => (
          <Form>
            <div className="row pt-2">
              <div className="form-group col-sm-6 mb-1">
                <label htmlFor="staticEmail" className="mb-1">
                  Select Industry <span className="text-danger h6">*</span>
                </label>
                <Field
                  name={`industrySector.name`}
                  as="select"
                  className={
                    `form-control form-control-md custom-select` +
                    (getIn(errors, "industrySector.name") &&
                      getIn(touched, "industrySector.name")
                      ? " is-invalid"
                      : "")
                  }
                  disabled={isView}
                >
                  <option>Select</option>
                  <option value="retail">Retail</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Hi-tech">Hi-tech</option>
                  <option value="Chemicals">Chemicals</option>
                  <option value="Audio, Vidoe, Telecom">
                    Audio, Vidoe, Telecom
                  </option>
                  <option value="Engineering">Engineering</option>
                  <option value="E-Commerce">E-Commerce</option>
                  <option value="Pharma">Pharma</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Public Sector">Public Sector</option>
                  <option value="others, pls specify">
                    others, pls specify
                  </option>
                </Field>
                <ErrorMessage
                  name={`industrySector.name`}
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group col-sm-6 mb-1">
                <label htmlFor="staticEmail" className="mb-1">
                  Select Product <span className="text-danger h6">*</span>
                </label>
                <Field
                  name={`productType.name`}
                  as="select"
                  className={
                    `form-control form-control-md custom-select` +
                    (getIn(errors, "productType.name") &&
                      getIn(touched, "productType.name")
                      ? " is-invalid"
                      : "")
                  }
                  disabled={isView}
                >
                  <option>Select</option>
                  <option value="finish goods">finish goods</option>
                  <option>raw materials</option>
                  <option>spare part</option>
                </Field>
                <ErrorMessage
                  name={`productType.name`}
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group col-lg-6 col-sm-6 mb-sm-6">
                <label htmlFor="staticEmail" className="mb-1">
                  Select Warehouse <span className="text-danger h6">*</span>
                </label>
                <Field
                  name="warehouseCategory.category.name"
                  as="select"
                  className={
                    `form-control form-control-md custom-select` +
                    (getIn(errors, "warehouseCategory.category.name") &&
                      getIn(touched, "warehouseCategory.category.name")
                      ? " is-invalid"
                      : "")
                  }
                  disabled={isView}
                >
                  <option>Select</option>
                  <option value="General">General</option>
                  <option value="Custom Bonded">Custom Bonded</option>
                  <option value="Temperature Controlled">
                    Temperature Controlled
                  </option>
                </Field>
                <ErrorMessage
                  name={`warehouseCategory.category.name`}
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group col-sm-6 mb-1">
                <label htmlFor="staticEmail" className="mb-1">
                 Warehouse Usage Type<span className="text-danger h6">*</span>
                </label>
                <Field
                  name={`warehouseusesType.name`}
                  as="select"
                  className={
                    `form-control form-control-md custom-select` +
                    (getIn(errors, "warehouseusesType.name") &&
                      getIn(touched, "warehouseusesType.name")
                      ? " is-invalid"
                      : "")
                  }
                  disabled={isView}
                >
                  <option>Select</option>
                  <option value="dedicated">Dedicated</option>
                  <option value="shared">Shared</option>
                  <option value="transit hub">Transit Hub</option> 
                  <option value="others area, pls specify">
                    others ares, pls specify 
                  </option>
                </Field>
                <ErrorMessage
                  name={`warehouseusesType.name`}
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              {/* <div className="form-group col-lg-4 col-sm-4 mb-sm-4 pt-sm-4 ">
                <Field
                  name="warehouseCategory.bounded.name"
                  as="select"
                  className={
                    `form-control form-control-md mt-sm-1 custom-select` +
                    (getIn(errors, "warehouseCategory.bounded.name") &&
                      getIn(touched, "warehouseCategory.bounded.name")
                      ? " is-invalid"
                      : "")
                  }
                  disabled={isView}
                >
                  <option>Select</option>
                  <option value="inFTWZ">in FTWZ</option>
                  <option value="in BLP">in BLP</option>
                  <option value="Other">Other</option>
                </Field>
                <ErrorMessage
                  name={`warehouseCategory.bounded.name`}
                  component="div"
                  className="invalid-feedback"
                />
              </div> */}

              <div className="col-12 mb-md-4 mb-5 pt-md-1 ">
                <div className="custom-file form-group form-inline d-flex">
                  <input
                    onChange={fileUpload}
                    type="file"
                    id="custom-file-upload-input20"
                    className="custom-file-input"
                    hidden
                    disabled={isView}
                  />
                  <span
                    id="custom-file-name"
                    className="d-block custom-file-name px-0 mr-3 mb-1"
                  >
                    Dangerous Goods? If so, please specify
                  </span>
                  <div>
                    <label
                      className="custom-file-upload-label btn-deep-primary btn text-nowrap"
                      htmlFor="custom-file-upload-input20"
                    >
                      Attach MSDS
                    </label>
                  </div>
                  <span>{fileName}</span>
                </div>
              </div>

              {/* <div className="form-group col-lg-4 col-sm-4 mb-1 ">
                <select
                  onChange={(e) => {
                    handleChange5550(e);
                    // setFieldValue("state",e.target.value)
                  }}
                  name="state"
                  //  onChange={formHandleChange}
                  className="form-control form-control-md custom-select"
                  readOnly={isView}
                >
                  <option value="">Select State</option>
                  {options && options.length > 0
                    ? options.map((value, index) => {
                      return (
                        <option value={value.label}>{value.label}</option>
                      );
                    })
                    : null}
                </select>
              </div> */}
              
              <div className="form-group col-lg-4 col-sm-4 mb-1 ">
                <Field
                  name="warehouseLocation.cityAndArea.name"
                  as="select"
                  className={
                    `form-control form-control-md mt-sm-1 custom-select` +
                    (getIn(errors, "warehouseLocation.cityAndArea.name") &&
                      getIn(touched, "warehouseLocation.cityAndArea.name")
                      ? " is-invalid"
                      : "")
                  }
                  disabled={isView}
                >
                  <option value="">Select city</option>
                  {optioncity && optioncity.length > 0
                    ? optioncity.map((value, index) => {
                      return <option>{value.label}</option>;
                    })
                    : null}
                    <option value="Delhi">Delhi</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Kolkata">Kolkata</option>
                      <option value="Lucknow">Lucknow</option>
                      <option value="Gurugram">Gurugram</option>
                      <option value="Noida">Noida</option>
                </Field>

                <ErrorMessage
                  name={`warehouseLocation.cityAndArea.name`}
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group col-lg-4 col-sm-4 mb-1">
                <Field
                  name="warehouseLocation.other"
                  onKeyPress={(e) => forDescriptionAlphaNumericAllow(e)}
                  type="text"
                  className={
                    `form-control form-control-md mt-sm-1` +
                    (getIn(errors, "warehouseLocation.other") &&
                      getIn(touched, "warehouseLocation.other")
                      ? " is-invalid"
                      : "")
                  }
                  placeholder="Other area, please specify"
                  disabled={isView}
                />
                <ErrorMessage
                  name={`warehouseLocation.other`}
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              
              {/* <div className="form-group col-lg-4 col-sm-4 mb-1 "></div> */}
              <div className="form-group col-md-auto mb-1 d-inline">
                <label htmlFor="staticEmail" className="mb-1">
                  Required working hour :
                </label>
                <div className="row">
                  <div className="col-sm-auto">
                    <Field
                      name="workingHour.startTime"
                      as="select"
                      className={
                        `form-control form-control-md` +
                        (getIn(errors, "workingHour.startTime") &&
                        getIn(touched, "workingHour.startTime")
                          ? " is-invalid"
                          : "")
                      }
                      disabled={isView}
                    >
                      <option value="">Select</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                      <option value={9}>9</option>
                      <option value={10}>10</option>
                      <option value={11}>11</option>
                      <option value={12}>12</option>
                      <option value={13}>13</option>
                      <option value={14}>14</option>
                      <option value={15}>15</option>
                      <option value={16}>16</option>
                      <option value={17}>17</option>
                      <option value={18}>18</option>
                      <option value={19}>19</option>
                    </Field>
                    <ErrorMessage
                      name={`workingHour.startTime`}
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="col-sm-auto py-2 px-1 text-center">To</div>
                  <div className="col-sm-auto">
                    <Field
                      name={`workingHour.endTime`}
                      as="select"
                      className={
                        `form-control form-control-md` +
                        (getIn(errors, "workingHour.endTime") &&
                        getIn(touched, "workingHour.endTime")
                          ? " is-invalid"
                          : "")
                      }
                      disabled={isView}
                    >
                      <option value="">Select</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                      <option value={9}>9</option>
                      <option value={10}>10</option>
                      <option value={11}>11</option>
                      <option value={12}>12</option>
                      <option value={13}>13</option>
                      <option value={14}>14</option>
                      <option value={15}>15</option>
                      <option value={16}>16</option>
                      <option value={17}>17</option>
                      <option value={18}>18</option>
                      <option value={19}>19</option>
                    </Field>
                    <ErrorMessage
                      name={`workingHour.endTime`}
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group col-md-auto mb-1 pt-md-4">
                <div className="row">
                  <div className="col-sm-auto">
                    <Field
                      name="workingHour.week"
                      as="select"
                      className="form-control form-control-md mt-md-1"
                      
                    >
                      <option value="MONDAY">Monday</option>
                      <option value="TUESDAY">Tuesday</option>
                      <option value="WEDNESDAY">Wednesday</option>
                      <option value="THURSDAY">Thursday</option>
                      <option value="FRIDAY">Friday</option>
                      <option value="SATURDAY">Saturday</option>
                      <option value="SUNDAY">Sunday</option>
                    </Field>
                  </div>
                  <div className="col-sm-auto py-2 mt-1 px-1 text-center">
                    To
                  </div>
                  <div className="col-sm-auto">
                    <Field
                      name="workingHour.other"
                      as="select"
                      className="form-control form-control-md mt-md-1"
                      disabled={isView}
                    >
                      <option value="MONDAY">Monday</option>
                      <option value="TUESDAY">Tuesday</option>
                      <option value="WEDNESDAY">Wednesday</option>
                      <option value="THURSDAY">Thursday</option>
                      <option value="FRIDAY">Friday</option>
                      <option value="SATURDAY">Saturday</option>
                      <option value="SUNDAY">Sunday</option>
                    </Field>
                  </div>
                </div>
              </div>

              <div className="form-group col-lg-12 col-sm-12 mb-1 d-flex justify-content-between">
              <label htmlFor="staticEmail" className="mt-4 ">
                  contract period? 
                  {/* <span className="text-danger h6">*</span> */}
                  contract period?<span className="text-danger h6">*</span>
                </label>
                <div className="col-lg-4 col-sm-4">
                
                <span>Start Date</span>
                <Field
                  name="contractPeriod.startDate"
                  type="date"
                  className={
                    `form-control form-control-md` +
                    (getIn(errors, "contractPeriod.startDate") &&
                      getIn(touched, "contractPeriod.startDate")
                      ? " is-invalid"
                      : "")
                  }
                  disabled={isView}
                  max={"9999-12-31"}
                  min={readableDate(new Date())}
                />
                {/* <Field
                  name="contractPeriod.contract.name"
                  as="select"
                  className={
                    `form-control form-control-md` +
                    (getIn(errors, "contractPeriod.contract.name") &&
                      getIn(touched, "contractPeriod.contract.name")
                      ? " is-invalid"
                      : "")
                  }
                  disabled={isView}
                >
                  <option>Select</option>
                  <option value="1year">1 year</option>
                  <option value="2year">2 years</option>
                  <option value="3year">3 years</option>
                </Field> */}
                <ErrorMessage
                  name={`contractPeriod.startDate`}
                  component="div"
                  className="invalid-feedback"
                />
                </div>
                <div className="col-lg-4 col-sm-4">
                {/* <label htmlFor="staticEmail" className="mb-1">
                 <span className="text-danger h6"></span>
                </label> */}
                <span>End Date</span>
                <Field
                  name="contractPeriod.endDate"
                  type="date"
                  className={
                    `form-control form-control-md` +
                    (getIn(errors, "contractPeriod.endDate") &&
                      getIn(touched, "contractPeriod.endDate")
                      ? " is-invalid"
                      : "")
                  }
                  disabled={isView}
                  max={"9999-12-31"}
                  min={readableDate(new Date())}
                />
                {/* <span>
                  {
                  new Date(values.contractPeriod.contract.endDate).getMonth() -
                  new Date(values.contractPeriod.contract.startDate)?.getMonth() +
    12 * (new Date(values.contractPeriod.contract.endDate)?.getFullYear() - new Date(values.contractPeriod.contract.startDate)?.getFullYear())
    
    }
                </span> */}
                 <ErrorMessage
                  name={`contractPeriod.contract.endDate`}
                  component="div"
                  className="invalid-feedback"
                />
                {/* <Field
                  name="contractPeriod.contract.name"
                  as="select"
                  className={
                    `form-control form-control-md` +
                    (getIn(errors, "contractPeriod.contract.name") &&
                      getIn(touched, "contractPeriod.contract.name")
                      ? " is-invalid"
                      : "")
                  }
                  disabled={isView}
                >
                  <option>Select</option>
                  <option value="1year">1 year</option>
                  <option value="2year">2 years</option>
                  <option value="3year">3 years</option>
                </Field> */}
                <ErrorMessage
                  name={`contractPeriod.contract.name`}
                  component="div"
                  className="invalid-feedback"
                />
                </div>
               
              </div>
              
              <div className="form-group col-lg-4 col-sm-4 mb-1 ">
        {/* <Field name="contractPeriod.others"  type="text" className={`form-control form-control-md mt-sm-1`+ (getIn(errors, 'contractPeriod.others') && getIn(touched, 'contractPeriod.others') ? ' is-invalid' : '')} placeholder="Other area, please specify" /> */}
        <ErrorMessage name={`contractPeriod.others`} component="div" className="invalid-feedback" />
      </div>
      <div className="form-group col-lg-12 col-sm-12 mb-1  d-flex">
              
                
                <label htmlFor="staticEmail" className="mt-3">
                  planned go-live date?
                </label>
                <div className="form-group col-lg-5 col-md-6 mb-1 mt-2 d-block">
                  <div className="ml-200">
                <Field
                  name="plannedGoLiveDate"
                  type="date"
                  className={
                    `form-control form-control-sm col-lg-8` +
                    (errors.plannedGoLiveDate && touched.plannedGoLiveDate
                      ? " is-invalid"
                      : "")
                  }
                  disabled={isView}
                  max={"9999-12-31"}
                  min={readableDate(new Date())}
                />
                </div>
                <ErrorMessage
                  name={`plannedGoLiveDate`}
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              </div>

              <div className={`col-12 mt-3 ${isView ? "d-none" : ""}`}>
                <div className="row justify-content-end">
                  <div className="col-auto">
                    <button
                      type="submit"
                      disabled={data.isLoading}
                      className="btn btn-deep-primary mb-3 add-className remove-className"
                    >
                      Save
                      {data.isLoading ? <Spinner animation="border" /> : null}
                    </button>
                  </div>
                </div>
              </div>
            
            </div>
          </Form>
        )}
      />
    </>
  );
};

export default GeneralForm;

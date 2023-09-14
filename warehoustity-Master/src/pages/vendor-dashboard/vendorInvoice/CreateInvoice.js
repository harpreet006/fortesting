import React, { useEffect, useState } from "react";
import VendorLayout from "../../../layout/VendorLayout";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { documentUpload } from "../../../components/utils";
import {
  onlyNumberAllow,
  onlyAlphaNumericAllow,
} from "../../../components/validation";

import {
  invoiceByuserType,
  createInvoice,
  responseInvoice,
} from "../../../store/actions/customer/invoiceAction";
import { getAllBooking } from "../../../store/actions/customer/bookingAction";
import Spinner from "react-bootstrap/Spinner";
import { AiOutlineDownload } from "react-icons/ai";
import FormSuccess from "../../../components/helper/FormSuccess";
import ExpandButton from "../../../components/helper/ExpandButton";
import { readableDate } from "../../../components/validation";

const CreateInvoice = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const read = useSelector((state) => state.SIDEMENU_INFO.read_only);
  const data = useSelector((state) => state.INVOICEINFO);
  const booking = useSelector((state) => state.BOOKINGINFO);
  const [wh, setWh] = useState(null);

  let myStyle={"marginTop":"6em!important"}
  let jsonData = {
    state: "",
    city: "",
    area: "",
    warehouse: "",
    booking: "",
    name: "",
    email: "",
    invoiceDate: "",
    dueDate: "",
    contactNumber: "",
    price: "",
    gst: "",
    sgst: "",
    cgst: "",
    userType: "vendor",
    invoiceCreatedBy: "Vendor",
    billDescription: "",
    invoiceNumber: "",
    isGst: "False",
    gstCalculation: "",
    creditDays: "",
    paymentTerms: "",
    remarks: "",
    warehouseName: "",
  };

  // File Upload
  // eslint-disable-next-line
  const [res, setRes] = useState(null);
  const [fileError, setFileError] = useState(null);
  const uploadDocs = async (e) => {
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    let urlData = await documentUpload(formData);
    setRes(urlData);
  };

  // Validation Schema
  const invoiceSchema = Yup.object().shape({
    // area: Yup.string().required("Required"),
    // warehouse: Yup.string().required("Required"),
    booking: Yup.string().required("Required"),
    // name: Yup.string().required("Required"),
    // email: Yup.string().required("Required"),
    // contactNumber: Yup.string()
    //   .required("Required")
    //   .max(10, "Contact Number Must be 10 Digit"),
    invoiceDate: Yup.string().required("Required"),
    dueDate: Yup.string().required("Required"),
    price: Yup.string().required("Required"),
    // gst: Yup.string().required("Required"),
    // documentFile: Yup.string().required('Required'),
    billDescription: Yup.string().required("Required"),
    invoiceNumber: Yup.string().required("Required"),
    // gstCalculation: Yup.string().required("Required"),
    creditDays: Yup.string().required("Required"),
    paymentTerms: Yup.string().required("Required"),
  });

  useEffect(() => {
    dispatch(invoiceByuserType("vendor"));
  }, [dispatch]);

  // eslint-disable-next-line
  const redirect = () => {
    dispatch(responseInvoice(null));
    history.replace("/vendor/vendor-invoice");
  };

  useEffect(() => {
    dispatch(
      getAllBooking(1, {
        filter: {
          type: "vendor",
          status: "CONFIRMED",
        },
      })
    );
  }, [dispatch]);

  const getWarehouse = (id) => {
    const book = booking?.bookingList?.data.find(
      (item) => item?.id === parseInt(id)
    );
    setWh(book);
  };

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + parseInt(days));
    return readableDate(result);
  }

  return (
    <VendorLayout>
      {data.invoiceResponse && data.invoiceResponse.statusCode === 200 ? (
        <FormSuccess
          onClick={redirect}
          message={data.invoiceResponse.message}
        />
      ) : null}

      <div className="content-admin px-2">
        <div className="row align-items-center pt-2 px-3 ml-3 mr-0">
          <div className="col-12 pb-1 px-0">
            <div className="row">
              <div className="col-auto order-sm-2 ml-auto">
                <ExpandButton />
                {/* <Link to="/create-vendor-invoice" className="btn btn-deep-blue px-4">Create Invoice</Link> */}
              </div>
              <div className="col-auto order-sm-1">
                <h5 className="backButton text-dark">
                  <i
                    onClick={() => history.goBack()}
                    className="fas fa-chevron-left mr-2 cursorPointer"
                  ></i>
                  Create Invoice
                </h5>
                {/* <h5 className="text-dark-blue">Manage Vendor Invoice</h5> */}
              </div>
            </div>
          </div>
        </div>

        <Formik
          enableReinitialize={true}
          validationSchema={invoiceSchema}
          initialValues={jsonData}
          onSubmit={(fields) => {
            if (res && res.url) {
              fields["documentFile"] = res.url;
              fields["invoiceDate"] = new Date();
              fields["warehouse"] = wh?.warehouse?.id;
              fields["sgst"] = (fields.price * fields.gstCalculation) / 100 / 2;
              fields["cgst"] = (fields.price * fields.gstCalculation) / 100 / 2;
              fields["gst"] = (fields.price * fields.gstCalculation) / 100;

              console.log("create invoice -->", fields);

              dispatch(createInvoice(fields));
            } else {
              setFileError("Choose file");
            }
          }}
          render={({ values, errors, touched, setFieldValue }) => {
            if (values.booking !== "") {
              getWarehouse(values.booking);
            }

            // values["sgst"] = (values.price * values.gstCalculation) / 100 / 2;
            // values["cgst"] = (values.price * values.gstCalculation) / 100 / 2;
            // values["gst"] = (values.price * values.gstCalculation) / 100;

            return (
              <div className="bg-white p-3 mx-3">
                <Form>
                  <div className="row px-3 mx-0">
                    <div className="form-group mb-1 col-md-4 col-sm-6">
                      <label htmlFor="staticEmail" className="mb-1">
                        Booking Id
                      </label>
                      <Field
                        name="booking"
                        as="select"
                        className={
                          "form-control custom-select bg-white px-4 common-select-deep-primary"
                        }
                        id="category"
                      >
                        <option value="">Select Booked Warehouse</option>
                        {booking?.bookingList?.data?.length > 0 &&
                          booking?.bookingList?.data.map((item, index) => (
                            <option key={index} value={parseInt(item.id)}>
                              {item.id}
                            </option>
                          ))}
                      </Field>
                      <span className="errorMsg">
                        {errors.booking ? `Required` : ""}
                      </span>
                    </div>

                    <div className="form-group mb-1 async-control  col-md-4 col-sm-6">
                      <label htmlFor="staticEmail" className="mb-2 ">
                        Warehouse Id
                      </label>

                      <input
                        value={wh?.warehouse?.warehouseId}
                        type="text"
                        className={`form-control form-control-md px-4`}
                        id="staticEmail"
                        placeholder="Type here"
                        readOnly
                      />
                    </div>

                    <div className="form-group mb-1  col-md-4 col-sm-6">
                      <label htmlFor="staticEmail" className="mb-2 ">
                        WH Location
                      </label>
                      <Field
                        name={`area`}
                        type="text"
                        className={
                          `form-control form-control-md px-4` +
                          (errors.area && touched.area ? " is-invalid" : "")
                        }
                        id="staticEmail"
                        placeholder="Type here"
                      />

                      <ErrorMessage
                        name={`area`}
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group mb-1  col-md-4 col-sm-6">
                      <label htmlFor="staticEmail" className="mb-2 ">
                        Warehouse Name
                      </label>

                      <Field
                        value={wh?.warehouse?.warehouseName}
                        type="text"
                        className={`form-control form-control-md px-4`}
                        id="staticEmail"
                        placeholder="Type here"
                        readOnly
                      />
                    </div>

                    <div className="form-group mb-1  col-md-4 col-sm-6">
                      <label htmlFor="staticEmail" className="mb-2 ">
                        Bill Description
                      </label>
                      <Field
                        name={`billDescription`}
                        type="text"
                        className={
                          `form-control form-control-md px-4` +
                          (errors.billDescription && touched.billDescription
                            ? " is-invalid"
                            : "")
                        }
                        id="staticEmail"
                        placeholder="Type here"
                      />

                      <ErrorMessage
                        name={`billDescription`}
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group mb-1  col-md-4 col-sm-6">
                      <label htmlFor="staticEmail" className="mb-2 ">
                        Invoice Number
                      </label>
                      <Field
                        name={`invoiceNumber`}
                        type="text"
                        className={
                          `form-control form-control-md px-4` +
                          (errors.invoiceNumber && touched.invoiceNumber
                            ? " is-invalid"
                            : "")
                        }
                        id="staticEmail"
                        placeholder="Type here"
                      />

                      <ErrorMessage
                        name={`invoiceNumber`}
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group mb-1  col-md-4 col-sm-6">
                      <label htmlFor="staticEmail" className="mb-2 ">
                        Invoice Date
                      </label>
                      <Field
                        name={`invoiceDate`}
                        type="date"
                        className={
                          `form-control form-control-md px-4` +
                          (errors.invoiceDate && touched.invoiceDate
                            ? " is-invalid"
                            : "")
                        }
                        id="staticEmail"
                        placeholder="Type here"
                      />
                      <ErrorMessage
                        name={`invoiceDate`}
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group mb-1  col-md-4 col-sm-6">
                      <label htmlFor="staticEmail" className="mb-2 ">
                        Credit Days
                      </label>

                      <Field
                        name={`creditDays`}
                        type="number"
                        className={`form-control form-control-md px-4`}
                        id="staticEmail"
                        placeholder="Type here"
                        onChange={(e) => {
                          setFieldValue(
                            "dueDate",
                            addDays(values.invoiceDate, e.target.value)
                          );
                          setFieldValue("creditDays", parseInt(e.target.value));
                        }}
                      />
                      <ErrorMessage
                        name={`creditDays`}
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group mb-1  col-md-4 col-sm-6">
                      <label htmlFor="staticEmail" className="mb-2 ">
                        Due Date
                      </label>
                      <Field
                        name={`dueDate`}
                        type="date"
                        className={
                          `form-control form-control-md px-4` +
                          (errors.dueDate && touched.dueDate
                            ? " is-invalid"
                            : "")
                        }
                        id="staticEmail"
                        placeholder="Type here"
                        readOnly
                      />
                      <ErrorMessage
                        name={`dueDate`}
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group mb-1  col-md-4 col-sm-6">
                      <label htmlFor="staticEmail" className="mb-2 ">
                        Is IGST?
                      </label>
                      <Field
                        name="isGst"
                        as="select"
                        className={
                          "form-control custom-select bg-white px-4 common-select-deep-primary"
                        }
                        id="isGst"
                      >
                        <option value={"False"}>No</option>
                        <option value={"True"}>Yes</option>
                      </Field>
                    </div>

                    <div className="form-group mb-1  col-md-4 col-sm-6">
                      <label htmlFor="staticEmail" className="mb-2 ">
                        GST Calculation
                      </label>

                      <Field
                        name={`gstCalculation`}
                        as="select"
                        className={
                          "form-control custom-select bg-white px-4 common-select-deep-primary"
                        }
                        id="category"
                      >
                        <option value={0}>Select GST</option>
                        <option value={5}>5%</option>
                        <option value={12}>12%</option>
                        <option value={18}>18%</option>
                      </Field>

                      <ErrorMessage
                        name={`gstCalculation`}
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    {/* <div className="form-group mb-1  col-md-4 col-sm-6">
                    <label htmlFor="staticEmail" className="mb-2 ">
                      Company Name
                    </label>
                    <Field
                      name={`name`}
                      type="text"
                      onKeyPress={(e) => onlyAlphaNumericSpaceAllow(e)}
                      className={
                        `form-control form-control-md px-4` +
                        (errors.name && touched.name ? " is-invalid" : "")
                      }
                      id="staticEmail"
                      placeholder="Type here"
                    />
                    <ErrorMessage
                      name={`name`}
                      component="div"
                      className="invalid-feedback"
                    />
                  </div> */}
                    {/* <div className="form-group mb-1  col-md-4 col-sm-6">
                    <label htmlFor="staticEmail" className="mb-2 ">
                      Email ID
                    </label>
                    <Field
                      name={`email`}
                      type="email"
                      className={
                        `form-control form-control-md px-4` +
                        (errors.email && touched.email ? " is-invalid" : "")
                      }
                      id="staticEmail"
                      placeholder="Type here"
                    />
                    <ErrorMessage
                      name={`email`}
                      component="div"
                      className="invalid-feedback"
                    />
                  </div> */}
                    {/* <div className="form-group mb-1  col-md-4 col-sm-6">
                    <label htmlFor="staticEmail" className="mb-2 ">
                      Contact Number
                    </label>
                    <Field
                      name={`contactNumber`}
                      type="number"
                      onKeyPress={(e) => onlyNumberAllow(e)}
                      className={
                        `form-control form-control-md px-4` +
                        (errors.contactNumber && touched.contactNumber
                          ? " is-invalid"
                          : "")
                      }
                      id="staticEmail"
                      placeholder="Type here"
                    />
                    <ErrorMessage
                      name={`contactNumber`}
                      component="div"
                      className="invalid-feedback"
                    />
                  </div> */}

                    <div className="form-group mb-1  col-md-4 col-sm-6">
                      <label htmlFor="staticEmail" className="mb-2 ">
                        Price
                      </label>
                      <Field
                        name={`price`}
                        type="number"
                        onKeyPress={(e) => onlyNumberAllow(e)}
                        className={
                          `form-control form-control-md px-4` +
                          (errors.price && touched.price ? " is-invalid" : "")
                        }
                        id="staticEmail"
                        placeholder="Type here"
                      />
                      <ErrorMessage
                        name={`price`}
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    {values.isGst === "True" ? (
                      <div className="form-group mb-1  col-md-4 col-sm-6">
                        <label htmlFor="staticEmail" className="mb-2 ">
                          IGST
                        </label>
                        <input
                          value={(values.price * values.gstCalculation) / 100}
                          name={`gst`}
                          type="number"
                          onKeyPress={(e) => onlyAlphaNumericAllow(e)}
                          className={`form-control form-control-md px-4`}
                          id="staticEmail"
                          placeholder="GST"
                          readOnly
                        />
                      </div>
                    ) : (
                      <>
                        <div className="form-group mb-1  col-md-4 col-sm-6">
                          <label htmlFor="staticEmail" className="mb-2 ">
                            SGST
                          </label>
                          <input
                            value={
                              (values.price * values.gstCalculation) / 100 / 2
                            }
                            name={`sgst`}
                            type="number"
                            onKeyPress={(e) => onlyAlphaNumericAllow(e)}
                            className={`form-control form-control-md px-4`}
                            id="staticEmail"
                            placeholder="SGST"
                            readOnly
                          />
                        </div>

                        <div className="form-group mb-1  col-md-4 col-sm-6">
                          <label htmlFor="staticEmail" className="mb-2 ">
                            CGST
                          </label>
                          <input
                            value={
                              (values.price * values.gstCalculation) / 100 / 2
                            }
                            name={`cgst`}
                            type="number"
                            onKeyPress={(e) => onlyAlphaNumericAllow(e)}
                            className={`form-control form-control-md px-4`}
                            id="staticEmail"
                            placeholder="CGST Price"
                            readOnly
                          />
                        </div>
                      </>
                    )}

                    <div className="form-group mb-1  col-md-4 col-sm-6">
                      <label htmlFor="staticEmail" className="mb-2 ">
                        Total Price
                      </label>
                      <input
                        value={
                          values.price +
                          (values.price * values.gstCalculation) / 100
                        }
                        type="number"
                        className={`form-control form-control-md px-4`}
                        id="staticEmail"
                        placeholder="Type here"
                        readOnly
                      />
                    </div>

                    <div className="form-group mb-1  col-md-4 col-sm-6">
                      <label htmlFor="paymentTerms" className="mb-2 ">
                        Payment Terms
                      </label>
                      <Field
                        name={`paymentTerms`}
                        as="select"
                        className={
                          "form-control custom-select bg-white px-4 common-select-deep-primary"
                        }
                        id="paymentTerms"
                      >
                        <option value={"Prepaid "}>Prepaid </option>
                        <option value={"Postpaid"}>Postpaid</option>
                      </Field>
                      {/* <Field
                      name={`paymentTerms`}
                      type="number"
                      className={`form-control form-control-md px-4`}
                      id="staticEmail"
                      placeholder="Type here"
                    /> */}
                      <ErrorMessage
                        name={`paymentTerms`}
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group mb-1  col-md-4 col-sm-6">
                      <label htmlFor="staticEmail" className="mb-2 ">
                        Remarks
                      </label>
                      <Field
                        name={`remarks`}
                        type="text"
                        className={`form-control form-control-md px-4`}
                        id="staticEmail"
                        placeholder="Type here"
                      />
                    </div>

                    {res && res.url ? (
                      <div className="custom-file form-group mb-1  col-md-4 col-sm-6">
                        <div className="row">
                          <div className="col-3">
                            {/* eslint-disable-next-line  */}
                            <a href={res.url} target="_blank" rel="noreferrer">
                              <AiOutlineDownload
                                style={{
                                  color: "green",
                                  border: "2px solid #fffff0",
                                  fontSize: 50,
                                  backgroundColor: "#FFFFFF",
                                  borderRadius: "100%",
                                  padding: 10,
                                  marginTop: 15,
                                  cursor: "pointer",
                                }}
                              />
                            </a>
                          </div>
                          <div className="cal-9">
                            <input
                              onChange={uploadDocs}
                              type="file"
                              id="custom-file-upload-input"
                              className="custom-file-input"
                              hidden
                            />
                            <span
                              id="custom-file-name"
                              className="d-block text-left custom-file-name px-3 mb-2"
                            >
                              Change Document
                            </span>
                            <label
                              className="custom-file-upload-label btn-deep-primary btn text-nowrap d-block"
                              htmlFor="custom-file-upload-input"
                            >
                              {res && res.url ? "Uploaded" : "Upload File"}
                            </label>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="custom-file form-group mb-1  col-md-4 col-sm-6">
                        <input
                          onChange={uploadDocs}
                          type="file"
                          id="custom-file-upload-input"
                          className="custom-file-input"
                          hidden
                        />

                        <span
                          id="custom-file-name"
                          className="d-block text-left custom-file-name px-3 mb-2"
                        >
                          Upload Document
                        </span>
                        <label
                          className="custom-file-upload-label btn-deep-primary btn text-nowrap d-block"
                          htmlFor="custom-file-upload-input"
                        >
                          {res && res.url ? "Uploaded" : "Upload File"}
                        </label>
                        <span className="errorMsg">{fileError}</span>
                      </div>
                    )}
                  </div>
                  <div className="col-12 px-0 mt-3 border-top" style={myStyle}>
                    <div className="row justify-content-end px-3 mx-0 pt-3 my-5 gap">
                      <div className="col-auto">
                        <button
                          onClick={() => history.goBack()}
                          type="button"
                          className="btn btn-outline-deep-primary px-5"
                        >
                          Back
                        </button>
                      </div>
                      <div className={`col-auto ${!read ? "" : "d-none"}`}>
                        <button
                          type="submit"
                          disabled={data.isPending}
                          className="btn btn-deep-primary px-5"
                        >
                          Submit
                          {data.isPending ? (
                            <Spinner animation="border" />
                          ) : null}
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            );
          }}
        />
      </div>
    </VendorLayout>
  );
};

export default CreateInvoice;

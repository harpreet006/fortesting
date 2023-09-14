import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { newWarehouseSchema } from "../../validation";
import {
  createNewWarehouse,
  fetchWarehouseById,
  changeWarehouseStatus,
} from "../../../store/actions/vendor/warehouseList";
import { categoryByPage } from "../../../store/actions/categoryAction";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import FormSuccess from "../../helper/FormSuccess";
import { useHistory } from "react-router-dom";
import { typeByPage } from "../../../store/actions/whyAction";

const CreateNewWarehouse = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.WAREHOUSELIST);
  const read = useSelector((state) => state.SIDEMENU_INFO.read_only);
  const category = useSelector((state) => state.CATEGORY_INFO.categoryList);
  const typeWh = useSelector((state) => state.WHY_INFO);
  const history = useHistory();

  const reLoad = () => {
    dispatch(changeWarehouseStatus());
    dispatch(fetchWarehouseById(data.addNewResponse.data.id));
    history.replace(`/vendor/update-warehouse/${data.addNewResponse.data.id}`);
  };

  useEffect(() => {
    dispatch(typeByPage());
    dispatch(categoryByPage());
  }, [dispatch]);

  return (
    <>
      {data.addNewResponse.statusCode === 200 ? (
        <FormSuccess
          onClick={() => reLoad()}
          message={data.addNewResponse.message}
        />
      ) : null}

      <div className="row align-items-center px-3 mx-0">
        <div className="w-100">
          <Formik
            initialValues={{
              warehouseName: "",
              category: "",
              type: "",
              gstCertificate: "",
              location: "",
              totalArea: 0,
              structureType: "",
              workingHour: "",
              pallet: 0,
            }}
            validationSchema={newWarehouseSchema}
            onSubmit={(fields) => {
              dispatch(createNewWarehouse(fields));
              console.log("---->", fields);
            }}
            render={({
              errors,
              values,
              setFieldValue,
              status,
              onChange,
              touched,
            }) => (
              <Form>
                <div className="row bg-white rounded mx-0 col-xxxl-11">
                  <div className="form-group col-12 mb-3 ">
                    <label htmlFor="category" className="mb-2 mr-3">
                      Select Warehouse Category
                    </label>

                    <Field
                      onChange={(e) =>
                        setFieldValue("category", parseInt(e.target.value))
                      }
                      disabled={read}
                      name="category"
                      as="select"
                      className={
                        "form-control custom-select bg-white px-4 common-select-deep-blue w-100" +
                        (errors.category && touched.category
                          ? " is-invalid"
                          : "")
                      }
                      id="category"
                    >
                      <option value="">Select Category</option>

                      {category && category.length > 0
                        ? category
                            .filter((item) => item.categoryStatus === true)
                            .map((item, index) => {
                              return (
                                <option
                                  value={item.id}
                                  key={index}
                                  className="text-capitalize"
                                >
                                  {item.categoryName}
                                </option>
                              );
                            })
                        : null}
                    </Field>
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="col-12 form-group mb-3">
                    <p className="mb-2 text-gray">Select Warehouse Type</p>
                    <div className="row">
                      {typeWh?.typeList?.data &&
                      typeWh?.typeList?.data.length > 0
                        ? typeWh?.typeList?.data.map((item, index) => {
                            return (
                              <div
                                key={index}
                                className="col-md-auto col-xl-4 mt-2"
                              >
                                <div className="form-check common-radio-deep-blue">
                                  <Field
                                    disabled={read}
                                    onChange={(e) =>
                                      setFieldValue(
                                        "type",
                                        parseInt(e.target.value)
                                      )
                                    }
                                    className={
                                      "common-radio-deep-blue-input" +
                                      (errors.type && touched.type
                                        ? " is-invalid"
                                        : "")
                                    }
                                    type="radio"
                                    name="type"
                                    id={`type${index}`}
                                    value={item.id}
                                    hidden
                                  />

                                  <label
                                    className={
                                      "common-radio-deep-blue-label pl-2"
                                    }
                                    htmlFor={`type${index}`}
                                  >
                                    {item.type}
                                  </label>
                                  <ErrorMessage
                                    name="type"
                                    component="div"
                                    className="invalid-feedback"
                                  />
                                </div>
                              </div>
                            );
                          })
                        : null}

                      {/* <div className="col-md-auto col-xl-4 mt-2">
                        <div className="form-check common-radio-deep-blue">
                          <Field className={'common-radio-deep-blue-input'+ (errors.type && touched.type ? ' is-invalid' : '')} type="radio" name="type" id="type" value="Dedicated" hidden />
                          <label className={'common-radio-deep-blue-label pl-2'} htmlFor="type">Dedicated</label>
                          <ErrorMessage name="type" component="div"  className="invalid-feedback" />
                        </div>
                      </div>
                      <div className="col-md-auto col-xl-4 mt-2">
                        <div className="form-check common-radio-deep-blue">
                          <Field className="common-radio-deep-blue-input" type="radio" name="type" id="wareType1" value="Shared" hidden />
                          <label className="common-radio-deep-blue-label pl-2" htmlFor="wareType1">Shared</label>
                        </div>
                      </div>
                      <div className="col-md-auto col-xl-4 mt-2">
                        <div className="form-check common-radio-deep-blue">
                          <Field className="common-radio-deep-blue-input" type="radio" name="type" id="wareType2" value="Transit Hub" hidden/>
                          <label className="common-radio-deep-blue-label pl-2" htmlFor="wareType2">Transit Hub</label>
                        </div>
                      </div>
                      <div className="col-md-auto col-xl-4 mt-2">
                        <div className="form-check common-radio-deep-blue">
                          <Field className="common-radio-deep-blue-input" type="radio" name="type" id="wareType3" value="Empty Space (Grey Warehouse)" hidden/>
                          <label className="common-radio-deep-blue-label pl-2" htmlFor="wareType3">Empty Space (Grey Warehouse)</label>
                        </div>
                      </div>
                      <div className="col-md-auto col-xl-4 mt-2">
                        <div className="form-check common-radio-deep-blue">
                          <Field className="common-radio-deep-blue-input" type="radio" name="type" id="wareType4" value="Under Construction" hidden/>
                          <label className="common-radio-deep-blue-label pl-2" htmlFor="wareType4">Under Construction</label>
                        </div>
                      </div>
                      <div className="col-md-auto col-xl-4 mt-2">
                        <div className="form-check common-radio-deep-blue">
                          <Field className="common-radio-deep-blue-input" type="radio" name="type" id="wareType5" value="Land Parcel (Yard)" hidden/>
                          <label className="common-radio-deep-blue-label pl-2" htmlFor="wareType5">Land Parcel (Yard)</label>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className="form-group form-inline col-12 mb-3 mt-2">
                    <label htmlFor="warehouseName" className="mb-2 mr-3">
                      Warehouse Display Name
                    </label>
                    <Field
                      disabled={read}
                      name="warehouseName"
                      className={
                        "form-control form-control-md bg-white px-4 w-300px" +
                        (errors.warehouseName && touched.warehouseName
                          ? " is-invalid"
                          : "")
                      }
                      placeholder="Enter Display Name"
                      id="warehouseName"
                    />
                    <ErrorMessage
                      name="warehouseName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className={`col-12 ${!read ? "" : "d-none"}`}>
                    <div className="row justify-content-end">
                      <div className="col-auto">
                        <button
                          type="submit"
                          // disabled={data.isPending}
                          className="btn btn-deep-primary px-5"
                        >
                          Save
                          {data.isPending ? (
                            <Spinner animation="border" />
                            // console.log("Data is loading")
                          ) : null}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          />
        </div>
      </div>

      {/* ============================ */}

      {/* <div className="row align-items-center pb-3 px-3 mx-0"> 
            <div className="col-12">
              <form action=""> 
                <div className="row bg-white rounded mx-0 col-xxxl-11">
                  <div className="form-group col-12 mb-3 px-sm-5">
                    <label htmlFor="staticEmail" className="mb-2 mr-3">Select Warehouse Category</label>                  
                    
                    <select className="form-control custom-select bg-white px-4 common-select-deep-blue w-300px" id="exampleFormControlSelect1">
                      <option>General Warehouse</option>
                      <option>Custom Bonded Warehouse</option>
                      <option>Temperature Controlled WH</option>
                      <option>FTWZ</option>
                    </select>
                  </div> 
                  <div className="col-12 form-group mb-3 px-sm-5">
                    <p className="mb-2 text-gray">Select Warehouse Type</p>
                    <div className="row">
                      <div className="col-md-auto col-xl-4 mt-2">
                        <div className="form-check common-radio-deep-blue">
                          <input className="common-radio-deep-blue-input" type="radio" name="wareType" id="spaceprovidertype1" value="option1" hidden />
                          <label className="common-radio-deep-blue-label pl-2" htmlFor="spaceprovidertype1">Dedicated</label>
                        </div>
                      </div>
                      <div className="col-md-auto col-xl-4 mt-2">
                        <div className="form-check common-radio-deep-blue">
                          <input className="common-radio-deep-blue-input" type="radio" name="wareType" id="spaceprovidertype3" value="option3" hidden />
                          <label className="common-radio-deep-blue-label pl-2" htmlFor="spaceprovidertype3">Shared</label>
                        </div>
                      </div>
                      <div className="col-md-auto col-xl-4 mt-2">
                        <div className="form-check common-radio-deep-blue">
                          <input className="common-radio-deep-blue-input" type="radio" name="wareType" id="spaceprovidertype2" value="option2" hidden/>
                          <label className="common-radio-deep-blue-label pl-2" htmlFor="spaceprovidertype2">Transit Hub</label>
                        </div>
                      </div>
                      <div className="col-md-auto col-xl-4 mt-2">
                        <div className="form-check common-radio-deep-blue">
                          <input className="common-radio-deep-blue-input" type="radio" name="wareType" id="spaceprovidertype4" value="option3" hidden/>
                          <label className="common-radio-deep-blue-label pl-2" htmlFor="spaceprovidertype4">Empty Space (Grey Warehouse)</label>
                        </div>
                      </div>
                      <div className="col-md-auto col-xl-4 mt-2">
                        <div className="form-check common-radio-deep-blue">
                          <input className="common-radio-deep-blue-input" type="radio" name="wareType" id="spaceprovidertype5" value="option3" hidden/>
                          <label className="common-radio-deep-blue-label pl-2" htmlFor="spaceprovidertype5">Under Construction</label>
                        </div>
                      </div>
                      <div className="col-md-auto col-xl-4 mt-2">
                        <div className="form-check common-radio-deep-blue">
                          <input className="common-radio-deep-blue-input" type="radio" name="wareType" id="spaceprovidertype6" value="option3" hidden/>
                          <label className="common-radio-deep-blue-label pl-2" htmlFor="spaceprovidertype6">Land Parcel (Yard)</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group form-inline col-12 mb-3 px-sm-5 mt-2">
                    <label htmlFor="staticEmail" className="mb-2 mr-3">Warehouse Display Name</label>
                    <input className="form-control bg-white px-4 w-300px" placeholder="Enter Display Name" />
                  </div> 
                  
                  <div className="col-12">
                    <div className="row justify-content-end">
                      <div className="col-auto">
                        <button type="button" className="btn btn-deep-blue add-class remove-class">Submit</button>
                      </div>
                    </div>
                  </div>
                </div>  
              </form>
            </div>
          </div> */}
    </>
  );
};

export default CreateNewWarehouse;

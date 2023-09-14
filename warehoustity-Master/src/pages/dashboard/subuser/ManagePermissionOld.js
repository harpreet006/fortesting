import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { Formik, Field, Form } from "formik";
import { useHistory, useParams } from "react-router-dom";
import BrowserTitle from "../../../components/helper/BrowserTitle";
import CustomerLayout from "../../../layout/CustomerLayout";
import {
  roleById,
  updatePermission,
  createPermission,
  responseWhs,
  rolePermissionByRoleId,
  rolePermissionList,
} from "../../../store/actions/subUserAction";
import { useDispatch, useSelector } from "react-redux";
import FormSuccess from "../../../components/helper/FormSuccess";
import Spinner from "react-bootstrap/Spinner";

const ManagePermission = () => {
  const history = useHistory();
  const { roleId } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(null);
  const data = useSelector((state) => state.WHS_USER_INFO);

  const [specs, setspecs] = useState([]);
  const [specs1, setspecs1] = useState([]);

  const [documentJson, setDocumentJson] = useState([]);

  useEffect(() => {
    // Permission

    if (data.rolePermissionList) {
      let mod = [];
      let mod2 = [];
      for (let i = 0; i < data.rolePermissionList.length; i++) {
        mod.push({
          moduleId: data.rolePermissionList[i].id,
          canWrite: data.rolePermissionList[i].canWrite,
          canRead: data.rolePermissionList[i].canRead,
          canBoth: data.rolePermissionList[i].canBoth,
          id: data.rolePermissionList[i].rid,
        });

        for (
          let k = 0;
          k < data.rolePermissionList[i].subModules?.length;
          k++
        ) {
          mod2.push({
            moduleId: data.rolePermissionList[i].subModules[k].id,
            canWrite: data.rolePermissionList[i].subModules[k].canWrite,
            canRead: data.rolePermissionList[i].subModules[k].canRead,
            canBoth: data.rolePermissionList[i].subModules[k].canBoth,
            id: data.rolePermissionList[i].subModules[k].rid,
          });
        }
      }

      setspecs(mod);
      setspecs1(mod2);
      setDocumentJson(data.rolePermissionList);
    }
  }, [data.permissionList, data.rolePermissionList]);

  useEffect(() => {
    dispatch(roleById(roleId));
    dispatch(rolePermissionByRoleId(roleId, 2));
    return () => {
      dispatch(rolePermissionList(null));
    };
  }, [dispatch, roleId]);

  const redirect = () => {
    dispatch(responseWhs(null));
    history.replace(`/manageroles`);
  };

  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });

  return (
    <Layout>
      <BrowserTitle title="Manage Permission" />

      {data.whsResponse !== null ? (
        <FormSuccess onClick={redirect} message={`Status Updated`} />
      ) : null}

      <CustomerLayout title="Manage Permission">
        <div className="row">
          <div className="content col-12 roles-and-permissions px-0">
            <div className="border-bottom mb-3 d-sm-flex justify-content-between">
              <div>
                <button className="btn font-weight-bold">
                  <i
                    onClick={() => history.goBack()}
                    className="fas fa-chevron-left pr-3"
                  ></i>{" "}
                  Roles and Permissions
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-12 px-3">
                <form className="form-inline px-3">
                  <div className="form-group">
                    <label htmlFor="inputPassword6">Role Name</label>
                    <input
                      value={data.roleDetail?.name}
                      className="form-control form-control-md mx-sm-3 w-300px"
                      placeholder="Executive"
                      disabled
                      readOnly
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="row p-3">
              <div className="col-12 table-responsive table-collapse">
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    module: documentJson,
                    specs: specs,
                    specs1: specs1,
                  }}
                  onSubmit={(fields) => {

                    let sendArray = [];

                    for (let i = 0; i < fields.module.length; i++) {
                      for (
                        let k = 0;
                        k < fields.module[i].subModules?.length;
                        k++
                      ) {
                        sendArray.push({
                          moduleId: fields.module[i].subModules[k].id,
                          canWrite: fields.module[i].subModules[k].canWrite,
                          canRead: fields.module[i].subModules[k].canRead,
                          canBoth: fields.module[i].subModules[k].canBoth,
                          id: fields.module[i].subModules[k].rid,
                        });
                      }

                      sendArray.push({
                        moduleId: fields.module[i].id,
                        canWrite: fields.module[i].canWrite,
                        canRead: fields.module[i].canRead,
                        canBoth: fields.module[i].canBoth,
                        id: fields.module[i].rid,
                      });
                    }

                    let postArr = [];
                    let patchArr = [];

                    for (let p = 0; p < sendArray.length; p++) {
                      if (sendArray[p].id) {
                        delete sendArray[p].canBoth;
                        patchArr.push(sendArray[p]);
                      } else {
                        delete sendArray[p].id;
                        postArr.push(sendArray[p]);
                      }
                    }

                    // ==============================

                    // var merged = [...fields.specs, ...fields.specs1];

                    // for(let p = 0; p< merged.length; p++){
                    //     if(merged[p].id){
                    //     delete merged[p].canBoth
                    //     patchArr.push(merged[p])
                    //     }else{
                    //     delete merged[p].id
                    //     postArr.push(merged[p])

                    //     }
                    // }

                    if (postArr && postArr.length > 0) {
                      dispatch(createPermission(roleId, postArr));
                    }

                    if (patchArr && patchArr.length > 0) {
                      dispatch(updatePermission(roleId, patchArr));
                    }
                  }}
                  render={({
                    values,
                    setFieldValue,
                    errors,
                    status,
                    onChange,
                    touched,
                  }) => {
                    return (
                      <Form>
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th className="w-100px py-2 bg-dark text-white">S. No.</th>
                              <th className="py-2 bg-dark text-white">Feature</th>
                              <th className="w-100px text-center py-2 bg-dark text-white">Read</th>
                              <th className="w-100px text-center py-2 bg-dark text-white">Write</th>
                              <th className="w-100px text-center py-2 bg-dark text-white">Both</th>
                            </tr>
                          </thead>
                          {values.module && values.module.length > 0
                            ? values.module.map((item, index) => {
                                return (
                                  <tbody key={index}>
                                    <tr>
                                      <td className="w-100px">
                                        <div className="btn bg-white border mb-0 rounded px-0 h5 w-50px">
                                          {index + 1}
                                        </div>
                                      </td>
                                      <td className="col-auto">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            if (
                                              open !== values?.module[index].id
                                            ) {
                                              setOpen(values?.module[index].id);
                                            } else {
                                              setOpen(null);
                                            }
                                          }}
                                          className={`btn btn-outline-deep-primary text-left ${values?.module[index].moduleRoute === "" ? "btn-custom-drop" :""} w-300px bg-white toggle-class ${
                                            open === values?.module[index].id
                                              ? "open"
                                              : ""
                                          }`}
                                          data-target="#document"
                                          data-toggle-class="open"
                                          data-this-toggle-class="open"
                                        >
                                          {values.module[index].name}
                                        </button>
                                      </td>
                                      <td className="w-100px text-center">
                                        <Field
                                          type="checkbox"
                                          id="vehicle1"
                                          onChange={(e) => {
                                            setFieldValue(
                                              `module.${index}.canRead`,
                                              !values.module[index].canRead
                                            );
                                          }}
                                          name={`module.${index}.canRead`}
                                          // checked={values?.module[index].canRead}
                                          checked={
                                            values.module[index].canRead ===
                                            true
                                          }
                                        />
                                        {/* <div className="common-checkbox common-checkbox-dark position-relative mb-3 mx-auto d-inline-block">
                                            
                                            <Field
                                            onChange={(e) => {setFieldValue(`specs.${index}.canRead` , !specs[index].canRead)}}
                                            name={`specs.${index}.canRead`}
                                            checked={values.specs?values.specs[index].canRead===true:""} className="common-checkbox-input common-checkbox-dark-input" type="checkbox" id={`defaultCheck33`} />
                                            <label className="common-checkbox-label common-checkbox-dark-label mr-3" htmlhtmlFor={`defaultCheck33`} >
                                            </label>
                                            </div> */}
                                      </td>
                                      <td className="w-100px text-center">
                                        <Field
                                          type="checkbox"
                                          id="vehicle2"
                                          onChange={(e) => {
                                            setFieldValue(
                                              `module.${index}.canWrite`,
                                              !values.module[index].canWrite
                                            );
                                          }}
                                          name={`module.${index}.canWrite`}
                                          checked={
                                            values.module[index].canWrite ===
                                            true
                                          }
                                        />

                                        {/* <div className="common-checkbox common-checkbox-dark position-relative mb-3 mx-auto d-inline-block">
                                            <Field
                                            onChange={(e) => {setFieldValue(`specs.${index}.canWrite` ,!specs[index].canWrite)}}
                                            name={`specs.${index}.canWrite`}
                                            checked={values.specs?values.specs[index].canWrite===true:""} className="common-checkbox-input common-checkbox-dark-input" type="checkbox" id={`defaultCheck23${"Y"+index}`} />
                                            <label className="common-checkbox-label common-checkbox-dark-label mr-3" htmlhtmlFor={`defaultCheck23${"Y"+index}`}>
                                            </label>
                                            </div> */}
                                      </td>
                                      <td className="w-100px text-center">
                                        <Field
                                          type="checkbox"
                                          id="vehicle2"
                                          onChange={(e) => {
                                            setFieldValue(
                                              `module.${index}.canBoth`,
                                              !values.module[index].canBoth
                                            );
                                            setFieldValue(
                                              `module.${index}.canRead`,
                                              !values.module[index].canBoth
                                            );
                                            setFieldValue(
                                              `module.${index}.canWrite`,
                                              !values.module[index].canBoth
                                            );
                                          }}
                                          name={`module.${index}.canBoth`}
                                          checked={
                                            values.module[index].canRead ===
                                              true &&
                                            values.module[index].canWrite ===
                                              true
                                          }
                                        />

                                        {/* <div className="common-checkbox common-checkbox-dark position-relative mb-3 mx-auto d-inline-block">
                                            <Field
                                            onChange={(e) => {setFieldValue(`specs.${index}.both` ,true)}}
                                            name={`specs.${index}.both`} checked={`specs.${index}.both`} className="common-checkbox-input common-checkbox-dark-input" type="checkbox" id={`defaultCheck3${"Y"+index}`}/>
                                            <label className="common-checkbox-label common-checkbox-dark-label mr-3" htmlhtmlFor={`defaultCheck3${"Y"+index}`}>
                                            </label>
                                            </div> */}
                                      </td>
                                    </tr>

                                    {item.subModules &&
                                    item.subModules.length > 0
                                      ? item.subModules.map((sub, i) => {
                                          return (
                                            <tr>
                                              <td colSpan="5" className="p-0">
                                                <table
                                                  className={`table permissions-card ${
                                                    open ===
                                                    values?.module[index].id
                                                      ? "open"
                                                      : ""
                                                  }`}
                                                  id="document"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td className="w-100px"></td>
                                                      <td className="col-auto">
                                                        <span className="pl-5 ml-4 text-gray">
                                                          {sub?.name}
                                                        </span>
                                                      </td>
                                                      <td className="w-100px text-center">
                                                        <Field
                                                          type="checkbox"
                                                          id={`vehicle5`}
                                                          onChange={(e) => {
                                                            setFieldValue(
                                                              `module.${index}.subModules.${i}.canRead`,
                                                              !values.module[
                                                                index
                                                              ].subModules[i]
                                                                .canRead
                                                            );
                                                          }}
                                                          name={`module.${index}.subModules.${i}.canRead`}
                                                          checked={
                                                            values?.module[
                                                              index
                                                            ].subModules[i]
                                                              .canRead === true
                                                          }
                                                        />
                                                        {/* <div className="common-checkbox common-checkbox-dark position-relative mb-3 mx-auto d-inline-block">
                                            <Field name={`module.${index}.subModules.${i}.read`} onChange={(e) => {setFieldValue(`module.${index}.subModules.${i}.read` ,!sub.read)}}  className="common-checkbox-input common-checkbox-dark-input" type="checkbox" id={`default${"Y"+index+i}`} />
                                            <label className="common-checkbox-label common-checkbox-dark-label mr-3" htmlhtmlFor={`default${"Y"+index+i}`} >
                                            </label>
                                            </div> */}
                                                      </td>
                                                      <td className="w-100px text-center">
                                                        <Field
                                                          type="checkbox"
                                                          id={`vehicle6`}
                                                          onChange={(e) => {
                                                            setFieldValue(
                                                              `module.${index}.subModules.${i}.canWrite`,
                                                              !values.module[
                                                                index
                                                              ].subModules[i]
                                                                .canWrite
                                                            );
                                                          }}
                                                          name={`module.${index}.subModules.${i}.canWrite`}
                                                          checked={
                                                            values.module[
                                                              index
                                                            ].subModules[i]
                                                              .canWrite === true
                                                          }
                                                        />

                                                        {/* <div className="common-checkbox common-checkbox-dark position-relative mb-3 mx-auto d-inline-block">
                                            <Field name={`module.${index}.subModules.${i}.write`} onChange={(e) => {setFieldValue(`module.${index}.subModules.${i}.write` ,!sub.write)}} className="common-checkbox-input common-checkbox-dark-input" type="checkbox" id={`defaults${"Y"+index+i}`} />
                                            <label className="common-checkbox-label common-checkbox-dark-label mr-3" htmlhtmlFor={`defaults${"Y"+index+i}`} >
                                            </label>
                                            </div> */}
                                                      </td>
                                                      <td className="w-100px text-center">
                                                        <Field
                                                          type="checkbox"
                                                          id={`vehicle7`}
                                                          onChange={(e) => {
                                                            setFieldValue(
                                                              `module.${index}.subModules.${i}.canBoth`,
                                                              !values.module[
                                                                index
                                                              ].subModules[i]
                                                                .canBoth
                                                            );
                                                            setFieldValue(
                                                              `module.${index}.subModules.${i}.canRead`,
                                                              !values.module[
                                                                index
                                                              ].subModules[i]
                                                                .canBoth
                                                            );
                                                            setFieldValue(
                                                              `module.${index}.subModules.${i}.canWrite`,
                                                              !values.module[
                                                                index
                                                              ].subModules[i]
                                                                .canBoth
                                                            );
                                                          }}
                                                          name={`module.${index}.subModules.${i}.canBoth`}
                                                          checked={
                                                            values.module[index]
                                                              .subModules[i]
                                                              .canRead ===
                                                              true &&
                                                            values.module[index]
                                                              .subModules[i]
                                                              .canWrite === true
                                                          }
                                                        />

                                                        {/* <div className="common-checkbox common-checkbox-dark position-relative mb-3 mx-auto d-inline-block">
                                            <Field  name={`module.${index}.subModules.${i}.both`} onChange={(e) => {setFieldValue(`module.${index}.subModules.${i}.both` ,!sub.both)}} className="common-checkbox-input common-checkbox-dark-input" type="checkbox" id={`defaulta${"Y"+index+i}`} />
                                            <label className="common-checkbox-label common-checkbox-dark-label mr-3" htmlhtmlFor={`defaulta${"Y"+index+i}`} >
                                            </label>
                                            </div> */}
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          );
                                        })
                                      : null}
                                  </tbody>
                                );
                              })
                            : null}
                        </table>

                        <div className="row pt-4">
                          <div className="col-auto">
                            <button
                              type="button"
                              onClick={() => history.goBack()}
                              className="btn btn-deep-primary toggle-className my-4 py-1 px-5"
                            >
                              Back
                            </button>
                          </div>
                          <div className="col-auto">
                            <button
                              type="submit"
                              className="btn btn-deep-primary toggle-class my-4 py-1 px-5"
                              data-target=".roles-and-permissions"
                              data-toggle-class="d-none"
                              disabled={data.isPending}
                            >
                              Save
                              {data.isPending ? (
                                <Spinner animation="border" />
                              ) : null}
                            </button>
                          </div>
                        </div>
                      </Form>
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default ManagePermission;

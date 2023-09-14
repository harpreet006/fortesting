import React, { useEffect, useState } from "react";
import VendorLayout from "../../../layout/VendorLayout";
import { useHistory, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import {
  roleById,
  updatePermission,
  createPermission,
  responseWhs,
  rolePermissionByRoleId,
  rolePermissionList,
} from "../../../store/actions/subUserAction";
import { useDispatch, useSelector } from "react-redux";
import { CardLoader } from "../../../components/helper/CustomLoader";
import FormSuccess from "../../../components/helper/FormSuccess";
import Spinner from "react-bootstrap/Spinner";

const ViewUserRolePermission = () => {
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
        // console.log(data.rolePermissionList[i])
        mod.push({
          moduleId: data.rolePermissionList[i].id,
          canWrite: data.rolePermissionList[i].canWrite,
          canRead: data.rolePermissionList[i].canRead,
          canBoth: data.rolePermissionList[i].canBoth,
          // "name":data.rolePermissionList[i].name,
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
            // "name":data.rolePermissionList[i].subModules[k].name,
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
    dispatch(rolePermissionByRoleId(roleId, 1));
    return () => {
      dispatch(rolePermissionList(null));
    };
  }, [dispatch, roleId]);

  const redirect = () => {
    dispatch(responseWhs(null));
    history.replace(`/vendor/managerole`);
  };

  return (
    <VendorLayout>
      {data.whsResponse !== null ? (
        <FormSuccess onClick={redirect} message={`Permission Updated`} />
      ) : null}

      <div className="content-admin px-2">
        <div className="row align-items-center pt-2 px-3 mx-0">
          <div className="col-12 pb-2">
          <h5
              onClick={() => history.goBack()}
              className="text-dark backButton h5"
            >
              <i className="fas fa-chevron-left mr-2"></i> Edit Roles and Permissions
            </h5>
          </div>

          {data.isLoading ? (
            <CardLoader />
          ) : (
            <div className="col-12">
              <div className="row">
                <div className="col-12">
                  <form className="form-inline-block ">
                    <div className="form-group mb-1 mt-2">
                      <label htmlFor="inputPassword6">Role Name</label>
                      <input
                        value={data.roleDetail?.name}
                        id="inputPassword6"
                        className="form-control form-control-md w-100"
                        readOnly
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="row p-3">
                <div className="col-12 bg-white table-responsive table-collapse-admin">
                  <Formik
                    enableReinitialize={true}
                    // validationSchema={whsSchema}
                    initialValues={{
                      module: documentJson,
                      specs: specs,
                      specs1: specs1,
                    }}
                    onSubmit={(fields) => {
                      console.log("Fields==>", fields);

                      // ==========================

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
                      //   if(merged[p].id){
                      //     console.log(merged[p].id)
                      //     delete merged[p].canBoth
                      //     patchArr.push(merged[p])
                      //   }else{
                      //     delete merged[p].id
                      //     postArr.push(merged[p])

                      //   }
                      // }

                      // console.log(postArr, patchArr)

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
                      console.log("values--->", values);

                      return (
                        <Form className="w-100 table-responsive pt-2">
                          <table className="table">
                            <thead>
                              <tr>
                                <th className="w-100px bg-dark text-white py-2">S. No.</th>
                                <th className="bg-dark text-white py-2">Feature</th>
                                <th className="w-100px text-center bg-dark text-white py-2">Read</th>
                                <th className="w-100px text-center bg-dark text-white py-2">Write</th>
                                <th className="w-100px text-center bg-dark text-white py-2">Both</th>
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
                                                open !==
                                                values?.module[index].id
                                              ) {
                                                setOpen(
                                                  values?.module[index].id
                                                );
                                              } else {
                                                setOpen(null);
                                              }
                                            }}
                                            className={`btn btn-outline-deep-blue btn-custom-drop w-300px bg-white toggle-class ${
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
                         {console.log("--------->",values.specs[index].canRead===true)}
                         
                          <Field
                          onChange={(e) => {setFieldValue(`specs.${index}.canRead` , !specs[index].canRead)}}
                          name={`specs.${index}.canRead`}
                          checked={values.specs?values.specs[index].canRead===true:""} className="common-checkbox-input common-checkbox-dark-input" type="checkbox" id={`defaultCheck33`} />
                          <label className="common-checkbox-label common-checkbox-dark-label mr-3" htmlFor={`defaultCheck33`} >
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
                                            // checked={values?.module[index].canWrite}
                                          />

                                          {/* <div className="common-checkbox common-checkbox-dark position-relative mb-3 mx-auto d-inline-block">
                          <Field
                          onChange={(e) => {setFieldValue(`specs.${index}.canWrite` ,!specs[index].canWrite)}}
                          name={`specs.${index}.canWrite`}
                          checked={values.specs?values.specs[index].canWrite===true:""} className="common-checkbox-input common-checkbox-dark-input" type="checkbox" id={`defaultCheck23${"Y"+index}`} />
                          <label className="common-checkbox-label common-checkbox-dark-label mr-3" htmlFor={`defaultCheck23${"Y"+index}`}>
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
                          <label className="common-checkbox-label common-checkbox-dark-label mr-3" htmlFor={`defaultCheck3${"Y"+index}`}>
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
                                                                .canRead ===
                                                              true
                                                            }
                                                          />

                                                          {/* <div className="common-checkbox common-checkbox-dark position-relative mb-3 mx-auto d-inline-block">
                          <Field name={`module.${index}.subModules.${i}.read`} onChange={(e) => {setFieldValue(`module.${index}.subModules.${i}.read` ,!sub.read)}}  className="common-checkbox-input common-checkbox-dark-input" type="checkbox" id={`default${"Y"+index+i}`} />
                          <label className="common-checkbox-label common-checkbox-dark-label mr-3" htmlFor={`default${"Y"+index+i}`} >
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
                                                              values?.module[
                                                                index
                                                              ].subModules[i]
                                                                .canWrite ===
                                                              true
                                                            }
                                                          />

                                                          {/* <div className="common-checkbox common-checkbox-dark position-relative mb-3 mx-auto d-inline-block">
                          <Field name={`module.${index}.subModules.${i}.write`} onChange={(e) => {setFieldValue(`module.${index}.subModules.${i}.write` ,!sub.write)}} className="common-checkbox-input common-checkbox-dark-input" type="checkbox" id={`defaults${"Y"+index+i}`} />
                          <label className="common-checkbox-label common-checkbox-dark-label mr-3" htmlFor={`defaults${"Y"+index+i}`} >
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
                                                              values?.module[
                                                                index
                                                              ].subModules[i]
                                                                .canBoth ===
                                                                true &&
                                                              values?.module[
                                                                index
                                                              ].subModules[i]
                                                                .canBoth ===
                                                                true
                                                            }
                                                          />

                                                          {/* <div className="common-checkbox common-checkbox-dark position-relative mb-3 mx-auto d-inline-block">
                          <Field  name={`module.${index}.subModules.${i}.both`} onChange={(e) => {setFieldValue(`module.${index}.subModules.${i}.both` ,!sub.both)}} className="common-checkbox-input common-checkbox-dark-input" type="checkbox" id={`defaulta${"Y"+index+i}`} />
                          <label className="common-checkbox-label common-checkbox-dark-label mr-3" htmlFor={`defaulta${"Y"+index+i}`} >
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

                        
                        </Form>
                      );
                    }}
                  />
                    <div className=" pt-2 justify-content-right d-flex">
                            <div className="col-auto">
                              <button
                                type="button"
                                onClick={() => history.goBack()}
                                className="btn btn-outline-deep-primary toggle-className my-4 px-5"
                              >
                                Back
                              </button>
                            </div>
                            <div className="col-auto">
                              <button
                                type="submit"
                                className="btn btn-deep-primary toggle-className my-4 px-5"
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
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </VendorLayout>
  );
};

export default ViewUserRolePermission;

import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
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
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import CheckboxTree from "react-checkbox-tree";

const ManagePermission = () => {
  const history = useHistory();
  const { roleId } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.WHS_USER_INFO);

  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);

  function makeModule(modules) {
    return modules?.map((module) => ({
      id: module.id,
      value: module.id,
      label: module.name,
      ...(module.subModules &&
        module.subModules.length > 0 && {
          children: makeModule(module.subModules),
        }),
    }));
  }

  const [sendModule, setSaveModule] = useState([]);

  const saveModule = () => {
    let moduleArr = [];
    for (let m of sendModule) {
      if (checked.includes(m.moduleId.toString())) {
        moduleArr.push({
          id: m.id,
          moduleId: m.moduleId,
          canWrite: true,
          canRead: true,
        });
      } else {
        moduleArr.push({
          id: m.id,
          moduleId: m.moduleId,
          canWrite: false,
          canRead: false,
        });
      }

      if (m.children && m.children.length > 0) {
        for (let k of m.children) {
          if (checked.includes(k.moduleId.toString())) {
            moduleArr.push({
              id: k.id,
              moduleId: k.moduleId,
              canWrite: true,
              canRead: true,
            });
          } else {
            moduleArr.push({
              id: k.id,
              moduleId: k.moduleId,
              canWrite: false,
              canRead: false,
            });
          }
        }
      }
    }

    let postArr = [];
    let patchArr = [];

    for (let p = 0; p < moduleArr.length; p++) {
      if (moduleArr[p].id) {
        delete moduleArr[p].canBoth;
        patchArr.push(moduleArr[p]);
      } else {
        delete moduleArr[p].id;
        postArr.push(moduleArr[p]);
      }
    }

   

    if (postArr && postArr.length > 0) {
      dispatch(createPermission(roleId, postArr));
    }

    if (patchArr && patchArr.length > 0) {
      dispatch(updatePermission(roleId, patchArr));
    }


    // dispatch(updatePermission(roleId, moduleArr));
  };

  useEffect(() => {
    let checkedModule = [];
    function activeModule(modules) {
      return modules?.map((module) => {
        if ((module.canRead && module.canWrite && module.canBoth) === true) {
          checkedModule.push(module.id.toString());
        }
        return {
          id: module.rid,
          moduleId: module.id,
          canWrite: module.canWrite,
          canRead: module.canRead,
          canBoth: module.canBoth,
          label: module.name,
          ...(module.subModules &&
            module.subModules.length > 0 && {
              children: activeModule(module.subModules),
            }),
        };
      });
    }
    setChecked(checkedModule);
    setSaveModule(activeModule(data.rolePermissionList));
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

  return (
    <Layout>
      <BrowserTitle title="Manage Permission" />

      {data.whsResponse !== null &&
        <FormSuccess onClick={redirect} message={`Status Updated`} />
     }

      <CustomerLayout title="Manage Permission">
        <div className="row">
          <div className="content col-12 roles-and-permissions">
            <div className="border-bottom mb-3 d-sm-flex justify-content-between">
              <div>
                <button className="btn name-breadcrumb px-0 text-dark font-heading mr-3 toggle-class">
                  <i
                    onClick={() => history.goBack()}
                    className="fas fa-chevron-left pr-3"
                  ></i>{" "}
                  Roles and Permissions
                </button>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-12">
                <form className="form-inline">
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

            {data?.rolePermissionList &&
              data?.rolePermissionList?.length > 0 && (
                <CheckboxTree
                  nodes={makeModule(data?.rolePermissionList)}
                  checked={checked}
                  expanded={expanded}
                  onCheck={(checked) => setChecked(checked)}
                  onExpand={(expanded) => setExpanded(expanded)}
                />
              )}

            <button
              type="button"
              className="btn btn-deep-primary toggle-class my-4 py-1"
              onClick={saveModule}
              disabled={data.isPending}
            >
              Assign Menu
              {data.isPending ? <Spinner animation="border" /> : null}
            </button>
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default ManagePermission;

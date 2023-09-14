import React, { useEffect, useState } from "react";
// import MenuDrawer from '../../../components/vendor/MenuDrawer';
import VendorLayout from "../../../layout/VendorLayout";
import { whsByPage } from "../../../store/actions/subUserAction";
import { useDispatch, useSelector } from "react-redux";
import { warehoseMap } from "../../../store/actions/vendor/warehouseList";
import axiosauth from "../../../api/axios-auth";
import FormSuccess from "../../../components/helper/FormSuccess";
import { useHistory } from "react-router-dom";

const WarehouseMapping = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.WHS_USER_INFO);
  const ware = useSelector((state) => state.WAREHOUSELIST);

  const [message, setMessage] = useState(null);
  const [assignUserId, setAssignUserId] = useState(null);
  const [subUserWarehouseMapList, setSubUserWarehouseMapList] = useState([]);
  const [myId, setMyId] = useState(null);

  console.log("myId--->", data);

  function getWarehouseByUserId(userId) {
    setAssignUserId(userId);

    try {
      axiosauth
        .get(
          `/api/v1/warehouses/warehousemapping?page=1&limit=100&user=${userId}`
        )
        .then((response) => {
          let res = JSON.parse(response.data);
          console.log("hhhhh",res)
          if (res.statusCode === 200) {
            var list = [];
            // eslint-disable-next-line
            var li = res?.data?.map((ware) => {
              list.push(ware.id);
              return ware;
            });

            setSubUserWarehouseMapList(list);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {});
    } catch (e) {}
  }

  useEffect(() => {
    dispatch(whsByPage());
    dispatch(warehoseMap(1));
  }, [dispatch]);

  const handleChange = (id) => {
    console.log("id-->", id);
    setMyId(new Date());
    if (subUserWarehouseMapList.indexOf(id) !== -1) {
      subUserWarehouseMapList.splice(subUserWarehouseMapList.indexOf(id), 1);
    } else {
      subUserWarehouseMapList.push(id);
    }
  };

  const handleSubmit = () => {
    let obj = {
      userId: parseInt(assignUserId),
      warehouses: subUserWarehouseMapList,
    };

    // if (assignUserId === null) {
    //   return 0;
    // }

    try {
      axiosauth
        .post(`/api/v1/user/warehousemapping`, obj)
        .then((response) => {
          let res = JSON.parse(response.data);
          console.log("hhhhhhhh",res)
          if (res.statusCode === 200) {
            setMessage(res);
          }
        })
        .catch((error) => {})
        .then(() => {
          console.log("-----always executes");
        });
    } catch (e) {}
  };

  useEffect(() => {
    if (data?.whsUserList && data.whsUserList.length > 0) {
      getWarehouseByUserId(data.whsUserList[0].id);

      try {
        axiosauth
          .get(
            `/api/v1/warehouses/warehousemapping?page=1&limit=100&user=${data.whsUserList[0].id}`
          )
          .then((response) => {
            let res = JSON.parse(response.data);
            if (res.statusCode === 200) {
              var list = [];
              // eslint-disable-next-line
              var li = res?.data?.map((ware) => {
                list.push(ware.id);
                return ware;
              });
              setSubUserWarehouseMapList(list);
            }
          })
          .catch((error) => {})
          .then(() => {
            console.log("-----always executes");
          });
      } catch (e) {}
    }
  }, [data.whsUserList]);

  return (
    <VendorLayout>
      {message?.statusCode === 200 && (
        <FormSuccess
          onClick={() => setMessage(null)}
          message={message?.message}
        />
      )}

      <div className="content-admin px-1">
        {/* <div className="row justify-content-end align-items-center sticky-top py-3 px-3 bg-lighter-blue">
          <MenuDrawer />
          <div className="py-3 col">
            <div className="input-group admin-search custom-shadow prepend w-100">
              <div className="input-group-prepend">
                <span className="input-group-text bg-white">
                  <button className="btn btn-lighter-blue p-0 size-30px"><i className="fas fa-search"></i></button>
                </span>
              </div>
              <input type="text" className="form-control h-100% toggle-className" placeholder="Search" data-target=".custom-search" data-toggle-classname="open" />
            </div>
          </div>
        </div> */}
        <div className="row align-items-center px-3 mx-0">
          <div className="col-12 pb-3 pt-3">
            <span
              onClick={() => history.goBack()}
              className="text-dark backButton h5"
            >
              <i className="fas fa-chevron-left mr-2"></i>Manage Warehouse
            </span>
          </div>
          <div className="col-12">
            <div className="row">
              <div className="col-12">
                <form className="">
                  <div className="form-group mb-4 mt-1">
                    <label for="inputPassword6" className="col-12 px-0">
                      Select User
                    </label>
                    <select
                      onChange={(e) =>
                        getWarehouseByUserId(parseInt(e.target.value))
                      }
                      value={parseInt(assignUserId)}
                      className="form-control form-control-md custom-select common-select-deep-blue rounded"
                    >
                      {/* <option value={""}>Select User</option> */}
                      {data.whsUserList &&
                        data.whsUserList?.data?.length > 0 &&
                        data.whsUserList?.data.map((user) => {
                          return (
                            <option value={user.id}>{user.firstName}</option>
                          );
                        })}
                    </select>
                  </div>
                </form>
              </div>
            </div>
            <div className="row p-3">
              <div className="col-12 bg-white table-responsive table-collapse-admin pt-3">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="w-100px bg-dark text-white py-2">S. No.</th>
                      <th className="bg-dark text-white py-2">Warehouse ID</th>
                      <th className="w-200px text-center bg-dark text-white py-2">Select</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ware?.listOfWarehouse?.data &&
                    ware?.listOfWarehouse.data.length > 0
                      ? ware?.listOfWarehouse.data
                          .filter((itm) => itm.warehouseId !== null)
                          .map((item, index) => (
                            <tr key={index}>
                              <td className="w-100px py-1">
                                <div className="btn border rounded px-0 h5 w-50px mb-0">
                                  {index + 1}
                                </div>
                              </td>
                              <td className="col-auto py-1">
                                <button className="btn border w-300px">
                                  {item?.warehouseId ?? "-"}
                                </button>
                              </td>
                              <td className="w-200px text-center py-1">
                                <div className="common-checkbox common-checkbox-dark position-relative mb-3 mx-auto d-inline-block">
                                  <input
                                    className="common-checkbox-input common-checkbox-dark-input"
                                    type="checkbox"
                                    value={item.id}
                                    id={`defaultCheck1${item.id}`}
                                    checked={subUserWarehouseMapList.includes(
                                      item.id
                                    )}
                                    onChange={(e) =>
                                      handleChange(parseInt(e.target.value))
                                    }
                                  />
                                  <label
                                    className="common-checkbox-label common-checkbox-dark-label mr-3"
                                    for={`defaultCheck1${item.id}`}
                                  ></label>
                                </div>
                              </td>
                            </tr>
                          ))
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row pt-1">
              <div className="col-auto ml-auto">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-deep-primary my-2 px-5"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default WarehouseMapping;

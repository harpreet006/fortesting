import React, { useEffect, useState } from "react";
import FormSuccess from "../../../components/helper/FormSuccess";
import Layout from "../../../layout/Layout";
import { whsByPage } from "../../../store/actions/subUserAction";
import { useDispatch, useSelector } from "react-redux";
import { warehoseMap } from "../../../store/actions/vendor/warehouseList";
import axiosauth from "../../../api/axios-auth";
import CustomerLayout from "../../../layout/CustomerLayout";

const WarehouseMapping = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.WHS_USER_INFO);
  const ware = useSelector((state) => state.WAREHOUSELIST);

  const [message, setMessage] = useState(null);
  const [assignUserId, setAssignUserId] = useState(null);
  const [subUserWarehouseMapList, setSubUserWarehouseMapList] = useState([]);
  const [myId, setMyId] = useState(null);

  console.log("myId--->", data);
  // console.log("llll",data.whsUserList[0].id)

  function getWarehouseByUserId(userId) {
    console.log("hello",userId)
    setAssignUserId(userId);

    try {
      axiosauth
        .get(
          `/api/v1/warehouses/warehousemapping?page=1&limit=100&user=${userId}`
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
        .catch((error) => {
          console.log(error);
        })
        .then(() => {});
    } catch (e) {}
  }

  useEffect(() => {
    dispatch(whsByPage(1, 1000));
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
    if(obj.warehouses.length===0){
      alert("Please select a warehouse ID")
      return 0;
    }
    console.log("hiiiiii",obj)

    // if (assignUserId === null) {
    //   return 0;
    // }

    try {
      axiosauth
        .post(`/api/v1/user/warehousemapping`, obj)
        .then((response) => {
          let res = JSON.parse(response.data);
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

  const neww = data.whsUserList
  console.log("neww",neww)
// console.log("lllllllllllllllllllll",Object.keys(neww).length)

  useEffect(() => {
    if (data?.whsUserList && Object.keys(neww).length > 0) {
      console.log("llll",neww.data[0].id)
      getWarehouseByUserId(neww.data[0].id);

      try {
        axiosauth
          .get(
            `/api/v1/warehouses/warehousemapping?page=1&limit=100&user=${neww.data[0].id}`
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

  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });


  return (
    <Layout>
      {message?.statusCode === 200 && (
        <FormSuccess
          onClick={() => setMessage(null)}
          message={message?.message}
        />
      )}

      <CustomerLayout title="Warehouse Mapping">
        <div className="row">
          <div className="content col-12">
            <div className="border-bottom d-sm-flex justify-content-between">
              <div>
                <p className="btn name-breadcrumb px-0 text-dark font-heading mr-3 py-0 mx-0 mb-1">
                  Warehouse Mapping
                </p>
              </div>
            </div>

            <div className="col-12">
              <div className="row">
                <div className="col-12">
                  <div className="form-group mb-0 mt-3">
                    <label for="inputPassword6" className="col-12 px-0">
                      Select User
                    </label>
                    <select
                  
                      onChange={(e) =>
                        
                        getWarehouseByUserId(parseInt(e.target.value))
                      }
                      value={parseInt(assignUserId)}
                      className="form-control form-control-md custom-select common-select-deep-blue w-100 rounded"
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
                </div>
              </div>
              <div className="row p-3">
                <div className="col-12 border table-responsive table-dashboard px-0 warehouse-mapping">
                  <table className="table">
                    <thead>
                      <tr className="theader">
                        <th>S. No.</th>
                        <th>Warehouse ID</th>
                        <th className="w-100px">Select</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ware?.listOfWarehouse?.data &&
                        ware?.listOfWarehouse.data.length > 0 &&
                        ware?.listOfWarehouse.data
                          .filter((itm) => itm.warehouseId !== null)
                          .map((item, index) => (
                            <tr
                              key={index}
                              className={`${
                                index % 2 !== 0 ? "firstRow" : "secondRow"
                              }`}
                            >
                              <td className="p-2">{index + 1}</td>
                              <td>{item?.warehouseId ?? "-"}</td>
                              <td>
                                <div className="common-checkbox common-checkbox-dark">
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
                                    className="common-checkbox-label common-checkbox-dark-label"
                                    for={`defaultCheck1${item.id}`}
                                  ></label>
                                </div>
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row pt-1">
                <div className="col-auto ml-auto" style={{cursor:"pointer"}}>
                  <button
                  style={{cursor:"pointer"}}
                    type="button"
                    onClick={handleSubmit}
                    className="btn btn-deep-primary w-100 px-5 my-2 "
                  >
                    Save
                  </button>
                </div>
                
              </div>
            </div>
            {/* <div className="row my-4">
              <div className="col-12 text-right">
                <button className="btn btn-deep-primary">Save</button>
              </div>
            </div> */}
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default WarehouseMapping;

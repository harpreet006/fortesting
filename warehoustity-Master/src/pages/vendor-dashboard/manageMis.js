import React, { useEffect } from "react";
import VendorLayout from "../../layout/VendorLayout";
import { Link, useHistory } from "react-router-dom";
import { misBookingByPage } from "../../store/actions/misAction";
import { useDispatch, useSelector } from "react-redux";
import { ItemNotFlund } from "../../components/helper/CustomLoader";

const ManageMis = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.MIS_INFO);

  useEffect(() => {
    dispatch(misBookingByPage(1));
  }, [dispatch]);

  return (
    <VendorLayout>
      <div className="content-admin px-1 py-2">
        <div className="row align-items-center px-3 mx-0">
          <div className="col-12 col-sm-6 col-md-6 col-lg-6 pb-1 px-0 d-flex justify-content-between">
            <h5 className="backButton text-dark ">
              <i
                onClick={() => history.goBack()}
                className="fas fa-chevron-left mr-2 cursorPointer"
              ></i>{" "}
              Manage MIS
            </h5>
          </div>

          <div className="col-12 text-nowrap table-responsive table-gray-admin bg-white py-2">
            {items?.misBookingList?.data &&
            items?.misBookingList?.data.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-center bg-dark text-white py-2 px-2">S.No</th>
                    <th className="text-nowrap bg-dark text-white py-2 px-2">Booking ID</th>
                    <th className="text-nowrap bg-dark text-white py-2 px-2 ">Warehosue ID</th>
                    <th className="bg-dark text-white py-2 px-2 ">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items?.misBookingList?.data.map((item, index) => {
                    return (
                      <tr>
                        <td className="text-center py-2">{index + 1}.</td>
                        <td>BK{item?.id}</td>
                        <td>{item?.warehouse?.warehouseId?.slice(0, 7)}</td>
                        <td>
                          <Link
                            to={`/vendor/managemis/${item?.id}?warehouseId=${item?.warehouse?.id}&customer=${item?.customer?.id}`}
                            className="text-nowrap text-dark font-weight-bold  py-2 mb-0"
                          >
                            Manage
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <ItemNotFlund message={`No Data Available`} />
            )}
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default ManageMis;

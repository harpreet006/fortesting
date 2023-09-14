import React, { useEffect, useState } from "react";
import Layout from "../../../layout/Layout";
import { useHistory, Link } from "react-router-dom";
import CustomerLayout from "../../../layout/CustomerLayout";
import axios from "../../../api/axios-auth";


import {
  getAllCart,
  deleteCartItem,
  responseCart,
} from "../../../store/actions/customer/cartAction";
import { useSelector, useDispatch } from "react-redux";
import {
  CardLoader,
  ItemNotFlund,
} from "../../../components/helper/CustomLoader";
import { useToasts } from "react-toast-notifications";
import axiosauth from "../../../api/axios-auth";
import { confirmAlert } from "react-confirm-alert";
// import Pagination from "react-js-pagination";
import ReactPaginate from "react-paginate";
import BrowserTitle from "../../../components/helper/BrowserTitle";
import { initialRfqByIdAndType, statusRfqById } from "../../../store/actions/customer/rfqAction";
import { RFQ_FIRST_FORM } from "../../../store/types";
import { CUSTOMER_RFQ_INFO } from "../../../store/reducers/customer/rfqReducer";

const ITEM_COUNT_PER_PAGE = 10;


const Cart = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.CARTINFO);
  const read = useSelector((state) => state.SIDEMENU_INFO.read_only);
  const fdata = useSelector((state) => state);
  const [populatedData, setPopulateData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const { addToast } = useToasts();
  const rfqData = useSelector((state) => state.CUSTOMER_RFQ_INFO);
  const submitHandle=(item)=>{
    let wareList = [];
    // CUSTOMER_RFQ_INFO.RFQ_FIRST_FORM.warehouses = [item]
    // console.log("CUSTOMER_RFQ_INFO.RFQ_FIRST_FORM.warehouses",RFQ_FIRST_FORM.warehouses)
    

// Define an action creator function that takes the updated value of warehouses as an argument


    let jsonData = {

      warehouseSpaceRequired: 0,
      warehouses: [item.id],
      location:{
        city: {
          name: item.warehouseContactDetailInfo.address.district,
        },
        area: {
          name: item.warehouseContactDetailInfo.address.state,
        },
      },
    }; 
    axios
    .post(`/api/v1/customerrfq`, jsonData)
    .then((response) => {
      let res = JSON.parse(response.data);
      console.log(res, "response1")
      if (res.statusCode === 200) {
        
        console.log("itemi",item)
        // if (unique.length === i + 1) {
        //   setRfqLoad(false);
        //   if (isConcise) {
        //     history.replace(`/conciserfq/${res.data.id}`);
        //   } else {
        //     history.replace(`/managerfq?page=1`);
        //   }
        // }
        // history.replace(`/createnewrfq?rfqid=${res.data.id}&hide=${true}`)
   
          // history.replace(`/conciserfq/${res.data.id}`);
          console.log("jj",res.data.id)
          
          history.replace(`/conciserfq?rfqid=${res.data.id}&hide=false`)
          dispatch(initialRfqByIdAndType(res.data.id, "customerRfq",item))
          
          // dispatch(statusRfqById(res.data.id)) // history.replace({ pathname: `/conciserfq?`, search: '?rfqid=${res.data.id}&hide=false', state:{isActive: false}});
          // dispatch({ payload: res, type: "rfqFirstForm" });
        
      }
    })
    .catch((error) => { })
    .then(() => {
      // setRfqLoad(false);
      console.log("-----always executes");
    });
  }
  const addToFavorite = (id) => {
    if (fdata.authenticated) {
      try {
        axiosauth
          .post(`/api/v1/user/addfavoriteswarehouse/${id}`)
          .then((response) => {
            let res = JSON.parse(response.data);
            if (res.statusCode === 200) {
              addToast("Added to Favorite", {
                appearance: "success",
                autoDismiss: true,
              });
              let cardData = {
                warehouses: [id],
              };
              dispatch(deleteCartItem(cardData));
            }
          })
          .catch((error) => {})
          .then(() => {});
      } catch (e) {}
    } else {
      addToast("Please Login", { appearance: "error", autoDismiss: true });
    }
  };

  const deleteCart = (id) => {
    confirmAlert({
      // title: 'Confirm to submit',
      message: "Would you rather",
      buttons: [
        {
          label: "Move to Favorite",
          onClick: () => {
            addToFavorite(id);
          },
        },
        {
          label: "Delete",
          onClick: () => {
            let cardData = {
              warehouses: [id],
            };
            dispatch(deleteCartItem(cardData));
          },
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  useEffect(() => {
    dispatch(getAllCart());
  }, [dispatch]);

  useEffect(() => {
    setPopulateData(
      data.cartList?.data?.warehouses?.slice(0, ITEM_COUNT_PER_PAGE)
    );
  }, [data]);

  console.log("hi",populatedData)

  const cartResponse = () => {
    addToast("Removed from cart", { appearance: "error", autoDismiss: true });
    dispatch(responseCart(null));
  };

  const handlePageChange = (pageNumber) => {
    const pNumber = pageNumber['selected']+1
    console.log("pNumber-->", pNumber)
    if (data.cartList?.data?.warehouses?.length > 0) {
      setPopulateData(
        data.cartList?.data?.warehouses.slice(
          (pNumber - 1) * ITEM_COUNT_PER_PAGE,
          (pNumber - 1) * ITEM_COUNT_PER_PAGE + ITEM_COUNT_PER_PAGE
        )
      );
      setActivePage(pNumber);
    }
  };
  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });

  return (
    <Layout>
      {/* {data && data?.cartResponse ? (
        <FormSuccess
          onClick={cartResponse}
          message={"Item Deleted Successfully!"}
        />
      ) : null} */}
      <BrowserTitle title="Cart" />

      {data && data?.cartResponse && cartResponse()}

      <CustomerLayout title="My Cart">
        <div className="row">
          <div className="content col-12 shadow-sm">
            <div className="border-bottom mb-3 d-sm-flex justify-content-between fixed-top-height">
              <button className="btn px-0 text-dark font-weight-bold mr-3 ">
                <i
                  onClick={() => history.goBack()}
                  className="fas fa-chevron-left pr-3"
                ></i>
                My Cart
              </button>
            </div>

            {data.isLoading ? (
              <CardLoader />
            ) : (
              <>
                <div className="row px-3 mb-3">
                  <div className="col-12 border table-responsive table-dashboard px-0">
                    {populatedData?.length > 0 ? (
                      <table className="table table-bordered">
                        <thead>
                          <tr className="theader">
                            <th>Sr.No.</th>
                            <th className="text-nowrap">Warehouse ID</th>
                            <th>Location</th>
                            <th className="text-nowrap">WH Category</th>
                            <th className="text-nowrap">WH Type</th>
                            <th className="text-nowrap">Book Noww</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {populatedData.map((item, index) => {

                            console.log("populatedData",populatedData)
                            return (
                              <tr
                                key={index}
                                className={`${
                                  index % 2 !== 0 ? "firstRow" : "secondRow"
                                }`}
                              >
                                {console.log(index, "check index======")}
                                <td>{index + 1}</td>
                                {/* <td>
                                  <Link to={`/wh-detail/${item.id}`}>
                                    <img
                                      className="size-60px img-fluid rounded"
                                      src={
                                        item?.warehouseImagesInfo?.coverImage
                                          ?.url
                                      }
                                      alt="warehouse"
                                    />
                                  </Link>
                                </td> */}
                                <td>{item?.warehouseId}</td>
                                <td className="text-capitalize text-nowrap">
                                  {item.warehouseContactDetailInfo?.address
                                    ?.district +
                                    " " +
                                    item.warehouseContactDetailInfo?.address
                                      ?.state}
                                </td>
                                <td className="text-capitalize text-nowrap">
                                  {item.category?.categoryName}
                                </td>
                                <td className="text-capitalize text-nowrap">
                                  {item.type?.type}
                                </td>

                                {/* <td>
                                  <Link
                                    to={`/rfq-create?wareId=${
                                      item.id
                                    }&hide=${true}`}
                                    type="button"
                                    className={`btn btn-block btn-dark px-1 py-0 text-nowrap rounded-pill px-3 fs-15px ${
                                      read ? "d-none" : ""
                                    }`}
                                  >
                                    Book Now
                                  </Link>
                                </td> */}
                                <td>
                                  <Link
                                  //   to={`/conciserfq/${
                                  //     item.id
                                  //   }
                                  //   `
                                  // }
                                  //   type="button"
                                  //   className={`btn btn-block btn-deep-primary px-1 py-0 text-nowrap rounded-pill px-3  ${
                                  //     read ? "d-none" : ""
                                  //   }`}
                                  //   style={{
                                  //     fontSize:"14px"
                                  //   }}

                                  to={`/conciserfq?rfqid=${rfqData?.rfqFirstForm?.id}&hide=false`}
                                    type="button"
                                    onClick={()=>{submitHandle(item)}}
                                    className={`btn btn-block btn-deep-primary px-1 py-0 text-nowrap rounded-pill px-3 fs-15px ${
                                      read ? "d-none" : ""
                                    }`}
                                  >
                                    Book Now
                                  </Link>
                                </td>
                                <td className="text-center text-nowrap">
                                  <Link
                                    to={`/wh-detail/${item.id}`}
                                    className={`fas fa-eye actionIconView pr-3`}
                                  ></Link>

                                  <i
                                    onClick={() => deleteCart(item.id)}
                                    className={`fas fa-trash-alt actionIconDelete text-dark ${
                                      read ? "d-none" : ""
                                    }`}
                                  ></i>

                                  {/* <i
                                  onClick={() => addToFavorite(item.id)}
                                  // onClick={()=>deleteCart(item.id)}
                                  className={`fas fa-heart text-danger cursorPointer ${
                                    read ? "d-none" : ""
                                  }`}
                                ></i> */}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    ) : (
                      <ItemNotFlund
                        loaderCard="loaderCard"
                        message={`Cart is Empty`}
                      />
                    )}
                  </div>
                </div>
                {data.cartList?.data?.warehouses?.length > 0 && (
                  <div className="pagination-custom">
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel=">"
                      onPageChange={handlePageChange}
                      pageCount={Math.ceil(data.cartList?.data?.warehouses?.length / ITEM_COUNT_PER_PAGE)}
                      previousLabel="<"
                      renderOnZeroPageCount={null}
                      pageRangeDisplayed={ITEM_COUNT_PER_PAGE}
                      marginPagesDisplayed={2}
                      forcePage={activePage - 1}
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      breakClassName="page-item"
                      breakLinkClassName="page-link"
                      containerClassName="pagination"
                      activeClassName="active"
                    />

                    {/* <Pagination
                      activePage={activePage}
                      itemsCountPerPage={ITEM_COUNT_PER_PAGE}
                      totalItemsCount={data.cartList?.data?.warehouses?.length}
                      pageRangeDisplayed={1}
                      onChange={handlePageChange}
                      prevPageText={<i className="fas fa-chevron-left" />}
                      nextPageText={<i className="fas fa-chevron-right" />}
                      hideFirstLastPages={true}
                    /> */}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default Cart;

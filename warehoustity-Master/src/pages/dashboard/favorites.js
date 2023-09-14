import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useHistory, Link } from "react-router-dom";
import FavoriteCard from "../../components/dashboard/FavoriteCard";
import CustomerLayout from "../../layout/CustomerLayout";
import { favoriteByPage } from "../../store/actions/customer/favoriteAction";
import { useSelector, useDispatch } from "react-redux";
import { CardLoader, ItemNotFlund } from "../../components/helper/CustomLoader";
import BrowserTitle from "../../components/helper/BrowserTitle";
import Pagination from "react-js-pagination";
import { useToasts } from "react-toast-notifications";

const ITEM_COUNT_PER_PAGE = 500;

const Favorite = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector((state) => state.FAVORITEINFO);
  const read = useSelector((state) => state.SIDEMENU_INFO.read_only);
  const { addToast } = useToasts();

  const [populatedData, setPopulateData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [compareWhId, setCompareWhId] = useState([]);

  const cartHandle = (e) => {
    if (compareWhId?.includes(parseInt(e.target.value))) {
      setCompareWhId(compareWhId.filter(item => item !== parseInt(e.target.value)))
      console.log("if block")
    } else if(compareWhId.length<4){
      console.log("else block")
      setCompareWhId([...compareWhId, parseInt(e.target.value)]);
    }else{
      addToast("You con't select more then 4 warehouse", { appearance: "error", autoDismiss: true });
    }
  };

  useEffect(() => {
    dispatch(favoriteByPage());
  }, [dispatch]);

  useEffect(() => {
    setPopulateData(
      data.favoriteList?.data?.favoritesWarehouses?.slice(
        0,
        ITEM_COUNT_PER_PAGE
      )
    );
  }, [data]);

  const handlePageChange = (pageNumber) => {
    if (data.favoriteList?.data?.favoritesWarehouses?.length > 0) {
      setPopulateData(
        data.favoriteList.data.favoritesWarehouses.slice(
          (pageNumber - 1) * ITEM_COUNT_PER_PAGE,
          (pageNumber - 1) * ITEM_COUNT_PER_PAGE + ITEM_COUNT_PER_PAGE
        )
      );
      setActivePage(pageNumber);
    }
  };

  // useEffect(() => {
  //   dispatch(getAllCart());
  // }, [dispatch]);

  useEffect(() => {
    document.getElementsByTagName("footer")[0].classList.add("d-none");
  });


  return (
    <Layout>
      <BrowserTitle title="favorite" />
      <CustomerLayout title="favorite">
        <div className="row">
          <div className="content col-12 shadow-sm">
            <div className="border-bottom d-sm-flex justify-content-between fixed-top-height">
              <button className="btn px-0 text-dark font-weight-bold mr-3">
                <i
                  onClick={() => history.goBack()}
                  className="fas fa-chevron-left pr-3"
                ></i>
                My Favourite
              </button>
            </div>
            <div className="row">
              <div className="col-12">
                {data.isLoading ? (
                  <CardLoader />
                ) : (
                  <>
                    <div className="row">
                      {populatedData?.length > 0 ? (
                        populatedData.map((item, index) => {
                          return (
                            <FavoriteCard
                              key={index}
                              index={(activePage - 1) * 10 + (index + 1)}
                              item={item}
                              read={read}
                              cartHandle={cartHandle}
                              compareWhId={compareWhId}
                            />
                          );
                        })
                      ) : (
                        <ItemNotFlund
                          mtop="mt-5"
                          message={`Favorite is Empty`}
                        />
                      )}
                    </div>

                    {data.favoriteList?.data?.favoritesWarehouses?.length >
                      0 && (
                      <div className="pagination-custom d-none">
                        <Pagination
                          activePage={activePage}
                          itemsCountPerPage={ITEM_COUNT_PER_PAGE}
                          totalItemsCount={
                            data.favoriteList.data.favoritesWarehouses.length
                          }
                          pageRangeDisplayed={5}
                          onChange={handlePageChange}
                          prevPageText={<i className="fas fa-chevron-left" />}
                          nextPageText={<i className="fas fa-chevron-right" />}
                          hideFirstLastPages={true}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* compare button */}

            <div className="col-lg-7 text-center order-md-3 py-3">
            {compareWhId && compareWhId.length === 1 ? (
                <Link
                  to={`/warehousecompare?wh1=${compareWhId[0]}&wh2=${compareWhId[1]}`}
                >
                  <button
                    type="button"
                    className="btn btn-deep-primary cursorPointer myBtn"
                    disabled={true}
                  >
                    {compareWhId?.length} - Compare Now
                  </button>
                </Link>
              ) : null}

              {compareWhId && compareWhId.length === 2 ? (
                <Link
                  to={`/warehousecompare?wh1=${compareWhId[0]}&wh2=${compareWhId[1]}`}
                >
                  <button
                    type="button"
                    className="btn btn-deep-primary cursorPointer myBtn"
                  >
                    {compareWhId?.length} - Compare Now
                  </button>
                </Link>
              ) : null}

              {compareWhId && compareWhId.length === 3 ? (
                <Link
                  to={`/warehousecompare?wh1=${compareWhId[0]}&wh2=${compareWhId[1]}&wh3=${compareWhId[2]}`}
                >
                  <button
                    type="button"
                    className="btn btn-deep-primary cursorPointer myBtn"
                  >
                    {compareWhId?.length} - Compare Now
                  </button>
                </Link>
              ) : null}
              {compareWhId && compareWhId.length === 4 ? (
                <Link
                  to={`/warehousecompare?wh1=${compareWhId[0]}&wh2=${compareWhId[1]}&wh3=${compareWhId[2]}&wh4=${compareWhId[3]}`}
                >
                  <button
                    type="button"
                    className="btn btn-deep-primary cursorPointer myBtn"
                  >
                    {compareWhId?.length} - Compare Now
                  </button>
                </Link>
              ) : null}
            </div>

            {/* end of compare button */}
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default Favorite;

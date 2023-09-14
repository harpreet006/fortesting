import React, { useEffect } from "react";
import Layout from "../../layout/Layout";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { whyById } from "../../store/actions/whyAction";
import { CardLoader } from "../../components/helper/CustomLoader";

const WhyWarehousity = () => {
  const { whyId } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.WHY_INFO);

  useEffect(() => {
    dispatch(whyById(whyId));
  }, [dispatch, whyId]);

  return (
    <Layout>
      <div className="container px-sm-0 py-3">
        <nav
          className=""
          aria-label="breadcrumb"
          style={{ marginTop: "5rem", width: 300 }}
        >
          <ol className="breadcrumb h5 common-breadcrumb text-gray mb-0">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Why Warehousity
            </li>
          </ol>
        </nav>
      </div>

      {data.isLoading ? (
        <CardLoader />
      ) : (
        <section className="about-deatail py-1">
          {/* <div className="container">
            <div className="row align-items-center mx-auto">
              <div className="col-md-7 pl-0">
                <div className="section-heading col-xl-9 pl-0">
                 
                </div>
              </div>
            </div>
          </div> */}

          <div className="container" style={{ minHeight: "50vh" }}>
            {/* <h6><b>Title: </b>Why Warehousity</h6> */}
            {/* <h6 className="text-center font-weight-bold">
              {" "}
            <u>  Warehousity creates SMARTER supply chain for your business -
              something which is</u>
            </h6> */}
            <h3 className="main-heading font-weight-bold text-capitalize">
              {data.whyDetail?.title}
            </h3>
            <div className="row">
              <div className="col-12">
                <div>
                  <p className="mb-4">{data.whyDetail?.description}</p>
                </div>
              </div>

              {/* <div className="col-3">
                <img
                  src={data.whyDetail?.image}
                  alt="warehosueimage"
                  className="col-md-9 ml-auto"
                  style={{ width: 250, height: 150 }}
                />
              </div> */}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default WhyWarehousity;

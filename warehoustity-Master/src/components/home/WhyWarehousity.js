import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { whyByPage } from "../../store/actions/whyAction";

const WhyWarehousity = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.WHY_INFO);

  useEffect(() => {
    dispatch(whyByPage({ page: 1, limit: 6 }));
  }, [dispatch]);

  return (
    <section
      className={`why-warehouse mt-5 ${
        data.whyList?.totalCount !== 0 ? "" : "d-none"
      }`}
    >
      <div className="container">
        <div className="row section-heading text-center pt-4">
          <div className="col-md-8 mx-auto text-center">
            <h3 className="text-white whyWarehouse">Why Warehousity</h3>
            <p className="text-white">
            It's a Technology Enabled <strong> Omni-channel Fulfilment Engine </strong>
             to manage all your <strong> warehousing & shipping </strong> 
             from a <strong>single screen </strong> including checking the
             <strong> health</strong> of your Network !
            </p>
          </div>
        </div>
        <div className="row">
          {data.whyList?.data && data.whyList.data.length > 0
            ? data.whyList.data.map((item, index) => {
                return (
                  <div key={index} className="col-lg-4 col-sm-6 my-3">
                    <div className="card custom-card2">
                      <div className="icon-holder d-flex justify-content-start">
                        <div className="img-holder">
                          <img
                            src={item.image}
                            alt="warehouse"
                            className="size-100px"
                          />
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="pb-3 h5 heading1 onHoverTest text-center font-weight-bold">
                          {item.title}
                        </div>
                        <div className="pb-3 h5 heading2 onHoverTest text-left font-weight-bold">
                          {item.title}
                        </div>
                        <p className="card-text pr-4 text-left onHoverTest">
                          {item.description.substring(0, 90)}...
                          <br/>
                          <Link
                            to={`/whywarehousity/${item.id}`}
                            className="onHoverTest text-lowercase"
                            style={{fontSize:14}}
                          >
                            read more <i class="fas fa-arrow-right" style={{fontSize:10}}></i>
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>

      <div className="bg-overlay"></div>
    </section>
  );
};

export default WhyWarehousity;

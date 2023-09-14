import React from "react";
import { signUpPopup } from "../../store/actions/commanAction";
import { useDispatch } from "react-redux";

const WarehouseStatic = () => {
  const dispatch = useDispatch();
  return (
    <section className="bg-deep-gray staticBanner my-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-4">

          </div>
          <div className="col-md-3 col-3">
            <button
              onClick={() => dispatch(signUpPopup(3))}
              className="btn btn-deep-primary staticButton"
            >
              Get Started
            </button>
          </div>
          {/* <div className="col-md-4">
            <div className="img-holder col-lg-8 mx-auto"><img src={"/assets/images/warehouse-clipart.png"} alt="warehouse" className="img-fluid w-100"/></div>
          </div>
          <div className="col-md-6 section-heading">
            <p className="text-gray mb-2"> Rent your property </p>
            <h4 className="mb-3"> List your warehouse for free </h4>
            <div className="mb-4">
              <ul className="pl-3 text-gray">
                <li className="mb-2">
                  List your warehouse hassle free.
                </li>
                <li className="mb-2"> Great Deals</li>
                <li className="mb-2"> Easy monthly/yearly payments </li>
              </ul>
            </div>
            <div className="text-center">
              <button
                onClick={() => dispatch(signUpPopup(3))}
                className="btn btn-deep-primary staticButton"
              >
                Get Started
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default WarehouseStatic;

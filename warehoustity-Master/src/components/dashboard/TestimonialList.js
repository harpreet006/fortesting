import React from "react";

const TestimonialList = ({ item }) => {
  return (
    <div className="card bordertransparent">
      <div className="card-body text-center">
        <div className="card-content pt-1" style={{ height: "12rem" }}>
          <div className="text-start">
          <i className="fas fa-quote-left text-deep-primary fa-2x"></i>

          </div>
          <p className="text-gray py-2 mb-0">{item?.description}</p>
        </div>
        <div className="d-flex">
          <div className="icon-holder d-flex justify-content-center">
            <div className="img-holder rounded-circle" >
              <img
                src={item?.image}
                alt="images"
                // className="img-fluid"
                style={{ borderRadius:"50%", width:"50px", height:"50px", objectFit:"fill" }}
              />
            </div>
          </div>
          <div className="text-align-left pl-3">
            <h5 className="card-title text-capitalize text-start mb-0">
              {item?.user.firstName + " " + item?.user.lastName}
            </h5>
            <p className="cart-text text-gray text-start">{item?.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialList;

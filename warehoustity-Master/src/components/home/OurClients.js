import React from "react";

const OurClients = () => {
  let images = [
    "Goodyear Lubricants.png",
    "Falken Tyres.png",
    "Dhampur.png",
    "B9-Beverages.png",
    "Symphony Limited.png",
    "Orient Bell Ltd.png"
  ];
  return (
    <div className="sectionWidth py-5">
      <div className="row section-heading">
        <div className="col-12 ">
          <h2 className="largHeading text-center mb-3">Brands that Trust us</h2>
          {/* <span className="mt-2">View All</span> */}
        </div>
      </div>
      <div className="container">
        {/* <img src={`https://images.pexels.com/photos/1162361/pexels-photo-1162361.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`} alt="our client" /> */}
        <div className="row">
          {images?.length > 0 &&
            images.map((image, index) => (
              <div key={index} className="col-md-2 col-6 mb-3">
               <div className="card rounded-0 border p-4" 
               style={{height:"100px", boxShadow:"0 6px 10px #eaeaea"}}>
                <div className="h-100 d-flex">
                <img
                  src={`/assets/images/clients/${image}`}
                  alt="our client"
                  style={{objectFit:"content"}}
                  className="w-100 align-self-center"
                />
                </div>
               </div>
              </div>
            ))} 
        </div>
        <div className="row">
          {images?.length > 0 &&
            images.map((image, index) => (
              <div key={index} className="col-md-2 col-6 mb-3">
               <div className="card rounded-0 border p-4" 
               style={{height:"100px", boxShadow:"0 6px 10px #eaeaea"}}>
                <div className="h-100 d-flex">
                <img
                  src={`/assets/images/clients/${image}`}
                  alt="our client"
                  style={{objectFit:"content"}}
                  className="w-100 align-self-center"
                />
                </div>
               </div>
              </div>
            ))} 
        </div>
      </div>
    </div>
  );
};

export default OurClients;

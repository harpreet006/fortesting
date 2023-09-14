import React from 'react';
import Spinner from 'react-bootstrap/Spinner'


export const CardLoader = ({loaderCard}) => {
  return (
    <div className={`card ${loaderCard ? "loaderCard" : "loaderCard7"} d-flex ml-auto mr-auto border-0 shadow`}>
        <div className="card-body text-center font-weight-bold">
        <Spinner animation="border" role="status"/>
       <span className="ml-1"> Loading...</span>
        </div>
    </div>
  );
}


export const ItemNotFlund = ({loaderCard, message, mtop=""}) => {
  return (
    <div className={`card ${loaderCard ? "loaderCard" : "NoItemCard"} ${mtop || ""} d-flex ml-auto mr-auto border-0 shadow`}>
        <div className="card-body text-center font-weight-bold">
       <span className="ml-1"> {message}</span>
        </div>
    </div>
  );
}


 const CustomLoader = () => {
  return (
    <div className="text-center justify-content-center" >
    <div className="custom-loader">
        <Spinner animation="border" />
    </div>
    </div>
  );
}

export default CustomLoader;

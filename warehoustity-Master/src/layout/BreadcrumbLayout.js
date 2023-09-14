import React from 'react';
import {Link} from 'react-router-dom';

const BreadcrumbLayout = (props) => {
  return (
   
    <div>
        <div className="container-fluid mt-5">
          <div className="row align-items-start justify-content-start">
            <div className="col-auto py-3">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb common-breadcrumb text-dark mb-0">
                  <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">{props.title}</li>
                </ol>
              </nav>
            </div>
            {props.children}
          </div>
        </div>
      </div>

  );
}

export default BreadcrumbLayout;

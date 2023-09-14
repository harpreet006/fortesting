import React, {useEffect} from 'react';
import Menu from '../menu';
import { Link } from 'react-router-dom'

const ViewUserLog = () => {
    useEffect(() => {
    });
    return(
        <main className="page-wrapper">

      <div className="row">
        <div className="col-auto">
          <Menu />
        </div>
        <div className="content-admin px-5">
          <div className="row align-items-center py-3 px-3 mx-0"> 
            <div className="col-12 py-3 mt-4">
              <h5 className="text-dark">Logs</h5>
            </div>
            <div className="col-12 mx-auto mt-4">
              <div className="row p-5 bg-deep-gray mx-0"> 
                <div className="col-11 mx-auto py-3 border h-320px">
                  
                </div> 
              </div>
            </div>
            <div className="col-12 mx-auto mt-4">
              <div className="row p-3"> 
                <div className="col-12 px-0">
                  <Link to={"/vendor/managesubuser"} className="btn btn-deep-blue my-4">Back</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
 
    </main>

    )
}

export default ViewUserLog;
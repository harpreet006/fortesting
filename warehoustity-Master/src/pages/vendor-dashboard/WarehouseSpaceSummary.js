import React from 'react';
import {Link} from 'react-router-dom';
import VendorLayout from '../../layout/VendorLayout';
import MenuDrawer from '../../components/vendor/MenuDrawer';

const WarehouseSpaceSummary = () => {
  return (
    <VendorLayout>
     
    <div className="content-admin px-5">
    <div className="row justify-content-end align-items-center sticky-top py-3 px-3 bg-lighter-blue">
    

<MenuDrawer />
  
      {/* <div className="py-3 col">
        <div className="input-group admin-search prepend w-100"> 
          <div className="input-group-prepend">
            <span className="input-group-text bg-white">
              <button className="btn btn-lighter-blue p-0 size-30px"><i className="fas fa-search"></i></button>
            </span>
          </div>
          <input type="text" className="form-control h-100% toggle-class" placeholder="Search" data-target=".custom-search" data-toggle-class="open" data-event/>
        </div>
      </div> */}
    </div>



    <div className="row justify-content-end align-items-center py-3 px-3 mx-0">
      <div className="col-12 bg-white custom-shadow p-3 mb-4  tabs-scroll">
        <ul className="nav nav-pills admin-tabs-blue" id="pills-tab" role="tablist">
        <li className="nav-item">
            <Link to="/vendor" className="nav-link  text-uppercase">warehouse summary</Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/vendor/space-summary" className="nav-link vendorActive text-uppercase">space summary</Link>
          </li> */}
          <li className="nav-item">
            <Link to="/vendor/demograpgy-summary" className="nav-link text-uppercase">Demographics summary</Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/vendor/wms" className="nav-link text-uppercase">wms</Link>
          </li> */}
        </ul>
      </div>
      <div className="col-12 px-0 pt-3">
        <div className="tab-content" id="pills-tabContent">

        
          {/* <div className="tab-pane fade show active" id="pills-warehouse-summary" role="tabpanel" aria-labelledby="pills-warehouse-summary-tab">
            <div className="dashboard-cards row">
              <div className="col-xl-3 col-lg-4 col-sm-6 mb-4 d-flex">
                <div className="dashboard-card bg-deep-gray2 custom-shadow w-100 rounded">
                  <div className="card-body py-xxl-5 py-4 px-4">
                    <p className="mb-3 font-heading">Total Warehouses</p>
                    <h4 className="h1 mb-0">232</h4>
                  </div>
                </div>
              </div> 
              <div className="col-xl-3 col-lg-4 col-sm-6 mb-4 d-flex">
                <div className="dashboard-card bg-deep-gray2 custom-shadow w-100 rounded">
                  <div className="card-body py-xxl-5 py-4 px-4">
                    <p className="mb-3 font-heading">General Warehouses</p>
                    <h4 className="h1 mb-0">30</h4>
                  </div>
                </div>
              </div> 
              <div className="col-xl-3 col-lg-4 col-sm-6 mb-4 d-flex">
                <div className="dashboard-card bg-deep-gray2 custom-shadow w-100 rounded">
                  <div className="card-body py-xxl-5 py-4 px-4">
                    <p className="mb-3 font-heading">FTWZ</p>
                    <h4 className="h1 mb-0">40</h4>
                  </div>
                </div>
              </div> 
              <div className="col-xl-3 col-lg-4 col-sm-6 mb-4 d-flex">
                <div className="dashboard-card bg-deep-gray2 custom-shadow w-100 rounded">
                  <div className="card-body py-xxl-5 py-4 px-4">
                    <p className="mb-3 font-heading">Custom Bonded</p>
                    <h4 className="h1 mb-0">142</h4>
                  </div>
                </div>
              </div> 
            </div>
            <form action="">
              <div className="form-group row align-items-center px-3 mt-5">
                <label htmlFor="inputEmail3" className="h5 mb-3">WAREHOUSE LISTING</label>
                <div className="col-auto">
                  <select className="custom-select common-select-deep-blue mb-3 w-160px border-0 pr-3 custom-shadow">
                    <option selected>All</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            </form>
            <div className="row">
              <div className="col-12 table-responsive table-row-border-admin">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="mw-200px">Warehouse ID</th>
                      <th className="mw-200px">Date</th>
                      <th className="mw-200px">Status</th>
                      <th></th> 
                    </tr>
                  </thead>
                  <tbody>
                    <tr> 
                      <td className="font-weight-bold">ACDHEFRJ</td>
                      <td>22/08/2020</td>
                      <td className="col">Registered</td>
                      <td><Link to="/vendor" className="btn text-nowrap text-deep-blue font-weight-bold px-1">View Details</Link></td> 
                    </tr> 
                    <tr> 
                      <td className="font-weight-bold">ACDHEFRJ</td>
                      <td>22/08/2020</td>
                      <td className="col">Registered</td>
                      <td><Link to="/vendor" className="btn text-nowrap text-deep-blue font-weight-bold px-1">View Details</Link></td> 
                    </tr> 
                    <tr> 
                      <td className="font-weight-bold">ACDHEFRJ</td>
                      <td>22/08/2020</td>
                      <td className="col">In Process</td>
                      <td><Link to="/vendor" className="btn text-nowrap text-deep-blue font-weight-bold px-1">View Details</Link></td> 
                    </tr> 
                    <tr> 
                      <td className="font-weight-bold">ACDHEFRJ</td>
                      <td>22/08/2020</td>
                      <td className="col">In Process</td>
                      <td><Link to="/vendor" className="btn text-nowrap text-deep-blue font-weight-bold px-1">View Details</Link></td> 
                    </tr>  
                  </tbody>
                </table>
              </div>
            </div>
          </div> */}



          <div className="tab-pane fade show active" id="pills-space-summary" role="tabpanel" aria-labelledby="pills-space-summary-tab">
            <div className="dashboard-cards row">
              <div className="col-xl-3 col-lg-4 col-sm-6 mb-4 d-flex">
                <div className="dashboard-card bg-white custom-shadow w-100 rounded">
                  <div className="card-body py-xxl-5 py-3 px-4">
                    <p className="mb-2 font-heading">Total Space Registered</p>
                    <h4 className="h3 mb-0">1500 <small className="font-heading">sq.ft</small></h4>
                  </div>
                </div>  
              </div>
              <div className="col-xl-3 col-lg-4 col-sm-6 mb-4 d-flex">
                <div className="dashboard-card bg-white custom-shadow w-100 rounded">
                  <div className="card-body py-xxl-5 py-3 px-4">
                    <p className="mb-2 font-heading">Available Space</p>
                    <h4 className="h3 mb-0">300 <small className="font-heading">sq.ft</small></h4>
                  </div>
                </div>  
              </div>   
            </div>
          </div>


          {/* <div className="tab-pane fade" id="pills-demographics-summary" role="tabpanel" aria-labelledby="pills-demographics-summary-tab">
            <div className="row mx-0">
              <div className="col-12 border px-0 card">
                <div className="card-header bg-none py-3">
                  <h6 className="px-3">State count</h6>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-xl-6">
                      <div className="row">
                        <div className="col-12">
                          <div className="col-lg-6 col-md-8 col-sm-12 mb-3">
                            <form action="">
                              <select className="common-select form-control">
                                <option value="Haryana">Haryana</option>
                                <option value="">Delhi</option>
                                <option value="">Bihar</option>
                                <option value="">Mumbai</option>
                              </select>
                            </form>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <ul className="list-group">
                            <li className="d-flex align-items-center py-2 px-3 border-0 text-gray justify-content-between">
                              <div className="d-flex align-items-center"><div className="text-blue"><i className="fas fa-square mr-2"></i></div> <div>Ambala</div></div>
                              <div>30</div>
                            </li>
                            <li className="d-flex align-items-center py-2 px-3 border-0 text-gray justify-content-between">
                              <div className="d-flex align-items-center"><div className="text-primary"><i className="fas fa-square mr-2"></i></div> <div>Bhiwani</div></div>
                              <div>30</div>
                            </li>
                            <li className="d-flex align-items-center py-2 px-3 border-0 text-gray justify-content-between">
                              <div className="d-flex align-items-center"><div className="text-red"><i className="fas fa-square mr-2"></i></div> <div>Charkhi Dadri</div></div>
                              <div>30</div>
                            </li>
                            <li className="d-flex align-items-center py-2 px-3 border-0 text-gray justify-content-between">
                              <div className="d-flex align-items-center"><div className="text-danger"><i className="fas fa-square mr-2"></i></div> <div>Faridabad</div></div>
                              <div>30</div>
                            </li>
                            <li className="d-flex align-items-center py-2 px-3 border-0 text-gray justify-content-between">
                              <div className="d-flex align-items-center"><div className="text-green"><i className="fas fa-square mr-2"></i></div> <div>Fatehabad</div></div>
                              <div>30</div>
                            </li>
                            <li className="d-flex align-items-center py-2 px-3 border-0 text-gray justify-content-between">
                              <div className="d-flex align-items-center"><div className="text-deep-green"><i className="fas fa-square mr-2"></i></div> <div>Gurugram</div></div>
                              <div>30</div>
                            </li>
                            <li className="d-flex align-items-center py-2 px-3 border-0 text-gray justify-content-between">
                              <div className="d-flex align-items-center"><div className="text-blue"><i className="fas fa-square mr-2"></i></div> <div>Hisar</div></div>
                              <div>30</div>
                            </li>
                          </ul>
                        </div>
                        <div className="col-sm-6">
                          <ul className="list-group">
                            <li className="d-flex align-items-center py-2 px-3 border-0 text-gray justify-content-between">
                              <div className="d-flex align-items-center"><div className="text-blue"><i className="fas fa-square mr-2"></i></div> <div>Ambala</div></div>
                              <div>30</div>
                            </li>
                            <li className="d-flex align-items-center py-2 px-3 border-0 text-gray justify-content-between">
                              <div className="d-flex align-items-center"><div className="text-primary"><i className="fas fa-square mr-2"></i></div> <div>Bhiwani</div></div>
                              <div>30</div>
                            </li>
                            <li className="d-flex align-items-center py-2 px-3 border-0 text-gray justify-content-between">
                              <div className="d-flex align-items-center"><div className="text-red"><i className="fas fa-square mr-2"></i></div> <div>Charkhi Dadri</div></div>
                              <div>30</div>
                            </li>
                            <li className="d-flex align-items-center py-2 px-3 border-0 text-gray justify-content-between">
                              <div className="d-flex align-items-center"><div className="text-danger"><i className="fas fa-square mr-2"></i></div> <div>Faridabad</div></div>
                              <div>30</div>
                            </li>
                            <li className="d-flex align-items-center py-2 px-3 border-0 text-gray justify-content-between">
                              <div className="d-flex align-items-center"><div className="text-green"><i className="fas fa-square mr-2"></i></div> <div>Fatehabad</div></div>
                              <div>30</div>
                            </li>
                            <li className="d-flex align-items-center py-2 px-3 border-0 text-gray justify-content-between">
                              <div className="d-flex align-items-center"><div className="text-deep-green"><i className="fas fa-square mr-2"></i></div> <div>Gurugram</div></div>
                              <div>30</div>
                            </li>
                            <li className="d-flex align-items-center py-2 px-3 border-0 text-gray justify-content-between">
                              <div className="d-flex align-items-center"><div className="text-blue"><i className="fas fa-square mr-2"></i></div> <div>Hisar</div></div>
                              <div>30</div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mx-auto p-3">
                      <div className="img-holder w-320px mx-auto">
                        <img className="img-fluid w-100" src={"/assets/images/graph.png"} alt="venddor"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}



          {/* <div className="tab-pane fade" id="pills-wms" role="tabpanel" aria-labelledby="pills-wms-tab">...</div> */}
        </div>
      </div>
    </div>
  </div>
  
</VendorLayout> 
  );
}

export default WarehouseSpaceSummary;

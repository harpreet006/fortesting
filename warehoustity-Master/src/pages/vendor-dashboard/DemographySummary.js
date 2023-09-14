import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import VendorLayout from '../../layout/VendorLayout';
import MenuDrawer from '../../components/vendor/MenuDrawer';
import { getVendorDemograpgy } from '../../store/actions/dashboardAction'
import { useSelector, useDispatch } from 'react-redux';
import { PieChart } from 'react-minimal-pie-chart';

const DemographySummary = () => {
  const [location, setLocation] = useState("Uttar Pradesh")
  const dispatch = useDispatch();
  const data = useSelector((state) => state.DASHBOARD_INFO);

  const demographyCall = (state) => {
    if (state !== "") {
      setLocation(state)
      dispatch(getVendorDemograpgy({
        "state": state
      }))
    }
  }

  useEffect(() => {

    dispatch(getVendorDemograpgy({
      "state": "Uttar Pradesh"
    }))
  }, [dispatch]);


  const options = [
    // { value: '0', label: 'Select State' },

    { value: '1', label: 'Andaman & Nicobar' },
    { value: '2', label: 'Andhra Pradesh' },
    { value: '3', label: 'Arunachal Pradesh' },
    { value: '4', label: 'Assam' },
    { value: '5', label: 'Bihar' },
    { value: '6', label: 'Chandigarh' },
    { value: '7', label: 'Chhattisgarh' },
    { value: '8', label: 'Dadra & Nagar Haveli' },
    { value: '9', label: 'Daman & Diu' },
    { value: '10', label: 'Delhi' },
    { value: '11', label: 'Goa' },
    { value: '12', label: 'Gujarat' },
    { value: '13', label: 'Haryana' },
    { value: '14', label: 'Himachal Pradesh' },
    { value: '15', label: 'Jammu & Kashmir' },
    { value: '16', label: 'Jharkhand' },
    { value: '17', label: 'Karnataka' },
    { value: '18', label: 'Kerala' },
    { value: '19', label: 'Lakshadweep' },
    { value: '20', label: 'Madhya Pradesh' },
    { value: '21', label: 'Maharashtra' },
    { value: '22', label: 'Manipur' },
    { value: '23', label: 'Meghalaya' },
    { value: '24', label: 'Mizoram' },
    { value: '25', label: 'Nagaland' },
    { value: '26', label: 'Orissa' },
    { value: '27', label: 'Pondicherry' },
    { value: '28', label: 'Punjab' },
    { value: '29', label: 'Rajasthan' },
    { value: '30', label: 'Sikkim' },
    { value: '31', label: 'Tamil Nadu' },
    { value: '32', label: 'Tripura' },
    { value: '33', label: 'Uttar Pradesh' },
    { value: '34', label: 'Uttaranchal' },
    { value: '35', label: 'West Bengal' },
  ];


  return (
    <VendorLayout>

      <div className="content-admin px-1">
          <MenuDrawer />
          
        <div className="row justify-content-end align-items-center py-3 px-4 mx-0">
         
         
        <div className="col-12 custom-shadow p-1 mb-1  tabs-scroll">
            <ul className="nav nav-pills admin-tabs-blue" id="pills-tab" role="tablist">
              <li className="nav-item">
                <Link to="/vendor" className="nav-link text-uppercase">My Dashboard</Link>
              </li>
              {/* <li className="nav-item">
                  <Link to="/vendor/space-summary" className="nav-link text-uppercase">space summary</Link>
                </li> */}
              <li className="nav-item">
                <Link to="/vendor/demograpgy-summary" className="nav-link text-uppercase vendorActive">Demographics summary</Link>
              </li>
              <li className="nav-item">
                <Link to="/vendor/wms" className="nav-link text-uppercase">wms</Link>
              </li>
            </ul>
          </div>


          <div className="col-12">
            <div className="tab-content" id="pills-tabContent">
              <div className="tab-pane fade show active" id="pills-demographics-summary" role="tabpanel" aria-labelledby="pills-demographics-summary-tab">
                <div className="row mx-0">
                  <div className="col-12 border px-0 card">
                    <div className="card-header bg-none py-1">
                      <h6 className="px-3">State count</h6>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-xl-6">
                          <div className="row">
                            <div className="col-12">
                              <div className="row">
                                <div className="col-lg-6 col-md-8 col-sm-12 mb-3">
                                  <form action="">
                                    <select value={location} onChange={(e) => demographyCall(e.target.value)} className="common-select form-control form-control-sm">
                                      <option value="">Select location</option>

                                      {options && options.length > 0 ?
                                        options.map((item, index) => {
                                          return (
                                            <option value={item.label} key={index}>{item.label}</option>
                                          )
                                        })
                                        : null}

                                    </select>
                                  </form>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-6 mt-2">
                                  Total Warehouse : {data.vendorDemography?.totalWarehouse}
                                </div>

                              </div>
                            </div>


                            {data.vendorDemography?.data && data.vendorDemography?.data?.length > 0 ?
                              data.vendorDemography?.data.map((item, index) => {
                                return (
                                  <div key={index} className="col-sm-6">
                                    <ul className="list-group">
                                      <li className="d-flex align-items-center py-2 px-3 border-0 text-gray justify-content-between">
                                        <div className="d-flex align-items-center"><div style={{ color: `${item.color}` }}><i className="fas fa-square mr-2"></i></div> <div>{item.title}</div></div>
                                        <div>{item.value}</div>
                                      </li>
                                    </ul>
                                  </div>
                                )
                              })
                              : null}
                          </div>
                        </div>
                        <div className="col-md-6 mx-auto p-3">
                          {data.vendorDemography?.data && data.vendorDemography?.data?.length > 0 ?
                            <PieChart
                              data={data.vendorDemography.data}
                              style={{ width: 250 }}
                            />
                            : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="pills-wms" role="tabpanel" aria-labelledby="pills-wms-tab">...</div>
            </div>
          </div>
        </div>
      </div>

    </VendorLayout>
  );
}

export default DemographySummary;

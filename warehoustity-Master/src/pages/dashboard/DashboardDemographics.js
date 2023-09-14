import React from 'react'
import Layout from '../../layout/Layout';
import Demographics from '../../components/dashboard/Demographics';
import CustomerLayout from '../../layout/CustomerLayout';
import { Link } from 'react-router-dom';

const DashboardDemographics = () => {
  return (
    <Layout>

      <CustomerLayout title={`Dashboard`}>
        <div className="row">
          <div className="content col-12">
            <div className="dashboard-btns pb-1 border-bottom mb-2">
              <ul className="nav nav-pills common-tabs3" id="pills-tab" role="tablist">
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link btn-md btn py-2">Summary</Link>
                </li>
                <li className="nav-item">
                  <Link to="/dashboard-demographics" className="nav-link btn-md btn py-2 active">Demographics</Link>
                </li>
                <li className="nav-item">
                  <Link to="/dashboard-wms" className="nav-link btn-md btn py-2">WMS</Link>
                </li>
              </ul>
            </div>

            <div className="tab-content" id="pills-tabContent">
              <Demographics />
            </div>
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
}

export default DashboardDemographics;

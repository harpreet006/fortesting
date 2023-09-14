import React from 'react';
import Layout from '../../layout/Layout';
import { Link } from 'react-router-dom';
import CustomerLayout from '../../layout/CustomerLayout';
import BreadcrumbLayout from '../../layout/BreadcrumbLayout';

const GstView = () => {
    return (
        <Layout>
        <BreadcrumbLayout title={`GST View`} />
     
        <CustomerLayout>
            <div className="row">
                <div className="content col-12"> 
                <div className="border-bottom mb-4 d-sm-flex justify-content-between">
                    <div>
                    <Link to="#" className="btn name-breadcrumb px-0 text-dark font-heading mr-3 mb-2">
                        {/* <i className="fas fa-chevron-left pr-3"></i> */}
                            GST View</Link>
                    </div> 
                </div>
                <div className="row p-3">
                        Gst Views
                </div> 
                </div>
            </div>
        </CustomerLayout>
      </Layout>
    )
}

export default GstView

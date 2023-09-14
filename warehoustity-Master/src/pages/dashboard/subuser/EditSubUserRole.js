import React from 'react';
import Layout from '../../../layout/Layout';
import { useHistory, useParams } from 'react-router-dom';
import BrowserTitle from '../../../components/helper/BrowserTitle';
import BreadcrumbLayout from '../../../layout/BreadcrumbLayout';
import CustomerLayout from '../../../layout/CustomerLayout';

const EditSubUserRole = () => {
    const  history = useHistory();
    const {editId} = useParams();
    console.log("editId==>", editId)
    return (
        <Layout>
        <BrowserTitle title="Edit Sub User" />
        <BreadcrumbLayout  title="Edit Sub User" />
        <CustomerLayout>
                <div className="row">
                    <div className="content col-12 edit-users-roles">
                  <div className="border-bottom mb-3 d-sm-flex justify-content-between">
                    <div>
                      <button className="btn name-breadcrumb px-0 text-dark font-heading mr-3 text-uppercase" > <i onClick={()=>history.goBack()} className="fas fa-chevron-left pr-3"></i>Edit Details </button>
                    </div> 
                  </div>
                  <div className="row p-3"> 
                    <div className="col-12">
                      <form action="">
                        <div className="row">
                         
                          <div className="form-group col-lg-4 col-md-6 mb-4">
                            <label for="staticEmail" className="mb-2">Created On</label>
                            <input type="date" className="form-control form-control-lg" id="staticEmail" />
                          </div>
                          <div className="form-group col-lg-4 col-md-6 mb-4">
                            <label for="staticEmail" className="mb-2">Created By</label>
                            <input type="text" className="form-control form-control-lg" id="staticEmail" />
                          </div> 
                          <div className="form-group col-lg-4 col-md-6 mb-4">
                            <label for="staticEmail" className="mb-2">Role</label>
                            <input type="text" className="form-control form-control-lg" id="staticEmail" value="Executive"/>
                          </div>
                          <div className="form-group col-lg-4 col-md-6 mb-4">
                            <label for="staticEmail" className="mb-2">Active/Inactive</label>
                            <input type="text" className="form-control form-control-lg" id="staticEmail" value="Active"/>
                          </div>
                        </div>
                        <div className="row pt-4">
                          <div className="col-auto">
                            <button onClick={()=>history.goBack()} type="button" className="btn btn-deep-primary toggle-className my-4">Back</button>
                          </div>
                          <div className="col-auto">
                            <button type="submit" className="btn btn-deep-primary toggle-className my-4">Save</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
        </CustomerLayout>
        
    </Layout>
    )
}

export default EditSubUserRole

import React from 'react';
import Layout from '../../../layout/Layout';
import BrowserTitle from '../../../components/helper/BrowserTitle';
import BreadcrumbLayout from '../../../layout/BreadcrumbLayout';
import CustomerLayout from '../../../layout/CustomerLayout';

const UserRoleDetails = () => {
  return (
    <Layout>
    <BrowserTitle title = "Create Role" />
     <BreadcrumbLayout title = "Create Role" />
     <CustomerLayout>
        

     <div className="content d-none col-12 view-users-roles">
        <div className="border-bottom mb-4 d-sm-flex justify-content-between">
            <div>
            <button className="btn name-breadcrumb px-0 text-dark font-heading mr-3 toggle-class" data-target=".view-users-roles" data-toggle-class="d-none"><i className="fas fa-chevron-left pr-3"></i>View Role </button>
            </div> 
        </div>
        <div className="row p-3"> 
            <div className="col-12">
            <form action="">
                <div className="row">
                <div className="form-group col-lg-4 col-md-6 mb-4">
                    <label for="staticEmail" className="mb-2">Role Id</label>
                    <input type="text" className="form-control form-control-lg" id="staticEmail" value="RID0989" readOnly/>
                </div>
                <div className="form-group col-lg-4 col-md-6 mb-4">
                    <label for="staticEmail" className="mb-2">Created On</label>
                    <input type="date" className="form-control form-control-lg" id="staticEmail" value="15-12-2020" readOnly/>
                </div>
                <div className="form-group col-lg-4 col-md-6 mb-4">
                    <label for="staticEmail" className="mb-2">Created By</label>
                    <input type="text" className="form-control form-control-lg" id="staticEmail" value="Mandeep Singh" readOnly/>
                </div> 
                <div className="form-group col-lg-4 col-md-6 mb-4">
                    <label for="staticEmail" className="mb-2">Role</label>
                    <input type="text" className="form-control form-control-lg" id="staticEmail" value="Executive" readOnly/>
                </div>
                <div className="form-group col-lg-4 col-md-6 mb-4">
                    <label for="staticEmail" className="mb-2">Active/Inactive</label>
                    <input type="text" className="form-control form-control-lg" id="staticEmail" value="Active" readOnly/>
                </div>
                </div>
            </form>
            </div>
            
            <div className="col-12">
            <button className="btn btn-deep-primary toggle-class my-4" data-target=".view-users-roles" data-toggle-class="d-none">Back</button>
            </div>
        </div>
        </div>

     </CustomerLayout>
    </Layout>
  );
}

export default UserRoleDetails;

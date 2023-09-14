import React, {useEffect} from 'react';
import VendorLayout from '../../../layout/VendorLayout';
import MenuDrawer from '../../../components/vendor/MenuDrawer';
import {bookingVendorByPage} from '../../../store/actions/customer/documentAction'
import {useSelector, useDispatch} from 'react-redux';
import VendorCertificateList from '../../../components/vendor/VendorCertificateList'

const Other = () => {

  const dispatch = useDispatch();
  const data = useSelector((state)=>state.CUSTOMER_DOCUMENT);

  useEffect(() => {
    dispatch(bookingVendorByPage())
  }, [dispatch]);
 
    return(
      <VendorLayout>
          <div className="content-admin px-3">
           
            <div className="row align-items-center py-3 px-3 mx-0"> 
            <MenuDrawer />
              <div className="col-12 px-1">
                <div className="row">
                  <div className="col-12 pb-1 pl-0">
                    <h5 className="text-dark backButton">Others</h5>
                  </div>

                {data && data.documentList.data && data.documentList.data.length>0 ?
                  data.documentList.data.map((val, index)=>
                  <VendorCertificateList docType="other_certificate" userType="vendor" val={val} srn={index} key={index} docFile = "/assets/documents/Space Certificate - Customer.docx" />
                      )
                  :null} 
                 

                </div> 
              </div>
            </div>
          </div>
          </VendorLayout>
  
    )
}

export default Other;
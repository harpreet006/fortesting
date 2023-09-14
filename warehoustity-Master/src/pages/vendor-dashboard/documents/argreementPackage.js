import React, { useEffect } from 'react';
import VendorLayout from '../../../layout/VendorLayout';
import MenuDrawer from '../../../components/vendor/MenuDrawer';
import { bookingVendorByPage } from '../../../store/actions/customer/documentAction'
import { useSelector, useDispatch } from 'react-redux';
import VendorCertificateList from '../../../components/vendor/VendorCertificateList'
import { ItemNotFlund } from '../../../components/helper/CustomLoader';

const AgreementPackage = () => {


  const dispatch = useDispatch();
  const data = useSelector((state) => state.CUSTOMER_DOCUMENT);

  useEffect(() => {
    dispatch(bookingVendorByPage())
  }, [dispatch]);

  
  return (
    <VendorLayout>
      <div className="content-admin px-1">

        <div className="row align-items-center py-3 px-3 mx-0">
          <MenuDrawer />
          <div className="col-12 px-1">
            <div className="row mx-1">
              <div className="col-12 pb-1 pl-0">
                <h5 className="text-dark backButton mb-1">Agreement Package</h5>
              </div>


              <div className="col-12 text-nowrap table-responsive table-gray-admin mx-3">
                {data && data.documentList.data && data.documentList.data.length > 0 ?
                  <table className="table">
                    <thead>
                      {/* <tr>
                        <th className="text-center">S.NO {`  `}</th>
                        <th className="text-nowrap">Subject</th>
                        <th>Notitfication</th>
                        <th>Date</th>
                        <th>View</th>
                      </tr> */}
                    </thead>
                    {/* <tbody>
                      {data.documentList.data.map((val, index) => {
                        return (
                          <tr>
                            <td className="text-center py-2">
                              {val.warehouse?.warehouseId}
                            </td>
                            <td>
                            </td>
                            <td className="text-nowrap">
                            </td>
                            <td className="text-nowrap">
                            </td>
                            <td className="text-center">
                            
                            </td>
                          </tr>
                        );
                      })}
                    </tbody> */}
                  </table>
                  :
                  <ItemNotFlund message="No Data Available" />
                }
              </div>


              {data && data.documentList.data && data.documentList.data.length > 0 ?
                data.documentList.data.map((val, index) =>
                  <VendorCertificateList docType="agreement_certificate" userType="vendor" val={val} srn={index} key={index} docFile="/assets/documents/Customer_Warehousity_Agreement Offline - 04Feb20 V1.doc" />
                )
                : null}

            </div>
          </div>
        </div>
      </div>
    </VendorLayout>

  )
}

export default AgreementPackage;
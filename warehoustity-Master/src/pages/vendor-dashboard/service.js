import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import MenuDrawer from '../../components/vendor/MenuDrawer';
import VendorLayout from '../../layout/VendorLayout';
import {serviceByPage} from '../../store/actions/serviceAction'
import {useSelector, useDispatch} from 'react-redux';
import {CardLoader} from '../../components/helper/CustomLoader';
import Pagination from "react-js-pagination";

const Service = () => {

  const history  = useHistory()
    const dispatch = useDispatch();
    const data = useSelector((state)=>state.SERVICEINFO);

    const pageCount = new URLSearchParams(window.location.search).get('page');
  

const handlePageChange = (pageNumber) => {
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set('page', pageNumber);
    history.push(window.location.pathname + "?" + currentUrlParams.toString());
    dispatch(serviceByPage(pageNumber))
  };
  


    useEffect(() => {
        dispatch(serviceByPage(parseInt(pageCount)))
      }, [dispatch, pageCount]);

    return(
      <VendorLayout>
        <div className="content-admin px-5">
          <div className="row justify-content-end align-items-center sticky-top py-3 px-3 bg-lighter-blue">
          <MenuDrawer />
            <div className="py-3 col">
              <div className="input-group admin-search custom-shadow prepend w-100"> 
                <div className="input-group-prepend">
                  <span className="input-group-text bg-white">
                    <button className="btn btn-lighter-blue p-0 size-30px"><i className="fas fa-search"></i></button>
                  </span>
                </div>
                <input type="text" className="form-control h-100% toggle-className" placeholder="Search" data-target=".custom-search" data-toggle-classname="open" data-event/>
              </div>
            </div>
          </div>
          <div className="row justify-content-end align-items-center py-3 px-3 mx-0"> 
            <div className="col-12 px-0">
              <div className="row">
                <div className="col-12 pb-3">
                  <h5 className="text-dark">Services</h5>
                </div>
                <div className="col-12 table-responsive table-row-margin-bottom-admin">
                {data.isLoading ? 
            <CardLoader />
          :
          <>
                  <table className="table listTable"> 
                    <tbody>

                    {
                      data.serviceList.data && data.serviceList.data.length>0 ?
                      data.serviceList.data.map((service, index)=>{
                        return(
                          <tr key={index}> 
                              <td className="text-nowrap">Service ID:</td>
                              <td className="text-nowrap col font-weight-bold">{service.id}  </td>
                              <td><Link to={`/vendor/service/${service.id}`} className="btn p-0 rounded-0 font-weight-bold btn-line-deep-blue mb-0 text-nowrap">View Services</Link></td>
                            </tr>  
                        )
                      })
                      :
                      null
                    }

                      
                    </tbody>
                  </table>

                  <div className="pagination-custom">
                    { data.serviceList.data && data.serviceList.data !== undefined  && (
                    <Pagination
                    activePage={parseInt(pageCount)}
                    itemsCountPerPage={10}
                    totalItemsCount={data.serviceList.totalCount}
                    pageRangeDisplayed={1}
                    onChange={handlePageChange}
                    prevPageText = {<i className="fas fa-chevron-left"/>}
                    nextPageText= {<i className="fas fa-chevron-right"/>}
                    hideFirstLastPages={true}
                    />
                    )}
                </div>

                  </>
                }
                </div>
              </div> 
            </div>
          </div>
        </div>
        </VendorLayout>

    )
}

export default Service;
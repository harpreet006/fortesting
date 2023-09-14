import React, {useEffect} from 'react'
import Layout from '../../layout/Layout';
import {exploreNetwork } from '../../store/actions/warehouseAction';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import BrowserTitle from '../../components/helper/BrowserTitle';
import {CardLoader} from '../../components/helper/CustomLoader';


const ExploreNetwork = () => {
    const dispatch = useDispatch();
    const items = useSelector((state)=>state.WAREHOUSEINFO);

    useEffect(() => {
        dispatch(exploreNetwork())
        window.scrollTo(0,0);
    }, [dispatch])


    return (
        <Layout>
        <BrowserTitle title="Explore Network" />
        <br/>
        <div className="container mt-5">
          <div className="row align-items-center justify-content-start mt-5">
            <div className="col-auto mt-5 ">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb common-breadcrumb mb-0 text-dark">
                  <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Explore Network</li>
                </ol>
              </nav>
            </div>
            
          </div>
        </div>

        {items.isLoading ? 
            <CardLoader />
          :

          <section className="about-deatail pt-2">
            <div className="container">
            <h4 className="py-2 font-weight-bold">Warehousity is currently available in the following States/Cities:</h4>
            </div>
              <div className="container explore-network-wrap">
              
                <p>Note: All space in Sqft only. Space = Available Space.</p>

                  {items.exploreWarehouse ?
                    items.exploreWarehouse.map((item, index)=>{
                        return(

                            <div className="card mb-1 border-2" style={{borderColor:'#e7e6eb'}} key={index}>
                                    
                            <div className="card-body" style={{backgroundColor:"#f5f5f7"}}>
                                <h5 className="card-title font-weight-bold  text-capitalize">{item.state} ({item.warehouseCounts})</h5>
                                <p className="card-text">Total Space - {item.totalAvailableSpace}</p>
                            </div>
                            <div className="row">
                            {item.city && item.city.length>0 &&
                            item.city.map((itm, i)=>{
                                return(
                                    <div key={i} className="card-body col-md-3 px-4">
                                         <h6 className="card-title font-weight-bold text-capitalize">{itm.city} ({itm.warehouseCounts})</h6>
                                         <p className="card-text">Total Space - {itm.totalAvailableSpace}</p>
                                    </div>
                                )
                            })}
                          </div>
                        </div>

                        )
                    })
             
            :null}

              </div>
          </section>
}

      </Layout>
    )
}

export default ExploreNetwork

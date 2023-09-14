import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {favoriteByPage} from '../../../../store/actions/customer/favoriteAction';
import {createRFQ, responseRfq} from '../../../../store/actions/customer/rfqAction';
import FormSuccess from '../../../../components/helper/FormSuccess';

const RFQForm = ({isView, warehouseId}) => {
    const [spaceRequired, setSpaceRequired] = useState(null);
    const [spcaeError, setSpaceError] = useState(null);
    const [warehouseList, setWarehouseList] = useState(null);

    const dispatch = useDispatch()
    const rfqData = useSelector((state)=>state.CUSTOMER_RFQ_INFO);

    useEffect(() => {
       
        if(rfqData.rfqDetail && rfqData.rfqDetail.warehouses && rfqData.rfqDetail.warehouses.length>0){
            let wList = []
            for(let i=0; i<rfqData.rfqDetail.warehouses.length; i++){
                if(rfqData.rfqDetail.warehouses[i]['id'] === parseInt(warehouseId)){
                    wList.push({value:rfqData.rfqDetail.warehouses[i]['id'], label:rfqData.rfqDetail.warehouses[i]['warehouseName']})
                }
            }
        
        setWarehouseList(wList)
        }
        
      }, [rfqData.rfqDetail, warehouseId]);


      const submitHandle = (e) => {
        e.preventDefault();
        let wareList = []

        if(spaceRequired === ""){
            setSpaceError("WH Space Required")
            return 0;
        }

        let data = {
            "warehouseSpaceRequired": parseInt(spaceRequired),
            "kpi": "kpi",
            "additionalRequirements": "",
            "warehouses":wareList
        }
        
        dispatch(createRFQ(data))
      }


      useEffect(() => {
        dispatch(favoriteByPage())
      }, [dispatch]);

  return (
    <>
    {
        rfqData.rfqResponse.statusCode === 200 ?
            <FormSuccess onClick={()=>dispatch(responseRfq([]))} message={rfqData.rfqResponse.message} />
        : null
    }
    
    <form onSubmit={submitHandle}>
        <div className="row pt-2">
            <div className="col-12 px-0">
            <div className="form-group form-inline mb-3 px-0">
                <label htmlFor="inputPassword6" className="w-250px justify-content-start px-3">RFQ ID</label>
                <div className="row mx-md-0 mx-sm-3 mx-0">
                <div className="col-12 px-sm-3 px-0">
                    <input value={rfqData.rfqDetail ? rfqData.rfqDetail.id : null} type="text" id="inputPassword6" className="form-control d-inline-block form-control-md w-160px mx-3" readOnly/>
                </div>
                </div>
            </div>
            </div>
            <div className="col-12 px-0">
            <div className="row">
                <div className="col-auto">
                <label htmlFor="staticEmail" className="mb-2 mt-2 w-250px justify-content-start px-3">Location</label>
                </div>
                <div className="col-xl-6 col-lg-7 px-md-0 col-md-7 col-sm-6 px-3">
                <div className="row mx-0">
                    <div className="form-group col-auto px-3 d-inline-block form-inline mb-3">
                    <input value={rfqData?.rfqDetail?.location?.city?.name} className="form-control form-control-md w-160px" disabled={isView} />
                    </div>

                    <div className="w-250px col-auto px-3 mb-3">
                    <input value={rfqData?.rfqDetail?.location?.area?.name} className="form-control form-control-md w-160px" disabled={isView} />
                    </div>
                </div>
                </div> 
            </div>
            </div>
            <div className="col-12 px-0">
            <div className="form-group form-inline mb-4 px-0">
                <label htmlFor="inputPassword7" className="w-250px justify-content-start px-3">WH Space Required</label>
                <div className="row mx-md-0 mx-sm-3 mx-0">
                <div className="col-12 px-sm-3 px-0">
                    <input onChange={(e)=>{
                        setSpaceRequired(e.target.value)
                        setSpaceError(null)
                        }} type="number" value={rfqData.rfqDetail && rfqData.rfqDetail.warehouseSpaceRequired ? rfqData.rfqDetail.warehouseSpaceRequired :""} id="inputPassword7" className="form-control d-inline-block form-control-md w-160px mx-3" placeholder="Sqft" disabled={isView}/>
                </div>
                </div>
                {spcaeError}
            </div>
            </div>
            <div className="col-12 px-0">
            <div className="row">
                <div className="col-auto">
                <label htmlFor="staticEmail" className="mb-1 mt-2 w-250px justify-content-start px-3">Warehouse</label>
                </div>
                <div className="col-xl-6 col-lg-7 px-md-0 col-md-7 col-sm-6 px-3">
                <div className="row mx-0">
                    <div className="form-group col-auto px-3 d-inline-block form-inline mb-3">
                   {
                    warehouseList && warehouseList.length>0 ? (

                        warehouseList.map((w)=>{
                        return(
                            <input value={w.label} type="text" id="inputPassword6" className="form-control d-inline-block form-control-md w-160px mb-2" readOnly/>
                        )
                    })

                    )
                    :null
                   }
                    
                   
                    {/* <select onChange={(e)=> {
                        if(e.target.value === "favorities"){
                            dispatch(favoriteByPage())
                        }
                    }} defaultValue={'Select'} className="form-control form-control-md w-160px" disabled={isView} >
                        <option>Select</option>
                        <option value="favorities">Favorities</option>
                        <option value="cart">Cart</option>
                    </select> */}
                    </div>
                    <div className="w-250px col-auto px-3 mb-3">

                    {/* <Select
                        value={cartHouse}
                        onChange={handleCart}
                        options={warehouseList}
                        isDisabled={isView}
                        isMulti
                    /> */}
                

                    {/* <div className="dropdown btn-export">
                        <button type="button" className="btn w-200px btn-deep-primary px-3 btn-block toggle-class" data-target="#drop-select-warehouse2" data-toggle-class="show">
                        Select warehouses
                        </button>
                        <div className="dropdown-menu w-200px" id="drop-select-warehouse2">
                        <div className="px-3">
                            <div className="common-checkbox position-relative mb-1 mx-auto d-inline-block">
                            <input className="common-checkbox-input" type="checkbox" value="" id="defaultCheck9"/>
                            <label className="common-checkbox-label pl-4" htmlFor="defaultCheck9">DL -  87152</label>
                            </div>
                        </div>
                        <div className="px-3">
                            <div className="common-checkbox position-relative mb-1 mx-auto d-inline-block">
                            <input className="common-checkbox-input" type="checkbox" value="" id="defaultCheck10"/>
                            <label className="common-checkbox-label pl-4" htmlFor="defaultCheck10">DL -  87152</label>
                            </div>
                        </div>
                        <div className="px-3">
                            <div className="common-checkbox position-relative mb-1 mx-auto d-inline-block">
                            <input className="common-checkbox-input" type="checkbox" value="" id="defaultCheck11"/>
                            <label className="common-checkbox-label pl-4" htmlFor="defaultCheck11">DL -  87152</label>
                            </div>
                        </div>
                        <div className="px-3">
                            <div className="common-checkbox position-relative mb-1 mx-auto d-inline-block">
                            <input className="common-checkbox-input" type="checkbox" value="" id="defaultCheck12"/>
                            <label className="common-checkbox-label pl-4" htmlFor="defaultCheck12">DL -  87152</label>
                            </div>
                        </div>
                        <div className="px-3">
                            <div className="common-checkbox position-relative mb-1 mx-auto d-inline-block">
                            <input className="common-checkbox-input" type="checkbox" value="" id="defaultCheck13"/>
                            <label className="common-checkbox-label pl-4" htmlFor="defaultCheck13">DL -  87152</label>
                            </div>
                        </div>
                        <div className="px-3">
                            <div className="common-checkbox position-relative mb-1 mx-auto d-inline-block">
                            <input className="common-checkbox-input" type="checkbox" value="" id="defaultCheck14"/>
                            <label className="common-checkbox-label pl-4" htmlFor="defaultCheck14">DL -  87152</label>
                            </div>
                        </div>
                        <div className="px-3">
                            <div className="common-checkbox position-relative mb-1 mx-auto d-inline-block">
                            <input className="common-checkbox-input" type="checkbox" value="" id="defaultCheck15"/>
                            <label className="common-checkbox-label pl-4" htmlFor="defaultCheck15">DL -  87152</label>
                            </div>
                        </div>
                        <div className="px-3">
                            <div className="common-checkbox position-relative mb-1 mx-auto d-inline-block">
                            <input className="common-checkbox-input" type="checkbox" value="" id="defaultCheck16"/>
                            <label className="common-checkbox-label pl-4" htmlFor="defaultCheck16">DL -  87152</label>
                            </div>
                        </div>
                        </div>
                    </div>  */}
                    </div>
                </div>
                </div> 
            </div>
            </div> 
        </div>
        </form>
        </>
  );
}

export default RFQForm;

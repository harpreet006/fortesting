import React from 'react'

const WarehousePricingForm = () => {
    return (
        <>
         
          <div className="row align-items-center pb-3 mx-0"> 
            <div className="col-12">
              <form action="">    
                <div className="row bg-white rounded mx-0 col-xxxl-11">
                  <div className="col-12">
                    <div className="form-group col-12 mb-3 px-sm-5 mt-2">
                      <label htmlFor="staticEmail" className="mb-2 mr-3 px-4">Warehouse Pricing (per sq.ft.)</label>
                      <input className="form-control bg-white px-4 w-300px" placeholder="Enter Display Name" />
                    </div>
                  </div>
                  <div className="col-12 mt-4">
                    <div className="row justify-content-end">
                      <div className="col-auto">
                        <button type="button" className="btn btn-outline-deep-blue add-className remove-className">Submit</button>
                      </div>
                      <div className="col-auto"> 
                      </div>
                    </div>
                  </div>
                </div>  
              </form>
            </div>
          </div>  
        </>
    )
}

export default WarehousePricingForm

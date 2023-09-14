import React from 'react';

const RFQView = () => {
  return (
    <form className="">
        <div className="row pt-2">
            <div className="col-12 px-0">
            <div className="form-group form-inline mb-3 px-0">
                <label htmlFor="inputPassword6" className="w-250px justify-content-start px-3">RFQ ID</label>
                <div className="row mx-md-0 mx-sm-3 mx-0">
                <div className="col-12 px-sm-3 px-0">
                    <input type="text" id="inputPassword6" className="form-control d-inline-block form-control-lg w-160px mx-3" placeholder="DL-01379" readOnly/>
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
                    <select defaultValue={`Delhi`} className="form-control form-control-lg w-160px">
                        <option value="0">Delhi</option>
                        <option value="1">Mumbai</option>
                        <option value="2">Pune</option>
                        <option value="3">Kolkata</option>
                    </select>
                    </div>
                    <div className="w-250px col-auto px-3 mb-3">
                    <div className="dropdown btn-export">
                        <button type="button" className="btn w-200px btn-deep-primary px-3 btn-block toggle-class" data-target="#drop-select-warehouse" data-toggle-class="show">
                        Select warehouses
                        </button>
                        <div className="dropdown-menu w-200px" id="drop-select-warehouse">
                        <div className="px-3">
                            <div className="common-checkbox position-relative mb-1 mx-auto d-inline-block">
                            <input className="common-checkbox-input" type="checkbox" value="" id="defaultCheck1"/>
                            <label className="common-checkbox-label pl-4" htmlFor="defaultCheck1">DL -  87152</label>
                            </div>
                        </div>
                        <div className="px-3">
                            <div className="common-checkbox position-relative mb-1 mx-auto d-inline-block">
                            <input className="common-checkbox-input" type="checkbox" value="" id="defaultCheck2"/>
                            <label className="common-checkbox-label pl-4" htmlFor="defaultCheck2">DL -  87152</label>
                            </div>
                        </div>
                        <div className="px-3">
                            <div className="common-checkbox position-relative mb-1 mx-auto d-inline-block">
                            <input className="common-checkbox-input" type="checkbox" value="" id="defaultCheck3"/>
                            <label className="common-checkbox-label pl-4" htmlFor="defaultCheck3">DL -  87152</label>
                            </div>
                        </div>
                        <div className="px-3">
                            <div className="common-checkbox position-relative mb-1 mx-auto d-inline-block">
                            <input className="common-checkbox-input" type="checkbox" value="" id="defaultCheck4"/>
                            <label className="common-checkbox-label pl-4" htmlFor="defaultCheck4">DL -  87152</label>
                            </div>
                        </div>
                        <div className="px-3">
                            <div className="common-checkbox position-relative mb-1 mx-auto d-inline-block">
                            <input className="common-checkbox-input" type="checkbox" value="" id="defaultCheck5"/>
                            <label className="common-checkbox-label pl-4" htmlFor="defaultCheck5">DL -  87152</label>
                            </div>
                        </div>
                        <div className="px-3">
                            <div className="common-checkbox position-relative mb-1 mx-auto d-inline-block">
                            <input className="common-checkbox-input" type="checkbox" value="" id="defaultCheck6"/>
                            <label className="common-checkbox-label pl-4" htmlFor="defaultCheck6">DL -  87152</label>
                            </div>
                        </div>
                        <div className="px-3">
                            <div className="common-checkbox position-relative mb-1 mx-auto d-inline-block">
                            <input className="common-checkbox-input" type="checkbox" value="" id="defaultCheck7"/>
                            <label className="common-checkbox-label pl-4" htmlFor="defaultCheck7">DL -  87152</label>
                            </div>
                        </div>
                        <div className="px-3">
                            <div className="common-checkbox position-relative mb-1 mx-auto d-inline-block">
                            <input className="common-checkbox-input" type="checkbox" value="" id="defaultCheck8"/>
                            <label className="common-checkbox-label pl-4" htmlFor="defaultCheck8">DL -  87152</label>
                            </div>
                        </div>
                        </div>
                    </div> 
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
                    <input type="text" id="inputPassword7" className="form-control d-inline-block form-control-lg w-160px mx-3" placeholder="Sqft"/>
                </div>
                </div>
            </div>
            </div>
            <div className="col-12 px-0">
            <div className="row">
                <div className="col-auto">
                <label htmlFor="staticEmail" className="mb-1 mt-2 w-250px justify-content-start px-3">Favorities / Cart</label>
                </div>
                <div className="col-xl-6 col-lg-7 px-md-0 col-md-7 col-sm-6 px-3">
                <div className="row mx-0">
                    <div className="form-group col-auto px-3 d-inline-block form-inline mb-3">
                    <select defaultValue={'Select'} className="form-control form-control-lg w-160px">
                        <option>Select</option>
                        <option value="favorities">Favorities</option>
                        <option value="cart">Cart</option>
                    </select>
                    </div>
                    <div className="w-250px col-auto px-3 mb-3">
                    <div className="dropdown btn-export">
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
                    </div> 
                    </div>
                </div>
                </div> 
            </div>
            </div> 
            {/* <div className="col-12 mt-3">
            <div className="row justify-content-end"> 
                <div className="col-auto">
                <button type="button" className="btn btn-deep-primary mb-3 add-class remove-class">Submit</button>
                </div>
            </div>
            </div> */}
        </div>
        </form>
  );
}

export default RFQView;

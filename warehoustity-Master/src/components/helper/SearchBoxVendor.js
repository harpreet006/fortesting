import React from 'react'
import ExpandButton from './ExpandButton'

const SearchBoxVendor = ({placeholder}) => {
    return (
        <div className="col-12 my-2 px-0 round-pill  d-flex">
            <div className="input-group admin-search custom-shadow prepend w-100"> 
                <input type="text" className="form-control h-100% m-1" placeholder={placeholder} />
                <div className="input-group-prepend">
                    <span className="input-group-text bg-white p-0">
                        <button className="btn btn-deep-primary rounded-0 "><i className="fas fa-search"></i></button>
                    </span>
                </div>
            </div>
            <ExpandButton />


        </div>
    )
}

export default SearchBoxVendor

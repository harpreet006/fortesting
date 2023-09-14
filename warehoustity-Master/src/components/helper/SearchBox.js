import React from 'react'

const SearchBox = () => {
    return (
        <div className="input-group custom-search w-100"> 
            <input type="text" className="form-control h-100%" placeholder="Search" data-target=".custom-search" data-toggle-classname="open" data-event/>
            <div className="input-group-append">
                <span className="input-group-text bg-white">
                <button className="btn btn-primary p-0 size-30px"><i className="fas fa-search"></i></button>
                </span>
            </div>
        </div>
    )
}

export default SearchBox

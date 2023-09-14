import React from 'react'

const ExpandButton = () => {
    return (
        <button
        className="btn btn-deep-blue px-0 d-lg-none size-40px toggle-class btn-sidebar-admin sidebar-admin-toggle align-items-center justify-content-center"
        type="button"
        data-target=".sidebar-admin-toggle"
        data-toggle-class="open"
      >
        <span></span>
      </button>
    )
}

export default ExpandButton

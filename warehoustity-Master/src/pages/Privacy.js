import React from 'react'

const Privacy = ({content }) => {

    return (
        <>

        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content border-0">
            <div className="modal-body py-0">
              <div className="row px-3">
                <div className="py-lg-4 my-1 p-sm-4 p-3">

                <div className="row">
                  <div className="col-12">
                   
                  <h1 className="main-heading mb-4">Privacy Policy</h1>
                  </div>
                </div>

                
                  <div className="terms-and-condition-content">
                    <div className="content">
                      {content}
                    
                    </div>
                   
                  </div>
              
  
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
  
      </>
    )
}

export default Privacy

import React from 'react';

const ForgotPassword = () => {
  return (
    <div class="modal" id="forgot-password-modal" tabindex="-1" role="dialog" aria-labelledby="forgot-password-modalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content border-0"> 
          <div class="modal-body py-0">
            <div class="row px-3">
              <div class="col-12 py-lg-4 my-1 p-sm-4 p-3">
                <div class="row">
                  <div class="col-12">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <div>
                      <h5 class="mb-4 modal-title text-center text-uppercase mt-4">Forgot password</h5>
                    </div>
                  </div>
                </div>                
                <form action="">
                  <div class="row"> 
                    <div class="col-sm-12 form-group form-group-lg mb-3 py-4">
                       {/* <label for="spaceprovideremailid">Email ID <sup class="text-danger">*</sup></label> */}
                      <input type="text" id="spaceprovideremailid" class="form-control form-control-lg" placeholder="Type Here your Email ID"/>
                    </div> 
                  </div> 
                  <div class="text-center">
                    <button type="button" data-dismiss="modal" data-target="#sent-mail-status-modal" data-toggle="modal" class="btn btn-deep-primary my-3 mx-auto">Send Reset Link</button>
                  </div>
                </form>
              </div> 
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

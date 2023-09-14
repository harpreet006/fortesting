import React from 'react';

const ErrorCard = ({message}) => {
  return (
    <div class="card errorCard w-25 d-flex ml-auto mr-auto border-0 shadow">
        <div class="card-body text-center text-danger font-weight-bold">
        {message}
        </div>
    </div>
  );
}

export const FormErrorCard = ({message}) => {
    return (
      <div class="formErrorCard d-flex ml-auto mr-auto border-0 shadow">
          <div class="text-center font-weight-bold px-3 pt-1 text-danger">
          {message}
          </div>
      </div>
    );
  }
  

export default ErrorCard;

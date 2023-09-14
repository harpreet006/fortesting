import React from 'react'
import {useHistory } from "react-router-dom";
const BackButton = () => {
    const history = useHistory();
    return (
        <button onClick={()=> history.goBack()} className=" mt-2 font-weight-light" style={{height:35, marginTop:5}}>
        <i class="fa fa-arrow-left " aria-hidden="true"></i> Back
      </button>
    )
}

export default BackButton
